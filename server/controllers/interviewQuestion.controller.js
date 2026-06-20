import QuestionType from '../models/QuestionType.js';
import Question from '../models/Question.js';
import QuestionTypeHelper from '../helpers/questionType.helper.js';
import mongoose from 'mongoose';

export const createQuestionType = async (req, res) => {
    try {
        const { name, description } = req.body;
        const questionType = new QuestionType({ name, description });
        await questionType.save();
        res.status(201).json({
            code: 'SUCCESS',
            message: 'Question type created successfully',
            data: questionType
        });
    } catch (error) {
        res.status(400).json({
            code: 'ERROR',
            message: error.message
        });
    }
};

export const searchQuestionType = async (req, res) => {
    const { query } = req.query;
    if (!query || query.trim().length < 2) {
        return res.status(200).json({
            code: 'SUCCESS',
            message: 'Query too short, returning empty results',
            data: []
        });
    }
    try {
        const regex = new RegExp(query.toLowerCase().trim().replace(/\s+/g, " "), "i");
        const questionTypes = await QuestionType.find({ normalizedName: regex }).select("_id name description").limit(10);
        res.status(200).json({
            code: 'SUCCESS',
            message: 'Question types found',
            data: questionTypes
        });
    } catch (error) {
        res.status(500).json({
            code: 'ERROR',
            message: error.message
        });
    }
}


export const createQuestion = async (req, res) => {
    try {
        const { round, parentQuestion, question, type, difficulty, answer, notes, solved, confidenceScore } = req.body;
        const questionType = await QuestionTypeHelper(type);

        const depth = parentQuestion ? (await Question.findById(parentQuestion)).depth + 1 : 1;
        let sequence = "1";
        if (parentQuestion) {
            const parent = await Question.findById(parentQuestion);
            if (!parent) {
                return res.status(404).json({
                    code: 'ERROR',
                    message: 'Parent question not found'
                });
            }
            const siblingCount = await Question.countDocuments({ round, parentQuestion });
            sequence = `${parent.sequence.split('.')[0]}.${siblingCount + 1}`;
        }
        else {
            sequence = (await Question.countDocuments({ round })) + 1;
        }

        const newQuestion = new Question({
            round,
            parentQuestion: parentQuestion || null,
            question,
            questionType: questionType._id,
            difficulty,
            answer,
            notes,
            solved,
            confidenceScore,
            depth,
            sequence: `${sequence}`
        });

        await newQuestion.save();

        res.status(201).json({
            code: 'SUCCESS',
            message: 'Question created successfully',
            data: { ...newQuestion._doc, questionType, followUps: [] }
        });

    } catch (error) {
        res.status(400).json({
            code: 'ERROR',
            message: error.message
        });
    }
}

export const getQuestionsByRound = async (req, res) => {
    const { round } = req.params;
    try {
        const questions = await Question.find({ round }).populate('questionType', 'name description').sort({ sequence: 1 });
        const questionMap = {};

        questions.forEach(q => {
            questionMap[q._id] = { ...q._doc, followUps: [] };
        });
        const rootQuestions = [];

        questions.forEach(q => {
            if (q.parentQuestion) {
                questionMap[q.parentQuestion]?.followUps.push(questionMap[q._id]);
            } else {
                rootQuestions.push(questionMap[q._id]);
            }
        });

        res.status(200).json({
            code: 'SUCCESS',
            message: 'Questions retrieved successfully',
            data: rootQuestions
        });
    } catch (error) {
        res.status(500).json({
            code: 'ERROR',
            message: error.message
        });
    }
}

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

    await Question.findByIdAndDelete(questionId)
      .session(session);
};

export const deleteQuestion = async (req, res) => {
    const session = await mongoose.startSession()
    try {
        session.startTransaction();
        const questionId = req.params.id;
        await deleteQuestionTree(questionId, session);

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            code: "QUESTION_DELETED",
            message: "Question deleted successfully",
        });
    }

    catch (err) {
        await session.abortTransaction();
        session.endSession();

        return res.status(500).json({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to delete question",
        });
    }


}