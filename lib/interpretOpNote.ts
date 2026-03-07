import { generateObject } from 'ai';
import { z } from 'zod';
import { getTextModel } from '@/src/lib/ai/gateway';

export interface InterpretOpNoteResult {
  procedureName: string;
  patientFriendlySummary: string;
  implantsUsed: string[];
  complications: string | null;
  disclaimer: string;
}

export async function interpretOpNoteText(reportText: string): Promise<InterpretOpNoteResult> {
  const result = await generateObject({
    model: getTextModel('gpt-4o-mini'), // or gemini-2.0-flash, consistent with others
    schema: z.object({
      procedureName: z.string(),
      patientFriendlySummary: z.string(),
      implantsUsed: z.array(z.string()),
      complications: z.string().nullable(),
      disclaimer: z.string(),
    }),
    prompt: `Analyze this neurosurgical operative note excerpt: "${reportText}".
Translate the complex medical jargon into plain English for a patient.
Identify the exact name of the procedure performed.
Provide a patient-friendly summary of the steps taken during the surgery.
List any implants, hardware, or grafts used (if none, return an empty array).
Note any complications mentioned (if none, return null).
Include a disclaimer stating: "This AI analysis is for informational purposes only and does not constitute a medical diagnosis. Always consult Dr. Sayuj Krishnan or a qualified healthcare professional for clinical interpretation."`,
  });

  return result.object;
}
