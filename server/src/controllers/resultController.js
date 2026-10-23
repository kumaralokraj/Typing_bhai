import {
  calculateTypingResult,
  saveTypingResult,
} from "../services/resultService.js";

export const createTypingResult = async (req, res) => {
  try {
    const {
      originalText,
      typedText,
      duration,
      difficulty,
      mode,
      performance = [],
    } = req.body;

    const validDifficulties = [
      "easy",
      "medium",
      "hard",
    ];

    const validModes = [
      "normal",
      "capital",
      "numbers",
      "punctuation",
      "symbols",
      "mixed",
    ];

    if (
      typeof originalText !== "string" ||
      !originalText.length ||
      originalText.length > 10000 ||
      typeof typedText !== "string" ||
      typedText.length > originalText.length ||
      !Number.isFinite(duration) ||
      duration < 1 ||
      duration > 3600 ||
      !validDifficulties.includes(difficulty) ||
      !validModes.includes(mode) ||
      !Array.isArray(performance) ||
      performance.length > 3600 ||
      !performance.every(
        (p) =>
          p &&
          Number.isFinite(p.time) &&
          p.time >= 0 &&
          p.time <= duration &&
          Number.isFinite(p.wpm) &&
          p.wpm >= 0 &&
          Number.isFinite(p.accuracy) &&
          p.accuracy >= 0 &&
          p.accuracy <= 100
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid typing test data",
      });
    }

    const stats = calculateTypingResult({
      originalText,
      typedText,
      duration,
    });

    const savedResult = await saveTypingResult({
      ...stats,
      difficulty,
      mode,
      performance,
    });

    return res.status(201).json({
      success: true,
      message: "Typing result saved successfully",
      data: savedResult,
    });
  } catch (error) {
    console.error("Result error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save typing result",
    });
  }
};