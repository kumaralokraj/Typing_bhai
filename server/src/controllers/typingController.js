import {
  getRandomTypingText,
  getAllTypingTexts,
} from "../services/typingService.js";

export const randomTypingText = async (req, res) => {
  try {
    const {
      difficulty = "easy",
      mode = "normal",
      wordCount = "50",
    } = req.query;

    const validDifficulties = ["easy", "medium", "hard"];

    const validModes = [
      "normal",
      "capital",
      "numbers",
      "punctuation",
      "symbols",
      "mixed",
    ];

    if (!validDifficulties.includes(difficulty)) {
      return res.status(400).json({
        success: false,
        message: "Invalid difficulty",
      });
    }

    if (!validModes.includes(mode)) {
      return res.status(400).json({
        success: false,
        message: "Invalid typing mode",
      });
    }

    const count = Number(wordCount);

    if (!Number.isInteger(count) ||
        count < 10 ||
        count > 300) {
      return res.status(400).json({
        success: false,
        message: "wordCount must be between 10 and 300",
      });
    }

    const data = await getRandomTypingText({
      difficulty,
      mode,
      wordCount: count,
    });

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to generate typing text",
    });
  }
};

export const allTypingTexts = async (req, res) => {
  try {
    const texts = await getAllTypingTexts();

    return res.status(200).json({
      success: true,
      data: texts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch typing texts",
    });
  }
};