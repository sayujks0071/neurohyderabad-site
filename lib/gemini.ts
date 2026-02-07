import { GoogleGenAI } from "@google/genai";

export function getApiKey() {
  return (
    process.env.GOOGLE_GENAI_API_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.GENAI_API_KEY ||
    process.env.API_KEY ||
    ""
  );
}

export function getClient() {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("Missing Gemini API key");
  }
  return new GoogleGenAI({ apiKey });
}

export function extractText(response: any): string {
  if (!response) return "";

  if (typeof response.text === "function") {
    return response.text();
  }
  if (typeof response.text === "string") {
    return response.text;
  }

  if (Array.isArray(response.output)) {
    const text = response.output
      .flatMap((item: any) => item?.content ?? [])
      .map((item: any) => item?.text)
      .find((segment: unknown): segment is string => typeof segment === "string");
    return text || "";
  }

  return "";
}
