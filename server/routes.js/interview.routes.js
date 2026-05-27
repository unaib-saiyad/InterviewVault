import express from "express";
import { createInterview, getInterviews, getInterviewById } from "../controllers/interview.controller.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

router.post("/", protect, createInterview);
router.get("/", protect, getInterviews);
router.get("/:id", protect, getInterviewById);

export default router;