import express from 'express';
import { protect } from '../middleware/protect.js';
import { createInterviewRound, updateInterviewRound, deleteInterviewRound } from '../controllers/interviewRound.controller.js';

const router = express.Router();

router.post('/:interviewId', protect, createInterviewRound);
router.put('/:roundId', protect, updateInterviewRound);
router.delete('/:roundId', protect, deleteInterviewRound);

export default router;