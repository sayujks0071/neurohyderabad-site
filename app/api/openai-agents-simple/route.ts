import { NextRequest, NextResponse } from 'next/server';
import { DR_SAYUJ_SYSTEM_PROMPT } from '@/src/lib/ai/prompts';

export async function POST(request: NextRequest) {
  let body: any = null;
  
  try {
    body = await request.json();
    
    if (!body.message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key not configured');
      return NextResponse.json(
        { 
          error: 'OpenAI API key not configured',
          response: "I apologize, but the AI service is not currently available. Please call us directly at +91-9778280044 for immediate assistance."
        },
        { status: 500 }
      );
    }

    // Get relevant context from Gemini File API (non-blocking)
    let geminiContext = '';
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                     (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                     'http://localhost:3000');
      
      const geminiResponse = await fetch(`${baseUrl}/api/gemini-files/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: body.message,
          searchType: 'medical',
          maxResults: 2,
        })
      });
      
      if (geminiResponse.ok) {
        const geminiData = await geminiResponse.json();
        if (geminiData.answer) {
          geminiContext = `\n\nRELEVANT MEDICAL INFORMATION FROM OUR DOCUMENTS:\n${geminiData.answer.substring(0, 500)}\n`;
        }
      }
    } catch (error) {
      console.error('Gemini context error (non-fatal):', error);
      // Continue without context if Gemini fails
    }

    // Emergency detection keywords
    const emergencyKeywords = [
      'stroke', 'seizure', 'unconscious', 'severe headache', 'sudden weakness',
      'paralysis', 'loss of vision', 'severe neck pain', 'trauma', 'accident',
      'emergency', 'urgent', 'critical', 'immediate', 'can\'t move', 'numbness',
      'confusion', 'difficulty speaking', 'facial droop', 'severe dizziness'
    ];

    const isEmergency = emergencyKeywords.some(keyword => 
      body.message.toLowerCase().includes(keyword)
    );

    if (isEmergency) {
      return NextResponse.json({
        response: "🚨 This sounds urgent. Please proceed to Yashoda Hospitals Emergency, Malakpet or call +91-9778280044 immediately. Do not wait for an online booking.",
        action: "handoff_emergency",
        data: {},
        isEmergency: true
      });
    }

    // Prepare conversation history for OpenAI
    const messages = [
      {
        role: 'system',
        content: `${DR_SAYUJ_SYSTEM_PROMPT}${geminiContext ? `\n\nADDITIONAL DOCUMENT CONTEXT:\n${geminiContext}` : ''}`
      },
      // Add conversation history if provided
      ...(body.conversationHistory || []).map((msg: any) => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      // Add current message
      {
        role: 'user',
        content: body.message
      }
    ];

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 500,
        temperature: 0.7,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const completion = await response.json();
    const aiResponse = completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please call us directly at +91-9778280044.";

    // Determine action based on response content
    let action = "fallback_manual";
    if (aiResponse.toLowerCase().includes("book") || aiResponse.toLowerCase().includes("appointment")) {
      action = "propose_slots";
    } else if (aiResponse.toLowerCase().includes("reschedule") || aiResponse.toLowerCase().includes("cancel")) {
      action = "booking_rescheduled";
    } else if (aiResponse.toLowerCase().includes("information") || aiResponse.toLowerCase().includes("hours") || aiResponse.toLowerCase().includes("location")) {
      action = "get_info";
    }

    // Log the interaction
    console.log('OpenAI Agents Interaction:', {
      timestamp: new Date().toISOString(),
      pageSlug: body.pageSlug,
      service: body.service,
      userMessage: body.message,
      aiResponse: aiResponse.substring(0, 100) + '...', // Log first 100 chars for privacy
      action: action
    });

    return NextResponse.json({
      response: aiResponse,
      action: action,
      data: {},
      isEmergency: false
    });

  } catch (error) {
    console.error('Error processing OpenAI agents request:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    // Log full error details for debugging
    console.error('Full error details:', {
      message: errorMessage,
      stack: errorStack,
      userMessage: body?.message || 'Unknown',
    });
    
    // Provide more specific error messages
    if (errorMessage.includes('API key') || errorMessage.includes('401') || errorMessage.includes('403')) {
      return NextResponse.json(
        { 
          error: 'OpenAI API key issue',
          response: "I apologize, but the AI service is not currently available. Please call us directly at +91-9778280044 for immediate assistance."
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        response: "I apologize, but I'm having trouble processing your request right now. Please call us directly at +91-9778280044 for immediate assistance.",
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'OpenAI Agents API is running',
    version: '1.0.0',
    features: [
      'GPT-4 powered responses',
      'Medical appointment booking',
      'Emergency detection',
      'Conversation history',
      'Context-aware responses'
    ]
  });
}
