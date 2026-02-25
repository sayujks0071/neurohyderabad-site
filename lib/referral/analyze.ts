import { getClient, extractText } from '../gemini';

export interface ReferralAnalysis {
  patientName: string;
  referringDoctor: string;
  diagnosis: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Unknown';
  summary: string;
  recommendedAction: string;
}

const REFERRAL_SCHEMA = {
  type: "OBJECT",
  properties: {
    patientName: { type: "STRING" },
    referringDoctor: { type: "STRING" },
    diagnosis: { type: "STRING" },
    urgency: { type: "STRING", enum: ["Low", "Medium", "High", "Unknown"] },
    summary: { type: "STRING" },
    recommendedAction: { type: "STRING" }
  },
  required: ["patientName", "referringDoctor", "diagnosis", "urgency", "summary", "recommendedAction"]
};

export async function analyzeReferralText(text: string): Promise<ReferralAnalysis> {
  const client = getClient();

  const prompt = `
  Analyze the following medical referral letter text and extract the key information.
  Ensure the urgency is classified as Low, Medium, or High based on the medical condition described.
  If the text is not a referral letter, return 'Unknown' for fields.

  Referral Text:
  ${text}
  `;

  try {
    let response;

    // Check for @google/genai v0.6.0+ syntax (client.models)
    if ('models' in client) {
      response = await (client as any).models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: REFERRAL_SCHEMA,
        }
      });
    }
    // Fallback for @google/generative-ai syntax (client.getGenerativeModel)
    else if (typeof (client as any).getGenerativeModel === 'function') {
      const model = (client as any).getGenerativeModel({
        model: "gemini-2.0-flash",
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: REFERRAL_SCHEMA,
        }
      });
      const result = await model.generateContent(prompt);
      response = result.response;
    } else {
      throw new Error("Unknown Gemini client structure");
    }

    const jsonText = extractText(response);

    if (!jsonText) {
      throw new Error("Empty response from Gemini");
    }

    return JSON.parse(jsonText) as ReferralAnalysis;

  } catch (error) {
    console.error("Gemini analysis failed:", error);
    throw new Error(`Failed to analyze referral: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
