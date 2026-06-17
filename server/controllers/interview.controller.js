import mongoose from "mongoose";
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

        const companyObj = await findOrCreateCompany(company);

        const roleObj = await findOrCreateRole(role);

        const sourceObj = await findOrCreateSource(source);

        const interview = await Interview.create({
            user: user._id,
            company: companyObj._id,

            role: roleObj._id,

            experienceLevel,

            status,

            overallFeedback,

            overallRating,

            source: sourceObj._id,
            dateOfApplication

        });

        return res.status(201).json({
            code: "INTERVIEW_CREATED",
            message: "Interview created successfully",
            data: {...interview.toObject(), company: companyObj, role: roleObj, source: sourceObj} 
        });

    } catch (error) {
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
            .sort({ dateOfApplication: -1 });
        return res.status(200).json({
            code: "INTERVIEWS_FETCHED",
            message: "Interviews fetched successfully",
            data: interviews
        });
    } catch (error) {
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
                    round: { $in: roundIds }
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
        return res.status(500).json({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch interview"
        });
    }
};

const deleteQuestionTree = async (questionId, session) => {
  const children = await Question.find({
    parentQuestion: questionId,
  })
    .select("_id")
    .session(session)
    .lean();
  for (const child of children) {
    await deleteQuestionTree(child._id, session);
  }

  await Question.findByIdAndDelete(questionId).session(session);
};

export const deleteInterview = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const userId = req.user;
    const interviewId = req.params.id;
    // Verify interview ownership
    const interview = await Interview.findOne({
      _id: interviewId,
      user: userId,
    }).session(session);

    if (!interview) {
      await session.abortTransaction();
      session.endSession();

      return res.status(404).json({
        code: "INTERVIEW_NOT_FOUND",
        message: "Interview not found",
      });
    }

    // Get all rounds
    const rounds = await InterviewRound.find({
      interview: interviewId,
    })
      .select("_id")
      .session(session)
      .lean();
    // Delete all question trees
    for (const round of rounds) {
      const rootQuestions = await Question.find({
        round: round._id,
        parentQuestion: null,
      })
        .select("_id")
        .session(session)
        .lean();
      for (const question of rootQuestions) {
        await deleteQuestionTree(question._id, session);
      }
    }

    // Delete interview rounds
    await InterviewRound.deleteMany({
      interview: interviewId,
    }).session(session);

    // Delete interview
    await Interview.findByIdAndDelete(interviewId).session(session);

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      code: "INTERVIEW_DELETED",
      message: "Interview deleted successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    return res.status(500).json({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to delete interview",
    });
  }
};

export const updateInterview = async (req, res) => {
    try {
        const userId = req.user;
        const interviewId = req.params.id;

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

        const interview = await Interview.findOne({ _id: interviewId, user: userId });
        if (!interview) {
            return res.status(404).json({
                code: "INTERVIEW_NOT_FOUND",
                message: "Interview not found"
            });
        }

        
        const companyObj = await findOrCreateCompany(company);
        interview.company = companyObj._id;
        
        const roleObj = await findOrCreateRole(role);
        interview.role = roleObj._id;

        const sourceObj = await findOrCreateSource(source);
        interview.source = sourceObj._id;

        if (experienceLevel) {
            interview.experienceLevel = experienceLevel;
        }
        if (status) {
            interview.status = status;
        }
        if (overallFeedback) {
            interview.overallFeedback = overallFeedback;
        }
        if (overallRating) {
            interview.overallRating = overallRating;
        }
            
        if (dateOfApplication) {
            interview.dateOfApplication = dateOfApplication;
        }
        await interview.save();

        return res.status(200).json({
            code: "INTERVIEW_UPDATED",
            message: "Interview updated successfully",
            data: {...interview.toObject(), company: companyObj, role: roleObj, source: sourceObj}
        });
    } catch (error) {
        return res.status(500).json({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to update interview"
        });
    }
};