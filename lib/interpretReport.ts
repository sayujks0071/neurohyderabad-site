import { generateObject } from "ai";
import { z } from "zod";
import { getTextModel } from "@/src/lib/ai/gateway";

export interface InterpretReportResult {
  plainEnglishSummary: string;
  keyTakeaways: string[];
}

// Define the schema using Zod
const InterpretReportSchema = z.object({
  plainEnglishSummary: z.string().describe("A plain English summary of the medical report for a patient."),
  keyTakeaways: z.array(z.string()).describe("3 key takeaway points from the report."),
});

export async function interpretReportText(reportText: string): Promise<InterpretReportResult> {
  // Truncate report text if too long (though 2.0-flash has large context)
  const truncatedText = reportText.slice(0, 100000);

  const prompt = `Analyze this neurosurgical report excerpt: "${truncatedText}".
Translate the complex medical jargon into plain English for a patient.
Identify 3 key takeaway points.
Emphasize that this is an AI interpretation and they must discuss with Dr. Sayuj.`;

  try {
    const { object } = await generateObject({
      model: getTextModel('google/gemini-2.0-flash'),
      schema: InterpretReportSchema,
      prompt: prompt,
      temperature: 0.3, // Lower temperature for more consistent/factual output
    });

    return {
      plainEnglishSummary: object.plainEnglishSummary,
      keyTakeaways: object.keyTakeaways,
    };
  } catch (e) {
    console.error("Interpret report failed:", e);
    // Fallback or rethrow? Original code rethrew.
    throw new Error("Failed to interpret report");
  }
}
