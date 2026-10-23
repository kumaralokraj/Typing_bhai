import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import TypingText from "./models/TypingText.js";

dotenv.config();

const typingTexts = [
  {
    content: "The sun rises in the east and sets in the west. Practice typing every day to improve your speed and accuracy.",
    language: "english",
    difficulty: "easy",
    category: "paragraph"
  },
  {
    content: "Learning to type quickly requires patience and regular practice. Focus on accuracy first, and your typing speed will gradually improve.",
    language: "english",
    difficulty: "easy",
    category: "paragraph"
  },
  {
    content: "Modern software development requires strong problem solving abilities, consistent practice, and an understanding of algorithms and data structures.",
    language: "english",
    difficulty: "medium",
    category: "paragraph"
  },
  {
    content: "Efficient communication through digital interfaces requires precision, adaptability, and exceptional keyboard proficiency across increasingly complex technological environments.",
    language: "english",
    difficulty: "hard",
    category: "paragraph"
  }
];

const seedData = async () => {
  try {
    await connectDB();

    await TypingText.insertMany(typingTexts);

    console.log("Typing paragraphs added successfully!");
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedData();