import { getClient, extractText } from '../gemini';
import { Type } from "@google/genai";

export interface ReferralData {
  patientName: string;
  referringDoctor: string;
  diagnosis: string;
  urgency: 'High' | 'Medium' | 'Low';
  summary: string;
  nextSteps: string[];
}

export async function analyzeReferral(text: string): Promise<ReferralData> {
  const client = getClient();
  const model = "gemini-2.0-flash";

  const prompt = `Analyze this medical referral text and extract structured information.
Text: "${text}"

Return a JSON object with the following schema:
- patientName: string (or "Unknown")
- referringDoctor: string (or "Unknown")
- diagnosis: string (suspected or confirmed)
- urgency: "High", "Medium", or "Low" based on clinical indicators
- summary: A brief summary of the referral
- nextSteps: An array of recommended next steps (e.g. "Schedule MRI", "Consultation")
`;

  try {
    const result = await client.models.generateContent({
      model: model,
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            patientName: { type: Type.STRING },
            referringDoctor: { type: Type.STRING },
            diagnosis: { type: Type.STRING },
            urgency: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
            summary: { type: Type.STRING },
            nextSteps: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["patientName", "referringDoctor", "diagnosis", "urgency", "summary", "nextSteps"]
        }
      }
    });

    const jsonText = extractText(result.response);
    const data = JSON.parse(jsonText);
    return data as ReferralData;

  } catch (error) {
    console.error("Referral analysis failed:", error);
    // Fallback or rethrow
    throw new Error("Failed to analyze referral text. Please try again.");
  }
}
