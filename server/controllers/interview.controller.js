import Interview from "../models/Interview.js";
import User from "../models/User.js";
import InterviewRound from "../models/InterviewRound.js";
import Question from "../models/Question.js";

import { findOrCreateCompany } from "../helpers/company.helper.js";
import { findOrCreateRole } from "../helpers/role.helper.js";
import { findOrCreateSource } from "../helpers/source.helper.js";

export const createInterview = async (req, res) => {

    try {

        const {
            company,
            role,
            experienceLevel,
            status,
            overallFeedback,
            overallRating,
            source,
            dateOfApplication
        } = req.body;
        const userId = req.user;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({
                code: "USER_NOT_AUTHENTICATED",
                message: "User not authenticated"
            });
        }

        if (!company) {
            return res.status(400).json({
                code: "COMPANY_REQUIRED",
                message: "Company is required"
            });
        }

        if (!role) {
            return res.status(400).json({
                code: "ROLE_REQUIRED",
                message: "Role is required"
            });
        }

        const companyId = await findOrCreateCompany(company);

        const roleId = await findOrCreateRole(role);

        const sourceId = await findOrCreateSource(source);

        const interview = await Interview.create({
            user: user._id,
            company: companyId,

            role: roleId,

            experienceLevel,

            status,

            overallFeedback,

            overallRating,

            source: sourceId,
            dateOfApplication

        });

        return res.status(201).json({
            code: "INTERVIEW_CREATED",
            message: "Interview created successfully",
            data: interview
        });

    } catch (error) {

        console.error("Create Interview Error:", error);

        return res.status(500).json({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create interview"
        });
    }
};

export const getInterviews = async (req, res) => {
    try {
        const userId = req.user;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({
                code: "USER_NOT_AUTHENTICATED",
                message: "User not authenticated"
            });
        }
        const interviews = await Interview.find({ user: userId })
            .populate("company", "name logo")
            .populate("role", "title slug")
            .populate("source", "name")
            .sort({ createdAt: -1 });
        return res.status(200).json({
            code: "INTERVIEWS_FETCHED",
            message: "Interviews fetched successfully",
            data: interviews
        });
    } catch (error) {
        console.error("Get Interviews Error:", error);
        return res.status(500).json({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch interviews"
        });
    }
};

export const getInterviewById = async (req, res) => {
    try {
        const userId = req.user;
        const interviewId = req.params.id;

        const interview = await Interview.findOne({ _id: interviewId, user: userId })
            .populate("company", "name logo")
            .populate("role", "title slug")
            .populate("source", "name")
            .lean();
        if (!interview) {
            return res.status(404).json({
                code: "INTERVIEW_NOT_FOUND",
                message: "Interview not found"
            });
        }
        const interviewRounds = await InterviewRound.find({ interview: interview._id }).sort({ roundNumber: 1 }).lean();

        const roundIds = interviewRounds.map(round => round._id);

        const [statsResult] = await Question.aggregate([
            {
                $match: {
                    interviewRound: { $in: roundIds }
                }
            },
            {
                $group: {
                    _id: null,
                    totalQuestions: { $sum: 1 },
                    rootQuestions: {
                        $sum: {
                            $cond: [
                                { 
                                    $eq: ["$parentQuestion", null] 
                                },
                                1, 
                                0
                            ]
                        }
                    },
                    solvedQuestions: {
                        $sum: {
                            $cond: [
                                {
                                    $eq: ["$solved", true]
                                },
                                1,
                                0
                            ]
                        }
                    }
                }
            }
        ]);

        const difficultyPriority = { "easy": 1, "medium": 2, "hard": 3 };

        let difficulty = "easy";
        interviewRounds.forEach(round => {
            if(difficultyPriority[round.difficulty] > difficultyPriority[difficulty]) {
                difficulty = round.difficulty;
            }
        });

        return res.status(200).json({
            code: "INTERVIEW_FETCHED",
            message: "Interview fetched successfully",
            data: {
                interview,
                interviewRounds,
                questionStats: {
                    totalRounds: interviewRounds.length,
                    totalQuestions: statsResult ? statsResult.totalQuestions : 0,
                    rootQuestions: statsResult ? statsResult.rootQuestions : 0,
                    solvedQuestions: statsResult ? statsResult.solvedQuestions : 0,
                    difficulty
                },
                
            }
        });
    } catch (error) {
        console.error("Get Interview By ID Error:", error);
        return res.status(500).json({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch interview"
        });
    }
};