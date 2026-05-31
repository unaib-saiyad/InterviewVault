import InterviewRound from "../models/InterviewRound.js";

export const createInterviewRound = async (req, res) => {
    try {
        const { interviewId } = req.params;
        const { roundNumber, roundType, interviewerName, durationInMinutes, interviewDate, result, feedback, difficulty } = req.body;

        const newRound = new InterviewRound({
            interview: interviewId,
            roundNumber,
            roundType,
            interviewerName,
            durationInMinutes,
            interviewDate,
            result,
            feedback,
            difficulty
        });
        await newRound.save();
        res.status(201).json({
            code: "ROUND_CREATED",
            message: "Interview round created successfully",
            data: newRound
        });
    } catch (error) {
        res.status(400).json({
            code: "ROUND_CREATION_FAILED",
            message: "Failed to create interview round",
            error: error.message
        });
    }
};