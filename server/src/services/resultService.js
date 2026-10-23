import TypingResult from "../models/TypingResult.js";

export const calculateTypingResult = ({
  typedText,
  originalText,
  duration,
}) => {
  if (
    typeof typedText !== "string" ||
    typeof originalText !== "string" ||
    !Number.isFinite(duration) ||
    duration <= 0
  ) {
    throw new Error("Invalid typing test data");
  }

  let correctCharacters = 0;
  let incorrectCharacters = 0;

  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === originalText[i]) {
      correctCharacters++;
    } else {
      incorrectCharacters++;
    }
  }

  const totalCharacters = typedText.length;
  const minutes = duration / 60;

  const wpm = Math.round(
    correctCharacters / 5 / minutes
  );

  const rawWpm = Math.round(
    totalCharacters / 5 / minutes
  );

  const cpm = Math.round(
    correctCharacters / minutes
  );

  const accuracy = totalCharacters
    ? Number(
        (
          (correctCharacters / totalCharacters) *
          100
        ).toFixed(2)
      )
    : 0;

  return {
    wpm,
    rawWpm,
    cpm,
    accuracy,
    correctCharacters,
    incorrectCharacters,
    totalCharacters,
    duration,
  };
};

export const saveTypingResult = async (data) => {
  const result = await TypingResult.create(data);
  return result;
};