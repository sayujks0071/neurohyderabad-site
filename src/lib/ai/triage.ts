/**
 * AI-Powered Patient Triage System
 */

import { generateObject, jsonSchema } from 'ai';
import { getAIClient, getGatewayModel, isAIGatewayConfigured } from './gateway';

export interface TriageRequest {
  symptoms: string[];
  description: string;
  age?: number;
  medicalHistory?: string;
  currentMedications?: string[];
}

export interface TriageResult {
  urgencyLevel: 'emergency' | 'urgent' | 'moderate' | 'routine';
  urgencyScore: number;
  recommendedAction: string;
  timeToSeekCare: string;
  suggestedSpecialty?: string;
  riskFactors: string[];
  reasoning: string;
  followUpQuestions?: string[];
}

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

  if (!process.env.OPENAI_API_KEY) {
    return basicTriage(request);
  }

  try {
    const aiClient = getAIClient();
    const modelName = isAIGatewayConfigured() ? getGatewayModel('gpt-4o-mini') : 'gpt-4o-mini';
    
    const { object } = await generateObject({
      model: aiClient(modelName),
      schema: jsonSchema({
        type: 'object',
        properties: {
          urgencyLevel: { type: 'string', enum: ['emergency', 'urgent', 'moderate', 'routine'], description: 'Urgency level' },
          urgencyScore: { type: 'number', minimum: 0, maximum: 100, description: 'Urgency score (0-100)' },
          recommendedAction: { type: 'string', description: 'Recommended action' },
          timeToSeekCare: { type: 'string', description: 'Time to seek care' },
          suggestedSpecialty: { type: 'string', description: 'Suggested specialty' },
          riskFactors: { type: 'array', items: { type: 'string' }, description: 'Risk factors' },
          reasoning: { type: 'string', description: 'Reasoning' },
          followUpQuestions: { type: 'array', items: { type: 'string' }, description: 'Follow-up questions' }
        },
        required: ['urgencyLevel', 'urgencyScore', 'recommendedAction', 'timeToSeekCare', 'riskFactors', 'reasoning'],
        additionalProperties: false
      }),
      prompt: `You are a medical triage AI for neurosurgery. Analyze: Symptoms: ${request.symptoms.join(', ')}, Description: ${request.description}`,
      temperature: 0.3,
    });
    return object as TriageResult;
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
