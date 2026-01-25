import { generateText } from 'ai';
import { NextRequest } from 'next/server';
import { rateLimit } from '../../../../src/lib/rate-limit';
import { getTextModel, hasAIConfig } from '@/src/lib/ai/gateway';
import { DR_SAYUJ_SYSTEM_PROMPT } from '@/src/lib/ai/prompts';
import { getDefaultFlagValues, reportFlagValues } from '@/src/lib/flags';

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

    reportFlagValues(getDefaultFlagValues());

    // Get relevant context from MCP/Codex CLI (replaces Gemini File API)
    // Use Promise.race with timeout to prevent blocking
    let medicalContext = '';
    let medicalSources: any[] = [];
    
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                     (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                     'http://localhost:3000');
      
      // Add timeout to prevent blocking (5 seconds max)
      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('MCP context timeout')), 5000)
      );
      
      // Use MCP/Codex CLI instead of direct Gemini call
      const mcpFetch = fetch(`${baseUrl}/api/mcp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: Date.now(),
          method: 'tools/call',
          params: {
            name: 'get_medical_info',
            arguments: {
              query: message
            }
          }
        })
      });
      
      const mcpResponse = await Promise.race([mcpFetch, timeoutPromise]);
      
      if (mcpResponse.ok) {
        const mcpData = await mcpResponse.json();
        
        // Check for MCP errors
        if (mcpData.error) {
          console.warn('MCP returned error:', mcpData.error);
        } else if (mcpData.result) {
          const medicalText = mcpData.result?.content?.[0]?.text || '';
          const sources = mcpData.result?.metadata?.sources || [];
          
          if (medicalText && medicalText !== 'No specific match found.') {
            medicalContext = `\n\nRELEVANT MEDICAL INFORMATION FROM OUR DOCUMENTS:\n${medicalText}\n`;
            medicalSources = sources;
            
            if (medicalSources.length > 0) {
              medicalContext += `\nSources: ${medicalSources.map((s: any) => s.fileName || s.uri || s).join(', ')}\n`;
            }
          }
        }
      } else {
        // Log non-OK responses but don't fail
        const errorText = await mcpResponse.text().catch(() => 'Unknown error');
        console.warn('MCP response not OK:', mcpResponse.status, errorText);
      }
    } catch (error) {
      // Non-fatal: continue without context if MCP fails or times out
      console.warn('MCP/Codex context error (non-fatal, continuing without context):', error instanceof Error ? error.message : error);
    }

    // Build system prompt
    const systemPrompt = `${DR_SAYUJ_SYSTEM_PROMPT}${medicalContext ? `\n\nADDITIONAL DOCUMENT CONTEXT:\n${medicalContext}` : ''}`;

    // Build messages array
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...conversationHistory.map((msg: any) => ({
        role: (msg.type === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
        content: msg.content
      })),
      { role: 'user' as const, content: message }
    ];

    // Use AI SDK's generateText for non-streaming response (more reliable across browsers)
    try {
      const result = await generateText({
        model: getTextModel(),
        messages,
        temperature: 0.7,
      });

      // Return JSON response (non-streaming for better browser compatibility)
      return Response.json({
        content: result.text,
        sources: medicalSources,
      });
    } catch (generateError) {
      console.error('generateText error:', generateError);
      return Response.json(
        {
          error: 'Generation error',
          message: "I'm having trouble generating a response right now. Please try again or call +91-9778280044 for immediate assistance."
        },
        { status: 500 }
      );
    }

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
