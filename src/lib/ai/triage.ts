/**
 * AI-Powered Patient Triage System
 */

import { generateObject } from 'ai';
import { z } from 'zod';
import { getTextModel, hasAIConfig } from './gateway';
import { sanitizeForPrompt } from '@/src/lib/validation';

export interface TriageRequest {
  symptoms: string[];
  description: string;
  age?: number;
  medicalHistory?: string;
  currentMedications?: string[];
}

const TriageResultSchema = z.object({
  urgencyLevel: z.enum(['emergency', 'urgent', 'moderate', 'routine']).describe('Urgency level'),
  urgencyScore: z.number().min(0).max(100).describe('Urgency score (0-100)'),
  recommendedAction: z.string().describe('Recommended action'),
  timeToSeekCare: z.string().describe('Time to seek care'),
  suggestedSpecialty: z.string().optional().describe('Suggested specialty'),
  riskFactors: z.array(z.string()).describe('Risk factors'),
  reasoning: z.string().describe('Reasoning'),
  followUpQuestions: z.array(z.string()).optional().describe('Follow-up questions')
});

export type TriageResult = z.infer<typeof TriageResultSchema>;

const EMERGENCY_KEYWORDS = [
  'stroke', 'seizure', 'unconscious', 'paralysis', 'sudden weakness',
  'loss of vision', 'severe headache', 'trauma', 'accident', 'fall',
  'severe neck pain', 'numbness', 'difficulty speaking', 'confusion'
];

const URGENT_KEYWORDS = [
  'severe pain', 'worsening', 'progressive', 'new onset', 'recent',
  'increasing', 'cannot move', 'difficulty walking'
];

export function quickTriageCheck(description: string): 'emergency' | null {
  const lowerDesc = description.toLowerCase();
  for (const keyword of EMERGENCY_KEYWORDS) {
    if (lowerDesc.includes(keyword)) {
      return 'emergency';
    }
  }
  return null;
}

export async function analyzeTriage(request: TriageRequest): Promise<TriageResult> {
  const emergencyCheck = quickTriageCheck(request.description);
  if (emergencyCheck === 'emergency') {
    return {
      urgencyLevel: 'emergency',
      urgencyScore: 95,
      recommendedAction: 'Call emergency services immediately or visit nearest emergency room. For neurosurgical emergencies, call +91-9778280044.',
      timeToSeekCare: 'immediately',
      riskFactors: ['Potential life-threatening condition detected'],
      reasoning: 'Emergency keywords detected in patient description. Immediate medical attention required.',
    };
  }

  if (!hasAIConfig()) {
    return basicTriage(request);
  }

  try {
    // 🛡️ Sentinel: Sanitize user input to prevent prompt injection
    const sanitizedDescription = sanitizeForPrompt(request.description);
    const sanitizedSymptoms = request.symptoms.map(s => sanitizeForPrompt(s));

    const { object } = await generateObject({
      model: getTextModel(),
      schema: TriageResultSchema,
      messages: [
        { role: 'system', content: 'You are a medical triage AI for neurosurgery.' },
        { role: 'user', content: `Analyze: Symptoms: ${sanitizedSymptoms.join(', ')}, Description: ${sanitizedDescription}` }
      ],
      temperature: 0.3,
    });
    return object;
  } catch (error) {
    console.error('AI triage error:', error);
    return basicTriage(request);
  }
}

function basicTriage(request: TriageRequest): TriageResult {
  const allText = `${request.description} ${request.symptoms.join(' ')}`.toLowerCase();
  let urgencyLevel: TriageResult['urgencyLevel'] = 'routine';
  let urgencyScore = 30;
  let timeToSeekCare = 'within 1 week';
  
  for (const keyword of URGENT_KEYWORDS) {
    if (allText.includes(keyword)) {
      urgencyLevel = 'urgent';
      urgencyScore = 75;
      timeToSeekCare = 'within 24 hours';
      break;
    }
  }
  
  if (request.symptoms.length > 3 || allText.includes('pain')) {
    if (urgencyLevel === 'routine') {
      urgencyLevel = 'moderate';
      urgencyScore = 50;
      timeToSeekCare = 'within 3-5 days';
    }
  }

  return {
    urgencyLevel,
    urgencyScore,
    recommendedAction: urgencyLevel === 'urgent' 
      ? 'Schedule an appointment within 24 hours. Call +91-9778280044.'
      : 'Schedule a consultation at your convenience. Call +91-9778280044.',
    timeToSeekCare,
    riskFactors: [],
    reasoning: 'Basic triage assessment based on symptom keywords.',
  };
}

export function getTriageColor(urgencyLevel: TriageResult['urgencyLevel']): string {
  switch (urgencyLevel) {
    case 'emergency': return 'red';
    case 'urgent': return 'orange';
    case 'moderate': return 'yellow';
    case 'routine': return 'green';
    default: return 'gray';
  }
}
