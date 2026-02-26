import { extractReferralTextInSandbox } from './extract-sandbox';
import { getClient, extractText } from '../gemini';

export interface ReferralAnalysis {
  patientName: string | null;
  referringDoctor: string | null;
  diagnosis: string | null;
  urgency: 'Low' | 'Medium' | 'High' | 'Unknown';
  summary: string;
  recommendedAction: string;
}

export async function analyzeReferral(buffer: Buffer): Promise<ReferralAnalysis> {
  // 1. Extract text in Sandbox
  const { text } = await extractReferralTextInSandbox(buffer);

  if (!text || text.trim().length === 0) {
    throw new Error("No text extracted from PDF");
  }

  // 2. Analyze with Gemini
  const client = getClient();

  const prompt = `
    You are a medical assistant analyzing a referral letter.
    Extract the following information from the text below and return ONLY valid JSON.

    Fields required:
    - patientName (string or null)
    - referringDoctor (string or null)
    - diagnosis (string or null)
    - urgency (one of: "Low", "Medium", "High", "Unknown")
    - summary (string, brief summary of the condition)
    - recommendedAction (string, what should be done next?)

    Text:
    "${text.slice(0, 100000)}"
  `;

  try {
    const result = await client.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{
        role: "user",
        parts: [{ text: prompt }]
      }],
      config: {
        responseMimeType: "application/json"
      }
    });

    const responseText = extractText(result);

    // Attempt to parse JSON from the text, handling potential markdown code blocks
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    const jsonString = jsonMatch ? jsonMatch[0] : responseText;
    const json = JSON.parse(jsonString);
    return {
        patientName: json.patientName || null,
        referringDoctor: json.referringDoctor || null,
        diagnosis: json.diagnosis || null,
        urgency: ['Low', 'Medium', 'High'].includes(json.urgency) ? json.urgency : 'Unknown',
        summary: json.summary || "No summary available",
        recommendedAction: json.recommendedAction || "Review manually"
    };
  } catch (error: any) {
      console.error("Analysis failed:", error);
      throw new Error(`AI analysis failed: ${error.message}`);
  }
}
