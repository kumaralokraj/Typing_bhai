import { wordBanks } from "../data/wordBanks.js";

const randomItem = (items) =>
  items[Math.floor(Math.random() * items.length)];

const punctuationMarks = [".", ",", "!", "?", ";"];

export function generateText({
  difficulty = "easy",
  mode = "normal",
  wordCount = 300,
} = {}) {
  const bank = wordBanks[difficulty] || wordBanks.easy;

  const count = Math.min(
    300,
    Math.max(10, Number(wordCount) || 100)
  );

  const words = [];

  for (let i = 0; i < count; i++) {
    let word = randomItem(bank);

    if (mode === "capital") {
      word =
        Math.random() < 0.5
          ? word.toUpperCase()
          : word.charAt(0).toUpperCase() + word.slice(1);
    }

    if (mode === "numbers") {
      word = String(Math.floor(Math.random() * 900) + 100);
    }

    if (mode === "punctuation") {
      if (Math.random() < 0.35) {
        word += randomItem(punctuationMarks);
      }
    }

    if (mode === "symbols") {
      word = randomItem([
        "@", "#", "$", "%", "&", "*", "+", "=",
        "()", "[]", "{}", "<>", "&&", "=>",
      ]);
    }

    if (mode === "mixed") {
      const type = Math.floor(Math.random() * 4);

      if (type === 1) {
        word = String(Math.floor(Math.random() * 1000));
      } else if (type === 2) {
        word = word.toUpperCase();
      } else if (type === 3) {
        word += randomItem(punctuationMarks);
      }
    }

    words.push(word);
  }

  // Critical: words MUST be separated by spaces.
  return words.join(" ");
}