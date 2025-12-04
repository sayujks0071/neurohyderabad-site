import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { NextRequest } from 'next/server';

/**
 * Streaming Chat API using Vercel AI SDK
 * 
 * This endpoint provides streaming responses for better UX
 * Uses OpenAI via the AI SDK for consistent API
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationHistory = [], pageSlug, service } = body;

    if (!message) {
      return new Response('Message is required', { status: 400 });
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get relevant context from Gemini File API (optional enhancement)
    let geminiContext = '';
    let geminiSources: any[] = [];
    
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                     (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                     'http://localhost:3000');
      
      const geminiResponse = await fetch(`${baseUrl}/api/gemini-files/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: message,
          searchType: 'medical',
          maxResults: 3,
          category: service || undefined
        })
      });
      
      if (geminiResponse.ok) {
        const geminiData = await geminiResponse.json();
        if (geminiData.answer) {
          geminiContext = `\n\nRELEVANT MEDICAL INFORMATION FROM OUR DOCUMENTS:\n${geminiData.answer}\n`;
          geminiSources = geminiData.sources || [];
          
          if (geminiSources.length > 0) {
            geminiContext += `\nSources: ${geminiSources.map((s: any) => s.fileName || s.uri).join(', ')}\n`;
          }
        }
      }
    } catch (error) {
      console.error('Gemini context error (non-fatal):', error);
      // Continue without context if Gemini fails
    }

    // Build system prompt
    const systemPrompt = `You are Dr. Sayuj Krishnan's AI assistant for a neurosurgery practice in Hyderabad, India. Your role is to help patients book appointments and provide information about neurosurgical conditions and treatments.

Key information about Dr. Sayuj Krishnan:
- Neurosurgeon specializing in minimally invasive brain and spine surgery
- Located at Yashoda Hospital, Room 317, OPD Block, Malakpet, Hyderabad
- Phone: +91-9778280044
- Email: neurospinehyd@drsayuj.com
- Hours: Mon–Sat 10:00–13:00 & 17:00–19:30 IST; Sun closed
- Specializes in: Endoscopic spine surgery, brain tumor surgery, epilepsy surgery, trigeminal neuralgia treatment

${geminiContext ? `\nIMPORTANT: Use the following document-backed information when answering questions. This information comes from our medical documents and should be prioritized:${geminiContext}\n\nWhen referencing this information, mention that it's based on our medical documents.` : ''}

Your capabilities:
1. Help patients book appointments - When a patient wants to book, be helpful and guide them through the process. Ask for their name, preferred date/time, and contact information.
2. Provide information about neurosurgical conditions
3. Detect emergency situations and provide appropriate guidance
4. Answer questions about procedures and treatments
5. Provide contact information and location details
6. Help with rescheduling or cancelling appointments

Emergency detection: If a patient mentions symptoms like stroke, seizure, severe headache, sudden weakness, paralysis, loss of vision, severe neck pain, trauma, or accident, immediately direct them to call +91-9778280044 or visit the nearest emergency room.

For booking appointments, collect:
- Patient name
- Mobile number
- Appointment type (new consultation, follow-up, second opinion)
- Preferred date/time
- Brief description of concern

Always be professional, empathetic, and prioritize patient safety. If you're unsure about medical advice, recommend consulting with Dr. Sayuj directly. Never provide medical diagnosis or treatment advice.`;

    // Build messages array
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...conversationHistory.map((msg: any) => ({
        role: (msg.type === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
        content: msg.content
      })),
      { role: 'user' as const, content: message }
    ];

    // Use AI SDK's streamText for streaming responses
    const result = streamText({
      model: openai('gpt-4o-mini'),
      messages,
      temperature: 0.7,
    });

    // Return streaming response
    return result.toTextStreamResponse({
      headers: {
        'X-Sources': geminiSources.length > 0 ? JSON.stringify(geminiSources) : '',
      },
    });

  } catch (error) {
    console.error('Error processing AI chat request:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: "I apologize, but I'm having trouble processing your request right now. Please call us directly at +91-9778280044 for immediate assistance."
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

