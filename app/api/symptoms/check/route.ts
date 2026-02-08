/**
 * API Route: Symptom Information Checker
 * POST /api/symptoms/check
 * 
 * Provides evidence-based guidance based on symptoms using medical documents (Gemini RAG)
 * and generates the final response via Vercel AI Gateway (OpenAI) for consistency and safety.
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';
import { getTextModel, hasAIConfig } from '@/src/lib/ai/gateway';
import { DR_SAYUJ_SYSTEM_PROMPT } from '@/src/lib/ai/prompts';

export const runtime = 'nodejs';
export const maxDuration = 30;

interface SymptomCheckRequest {
  symptoms: string;
  patientAge?: number;
  medicalHistory?: string;
  duration?: string;
  severity?: 'mild' | 'moderate' | 'severe';
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SymptomCheckRequest;
    const { symptoms, patientAge, medicalHistory, duration, severity } = body;

    if (!symptoms || !symptoms.trim()) {
      return NextResponse.json(
        { error: 'Symptoms description is required' },
        { status: 400 }
      );
    }

    if (!hasAIConfig()) {
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 }
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

    // Build comprehensive query for retrieval
    let query = `Symptoms: ${symptoms}`;
    if (patientAge) query += `. Age: ${patientAge}`;
    if (duration) query += `. Duration: ${duration}`;
    if (severity) query += `. Severity: ${severity}`;
    if (medicalHistory) query += `. Medical history: ${medicalHistory}`;
    query += `. What neurosurgical conditions could this indicate?`;

    // 1. Retrieve supporting medical context from Gemini File API (RAG)
    let supportingContext = '';
    let sources: any[] = [];

    try {
      const response = await fetch(`${baseUrl}/api/gemini-files/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          searchType: 'medical', // Retrieve medical context
          query: query,
          category: 'patient-info',
          maxResults: 5,
          temperature: 0.1, // Low temp for factual retrieval
        }),
      });

      if (response.ok) {
        const data = await response.json();
        supportingContext = data.answer || '';
        sources = data.sources || [];
      } else {
        console.warn('Failed to retrieve context from Gemini, proceeding with general knowledge.');
      }
    } catch (error) {
      console.error('Gemini context retrieval failed:', error);
    }

    // 2. Generate final response via Vercel AI Gateway (OpenAI)
    // This ensures consistent tone, safety checks, and better instruction following
    const { text: information } = await generateText({
      model: getTextModel(), // defaults to gpt-4o-mini via Gateway
      system: `${DR_SAYUJ_SYSTEM_PROMPT}

You are analyzing patient symptoms. Use the provided MEDICAL EVIDENCE (RAG) to inform your response.
Strictly adhere to these rules:
1. Provide a direct, empathetic assessment based on the evidence.
2. Mention potential causes but DO NOT diagnose. use phrases like "This could indicate..." or "Common causes include...".
3. Highlight ANY red flags or emergency signs immediately.
4. Recommend next steps (e.g., MRI, consultation).
5. Always include a disclaimer.
`,
      messages: [
        {
          role: 'user',
          content: `
Patient Description: ${query}

### MEDICAL EVIDENCE (RAG):
${supportingContext || 'No specific documents found. Use general medical knowledge with extreme caution.'}

Based on this, what conditions could this indicate? What are the potential causes, urgency level, and general treatment approaches?
`
        }
      ],
      temperature: 0.3, // Low temperature for consistency
    });

    // Determine urgency level based on symptoms (Client-side logic or simple keyword check)
    const urgentKeywords = [
      'stroke',
      'seizure',
      'severe headache',
      'sudden weakness',
      'paralysis',
      'loss of vision',
      'loss of consciousness',
      'severe neck pain',
      'trauma',
      'accident',
      'head injury',
    ];
    const isUrgent = urgentKeywords.some((keyword) =>
      symptoms.toLowerCase().includes(keyword)
    );

    // Add recommendation
    const recommendation = isUrgent
      ? 'This appears to be an emergency situation. Please call +91-9778280044 immediately or visit the nearest emergency room.'
      : 'If symptoms persist or worsen, please contact Dr. Sayuj at +91-9778280044 for proper evaluation and treatment.';

    return NextResponse.json({
      success: true,
      information,
      sources,
      urgency: isUrgent ? 'high' : 'normal',
      disclaimer:
        'This information is for educational purposes only and does not replace professional medical advice. Please consult with a healthcare provider for proper diagnosis and treatment.',
      recommendation,
      contactInfo: {
        phone: '+91-9778280044',
        email: 'hellodr@drsayuj.info',
        location: 'Yashoda Hospital, Room 317, OPD Block, Malakpet, Hyderabad',
      },
      checkedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error checking symptoms:', error);
    return NextResponse.json(
      {
        error: 'Failed to check symptoms',
        message: error instanceof Error ? error.message : 'Unknown error',
        recommendation:
          'Please contact Dr. Sayuj directly at +91-9778280044 for immediate assistance.',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Symptom Information Checker API (RAG + Vercel AI Gateway)',
    version: '1.0.0',
    usage: 'POST with { symptoms: string, patientAge?: number, medicalHistory?: string, duration?: string, severity?: "mild" | "moderate" | "severe" }',
    example: {
      symptoms: 'persistent headaches and vision problems',
      patientAge: 45,
      duration: '2 weeks',
      severity: 'moderate',
    },
  });
}
