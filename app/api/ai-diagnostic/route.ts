import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';
import { getTextModel, hasAIConfig } from '@/src/lib/ai/gateway';
import { rateLimit } from '@/src/lib/rate-limit';
import { verifyAdminAccess } from '@/src/lib/security';

export async function POST(request: NextRequest) {
  // 1. Rate Limit (10 requests per hour per IP)
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";
  const { success } = rateLimit(ip, 10, 60 * 60 * 1000);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // 2. Auth Check
  const auth = await verifyAdminAccess(request);
  if (!auth.isAuthorized) {
    return auth.response!;
  }

  try {
    const { issue, headers, response } = await request.json();

    if (!hasAIConfig()) {
      return NextResponse.json({ 
        error: 'AI service not configured'
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

    const { text: analysis } = await generateText({
      model: getTextModel('gpt-4o'),
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
      maxOutputTokens: 1000,
      temperature: 0.1
    });

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

export async function GET(request: NextRequest) {
  // Protect documentation endpoint as well
  const auth = await verifyAdminAccess(request);
  if (!auth.isAuthorized) {
    return auth.response!;
  }

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
