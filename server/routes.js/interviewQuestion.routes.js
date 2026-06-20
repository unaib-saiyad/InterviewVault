import express from 'express';
import { createQuestionType, searchQuestionType, createQuestion, getQuestionsByRound, deleteQuestion, updateQuestion } from '../controllers/interviewQuestion.controller.js';
import { protect } from '../middleware/protect.js';
const router = express.Router();

router.post('/question-type', protect, createQuestionType);
router.get('/question-type/search', protect, searchQuestionType);
router.get('/round/:round', protect, getQuestionsByRound);
router.post('/', protect, createQuestion);
router.delete('/:id', deleteQuestion);
router.put('/:id', updateQuestion);

export default router;