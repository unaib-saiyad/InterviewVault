import mongoose from "mongoose";
const interviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true
        },

        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
            required: true
        },

        experienceLevel: {
            type: String,
            enum: ["internship", "fresher", "junior", "mid", "senior"]
        },

        status: {
            type: String,
            enum: [
                "applied",
                "shortlisted",
                "interview_scheduled",
                "rejected",
                "selected",
                "offer_received"
            ],
            default: "applied"
        },

        overallFeedback: String,

        overallRating: {
            type: Number,
            min: 0,
            max: 10
        },

        source: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Source"
        }
    },
    { timestamps: true }
);

interviewSchema.index({  user: 1, company: 1, source: 1 });

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;