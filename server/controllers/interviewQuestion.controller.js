import Question from '../models/Question.js';
import QuestionTopicHelper from '../helpers/questionTopic.helper.js';
import QuestionSubTopicHelper from '../helpers/questionSubTopic.helper.js';
import mongoose from 'mongoose';
import QuestionTopic from '../models/QuestionTopic.js';
import QuestionSubTopic from '../models/QuestionSubTopic.js';

export const createTopic = async (req, res) => {
    try {
        const { name, description } = req.body;
        const questionTopic = new QuestionTopic({ name, description });
        await questionTopic.save();
        res.status(201).json({
            code: 'SUCCESS',
            message: 'Topic created successfully',
            data: questionTopic
        });
    } catch (error) {
        res.status(400).json({
            code: 'ERROR',
            message: error.message
        });
    }
};

export const searchTopic = async (req, res) => {
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
        const questionTopics = await QuestionTopic.find({ normalizedName: regex }).select("_id name description").limit(10);
        res.status(200).json({
            code: 'SUCCESS',
            message: 'Topics found',
            data: questionTopics
        });
    } catch (error) {
        res.status(500).json({
            code: 'ERROR',
            message: error.message
        });
    }
}

export const createSubTopic = async (req, res) => {
    try {
        const { name, description } = req.body;
        const questionSubTopic = new QuestionSubTopic({ name, description });
        await questionSubTopic.save();
        res.status(201).json({
            code: 'SUCCESS',
            message: 'Subtopic created successfully',
            data: questionSubTopic
        });
    } catch (error) {
        res.status(400).json({
            code: 'ERROR',
            message: error.message
        });
    }
};

export const searchSubTopic = async (req, res) => {
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
        const questionSubTopics = await QuestionSubTopic.find({ normalizedName: regex }).select("_id name description").limit(10);
        res.status(200).json({
            code: 'SUCCESS',
            message: 'SubTopics found',
            data: questionSubTopics
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
        const { round, parentQuestion, question, type, difficulty, answer, notes, solved, confidenceScore, topic, subTopic } = req.body;
        const topicObj = await QuestionTopicHelper(topic);
        const subTopicObj = await QuestionSubTopicHelper(subTopic);

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
            questionType: type,
            difficulty,
            answer,
            notes,
            solved,
            confidenceScore,
            depth,
            sequence: `${sequence}`,
            topic: topicObj._id,
            subTopic: subTopicObj._id
        });

        await newQuestion.save();

        res.status(201).json({
            code: 'SUCCESS',
            message: 'Question created successfully',
            data: { ...newQuestion._doc, followUps: [] }
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
        const questions = await Question.find({ round }).populate([
            { path: 'topic', select: 'name description' },
            { path: 'subTopic', select: 'name description' }
        ]).sort({ sequence: 1 });
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

export const updateQuestion = async (req, res)=>{
    const questionId = req.params.id;
    const { question, type, difficulty, answer, notes, solved, confidenceScore } = req.body;
    try{
        const questionObj = await Question.findById(questionId);
        if(!questionObj){
            return res.status(404).json({
                code: "INVALID_QUESTION",
                message: "Invalid Question, please try again"
            });
        }
        const questionType = await QuestionTypeHelper(type);
        if(question){
            questionObj.question = question;
        }
        if(questionType){
            questionObj.questionType = questionType._id;
        }
        if(difficulty){
            questionObj.difficulty = difficulty;
        }
        if(answer){
            questionObj.answer = answer;
        }
        if(notes){
            questionObj.notes = notes;
        }
        questionObj.solved = solved;
        if(confidenceScore){
            questionObj.confidenceScore = confidenceScore;
        }
        await questionObj.save();
        return res.status(200).json({
            code: "QUESTION_UPDATED",
            message: "Question updated successfully...",
            data: questionObj
        })
    }
    catch(err){
        return res.status(500).json({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to update question",
        });
    }
}