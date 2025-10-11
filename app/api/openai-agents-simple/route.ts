import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from "openai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { 
          error: 'OpenAI API key not configured',
          response: "I apologize, but the AI service is not currently available. Please call us directly at +91-9778280044 for immediate assistance."
        },
        { status: 500 }
      );
    }

    // Initialize OpenAI client
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
        response: "🚨 This sounds urgent. Please proceed to Yashoda Hospitals Emergency, Malakpet or call 040-4567 4567. Do not wait for an online booking.",
        action: "handoff_emergency",
        data: {},
        isEmergency: true
      });
    }

    // Prepare conversation history for OpenAI
    const messages = [
      {
        role: 'system',
        content: `You are Dr. Sayuj Krishnan's AI assistant for a neurosurgery practice in Hyderabad, India. Your role is to help patients book appointments and provide information about neurosurgical conditions and treatments.

Key information about Dr. Sayuj Krishnan:
- Neurosurgeon specializing in minimally invasive brain and spine surgery
- Located at Yashoda Hospital, Room 317, OPD Block, Malakpet, Hyderabad
- Phone: +91-9778280044
- Email: neurospinehyd@drsayuj.com
- Hours: Mon–Sat 10:00–13:00 & 17:00–19:30 IST; Sun closed
- Specializes in: Endoscopic spine surgery, brain tumor surgery, epilepsy surgery, trigeminal neuralgia treatment

Your capabilities:
1. Help patients book appointments
2. Provide information about neurosurgical conditions
3. Answer questions about procedures and treatments
4. Provide contact information and location details
5. Help with rescheduling or cancelling appointments

Always be professional, empathetic, and prioritize patient safety. If you're unsure about medical advice, recommend consulting with Dr. Sayuj directly.

For booking appointments, collect:
- Patient name
- Mobile number
- Appointment type (new consultation, follow-up, second opinion)
- Preferred date/time
- Brief description of concern

For information requests, provide accurate details about:
- Clinic hours and location
- What to bring to appointments
- Contact information
- General information about procedures

Never provide medical diagnosis or treatment advice.`
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
    const openaiResponse = await client.chat.completions.create({
      model: 'gpt-4o-mini', // Use a cost-effective model
      messages: messages as any,
      max_tokens: 500,
      temperature: 0.7,
    });

    const aiResponse = openaiResponse.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please call us directly at +91-9778280044.";

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
    return NextResponse.json(
      { 
        error: 'Internal server error',
        response: "I apologize, but I'm having trouble processing your request right now. Please call us directly at +91-9778280044 for immediate assistance."
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
