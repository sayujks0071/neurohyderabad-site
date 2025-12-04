import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Smart Symptom Analyzer API using Vercel AI SDK
 * 
 * Analyzes symptoms and provides preliminary guidance (not diagnosis)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { symptoms, age, gender, duration } = body;

    if (!symptoms) {
      return NextResponse.json(
        { error: 'Symptoms are required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Use AI SDK to analyze symptoms
    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `You are a medical assistant helping to triage symptoms for a neurosurgery practice. Analyze the following symptoms and provide guidance.

Patient Information:
- Symptoms: ${symptoms}
${age ? `- Age: ${age}` : ''}
${gender ? `- Gender: ${gender}` : ''}
${duration ? `- Duration: ${duration}` : ''}

IMPORTANT GUIDELINES:
1. This is NOT a diagnosis - only preliminary guidance
2. If symptoms suggest an emergency (stroke, severe trauma, sudden paralysis, severe headache with vision changes, etc.), immediately recommend emergency care
3. Provide general information about when to seek immediate care vs. when a scheduled appointment is appropriate
4. Suggest relevant neurosurgical conditions that might be related (without diagnosing)
5. Always recommend consulting with Dr. Sayuj Krishnan for proper evaluation

Format your response as JSON with the following structure:
{
  "urgency": "emergency" | "urgent" | "routine",
  "recommendation": "Brief recommendation text",
  "possibleConditions": ["condition1", "condition2"],
  "nextSteps": ["step1", "step2"],
  "emergencyContact": "+91-9778280044"
}

Response:`,
      temperature: 0.3,
    });

    // Parse the AI response
    let analysis;
    try {
      const jsonMatch = text.match(/\{[\s\S]*?\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (error) {
      console.error('Error parsing AI response:', error);
      // Fallback response
      analysis = {
        urgency: 'routine',
        recommendation: 'Please consult with Dr. Sayuj Krishnan for proper evaluation of your symptoms.',
        possibleConditions: [],
        nextSteps: ['Schedule an appointment', 'Call +91-9778280044 for immediate concerns'],
        emergencyContact: '+91-9778280044',
      };
    }

    return NextResponse.json({
      analysis,
      disclaimer: 'This is preliminary guidance only and does not constitute a medical diagnosis. Always consult with a qualified healthcare provider.',
    });

  } catch (error) {
    console.error('Error analyzing symptoms:', error);
    return NextResponse.json(
      { error: 'Failed to analyze symptoms' },
      { status: 500 }
    );
  }
}

