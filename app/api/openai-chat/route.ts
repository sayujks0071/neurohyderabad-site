import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';
import { getTextModel, hasAIConfig } from '@/src/lib/ai/gateway';
import { DR_SAYUJ_SYSTEM_PROMPT } from '@/src/lib/ai/prompts';
import { rateLimit } from '@/src/lib/rate-limit';

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
  // 🛡️ Sentinel: Rate limit to prevent DoS/wallet draining
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const limit = rateLimit(ip, 5, 60 * 1000); // 5 requests per minute

  if (!limit.success) {
    return NextResponse.json(
      {
        error: 'Too many requests',
        response: "I'm receiving too many messages right now. Please try again in a minute."
      },
      { status: 429 }
    );
  }

  try {
    const body: ChatRequest = await request.json();
    
    if (!body.message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Check if AI configuration is available
    if (!hasAIConfig()) {
      return NextResponse.json(
        { 
          error: 'AI service not configured',
          response: "I apologize, but the AI service is not currently available. Please call us directly at +91-9778280044 for immediate assistance."
        },
        { status: 500 }
      );
    }

    // ========================================================================
    // Get relevant context from Gemini File API
    // ========================================================================
    let geminiContext = '';
    let geminiSources: any[] = [];
    
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                     (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                     'http://localhost:3000');
      
      const geminiResponse = await fetch(`${baseUrl}/api/gemini-files/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': process.env.ADMIN_ACCESS_KEY || ''
        },
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
        content: `${DR_SAYUJ_SYSTEM_PROMPT}${geminiContext ? `\n\nADDITIONAL DOCUMENT CONTEXT:\n${geminiContext}` : ''}`
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

    // Call AI via Gateway
    const { text: aiResponse, usage } = await generateText({
      model: getTextModel(), // defaults to gpt-4o-mini
      messages: messages as any,
      maxOutputTokens: 500,
      temperature: 0.7,
    });

    const usageData = {
      prompt_tokens: usage.inputTokens || 0,
      completion_tokens: usage.outputTokens || 0,
      total_tokens: usage.totalTokens || 0
    };

    // Log the interaction
    console.log('OpenAI Chat Interaction:', {
      timestamp: new Date().toISOString(),
      pageSlug: body.pageSlug,
      service: body.service,
      userMessage: body.message,
      aiResponse: aiResponse.substring(0, 100) + '...', // Log first 100 chars for privacy
      geminiContextUsed: !!geminiContext,
      geminiSources: geminiSources.length
    });

    return NextResponse.json({
      response: aiResponse || "I apologize, but I couldn't generate a response. Please call us directly at +91-9778280044.",
      usage: usageData,
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

export async function GET() {
  return NextResponse.json({
    message: 'OpenAI Chat API is running',
    version: '1.0.0',
    features: [
      'GPT-4 powered responses',
      'Medical appointment booking',
      'Emergency detection',
      'Conversation history',
      'Context-aware responses',
      'Document-backed answers (Gemini File API)',
      'Source citations'
    ]
  });
}
