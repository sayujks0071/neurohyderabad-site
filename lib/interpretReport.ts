import { getClient, extractText } from "./gemini";

export interface InterpretReportResult {
  plainEnglishSummary: string;
  keyTakeaways: string[];
}

export async function interpretReportText(reportText: string): Promise<InterpretReportResult> {
  const ai = getClient();

  // Truncate report text if too long to fit in context window (though 2.0-flash has large context)
  const truncatedText = reportText.slice(0, 100000);

  const prompt = `Analyze this neurosurgical report excerpt: "${truncatedText}".
Translate the complex medical jargon into plain English for a patient.
Identify 3 key takeaway points.
Emphasize that this is an AI interpretation and they must discuss with Dr. Sayuj.

Return ONLY a JSON object with this exact schema:
{
  "plainEnglishSummary": "string",
  "keyTakeaways": ["string", "string", "string"]
}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
          responseMimeType: "application/json",
      }
    });

    const text = extractText(response);

    // Parse JSON
    const json = JSON.parse(text);

    // Validate/Sanitize structure
    const plainEnglishSummary = typeof json.plainEnglishSummary === 'string'
        ? json.plainEnglishSummary
        : "Summary could not be generated.";

    const keyTakeaways = Array.isArray(json.keyTakeaways)
        ? json.keyTakeaways.map(String)
        : [];

    return {
        plainEnglishSummary,
        keyTakeaways,
    };
  } catch (e) {
      console.error("Interpret report failed:", e);
      throw new Error("Failed to interpret report");
  }
}
