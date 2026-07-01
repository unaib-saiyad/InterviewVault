import express from 'express';
import { createTopic, searchTopic, createSubTopic, searchSubTopic, createQuestion, getQuestionsByRound, deleteQuestion, updateQuestion } from '../controllers/interviewQuestion.controller.js';
import { protect } from '../middleware/protect.js';
const router = express.Router();

router.post('/topic', protect, createTopic);
router.get('/topic/search', protect, searchTopic);
router.post('/subtopic', protect, createSubTopic);
router.get('/subtopic/search', protect, searchSubTopic);
router.get('/round/:round', protect, getQuestionsByRound);
router.post('/', protect, createQuestion);
router.delete('/:id', deleteQuestion);
router.put('/:id', updateQuestion);

export default router;