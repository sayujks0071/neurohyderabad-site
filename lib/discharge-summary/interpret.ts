import { generateObject } from 'ai';
import { z } from 'zod';
import { getTextModel } from '@/src/lib/ai/gateway';

export interface InterpretDischargeSummaryResult {
  patientOverview: string;
  pastSurgeries: string[];
  chronicConditions: string[];
  currentMedications: string[];
  allergies: string[];
  keyNeurologicalFindings: string[];
}

export async function interpretDischargeSummaryText(reportText: string): Promise<InterpretDischargeSummaryResult> {
  const result = await generateObject({
    model: getTextModel('gpt-4o-mini'), // Fallback mapping uses Gemini 2.0 Flash when OPENAI env is not present
    schema: z.object({
      patientOverview: z.string(),
      pastSurgeries: z.array(z.string()),
      chronicConditions: z.array(z.string()),
      currentMedications: z.array(z.string()),
      allergies: z.array(z.string()),
      keyNeurologicalFindings: z.array(z.string()),
    }),
    prompt: `Analyze this medical discharge summary or patient history document excerpt: "${reportText}".
Extract the key medical information and structure it clearly for a neurosurgeon's quick review before a consultation.
Focus on identifying any past surgeries, chronic conditions, current medications, known allergies, and specifically any neurological findings or symptoms mentioned.
Provide a brief, plain English overview of the patient's general situation.`,
  });

  return result.object;
}
