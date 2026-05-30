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
                "telephonic",
                "online_assessment",
                "technical",
                "machine_coding",
                "system_design",
                "hr",
                "managerial",
                "ceo",
                "other"
            ]
        },

        interviewerName: String,

        durationInMinutes: Number,

        interviewDate: Date,

        result: {
            type: String,
            enum: ["pending", "cleared", "rejected", "on_hold"],
            default: "pending"
        },

        feedback: String,

        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"]
        }
    },
    { timestamps: true }
);

interviewRoundSchema.index({ interview: 1, roundNumber: 1 });

const InterviewRound = mongoose.model("InterviewRound", interviewRoundSchema);

export default InterviewRound;