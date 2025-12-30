/**
 * API Route: Symptom Information Checker
 * POST /api/symptoms/check
 * 
 * Provides evidence-based guidance based on symptoms using medical documents
 */

import { NextRequest, NextResponse } from 'next/server';

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

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

    // Build comprehensive query for symptom analysis
    let query = `Symptoms: ${symptoms}`;
    if (patientAge) query += `. Age: ${patientAge}`;
    if (duration) query += `. Duration: ${duration}`;
    if (severity) query += `. Severity: ${severity}`;
    if (medicalHistory) query += `. Medical history: ${medicalHistory}`;
    query += `. What neurosurgical conditions could this indicate? What are the potential causes, when should someone seek immediate medical attention, and what are the general treatment approaches?`;

    // Search medical documents for symptom information
    const response = await fetch(`${baseUrl}/api/gemini-files/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchType: 'medical',
        query: query,
        category: 'patient-info',
        maxResults: 5,
        temperature: 0.3, // Lower temperature for more factual responses
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Failed to check symptoms: ${response.status} - ${JSON.stringify(errorData)}`
      );
    }

    const data = await response.json();

    // Determine urgency level based on symptoms
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

    // Add medical disclaimer and recommendation
    const recommendation = isUrgent
      ? 'This appears to be an emergency situation. Please call +91-9778280044 immediately or visit the nearest emergency room.'
      : 'If symptoms persist or worsen, please contact Dr. Sayuj at +91-9778280044 for proper evaluation and treatment.';

    return NextResponse.json({
      success: true,
      information: data.answer,
      sources: data.sources || [],
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
    message: 'Symptom Information Checker API',
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
