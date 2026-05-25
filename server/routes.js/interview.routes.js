import express from "express";
import { createInterview, getInterviews } from "../controllers/interview.controller.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

router.post("/", protect, createInterview);
router.get("/", protect, getInterviews);

export default router;