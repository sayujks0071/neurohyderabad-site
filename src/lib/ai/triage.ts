/**
 * AI-Powered Patient Triage System
 * 
 * Analyzes patient symptoms and inquiries to determine urgency level
 * and recommend appropriate next steps
 */

import { generateObject } from 'ai';
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
  urgencyScore: number; // 0-100
  recommendedAction: string;
  timeToSeekCare: string; // e.g., "immediately", "within 24 hours", "within 1 week"
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

/**
 * Quick keyword-based triage for immediate emergency detection
 */
export function quickTriageCheck(description: string): 'emergency' | null {
  const lowerDesc = description.toLowerCase();
  
  for (const keyword of EMERGENCY_KEYWORDS) {
    if (lowerDesc.includes(keyword)) {
      return 'emergency';
    }
  }
  
  return null;
}

/**
 * AI-powered comprehensive triage analysis
 */
export async function analyzeTriage(request: TriageRequest): Promise<TriageResult> {
  // Quick emergency check first
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
    // Fallback to basic triage
    return basicTriage(request);
  }

  try {
    const aiClient = getAIClient();
    const modelName = isAIGatewayConfigured() 
      ? getGatewayModel('gpt-4o-mini')
      : 'gpt-4o-mini';
    
    const { object } = await generateObject({
      model: aiClient(modelName),
      schema: {
        type: 'object',
        properties: {
          urgencyLevel: {
            type: 'string',
            enum: ['emergency', 'urgent', 'moderate', 'routine'],
            description: 'Urgency level based on symptoms and medical history'
          },
          urgencyScore: {
            type: 'number',
            minimum: 0,
            maximum: 100,
            description: 'Numerical urgency score (0-100)'
          },
          recommendedAction: {
            type: 'string',
            description: 'Specific recommended action for the patient'
          },
          timeToSeekCare: {
            type: 'string',
            description: 'When the patient should seek care (e.g., "immediately", "within 24 hours", "within 1 week")'
          },
          suggestedSpecialty: {
            type: 'string',
            description: 'Suggested medical specialty if different from neurosurgery'
          },
          riskFactors: {
            type: 'array',
            items: { type: 'string' },
            description: 'List of identified risk factors'
          },
          reasoning: {
            type: 'string',
            description: 'Explanation of the triage decision'
          },
          followUpQuestions: {
            type: 'array',
            items: { type: 'string' },
            description: 'Suggested follow-up questions to gather more information'
          }
        },
        required: ['urgencyLevel', 'urgencyScore', 'recommendedAction', 'timeToSeekCare', 'riskFactors', 'reasoning'],
        additionalProperties: false
      },
      prompt: `You are a medical triage AI assistant for a neurosurgery practice. Analyze the following patient information and provide a triage assessment.

Patient Information:
- Symptoms: ${request.symptoms.join(', ')}
- Description: ${request.description}
${request.age ? `- Age: ${request.age}` : ''}
${request.medicalHistory ? `- Medical History: ${request.medicalHistory}` : ''}
${request.currentMedications ? `- Current Medications: ${request.currentMedications.join(', ')}` : ''}

Specialties: Neurosurgery (brain and spine), Minimally invasive procedures

Guidelines:
- EMERGENCY (90-100): Stroke symptoms, seizures, severe trauma, sudden paralysis, loss of consciousness, severe neurological deficits
- URGENT (70-89): Progressive neurological symptoms, severe pain, new onset significant symptoms, worsening conditions
- MODERATE (40-69): Chronic conditions with new concerns, moderate pain, follow-up needs
- ROUTINE (0-39): General inquiries, preventive care, non-urgent consultations

Always prioritize patient safety. When in doubt, recommend higher urgency level.`,
      temperature: 0.3, // Lower temperature for more consistent medical assessments
    });

    return object as TriageResult;
  } catch (error) {
    console.error('AI triage error:', error);
    return basicTriage(request);
  }
}

/**
 * Basic triage fallback when AI is unavailable
 */
function basicTriage(request: TriageRequest): TriageResult {
  const lowerDesc = request.description.toLowerCase();
  const allText = `${request.description} ${request.symptoms.join(' ')}`.toLowerCase();
  
  let urgencyLevel: TriageResult['urgencyLevel'] = 'routine';
  let urgencyScore = 30;
  let timeToSeekCare = 'within 1 week';
  
  // Check for urgent keywords
  for (const keyword of URGENT_KEYWORDS) {
    if (allText.includes(keyword)) {
      urgencyLevel = 'urgent';
      urgencyScore = 75;
      timeToSeekCare = 'within 24 hours';
      break;
    }
  }
  
  // Check for moderate indicators
  if (request.symptoms.length > 3 || allText.includes('pain') || allText.includes('discomfort')) {
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

/**
 * Get triage color coding for UI
 */
export function getTriageColor(urgencyLevel: TriageResult['urgencyLevel']): string {
  switch (urgencyLevel) {
    case 'emergency':
      return 'red';
    case 'urgent':
      return 'orange';
    case 'moderate':
      return 'yellow';
    case 'routine':
      return 'green';
    default:
      return 'gray';
  }
}

