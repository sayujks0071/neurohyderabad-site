/**
 * AI-Powered Follow-Up Care Recommendations
 * 
 * Generates personalized follow-up care recommendations based on:
 * - Procedure type
 * - Patient condition
 * - Recovery stage
 * - Patient history
 */

import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export interface FollowUpRequest {
  procedureType: string;
  condition: string;
  daysSinceProcedure?: number;
  currentSymptoms?: string[];
  patientConcerns?: string;
  recoveryStage?: 'immediate' | 'early' | 'mid' | 'late';
  previousFollowUps?: number;
}

export interface FollowUpRecommendation {
  carePlan: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
  medicationGuidance?: {
    current: string[];
    adjustments?: string[];
    warnings?: string[];
  };
  activityRecommendations: {
    allowed: string[];
    restricted: string[];
    timeline: string;
  };
  warningSigns: {
    urgent: string[];
    monitor: string[];
  };
  nextSteps: {
    action: string;
    timeline: string;
    priority: 'high' | 'medium' | 'low';
  }[];
  personalizedMessage: string;
}

/**
 * Generate follow-up care recommendations
 */
export async function generateFollowUpCare(
  request: FollowUpRequest
): Promise<FollowUpRecommendation> {
  if (!process.env.OPENAI_API_KEY) {
    return fallbackFollowUpCare(request);
  }

  try {
    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `You are an AI assistant helping with post-operative care for neurosurgery patients. Generate personalized follow-up care recommendations.

Patient Information:
- Procedure: ${request.procedureType}
- Condition: ${request.condition}
${request.daysSinceProcedure ? `- Days Since Procedure: ${request.daysSinceProcedure}` : ''}
${request.currentSymptoms ? `- Current Symptoms: ${request.currentSymptoms.join(', ')}` : ''}
${request.patientConcerns ? `- Patient Concerns: ${request.patientConcerns}` : ''}
${request.recoveryStage ? `- Recovery Stage: ${request.recoveryStage}` : ''}

Practice: Dr. Sayuj Krishnan - Neurosurgeon, Yashoda Hospital, Hyderabad
Specializes in: Minimally invasive spine and brain surgery

Generate comprehensive follow-up care recommendations in JSON format:
{
  "carePlan": {
    "immediate": ["actions for next 24-48 hours"],
    "shortTerm": ["actions for next week"],
    "longTerm": ["actions for next month"]
  },
  "medicationGuidance": {
    "current": ["current medications"],
    "adjustments": ["any adjustments needed"],
    "warnings": ["important warnings"]
  },
  "activityRecommendations": {
    "allowed": ["activities patient can do"],
    "restricted": ["activities to avoid"],
    "timeline": "when restrictions can be lifted"
  },
  "warningSigns": {
    "urgent": ["signs requiring immediate attention"],
    "monitor": ["signs to watch for"]
  },
  "nextSteps": [
    {
      "action": "what to do",
      "timeline": "when",
      "priority": "high|medium|low"
    }
  ],
  "personalizedMessage": "A personalized message for the patient"
}

Return ONLY valid JSON, no other text.`,
      temperature: 0.4,
    });

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as FollowUpRecommendation;
    }

    return fallbackFollowUpCare(request);
  } catch (error) {
    console.error('Follow-up care generation error:', error);
    return fallbackFollowUpCare(request);
  }
}

function fallbackFollowUpCare(request: FollowUpRequest): FollowUpRecommendation {
  return {
    carePlan: {
      immediate: [
        'Rest and avoid strenuous activities',
        'Take prescribed medications as directed',
        'Monitor incision site for signs of infection',
        'Keep follow-up appointment',
      ],
      shortTerm: [
        'Gradually increase activity as tolerated',
        'Continue medication regimen',
        'Attend physical therapy if recommended',
      ],
      longTerm: [
        'Maintain regular follow-up appointments',
        'Follow activity restrictions until cleared',
        'Report any new or worsening symptoms',
      ],
    },
    activityRecommendations: {
      allowed: ['Light walking', 'Normal daily activities as tolerated'],
      restricted: ['Heavy lifting', 'Strenuous exercise', 'Bending/twisting'],
      timeline: 'As recommended by your surgeon',
    },
    warningSigns: {
      urgent: [
        'Severe pain',
        'Signs of infection (redness, swelling, discharge)',
        'Neurological changes (weakness, numbness)',
        'Fever above 101°F',
      ],
      monitor: [
        'Mild discomfort',
        'Swelling',
        'Changes in sensation',
      ],
    },
    nextSteps: [
      {
        action: 'Schedule follow-up appointment',
        timeline: 'As recommended',
        priority: 'high',
      },
      {
        action: 'Call if concerns arise',
        timeline: 'Anytime',
        priority: 'high',
      },
    ],
    personalizedMessage: `Thank you for choosing Dr. Sayuj Krishnan for your ${request.procedureType}. We're here to support your recovery. For any concerns, call +91-9778280044.`,
  };
}

