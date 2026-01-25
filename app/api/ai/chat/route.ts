import { streamText } from 'ai';
import { NextRequest } from 'next/server';
import { rateLimit } from '../../../../src/lib/rate-limit';
import { getTextModel, hasAIConfig } from '@/src/lib/ai/gateway';
import { DR_SAYUJ_SYSTEM_PROMPT } from '@/src/lib/ai/prompts';

/**
 * Streaming Chat API using Vercel AI SDK
 * 
 * This endpoint provides streaming responses for better UX
 * Uses OpenAI via the AI SDK for consistent API
 */
export async function POST(request: NextRequest) {
  try {
    // 🛡️ Rate Limiting: 10 requests per minute per IP
    const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
    const limit = await rateLimit(ip, 10, 60 * 1000); // 10 requests per minute

    if (!limit.success) {
      return new Response('Too Many Requests', {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.limit.toString(),
          'X-RateLimit-Remaining': limit.remaining.toString(),
          'X-RateLimit-Reset': limit.reset.toString(),
        }
      });
    }

    const body = await request.json();
    const { message, conversationHistory = [], pageSlug, service } = body;

    if (!message) {
      return new Response('Message is required', { status: 400 });
    }

    // Check if AI configuration is available
    if (!hasAIConfig()) {
      return new Response(
        JSON.stringify({ error: 'AI Gateway API key or OpenAI API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get relevant context from Gemini File API (optional enhancement)
    // Use Promise.race with timeout to prevent blocking
    let geminiContext = '';
    let geminiSources: any[] = [];
    
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                     (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                     'http://localhost:3000');
      
      // Add timeout to prevent blocking (5 seconds max)
      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Gemini context timeout')), 5000)
      );
      
      const geminiFetch = fetch(`${baseUrl}/api/gemini-files/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: message,
          searchType: 'medical',
          maxResults: 3,
          category: service || undefined
        })
      });
      
      const geminiResponse = await Promise.race([geminiFetch, timeoutPromise]);
      
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
      // Non-fatal: continue without context if Gemini fails or times out
      console.warn('Gemini context error (non-fatal, continuing without context):', error instanceof Error ? error.message : error);
    }

    // Build system prompt
    const systemPrompt = `${DR_SAYUJ_SYSTEM_PROMPT}${geminiContext ? `\n\nADDITIONAL DOCUMENT CONTEXT:\n${geminiContext}` : ''}`;

    // Build messages array
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...conversationHistory.map((msg: any) => ({
        role: (msg.type === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
        content: msg.content
      })),
      { role: 'user' as const, content: message }
    ];

    // Use AI SDK's streamText with the configured model
    const result = streamText({
      model: getTextModel(),
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
