/**
 * Enhanced Chatbot Integration Example
 * 
 * This shows how to integrate Gemini File API with your existing OpenAI chatbot
 * to provide document-backed answers.
 */

// ============================================================================
// ENHANCED CHATBOT WITH GEMINI CONTEXT
// ============================================================================

/**
 * Enhanced version of app/api/openai-chat/route.ts
 * with Gemini File API integration
 */

import { NextRequest, NextResponse } from 'next/server';

interface ChatRequest {
  message: string;
  pageSlug: string;
  service?: string;
  conversationHistory: Array<{
    type: 'user' | 'assistant';
    content: string;
  }>;
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    
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

    // ========================================================================
    // NEW: Get relevant context from Gemini File API
    // ========================================================================
    let geminiContext = '';
    let geminiSources: any[] = [];
    
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                     process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                     'http://localhost:3000';
      
      const geminiResponse = await fetch(`${baseUrl}/api/gemini-files/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: body.message,
          searchType: 'medical',
          maxResults: 3,
          category: body.service || undefined
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

    // Prepare conversation history for OpenAI
    const messages = [
      {
        role: 'system',
        content: `You are Dr. Sayuj Krishnan's AI assistant for a neurosurgery practice in Hyderabad, India. Your role is to help patients book appointments and provide information about neurosurgical conditions and treatments.

Key information about Dr. Sayuj Krishnan:
- Neurosurgeon specializing in minimally invasive brain and spine surgery
- Located at Yashoda Hospital, Room 317, OPD Block, Malakpet, Hyderabad
- Phone: +91-9778280044
- Email: hellodr@drsayuj.info
- Specializes in: Endoscopic spine surgery, brain tumor surgery, epilepsy surgery, trigeminal neuralgia treatment

${geminiContext ? `\nIMPORTANT: Use the following document-backed information when answering questions. This information comes from our medical documents and should be prioritized:${geminiContext}\n\nWhen referencing this information, mention that it's based on our medical documents.` : ''}

Your capabilities:
1. Help patients book appointments
2. Provide information about neurosurgical conditions
3. Detect emergency situations and provide appropriate guidance
4. Answer questions about procedures and treatments
5. Provide contact information and location details

Emergency detection: If a patient mentions symptoms like stroke, seizure, severe headache, sudden weakness, paralysis, loss of vision, severe neck pain, trauma, or accident, immediately direct them to call +91-9778280044 or visit the nearest emergency room.

Always be professional, empathetic, and prioritize patient safety. If you're unsure about medical advice, recommend consulting with Dr. Sayuj directly.`
      },
      // Add conversation history
      ...body.conversationHistory.map(msg => ({
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
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Use a cost-effective model
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
        stream: false
      }),
    });

    if (!openaiResponse.ok) {
      throw new Error(`OpenAI API error: ${openaiResponse.status}`);
    }

    const data = await openaiResponse.json();
    const aiResponse = data.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please call us directly at +91-9778280044.";

    // Log the interaction
    console.log('OpenAI Chat Interaction:', {
      timestamp: new Date().toISOString(),
      pageSlug: body.pageSlug,
      service: body.service,
      userMessage: body.message,
      aiResponse: aiResponse.substring(0, 100) + '...',
      geminiContextUsed: !!geminiContext,
      geminiSources: geminiSources.length
    });

    return NextResponse.json({
      response: aiResponse,
      usage: data.usage,
      // Include sources if available
      sources: geminiSources.length > 0 ? geminiSources : undefined
    });

  } catch (error) {
    console.error('Error processing OpenAI chat request:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        response: "I apologize, but I'm having trouble processing your request right now. Please call us directly at +91-9778280044 for immediate assistance."
      },
      { status: 500 }
    );
  }
}

// ============================================================================
// USAGE INSTRUCTIONS
// ============================================================================

/**
 * To integrate this enhanced chatbot:
 * 
 * 1. Replace the content of app/api/openai-chat/route.ts with this code
 * 
 * 2. Make sure GEMINI_API_KEY is set in .env.local
 * 
 * 3. Test with a medical question:
 *    curl -X POST http://localhost:3000/api/openai-chat \
 *      -H "Content-Type: application/json" \
 *      -d '{
 *        "message": "What are the treatment options for brain tumors?",
 *        "pageSlug": "test",
 *        "conversationHistory": []
 *      }'
 * 
 * 4. The chatbot will now:
 *    - Search your medical documents via Gemini
 *    - Include relevant context in the OpenAI prompt
 *    - Provide source citations
 *    - Give more accurate, document-backed answers
 * 
 * Benefits:
 * ✅ More accurate answers backed by your documents
 * ✅ Source citations for transparency
 * ✅ Reduced hallucinations
 * ✅ Up-to-date information from your documents
 */

