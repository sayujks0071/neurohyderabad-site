import { generateText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { getAIClient, getGatewayModel, isAIGatewayConfigured, hasAIConfig } from '@/src/lib/ai/gateway';

/**
 * Article Summarization API using Vercel AI SDK
 * 
 * Summarizes long articles/blog posts for better readability
 */
export async function POST(request: NextRequest) {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/37f587f9-602c-49e5-81c0-d4a64a031329',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/ai/summarize/route.ts:11',message:'POST handler entry',data:{hasOpenAIKey:!!process.env.OPENAI_API_KEY,hasGatewayKey:!!process.env.AI_GATEWAY_API_KEY,hasGatewayURL:!!process.env.AI_GATEWAY_BASE_URL},timestamp:Date.now(),sessionId:'debug-session',runId:'summary-debug',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  try {
    const body = await request.json();
    const { content, maxLength = 200 } = body;

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    // #region agent log
    const isGatewayConfigured = isAIGatewayConfigured();
    const hasOpenAIKey = !!process.env.OPENAI_API_KEY;
    const hasAIConfigValue = hasAIConfig();
    fetch('http://127.0.0.1:7242/ingest/37f587f9-602c-49e5-81c0-d4a64a031329',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/ai/summarize/route.ts:22',message:'AI config check',data:{isGatewayConfigured,hasOpenAIKey,hasAIConfig:hasAIConfigValue,contentLength:content?.length},timestamp:Date.now(),sessionId:'debug-session',runId:'summary-debug',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    if (!hasAIConfigValue) {
      return NextResponse.json(
        { error: 'AI Gateway API key or OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/37f587f9-602c-49e5-81c0-d4a64a031329',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/ai/summarize/route.ts:30',message:'Before getAIClient()',data:{isGatewayConfigured},timestamp:Date.now(),sessionId:'debug-session',runId:'summary-debug',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    const aiClient = getAIClient();
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/37f587f9-602c-49e5-81c0-d4a64a031329',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/ai/summarize/route.ts:32',message:'After getAIClient()',data:{aiClientType:typeof aiClient,isFunction:typeof aiClient === 'function'},timestamp:Date.now(),sessionId:'debug-session',runId:'summary-debug',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    const modelName = isGatewayConfigured 
      ? getGatewayModel('gpt-4o-mini')
      : 'gpt-4o-mini';
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/37f587f9-602c-49e5-81c0-d4a64a031329',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/ai/summarize/route.ts:35',message:'Model name determined',data:{modelName,isGatewayConfigured},timestamp:Date.now(),sessionId:'debug-session',runId:'summary-debug',hypothesisId:'C'})}).catch(()=>{});
    // #endregion

    // Use AI SDK's generateText for summarization
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/37f587f9-602c-49e5-81c0-d4a64a031329',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/ai/summarize/route.ts:50',message:'Before generateText call',data:{modelName,promptLength:38 + content.length + 9},timestamp:Date.now(),sessionId:'debug-session',runId:'summary-debug',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    const { text } = await generateText({
      model: aiClient(modelName),
      prompt: `Summarize the following medical article in approximately ${maxLength} words. Focus on key points, main findings, and actionable information. Keep it concise and easy to understand:

${content}

Summary:`,
      temperature: 0.3, // Lower temperature for more factual summaries
    });
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/37f587f9-602c-49e5-81c0-d4a64a031329',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/ai/summarize/route.ts:60',message:'After generateText call',data:{textLength:text?.length,hasText:!!text},timestamp:Date.now(),sessionId:'debug-session',runId:'summary-debug',hypothesisId:'D'})}).catch(()=>{});
    // #endregion

    return NextResponse.json({
      summary: text,
      originalLength: content.length,
      summaryLength: text.length,
    });

  } catch (error) {
    // #region agent log
    const errorDetails = {
      errorMessage: error instanceof Error ? error.message : String(error),
      errorStack: error instanceof Error ? error.stack : undefined,
      errorName: error instanceof Error ? error.name : typeof error,
    };
    fetch('http://127.0.0.1:7242/ingest/37f587f9-602c-49e5-81c0-d4a64a031329',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/api/ai/summarize/route.ts:65',message:'Error caught in catch block',data:errorDetails,timestamp:Date.now(),sessionId:'debug-session',runId:'summary-debug',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    console.error('Error generating summary:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate summary',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

