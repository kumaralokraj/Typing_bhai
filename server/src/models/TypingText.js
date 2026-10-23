import mongoose from "mongoose";

const typingTextSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    language: {
      type: String,
      default: "english",
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },
    mode: {
      type: String,
      enum: [
        "normal",
        "capital",
        "numbers",
        "punctuation",
        "symbols",
        "mixed",
      ],
      default: "normal",
    },
    category: {
      type: String,
      enum: ["words", "sentence", "paragraph"],
      default: "paragraph",
    },
  },
  { timestamps: true }
);

typingTextSchema.index({ difficulty: 1, mode: 1 });

export default mongoose.model("TypingText", typingTextSchema);