/**
 * API Route: Generate blog posts using Gemini File API context
 * POST /api/blog/generate
 */

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;

type BlogRequestBody = {
  topic: string;
  targetAudience?: string;
  tone?: string;
  wordCount?: number;
  outline?: string[];
  includeSources?: boolean;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as BlogRequestBody;
    const topic = (body.topic || '').trim();
    const targetAudience = (body.targetAudience || 'patients').trim();
    const tone = (body.tone || 'educational yet friendly').trim();
    const wordCount = clampWordCount(body.wordCount);
    const outline =
      Array.isArray(body.outline) && body.outline.length > 0
        ? body.outline.slice(0, 8)
        : undefined;
    const includeSources = body.includeSources !== false;

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

    // STEP 1: Retrieve supporting medical context from the Gemini File API
    const contextResponse = await fetch(`${baseUrl}/api/gemini-files/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchType: 'standard',
        query: `Key evidence-based information, stats, and talking points about ${topic} for neurosurgery patients in Hyderabad.`,
        maxResults: 5,
      }),
    });

    if (!contextResponse.ok) {
      const errorData = await contextResponse.json().catch(() => ({}));
      throw new Error(
        `Failed to gather blog context: ${contextResponse.status} - ${JSON.stringify(errorData)}`
      );
    }

    const contextData = await contextResponse.json();
    const supportingContext = contextData.answer || '';

    // STEP 2: Ask Gemini to generate the blog article using the retrieved context
    const blogPrompt = buildBlogPrompt({
      topic,
      targetAudience,
      tone,
      wordCount,
      outline,
      supportingContext,
    });

    const blogResponse = await fetch(`${baseUrl}/api/gemini-files/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchType: 'standard',
        query: blogPrompt,
        temperature: 0.6,
      }),
    });

    if (!blogResponse.ok) {
      const errorData = await blogResponse.json().catch(() => ({}));
      throw new Error(
        `Failed to generate blog post: ${blogResponse.status} - ${JSON.stringify(errorData)}`
      );
    }

    const blogData = await blogResponse.json();
    const content = blogData.answer?.trim();

    if (!content) {
      throw new Error('Gemini did not return blog content');
    }

    const sources = includeSources
      ? mergeSources(contextData.sources, blogData.sources, contextData.usedFiles, blogData.usedFiles)
      : [];

    return NextResponse.json({
      success: true,
      blogPost: {
        topic,
        targetAudience,
        tone,
        wordCount,
        title: deriveTitle(topic),
        summary: extractSummary(content),
        content,
        outlineUsed: outline,
        sources,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error generating blog post:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate blog post',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Blog generation API',
    usage: 'POST with { topic, targetAudience?, tone?, wordCount?, outline? }',
    example: {
      topic: 'Latest advancements in minimally invasive spine surgery',
      targetAudience: 'patients',
      tone: 'friendly and reassuring',
      wordCount: 900,
    },
  });
}

function clampWordCount(wordCount?: number) {
  if (!wordCount || Number.isNaN(wordCount)) return 800;
  return Math.max(500, Math.min(1500, Math.round(wordCount)));
}

function buildBlogPrompt({
  topic,
  targetAudience,
  tone,
  wordCount,
  outline,
  supportingContext,
}: {
  topic: string;
  targetAudience: string;
  tone: string;
  wordCount: number;
  outline?: string[];
  supportingContext: string;
}) {
  const outlineText = outline
    ? `\nUse this outline (modify if needed for clarity):\n${outline
        .map((section, index) => `${index + 1}. ${section}`)
        .join('\n')}\n`
    : '';

  return `
You are writing a ${wordCount}-word blog post for Dr. Sayuj Krishnan, a neurosurgeon in Hyderabad who specializes in minimally invasive brain and spine surgery.

Topic: ${topic}
Audience: ${targetAudience}
Tone: ${tone} (evidence-based, empathetic, avoids hype)

Requirements:
- Start with a short TL;DR in bold
- Organize content with H2/H3 sections and short paragraphs
- Include at least one bulleted list of practical tips
- Add a "When to contact a neurosurgeon" callout
- Close with a clear CTA to call +91-9778280044 or email hellodr@drsayuj.info
- Cite insights as "Based on our medical library" instead of footnotes

Use this supporting information from verified documents:
${supportingContext || 'No additional context provided.'}
${outlineText}
Return the article in Markdown format.
`;
}

function deriveTitle(topic: string) {
  if (!topic) return 'Neurosurgery Insights';
  const cleaned = topic
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  return cleaned;
}

function extractSummary(content: string) {
  const firstSentence = content.split(/(?<=[.!?])\s+/)[0];
  return firstSentence?.replace(/^\*\*TL;DR\*\*[:\s-]*/i, '').trim();
}

function mergeSources(...sourceGroups: Array<any[] | undefined>) {
  const dedup = new Set<string>();
  sourceGroups.forEach((group) => {
    group?.forEach((entry) => {
      if (typeof entry === 'string') {
        dedup.add(entry);
      } else if (entry?.fileName) {
        dedup.add(entry.fileName);
      } else if (entry?.uri) {
        dedup.add(entry.uri);
      }
    });
  });
  return Array.from(dedup);
}
