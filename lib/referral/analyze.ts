import { generateObject } from "ai";
import { getTextModel } from "@/src/lib/ai/gateway";
import { ReferralDataSchema, ReferralData } from "./types";

export async function analyzeReferralText(text: string): Promise<ReferralData> {
  // Truncate text to avoid token limits (though Gemini has large context)
  const truncatedText = text.slice(0, 100000);

  const prompt = `Analyze this medical referral letter and extract the structured data.
If a field is missing, try to infer it or leave it as null/undefined (for optional fields) or "Unknown" (for required string fields).
Text: "${truncatedText}"`;

  try {
    const { object } = await generateObject({
      model: getTextModel('google/gemini-2.0-flash'),
      schema: ReferralDataSchema,
      prompt: prompt,
      temperature: 0.1, // Low temperature for extraction accuracy
    });

    return object;
  } catch (e) {
    console.error("Referral analysis failed:", e);
    throw new Error("Failed to analyze referral text");
  }
}
