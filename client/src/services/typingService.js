import api from "./api";

export async function getRandomText({
  difficulty = "easy",
  mode = "normal",
  wordCount = 300,
}) {
  const response = await api.get("/typing/random", {
    params: { difficulty, mode, wordCount },
  });

  const payload = response.data;
  const content = payload?.data?.content ?? payload?.content;

  if (typeof content !== "string" || !content.trim()) {
    throw new Error("Backend returned an invalid typing text.");
  }

  return content.trim();
}