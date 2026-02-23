import { getClient } from '../gemini';

export interface ReferralAnalysisResult {
  patientName: string;
  referringDoctor: string;
  diagnosis: string;
  urgency: 'Low' | 'Medium' | 'High';
  summary: string;
  recommendedAction: string;
}

export async function analyzeReferralText(text: string): Promise<ReferralAnalysisResult> {
  const client = getClient();

  const prompt = `
    Analyze the following referral letter text and extract the key information.
    Return the result strictly as a JSON object with the following fields:
    - patientName: string
    - referringDoctor: string
    - diagnosis: string (brief diagnosis or main complaint)
    - urgency: "Low" | "Medium" | "High" (infer based on the content)
    - summary: string (2-3 sentences summarizing the patient's condition and reason for referral)
    - recommendedAction: string (suggested next step, e.g., "Schedule MRI", "Urgent Consultation", "Routine Checkup")

    Text:
    "${text}"
  `;

  // Use Gemini 1.5 Flash for stability and JSON mode support
  // If 2.0 is required, replace with 'gemini-2.0-flash'
  const response = await client.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    config: {
      responseMimeType: 'application/json',
    },
  });

  const responseText = response.text();
  try {
    if (!responseText) throw new Error("Empty response");
    // Sanitize JSON markdown block if present
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson) as ReferralAnalysisResult;
  } catch (e) {
    console.error("Failed to parse Gemini response", responseText);
    throw new Error("Failed to parse AI response");
  }
}
