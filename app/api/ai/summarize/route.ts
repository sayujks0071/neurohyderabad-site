import { streamText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { getTextModel, hasAIConfig } from '@/src/lib/ai/gateway';
import { rateLimit } from '@/src/lib/rate-limit';
import { JSDOM } from 'jsdom';

// Required for jsdom
export const runtime = 'nodejs';

/**
 * Article Summarization API using Vercel AI SDK
 * 
 * Summarizes long articles/blog posts for better readability
 * Features:
 * - Streaming response for better UX
 * - Rate limiting (10 req/min)
 * - Vercel AI Gateway integration
 * - URL Content Extraction
 */
export async function POST(request: NextRequest) {
  // 🛡️ Rate Limiting: 10 requests per minute per IP
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  const limit = rateLimit(ip, 10, 60 * 1000);

  if (!limit.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.limit.toString(),
          'X-RateLimit-Remaining': limit.remaining.toString(),
          'X-RateLimit-Reset': limit.reset.toString(),
        }
      }
    );
  }

  let content = '';
  let maxLength = 200;

  try {
    const body = await request.json();
    maxLength = body.maxLength ? Number(body.maxLength) : 200;

    // Handle URL summarization
    if (body.url) {
      try {
        const urlObj = new URL(body.url);
        if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
          throw new Error('Invalid URL protocol. Only http and https are allowed.');
        }
        // Basic SSRF protection
        const hostname = urlObj.hostname;

        // Check for obvious local/private hostnames
        if (hostname === 'localhost' || hostname === '::1' || hostname.endsWith('.local') || hostname.endsWith('.internal')) {
          throw new Error('Restricted URL access.');
        }

        // Check for IPv4 private ranges if hostname is an IP
        // 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, 127.0.0.0/8, 169.254.0.0/16
        const isIP = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);
        if (isIP) {
          const parts = hostname.split('.').map(Number);
          if (
            parts[0] === 10 ||
            (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
            (parts[0] === 192 && parts[1] === 168) ||
            parts[0] === 127 ||
            (parts[0] === 169 && parts[1] === 254)
          ) {
            throw new Error('Restricted URL access (Private IP).');
          }
        }

        const response = await fetch(body.url, {
          redirect: 'error', // Prevent redirects to avoid bypassing initial checks
          headers: {
            'User-Agent': 'DrSayuj-Summarizer/1.0',
            'Accept': 'text/html,application/xhtml+xml,application/xml'
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
        }

        const html = await response.text();
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        // Extract content (prioritize article, then main, then body)
        // Remove scripts and styles first
        const scripts = doc.querySelectorAll('script, style, noscript, iframe, svg');
        scripts.forEach((script: any) => script.remove());

        const article = doc.querySelector('article') || doc.querySelector('main') || doc.body;
        content = article?.textContent || '';

        // Clean up content (remove excessive whitespace)
        content = content.replace(/\s+/g, ' ').trim().substring(0, 15000); // Limit to reasonable size

        if (!content) {
          throw new Error('Could not extract meaningful content from the URL');
        }
      } catch (e) {
        console.error('Error fetching URL:', e);
        return NextResponse.json(
          { error: `Failed to fetch content from URL: ${e instanceof Error ? e.message : String(e)}` },
          { status: 400 }
        );
      }
    } else {
      // Support both prompt (useCompletion default) and content (legacy)
      content = body.prompt || body.content || '';
    }

    if (!content) {
      return NextResponse.json(
        { error: 'Content or URL is required' },
        { status: 400 }
      );
    }

    if (!hasAIConfig()) {
      // Fallback for when AI is not configured
      // Return plain text so useCompletion renders it correctly
      const summary = buildFallbackSummary(content, maxLength);
      return new Response(summary);
    }

    const result = streamText({
      model: getTextModel(),
      prompt: `Summarize the following medical article in approximately ${maxLength} words. Focus on key points, main findings, and actionable information. Keep it concise and easy to understand:

${content}

Summary:`,
      temperature: 0.3, // Lower temperature for more factual summaries
    });

    return result.toTextStreamResponse();

  } catch (error) {
    console.error('Error generating summary:', error);
    if (content) {
      // Use fallback summary on error
      const summary = buildFallbackSummary(content, maxLength);
      return new Response(summary);
    }
    return NextResponse.json(
      { 
        error: 'Failed to generate summary',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function buildFallbackSummary(content: string, maxLength: number) {
  const words = content.trim().split(/\s+/);
  return words.slice(0, Math.max(1, maxLength)).join(' ');
}
