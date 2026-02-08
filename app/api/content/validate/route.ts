/**
 * API Route: Content Verification using RAG (Gemini Files) + Vercel AI Gateway (OpenAI)
 * POST /api/content/validate
 * 
 * Validates website claims against medical documents
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { z } from 'zod';
import { getTextModel } from '@/src/lib/ai/gateway';

export const runtime = 'nodejs';
export const maxDuration = 30;

interface ValidationRequest {
  claim: string;
  pageContent?: string;
  context?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ValidationRequest;
    const { claim, pageContent, context: claimContext } = body;

    if (!claim || !claim.trim()) {
      return NextResponse.json(
        { error: 'Claim is required for validation' },
        { status: 400 }
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

    // STEP 1: Retrieve supporting medical context from the Gemini File API (RAG)
    // Use 'medical' search type to access file content specific to the claim
    const contextResponse = await fetch(`${baseUrl}/api/gemini-files/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchType: 'medical',
        query: `Medical evidence and clinical guidelines related to the claim: "${claim}"`,
        category: 'validation-context',
        maxResults: 5,
        temperature: 0.1, // Low temperature for factual retrieval
      }),
    });

    let contextData: any = { answer: '', sources: [] };
    if (contextResponse.ok) {
      contextData = await contextResponse.json();
    } else {
      console.warn('Failed to retrieve validation context from Gemini, proceeding with general knowledge.');
    }

    const context = contextData.answer || 'No specific documents found. Use general medical knowledge.';
    const sources = contextData.sources || [];

    // STEP 2: Validate the claim using Vercel AI Gateway (OpenAI)
    // Use generateObject for strict JSON structure
    const { object } = await generateObject({
      model: getTextModel(), // Uses 'gpt-4o-mini' via Vercel AI Gateway
      schema: z.object({
        isValid: z.boolean().describe('Whether the claim is medically accurate and supported'),
        confidence: z.enum(['high', 'medium', 'low']).describe('Confidence in the validation'),
        validation: z.string().describe('Detailed explanation of why the claim is valid or invalid'),
        recommendations: z.array(z.string()).optional().describe('Suggestions to improve accuracy or clarity'),
        discrepancies: z.array(z.string()).optional().describe('Specific points where the claim contradicts evidence'),
      }),
      prompt: `
You are a strict medical fact-checker for Dr. Sayuj Krishnan's neurosurgery website.
Validate the following claim against the provided medical evidence.

Claim: "${claim}"
${claimContext ? `Context: ${claimContext}` : ''}
${pageContent ? `Page Content Excerpt: ${pageContent.substring(0, 300)}...` : ''}

### Medical Evidence (RAG):
${context}

### Guidelines:
1. Determine if the claim is supported by the evidence or general medical consensus.
2. Be critical of exaggerated claims (e.g., "100% cure rate").
3. Identify any nuances missing from the claim.
4. If the evidence contradicts the claim, explain why clearly.
`,
      temperature: 0.2, // Low temperature for factual validation
    });

    return NextResponse.json({
      success: true,
      claim,
      validation: {
        isValid: object.isValid,
        confidence: object.confidence,
        validation: object.validation,
        sources: sources,
        recommendations: object.recommendations,
        discrepancies: object.discrepancies,
      },
      validatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error validating content:', error);
    return NextResponse.json(
      {
        error: 'Failed to validate content',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Content Verification API (RAG + Vercel AI Gateway)',
    version: '1.0.0',
    usage: 'POST with { claim: string, pageContent?: string, context?: string }',
    example: {
      claim: 'Minimally invasive spine surgery has a 95% success rate',
      context: 'Website homepage claim',
    },
  });
}
