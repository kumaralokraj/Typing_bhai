import TypingText from "../models/TypingText.js";
import { generateText } from "../utils/generateText.js";

export const getRandomTypingText = async ({
  difficulty = "easy",
  mode = "normal",
  wordCount = 300,
}) => {
  const content = generateText({
    difficulty,
    mode,
    wordCount,
  });

  return {
    content,
    difficulty,
    mode,
    wordCount: content.split(/\s+/).length,
  };
};

export const getAllTypingTexts = async () => {
  return TypingText.find().sort({ createdAt: -1 });
};