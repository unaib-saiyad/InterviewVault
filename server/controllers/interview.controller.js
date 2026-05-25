import Interview from "../models/Interview.js";
import User from "../models/User.js";

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
            source
        } = req.body;
        const userId = req.user;
        const user = await User.findById(userId);
        if(!user){
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

            source: sourceId
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
        if(!user){
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