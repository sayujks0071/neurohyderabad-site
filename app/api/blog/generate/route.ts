/**
 * API Route: Generate blog posts using RAG (Gemini Files) + Vercel AI Gateway (OpenAI)
 * POST /api/blog/generate
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';
import { getTextModel } from '@/src/lib/ai/gateway';

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

    // STEP 1: Retrieve supporting medical context from the Gemini File API (RAG)
    // We use 'medical' search type to ensure we search across uploaded documents
    const contextResponse = await fetch(`${baseUrl}/api/gemini-files/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchType: 'medical', // CHANGED: Use medical search to access file content
        query: `Key evidence-based information, stats, and talking points about ${topic} for neurosurgery patients in Hyderabad.`,
        category: 'blog-context',
        maxResults: 5,
        temperature: 0.3,
      }),
    });

    let supportingContext = '';
    let sources: any[] = [];
    let usedFiles: string[] = [];

    if (contextResponse.ok) {
      const contextData = await contextResponse.json();
      supportingContext = contextData.answer || '';
      sources = contextData.sources || [];
      usedFiles = contextData.usedFiles || [];
    } else {
      console.warn('Failed to retrieve blog context from Gemini, proceeding with general knowledge.');
    }

    // STEP 2: Generate the blog article using Vercel AI Gateway (OpenAI)
    // This leverages the Gateway for budget management, monitoring, and quality
    const blogPrompt = buildBlogPrompt({
      topic,
      targetAudience,
      tone,
      wordCount,
      outline,
      supportingContext,
    });

    const { text: content } = await generateText({
      model: getTextModel(), // Uses 'gpt-4o-mini' via Vercel AI Gateway
      prompt: blogPrompt,
      temperature: 0.7,
      maxOutputTokens: 4000, // Ensure enough tokens for a full blog post
    });

    if (!content) {
      throw new Error('AI did not return blog content');
    }

    // Filter sources to only include unique ones
    const finalSources = includeSources
      ? mergeSources(sources, usedFiles)
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
        sources: finalSources,
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
    message: 'Blog generation API (RAG + Vercel AI Gateway)',
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
  return Math.max(500, Math.min(2000, Math.round(wordCount))); // Increased max to 2000 for OpenAI
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
You are Dr. Sayuj Krishnan's expert medical content writer. You are writing a ${wordCount}-word blog post for his website.
Dr. Sayuj is a neurosurgeon in Hyderabad specializing in minimally invasive brain and spine surgery.

Topic: ${topic}
Audience: ${targetAudience}
Tone: ${tone} (evidence-based, empathetic, professional, avoids hype)

### Context from Medical Library (RAG):
${supportingContext || 'No specific documents found. Use general medical knowledge with caution.'}

### Requirements:
1. **Structure:**
   - Catchy Title (H1)
   - **TL;DR** section at the top (bold, bullet points)
   - Engaging Introduction
   - Well-structured Body with H2 and H3 headings
   - "When to see a doctor" section
   - Conclusion with Call to Action (CTA)

2. **Content Guidelines:**
   - Use simple, patient-friendly language (Flesch-Kincaid Grade 8-10).
   - Be medically accurate but accessible.
   - Mention "Dr. Sayuj Krishnan" and "Yashoda Hospitals, Malakpet" naturally where appropriate.
   - Include a "Key Takeaways" or "Tips" section.

3. **Call to Action (CTA):**
   - "For expert evaluation, book an appointment with Dr. Sayuj Krishnan at Yashoda Hospitals, Malakpet."
   - Phone: +91-9778280044
   - Email: hellodr@drsayuj.info

4. **Formatting:**
   - Return strictly Markdown.
   - No pre-amble or post-script (just the article).

${outlineText}
`;
}

function deriveTitle(topic: string) {
  if (!topic) return 'Neurosurgery Insights';
  // Simple title derivation, usually the AI generates a title in the content which is better
  const cleaned = topic
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  return cleaned;
}

function extractSummary(content: string) {
  // improved summary extraction
  const tldrMatch = content.match(/\*\*TL;DR\*\*[:\s-]*([\s\S]*?)(?=\n#|\n\n)/i);
  if (tldrMatch && tldrMatch[1]) {
    return tldrMatch[1].trim();
  }

  const firstSentence = content.split(/(?<=[.!?])\s+/)[0];
  return firstSentence?.replace(/^\*\*TL;DR\*\*[:\s-]*/i, '').trim();
}

function mergeSources(sources: any[] | undefined, usedFiles: any[] | undefined) {
  const dedup = new Set<string>();

  // Add sources from metadata
  sources?.forEach((entry) => {
    if (typeof entry === 'string') {
      dedup.add(entry);
    } else if (entry?.fileName) {
      dedup.add(entry.fileName);
    } else if (entry?.displayName) {
      dedup.add(entry.displayName);
    } else if (entry?.fileUri) {
      // clean up file uri to get name if possible
      const name = entry.fileUri.split('/').pop();
      dedup.add(name || entry.fileUri);
    }
  });

  // Add used files
  usedFiles?.forEach((entry) => {
    if (typeof entry === 'string') {
      const name = entry.split('/').pop();
      dedup.add(name || entry);
    }
  });

  return Array.from(dedup);
}
