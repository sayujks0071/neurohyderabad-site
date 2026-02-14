import { generateObject } from 'ai';
import { z } from 'zod';
import { getTextModel } from '@/src/lib/ai/gateway';

export interface InterpretReportResult {
  plainEnglishSummary: string;
  keyTakeaways: string[];
}

export async function interpretReportText(reportText: string): Promise<InterpretReportResult> {
  const result = await generateObject({
    model: getTextModel('gpt-4o-mini'),
    schema: z.object({
      plainEnglishSummary: z.string(),
      keyTakeaways: z.array(z.string()),
    }),
    prompt: `Analyze this neurosurgical report excerpt: "${reportText}".
Translate the complex medical jargon into plain English for a patient.
Identify 3 key takeaway points.
Emphasize that this is an AI interpretation and they must discuss with Dr. Sayuj.`,
  });

  return result.object;
}
