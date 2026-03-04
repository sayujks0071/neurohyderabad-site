import { generateObject } from 'ai';
import { z } from 'zod';
import { getTextModel } from '@/src/lib/ai/gateway';

export interface InterpretLabReportResult {
  plainEnglishSummary: string;
  abnormalFindings: string[];
  keyTakeaways: string[];
}

export async function interpretLabReportText(reportText: string): Promise<InterpretLabReportResult> {
  const result = await generateObject({
    model: getTextModel('gpt-4o-mini'),
    schema: z.object({
      plainEnglishSummary: z.string(),
      abnormalFindings: z.array(z.string()),
      keyTakeaways: z.array(z.string()),
    }),
    prompt: `Analyze this medical laboratory report excerpt: "${reportText}".
Translate the complex medical jargon into plain English for a patient, particularly in the context of neurosurgical pre-operative clearance or general health.
Identify any abnormal lab values and explain them simply.
Identify 3 key takeaway points.
Emphasize that this is an AI interpretation and they must discuss with Dr. Sayuj or their primary care physician.`,
  });

  return result.object;
}
