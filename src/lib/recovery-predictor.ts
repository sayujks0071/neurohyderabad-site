import { generateObject } from 'ai';
import { z } from 'zod';
import { getTextModel, hasAIConfig } from './ai/gateway';
import { RecoveryPlan } from '@/src/types/recovery-timeline';

/**
 * AI-Powered Recovery Predictor
 * 
 * Leverages clinical documents via MCP to generate personalized recovery timelines.
 */

export interface RecoveryPredictorRequest {
  surgeryType: string;
  patientAge?: number;
  comorbidities?: string[];
  severity?: 'mild' | 'moderate' | 'severe';
}

export async function generateRecoveryPlan(request: RecoveryPredictorRequest): Promise<RecoveryPlan> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                 (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                 'http://localhost:3000');

  try {
    // 1. Fetch clinical data via MCP tool
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

    if (!mcpResponse.ok) {
      throw new Error(`MCP Server responded with ${mcpResponse.status}`);
    }

    const mcpData = await mcpResponse.json();
    const rawContent = mcpData.result?.content?.[0]?.text || '';

    // 2. Use AI Gateway to structure the content into a RecoveryPlan
    if (hasAIConfig()) {
      const { object } = await generateObject({
        model: getTextModel(),
        schema: z.object({
          title: z.string(),
          description: z.string().optional(),
          phases: z.array(z.object({
            name: z.string(),
            duration: z.object({
              label: z.string(),
            }),
            milestones: z.array(z.object({
              title: z.string(),
              highlights: z.array(z.string()),
            })),
            sortOrder: z.number().optional(),
          })),
          disclaimer: z.string().optional(),
        }),
        prompt: `You are a medical AI assistant.

Context from clinical documents:
${rawContent}

Task: Generate a structured recovery plan for ${request.surgeryType}.
Patient details: ${request.patientAge ? `Age: ${request.patientAge}` : ''} ${request.comorbidities ? `Comorbidities: ${request.comorbidities.join(', ')}` : ''}

Use the provided context to accurately populate the phases and milestones.
If the context is missing specific details, use general medical knowledge for this surgery type but prioritize the context.
Ensure the output matches the schema.`,
      });

      return object as RecoveryPlan;
    }

    // Fallback if AI config is missing but we have raw content (very unlikely in this setup)
    // For now we will just use the hard fallback to keep it simple, or we could keep the regex parser?
    // Given the instruction to "make best use", assuming Gateway is working, we should rely on it.
    // But for safety, we'll fall back to the static template.
    return getFallbackPlan(request.surgeryType);

  } catch (error) {
    console.error('Failed to generate recovery plan:', error);
    // Fallback to a basic template if AI/MCP fails
    return getFallbackPlan(request.surgeryType);
  }
}

function getFallbackPlan(surgeryType: string): RecoveryPlan {
  return {
    title: `Recovery Timeline: ${surgeryType}`,
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
    ]
  };
}
