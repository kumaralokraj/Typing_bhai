import api from "./api";

export async function submitTypingResult(payload) {
  const response = await api.post("/results", payload);

  return response.data?.data ?? response.data?.result ?? response.data;
}