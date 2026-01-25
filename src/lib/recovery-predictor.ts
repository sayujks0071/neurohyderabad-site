import { RecoveryPlan, RecoveryPhase, RecoveryMilestone } from '@/src/types/recovery-timeline';

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

    // 2. Parse the unstructured text into a structured RecoveryPlan
    // In a production environment, we might use generateObject from AI SDK here,
    // but for now we'll use robust regex-based parsing as suggested by Codex analysis.
    
    const plan: RecoveryPlan = {
      title: `Recovery Plan for ${request.surgeryType}`,
      description: `Personalized milestones based on clinical documentation for ${request.surgeryType}.`,
      phases: parsePhases(rawContent),
      disclaimer: "This timeline is a general guide. Individual recovery varies based on patient health and surgical complexity. Always follow Dr. Sayuj's specific post-operative instructions."
    };

    return plan;
  } catch (error) {
    console.error('Failed to generate recovery plan:', error);
    // Fallback to a basic template if AI/MCP fails
    return getFallbackPlan(request.surgeryType);
  }
}

function parsePhases(text: string): RecoveryPhase[] {
  const phases: RecoveryPhase[] = [];
  
  // Look for phase headers like "Phase 1:", "Day 0:", "Week 2:", etc.
  const phaseRegex = /(?:Phase|Day|Week|Month)\s*\d+[:\-\s]+([\s\S]*?)(?=(?:Phase|Day|Week|Month)\s*\d+|$)/g;
  let match;
  let order = 0;

  while ((match = phaseRegex.exec(text)) !== null) {
    const content = match[0];
    const nameMatch = content.match(/^(.*?)(?:\n|$)/);
    const name = nameMatch ? nameMatch[1].trim() : `Phase ${order + 1}`;
    
    phases.push({
      name,
      duration: { label: extractDuration(name) },
      milestones: parseMilestones(content),
      sortOrder: order++
    });
  }

  // If no phases were detected, return the whole text as one phase
  if (phases.length === 0 && text.length > 0) {
    phases.push({
      name: "General Recovery",
      duration: { label: "Standard" },
      milestones: [{
        title: "Standard Milestones",
        highlights: text.split('\n').filter(l => l.trim().length > 5).slice(0, 5)
      }]
    });
  }

  return phases;
}

function parseMilestones(text: string): RecoveryMilestone[] {
  // Look for bullet points or numbered lists
  const bulletPoints = text.split('\n')
    .filter(line => /^[\s\-\*•\d\.]/.test(line.trim()))
    .map(line => line.replace(/^[\s\-\*•\d\.\s]+/, '').trim())
    .filter(line => line.length > 10);

  if (bulletPoints.length === 0) return [];

  // Group milestones into sections if possible
  return [{
    title: "Key Milestones",
    highlights: bulletPoints
  }];
}

function extractDuration(text: string): string {
  const match = text.match(/(Day|Week|Month)\s*\d+(?:\s*-\s*\d+)?/i);
  return match ? match[0] : "Variable";
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
