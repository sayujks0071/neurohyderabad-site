import { NextRequest, NextResponse } from 'next/server';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const { issue, headers, response } = await request.json();

    if (!OPENAI_API_KEY) {
      return NextResponse.json({ 
        error: 'OpenAI API key not configured' 
      }, { status: 500 });
    }

    const diagnosticPrompt = `
You are a web performance expert. Analyze this website loading issue:

ISSUE: ${issue}

RESPONSE HEADERS:
${JSON.stringify(headers, null, 2)}

RESPONSE BODY INFO:
${JSON.stringify(response, null, 2)}

PROBLEM: The website shows "ERR_CONTENT_DECODING_FAILED" in Chrome/Comet browsers but works in Safari.

ANALYSIS NEEDED:
1. What is causing the compression header/body mismatch?
2. What specific configuration changes are needed?
3. How to fix the Vercel + Next.js compression conflict?
4. Step-by-step solution with exact code changes.

Provide a detailed technical analysis and solution.
`;

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a web performance expert specializing in Next.js, Vercel, and compression issues. Provide detailed technical solutions."
          },
          {
            role: "user",
            content: diagnosticPrompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.1
      })
    });

    if (!openaiResponse.ok) {
      throw new Error(`OpenAI API error: ${openaiResponse.status}`);
    }

    const aiData = await openaiResponse.json();
    const analysis = aiData.choices[0]?.message?.content;

    return NextResponse.json({
      success: true,
      analysis,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI Diagnostic Error:', error);
    return NextResponse.json({
      error: 'Failed to get AI analysis',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'AI Diagnostic API - Send POST with issue details',
    usage: {
      method: 'POST',
      body: {
        issue: 'Description of the problem',
        headers: 'Response headers object',
        response: 'Response body info'
      }
    }
  });
}

















