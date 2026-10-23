import express from "express";
import rateLimit from "express-rate-limit";

import {
  createTypingResult,
} from "../controllers/resultController.js";

const router = express.Router();

const resultLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

router.post("/", resultLimiter, createTypingResult);

export default router;