import { Type } from "@google/genai";
import { getClient, extractText } from "../gemini";

export interface InterpretReportResult {
  plainEnglishSummary: string;
  keyTakeaways: string[];
}

export async function interpretReportText(reportText: string): Promise<InterpretReportResult> {
  const ai = getClient();

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{
      role: "user", parts: [{
        text: `Analyze this neurosurgical report excerpt: "${reportText}".
Translate the complex medical jargon into plain English for a patient.
Identify 3 key takeaway points.
Emphasize that this is an AI interpretation and they must discuss with Dr. Sayuj.` }]
    }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          plainEnglishSummary: { type: Type.STRING },
          keyTakeaways: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
        required: ["plainEnglishSummary", "keyTakeaways"],
      },
    },
  });

  return JSON.parse(extractText(response));
}
