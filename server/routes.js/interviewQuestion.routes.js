import express from 'express';
import { createQuestionType, searchQuestionType, createQuestion } from '../controllers/interviewQuestion.controller.js';
import { protect } from '../middleware/protect.js';
const router = express.Router();

router.post('/question-type', protect, createQuestionType);
router.get('/question-type/search', protect, searchQuestionType);
router.post('/', protect, createQuestion);

export default router;