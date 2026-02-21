import { generateObject } from 'ai';
import { z } from 'zod';
import { getTextModel, hasAIConfig } from '@/src/lib/ai/gateway';

const SymptomAnalysisSchema = z.object({
  urgency: z.enum(['emergency', 'urgent', 'routine']),
  recommendation: z.string(),
  possibleConditions: z.array(z.string()),
  nextSteps: z.array(z.string()),
  emergencyContact: z.string(),
});

export type SymptomAnalysis = z.infer<typeof SymptomAnalysisSchema>;

export interface AnalyzeSymptomsResult {
  analysis: SymptomAnalysis;
  disclaimer: string;
}

/**
 * Analyzes symptoms using Vercel AI SDK (or fallback)
 */
export async function analyzeSymptoms(
  symptoms: string,
  age?: string | number,
  gender?: string,
  duration?: string
): Promise<AnalyzeSymptomsResult> {
  if (!symptoms) {
    throw new Error('Symptoms are required');
  }

  const disclaimer = 'This is preliminary guidance only and does not constitute a medical diagnosis. Always consult with a qualified healthcare provider.';

  if (!hasAIConfig()) {
    return {
      analysis: buildFallbackAnalysis(symptoms),
      disclaimer
    };
  }

  try {
    const { object } = await generateObject({
      model: getTextModel(),
      schema: SymptomAnalysisSchema,
      prompt: `You are a medical assistant helping to triage symptoms for a neurosurgery practice. Analyze the following symptoms and provide guidance.

Patient Information:
- Symptoms: ${symptoms}
${age ? `- Age: ${age}` : ''}
${gender ? `- Gender: ${gender}` : ''}
${duration ? `- Duration: ${duration}` : ''}

IMPORTANT GUIDELINES:
1. This is NOT a diagnosis - only preliminary guidance
2. If symptoms suggest an emergency (stroke, severe trauma, sudden paralysis, severe headache with vision changes, etc.), immediately recommend emergency care
3. Provide general information about when to seek immediate care vs. when a scheduled appointment is appropriate
4. Suggest relevant neurosurgical conditions that might be related (without diagnosing)
5. Always recommend consulting with Dr. Sayuj Krishnan for proper evaluation

Format your response as JSON with the following structure:
{
  "urgency": "emergency" | "urgent" | "routine",
  "recommendation": "Brief recommendation text",
  "possibleConditions": ["condition1", "condition2"],
  "nextSteps": ["step1", "step2"],
  "emergencyContact": "+91-9778280044"
}

Response:`,
      temperature: 0.3,
    });

    return {
      analysis: object,
      disclaimer
    };

  } catch (error) {
    console.error('Error generating symptom analysis:', error);
    return {
      analysis: buildFallbackAnalysis(symptoms),
      disclaimer
    };
  }
}

export function buildFallbackAnalysis(symptoms: string): SymptomAnalysis {
  const emergencyKeywords = [
    'stroke',
    'seizure',
    'severe headache',
    'sudden weakness',
    'paralysis',
    'loss of vision',
    'severe neck pain',
    'trauma',
    'accident',
    'unconscious',
  ];
  const lowerSymptoms = symptoms.toLowerCase();
  const isEmergency = emergencyKeywords.some((keyword) => lowerSymptoms.includes(keyword));

  return {
    urgency: isEmergency ? 'emergency' : 'routine',
    recommendation: isEmergency
      ? 'Seek emergency medical care immediately or call +91-9778280044.'
      : 'Please consult with Dr. Sayuj Krishnan for proper evaluation of your symptoms.',
    possibleConditions: [],
    nextSteps: isEmergency
      ? ['Call +91-9778280044 immediately', 'Visit the nearest emergency room']
      : ['Schedule an appointment', 'Call +91-9778280044 for immediate concerns'],
    emergencyContact: '+91-9778280044',
  };
}
