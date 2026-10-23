import express from "express";

import {
  randomTypingText,
  allTypingTexts
} from "../controllers/typingController.js";

const router = express.Router();

router.get("/random", randomTypingText);
router.get("/texts", allTypingTexts);

export default router;