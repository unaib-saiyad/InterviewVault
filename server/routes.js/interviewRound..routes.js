import express from 'express';
import { protect } from '../middleware/protect.js';
import { createInterviewRound } from '../controllers/interviewRound.controller.js';

const router = express.Router();

router.post('/:interviewId', protect, createInterviewRound);

export default router;