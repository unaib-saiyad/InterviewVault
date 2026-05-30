import QuestionType from '../models/QuestionType.js';
import Question from '../models/Question.js';
import QuestionTypeHelper from '../helpers/questionType.helper.js';

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
        res.json({
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
        const questionTypeId = await QuestionTypeHelper(type);

        const depth = parentQuestion ? (await Question.findById(parentQuestion)).depth + 1 : 1;
        let sequence = "1";
        if(parentQuestion){
            const parent = await Question.findById(parentQuestion);
            if(!parent) {
                return res.status(404).json({
                    code: 'ERROR',
                    message: 'Parent question not found'
                });
            }
            const siblingCount = await Question.countDocuments({ round, parentQuestion });
            sequence = `${parent.sequence.split('.')[0]}.${siblingCount + 1}`;
        }
        else{
            sequence = (await Question.countDocuments({ round })) + 1;
        }

        const newQuestion = new Question({
            round,
            parentQuestion: parentQuestion || null,
            question,
            questionType: questionTypeId,
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
            data: newQuestion
        });

    } catch (error) {
        res.status(400).json({
            code: 'ERROR',
            message: error.message
        });
    }
}