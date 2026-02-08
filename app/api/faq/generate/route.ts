/**
 * API Route: Generate FAQs using RAG (Gemini Files) + Vercel AI Gateway (OpenAI)
 * POST /api/faq/generate
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { z } from 'zod';
import { getTextModel } from '@/src/lib/ai/gateway';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const { topic, numQuestions = 10 } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                   (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                   'http://localhost:3000');

    // STEP 1: Retrieve supporting medical context from the Gemini File API (RAG)
    // Use 'medical' search type to access file content
    const contextResponse = await fetch(`${baseUrl}/api/gemini-files/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchType: 'medical',
        query: `Common patient questions and evidence-based answers about ${topic}.`,
        category: 'faq-context',
        maxResults: 5,
      })
    });

    let contextData = { answer: '', sources: [] };
    if (contextResponse.ok) {
      contextData = await contextResponse.json();
    } else {
      console.warn('Failed to retrieve FAQ context from Gemini, proceeding with general knowledge.');
    }

    const context = contextData.answer || 'No specific documents found. Use general medical knowledge.';
    const sources = contextData.sources || [];

    // STEP 2: Generate Structured FAQs using Vercel AI Gateway (OpenAI)
    // Use generateObject for strict JSON structure
    const { object } = await generateObject({
      model: getTextModel(), // Uses 'gpt-4o-mini' via Vercel AI Gateway
      schema: z.object({
        faqs: z.array(z.object({
          question: z.string().describe('The question asked by a patient'),
          answer: z.string().describe('Clear, concise, evidence-based answer'),
        })),
      }),
      prompt: `
You are an expert medical assistant for Dr. Sayuj Krishnan, a neurosurgeon in Hyderabad.
Generate ${numQuestions} Frequently Asked Questions (FAQs) about "${topic}".

### Context from Medical Library (RAG):
${context}

### Guidelines:
1. Questions should be what real patients ask (e.g., "Is it painful?", "Recovery time?", "Cost?").
2. Answers must be medically accurate, empathetic, and easy to understand.
3. Mention "Dr. Sayuj" or "Yashoda Hospitals" where appropriate (e.g., for location/appointment context).
4. If the context covers the topic, rely on it. If not, use general medical knowledge but be conservative.
`,
      temperature: 0.5,
    });

    return NextResponse.json({
      success: true,
      faqs: object.faqs.map((faq, index) => ({
        id: `faq-${topic.toLowerCase().replace(/\s+/g, '-')}-${index}`,
        question: faq.question,
        answer: faq.answer,
        category: topic,
        sources: sources // Attach sources from the RAG step
      })),
      topic,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error generating FAQs:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate FAQs',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'FAQ Generation API (RAG + Vercel AI Gateway)',
    version: '1.0.0',
    usage: 'POST with { topic: string, numQuestions?: number }'
  });
}
