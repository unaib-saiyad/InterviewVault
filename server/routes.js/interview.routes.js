import express from "express";
import { createInterview } from "../controllers/interview.controller.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

router.post("/", protect, createInterview);

export default router;