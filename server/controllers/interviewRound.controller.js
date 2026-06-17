import mongoose from "mongoose";
import InterviewRound from "../models/InterviewRound.js";
import Question from "../models/Question.js";

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

export const deleteInterviewRound = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        const { roundId } = req.params;
        session.startTransaction();
        const round = await InterviewRound.findById(roundId).session(session);
        if (!round) {
            await session.abortTransaction();
            return res.status(404).json({
                code: "ROUND_NOT_FOUND",
                message: "Interview round not found"
            });
        }

        await InterviewRound.updateMany({
            interview: round.interview,
            roundNumber: { $gt: round.roundNumber }
        }, {
            $inc: { roundNumber: -1 }
        }, { session });

        const rootQuestions = await Question.find({ round: roundId, parentQuestion: null }).session(session);
        for (const question of rootQuestions) {
            await deleteQuestionTree(question._id, session);
        }
        await InterviewRound.findByIdAndDelete(roundId).session(session);
        await session.commitTransaction();
        res.status(200).json({
            code: "ROUND_DELETED",
            message: "Interview round and associated questions deleted successfully"
        });
    } catch (error) {
        await session.abortTransaction();
        res.status(400).json({
            code: "ROUND_DELETION_FAILED",
            message: "Failed to delete interview round",
            error: error.message
        });
    } finally {
        session.endSession();
    }
};

export const updateInterviewRound = async (req, res) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const { roundId } = req.params;

        const {
            roundNumber,
            roundType,
            interviewerName,
            durationInMinutes,
            interviewDate,
            result,
            feedback,
            difficulty
        } = req.body;

        const round = await InterviewRound.findById(roundId).session(session);

        if (!round) {
            await session.abortTransaction();

            return res.status(404).json({
                code: "ROUND_NOT_FOUND",
                message: "Interview round not found"
            });
        }

        const newRoundNumber = Number(roundNumber);

        // Validate round number
        if (!Number.isInteger(newRoundNumber) || newRoundNumber < 1) {
            await session.abortTransaction();

            return res.status(400).json({
                code: "INVALID_ROUND_NUMBER",
                message: "Round number must be a positive integer"
            });
        }

        const totalRounds = await InterviewRound.countDocuments({
            interview: round.interview
        }).session(session);

        if (newRoundNumber > totalRounds) {
            await session.abortTransaction();

            return res.status(400).json({
                code: "INVALID_ROUND_NUMBER",
                message: `Round number cannot exceed ${totalRounds}`
            });
        }

        const oldRoundNumber = round.roundNumber;

        // Adjust sequence only if round number changed
        if (newRoundNumber !== oldRoundNumber) {

            // Example: 4 -> 2
            if (newRoundNumber < oldRoundNumber) {
                await InterviewRound.updateMany(
                    {
                        interview: round.interview,
                        roundNumber: {
                            $gte: newRoundNumber,
                            $lt: oldRoundNumber
                        }
                    },
                    {
                        $inc: { roundNumber: 1 }
                    },
                    { session }
                );
            }

            // Example: 2 -> 4
            if (newRoundNumber > oldRoundNumber) {
                await InterviewRound.updateMany(
                    {
                        interview: round.interview,
                        roundNumber: {
                            $gt: oldRoundNumber,
                            $lte: newRoundNumber
                        }
                    },
                    {
                        $inc: { roundNumber: -1 }
                    },
                    { session }
                );
            }

            round.roundNumber = newRoundNumber;
        }

        // Update remaining fields
        round.roundType = roundType;
        round.interviewerName = interviewerName;
        round.durationInMinutes = durationInMinutes;
        round.interviewDate = interviewDate;
        round.result = result;
        round.feedback = feedback;
        round.difficulty = difficulty;

        await round.save({ session });

        await session.commitTransaction();

        res.status(200).json({
            code: "ROUND_UPDATED",
            message: "Interview round updated successfully",
            data: round
        });

    } catch (error) {
        await session.abortTransaction();

        res.status(400).json({
            code: "ROUND_UPDATE_FAILED",
            message: "Failed to update interview round",
            error: error.message
        });
    } finally {
        session.endSession();
    }
};