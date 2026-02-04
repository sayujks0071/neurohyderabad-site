import { generateObject } from 'ai';
import { z } from 'zod';
import { getTextModel, hasAIConfig } from './ai/gateway';
import { RecoveryPlan } from '@/src/types/recovery-timeline';

/**
 * AI-Powered Recovery Predictor
 * 
 * Leverages clinical documents via MCP to generate personalized recovery timelines.
 * Uses Vercel AI Gateway for reliable, structured generation.
 */

export interface RecoveryPredictorRequest {
  surgeryType: string;
  patientAge?: number;
  comorbidities?: string[];
  severity?: 'mild' | 'moderate' | 'severe';
}

// Zod schema matching RecoveryPlan interface
const recoveryDurationSchema = z.object({
  label: z.string(),
  startDay: z.number().optional(),
  endDay: z.number().optional(),
  startWeek: z.number().optional(),
  endWeek: z.number().optional(),
  notes: z.string().optional(),
});

const recoveryMilestoneSchema = z.object({
  title: z.string(),
  highlights: z.array(z.string()),
  id: z.string().optional(),
  summary: z.string().optional(),
  cautions: z.array(z.string()).optional(),
  callouts: z.array(z.object({
    label: z.string(),
    detail: z.string(),
  })).optional(),
  sortOrder: z.number().optional(),
});

const recoveryPhaseSchema = z.object({
  name: z.string(),
  duration: recoveryDurationSchema,
  milestones: z.array(recoveryMilestoneSchema),
  id: z.string().optional(),
  displayLabel: z.string().optional(),
  goals: z.array(z.string()).optional(),
  summary: z.string().optional(),
  sortOrder: z.number().optional(),
});

const recoveryPlanSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  phases: z.array(recoveryPhaseSchema),
  id: z.string().optional(),
  locale: z.string().optional(),
  audience: z.string().optional(),
  lastReviewedAt: z.string().optional(),
  lastReviewedBy: z.string().optional(),
  version: z.string().optional(),
  disclaimer: z.string().optional(),
});

export async function generateRecoveryPlan(request: RecoveryPredictorRequest): Promise<RecoveryPlan> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` :
      'http://localhost:3000');

  try {
    // 1. Fetch clinical data via MCP tool
    // We still use MCP to fetch the RAG context
    const mcpResponse = await fetch(`${baseUrl}/api/mcp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: Date.now(),
        method: 'tools/call',
        params: {
          name: 'get_medical_info',
          arguments: {
            query: `Detailed recovery timeline and milestones for ${request.surgeryType}${request.severity ? ` (${request.severity} case)` : ''}. Include immediate post-op, first week, and long-term milestones.`
          }
        }
      })
    });

    let context = '';
    if (mcpResponse.ok) {
      const mcpData = await mcpResponse.json();
      context = mcpData.result?.content?.[0]?.text || '';
    } else {
      console.warn(`MCP Server responded with ${mcpResponse.status}, proceeding with knowledge base fallback.`);
    }

    // 2. Use AI Gateway to structure the content into a RecoveryPlan
    if (hasAIConfig()) {
      const { object } = await generateObject({
        model: getTextModel(),
        schema: recoveryPlanSchema,
        system: `You are an expert neurosurgical recovery planner for Dr. Sayuj Krishnan.
        Create a detailed, personalized recovery plan based on the provided clinical context.
        Patient Details:
        - Surgery: ${request.surgeryType}
        - Age: ${request.patientAge || 'Standard adult'}
        - Severity: ${request.severity || 'Standard'}
        ${request.comorbidities ? `- Comorbidities: ${request.comorbidities.join(', ')}` : ''}

        Guidelines:
        - Divide recovery into clear phases (e.g., Immediate Post-Op, Week 1, Month 1, etc.).
        - Include specific, actionable milestones.
        - Ensure the tone is professional, reassuring, and clear.
        - Use the provided context to ensure accuracy.`,
        prompt: context ? `Clinical Context: \n${context}` : `Generate a standard recovery plan for ${request.surgeryType}.`,
        temperature: 0.2,
      });

      // Add disclaimer if not present
      if (!object.disclaimer) {
        object.disclaimer = "This timeline is a general guide. Individual recovery varies based on patient health and surgical complexity. Always follow Dr. Sayuj's specific post-operative instructions.";
      }

      return object as RecoveryPlan;
    }

    return getFallbackPlan(request.surgeryType);

  } catch (error) {
    console.error('Failed to generate recovery plan:', error);
    // Fallback to a basic template if AI generation fails
    return getFallbackPlan(request.surgeryType);
  }
}

function getFallbackPlan(surgeryType: string): RecoveryPlan {
  return {
    title: `Recovery Timeline: ${ surgeryType } `,
    description: "Standard recovery guidelines. Please consult Dr. Sayuj for your personalized plan.",
    phases: [
      {
        name: "Immediate Post-Op (Day 0)",
        duration: { label: "Day 0" },
        milestones: [{
          title: "Mobilization",
          highlights: ["Mobilize within 3-6 hours", "Pain management initiation", "Wound care briefing"]
        }]
      },
      {
        name: "Early Recovery (Weeks 1-2)",
        duration: { label: "Weeks 1-2" },
        milestones: [{
          title: "Initial Healing",
          highlights: ["Stitch removal (if any)", "Light walking", "Avoid heavy lifting"]
        }]
      }
    ],
    disclaimer: "This timeline is a general guide. Individual recovery varies based on patient health and surgical complexity. Always follow Dr. Sayuj's specific post-operative instructions."
  };
}
