import mongoose from "mongoose";

const typingResultSchema = new mongoose.Schema(
  {
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
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
      required: true,
    },

    wpm: {
      type: Number,
      required: true,
      min: 0,
    },

    rawWpm: {
      type: Number,
      required: true,
      min: 0,
    },

    accuracy: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    cpm: {
      type: Number,
      required: true,
      min: 0,
    },

    correctCharacters: {
      type: Number,
      required: true,
      min: 0,
    },

    incorrectCharacters: {
      type: Number,
      required: true,
      min: 0,
    },

    totalCharacters: {
      type: Number,
      required: true,
      min: 0,
    },

    duration: {
      type: Number,
      required: true,
      min: 1,
    },

    performance: [
      {
        time: Number,
        wpm: Number,
        accuracy: Number,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model(
  "TypingResult",
  typingResultSchema
);