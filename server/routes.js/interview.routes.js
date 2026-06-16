import express from "express";
import { createInterview, getInterviews, getInterviewById, deleteInterview, updateInterview } from "../controllers/interview.controller.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

router.post("/", protect, createInterview);
router.put("/:id", protect, updateInterview);
router.get("/", protect, getInterviews);
router.get("/:id", protect, getInterviewById);
router.delete("/:id", protect, deleteInterview);

export default router;