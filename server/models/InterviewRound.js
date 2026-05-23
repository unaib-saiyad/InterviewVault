import mongoose from "mongoose";

const interviewRoundSchema = new mongoose.Schema(
    {
        interview: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Interview",
            required: true
        },

        roundNumber: Number,

        roundType: {
            type: String,
            enum: [
                "online_assessment",
                "technical",
                "machine_coding",
                "system_design",
                "hr",
                "managerial",
                "ceo"
            ]
        },

        interviewerName: String,

        durationInMinutes: Number,

        interviewDate: Date,

        result: {
            type: String,
            enum: ["pending", "cleared", "rejected"]
        },

        feedback: String,

        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"]
        }
    },
    { timestamps: true }
);

const InterviewRound = mongoose.model("InterviewRound", interviewRoundSchema);

InterviewRound.index({ interview: 1, roundNumber: 1 });

export default InterviewRound;