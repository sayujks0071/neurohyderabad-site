/**
 * API Route: Content Verification
 * POST /api/content/validate
 * 
 * Validates website claims against medical documents in Gemini File API
 */

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 30;

interface ValidationRequest {
  claim: string;
  pageContent?: string;
  context?: string;
}

interface ValidationResult {
  isValid: boolean;
  confidence: 'high' | 'medium' | 'low';
  validation: string;
  sources: Array<{ fileName?: string; uri?: string }>;
  recommendations?: string[];
  discrepancies?: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ValidationRequest;
    const { claim, pageContent, context } = body;

    if (!claim || !claim.trim()) {
      return NextResponse.json(
        { error: 'Claim is required for validation' },
        { status: 400 }
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

    // Build validation query
    let query = `Validate the following claim against our medical documents: "${claim}"`;
    if (context) {
      query += `\n\nContext: ${context}`;
    }
    query += `\n\nPlease check if this claim is accurate, supported by our documents, and identify any discrepancies or areas that need clarification.`;

    // Search for relevant documents and validate
    const response = await fetch(`${baseUrl}/api/gemini-files/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchType: 'validate',
        claim: claim,
        query: query,
        maxResults: 5,
        temperature: 0.2, // Low temperature for factual validation
      }),
    });

    if (!response.ok) {
      // Fallback to standard search if validate type not available
      const fallbackResponse = await fetch(`${baseUrl}/api/gemini-files/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          searchType: 'standard',
          query: `Verify and validate: ${claim}. Is this accurate based on medical evidence?`,
          maxResults: 5,
        }),
      });

      if (!fallbackResponse.ok) {
        const errorData = await fallbackResponse.json().catch(() => ({}));
        throw new Error(
          `Failed to validate content: ${fallbackResponse.status} - ${JSON.stringify(errorData)}`
        );
      }

      const fallbackData = await fallbackResponse.json();
      return formatValidationResponse(fallbackData, claim);
    }

    const data = await response.json();
    return formatValidationResponse(data, claim);
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

function formatValidationResponse(data: any, claim: string): NextResponse {
  const answer = data.answer || '';
  const sources = data.sources || [];

  // Parse validation result from answer
  const isValid = parseValidationStatus(answer);
  const confidence = determineConfidence(answer, sources.length);
  const recommendations = extractRecommendations(answer);
  const discrepancies = extractDiscrepancies(answer);

  return NextResponse.json({
    success: true,
    claim,
    validation: {
      isValid,
      confidence,
      validation: answer,
      sources,
      recommendations: recommendations.length > 0 ? recommendations : undefined,
      discrepancies: discrepancies.length > 0 ? discrepancies : undefined,
    },
    validatedAt: new Date().toISOString(),
  });
}

function parseValidationStatus(answer: string): boolean {
  const lowerAnswer = answer.toLowerCase();
  
  // Check for explicit validation indicators
  if (
    lowerAnswer.includes('valid') ||
    lowerAnswer.includes('accurate') ||
    lowerAnswer.includes('supported') ||
    lowerAnswer.includes('confirmed')
  ) {
    if (
      lowerAnswer.includes('not valid') ||
      lowerAnswer.includes('not accurate') ||
      lowerAnswer.includes('not supported') ||
      lowerAnswer.includes('incorrect') ||
      lowerAnswer.includes('discrepancy')
    ) {
      return false;
    }
    return true;
  }

  // Default to true if no clear negative indicators
  return !(
    lowerAnswer.includes('incorrect') ||
    lowerAnswer.includes('not accurate') ||
    lowerAnswer.includes('false') ||
    lowerAnswer.includes('discrepancy')
  );
}

function determineConfidence(answer: string, sourceCount: number): 'high' | 'medium' | 'low' {
  if (sourceCount >= 3 && answer.length > 200) {
    return 'high';
  }
  if (sourceCount >= 1 && answer.length > 100) {
    return 'medium';
  }
  return 'low';
}

function extractRecommendations(answer: string): string[] {
  const recommendations: string[] = [];
  const lines = answer.split('\n');

  for (const line of lines) {
    if (
      line.toLowerCase().includes('recommend') ||
      line.toLowerCase().includes('suggest') ||
      line.toLowerCase().includes('should')
    ) {
      const cleaned = line.replace(/^[-*•]\s*/, '').trim();
      if (cleaned.length > 20) {
        recommendations.push(cleaned);
      }
    }
  }

  return recommendations.slice(0, 5); // Limit to 5 recommendations
}

function extractDiscrepancies(answer: string): string[] {
  const discrepancies: string[] = [];
  const lines = answer.split('\n');

  for (const line of lines) {
    if (
      line.toLowerCase().includes('discrepancy') ||
      line.toLowerCase().includes('difference') ||
      line.toLowerCase().includes('conflict') ||
      line.toLowerCase().includes('contradict')
    ) {
      const cleaned = line.replace(/^[-*•]\s*/, '').trim();
      if (cleaned.length > 20) {
        discrepancies.push(cleaned);
      }
    }
  }

  return discrepancies.slice(0, 5); // Limit to 5 discrepancies
}

export async function GET() {
  return NextResponse.json({
    message: 'Content Verification API',
    version: '1.0.0',
    usage: 'POST with { claim: string, pageContent?: string, context?: string }',
    example: {
      claim: 'Minimally invasive spine surgery has a 95% success rate',
      context: 'Website homepage claim',
    },
  });
}

