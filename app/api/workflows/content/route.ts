/**
 * Content Automation Workflow API
 * 
 * Automates content tasks for www.drsayuj.info
 */

import { start } from "workflow/api";
import { NextRequest, NextResponse } from "next/server";
import { 
  runDailyContentOptimization,
  generateBlogOutline,
  optimizeContent,
  scheduleContent
} from "@/workflows/content-automation";

// Verify API key for protected endpoints
function verifyApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get("x-api-key");
  const validKey = process.env.WORKFLOW_API_KEY || process.env.CRON_SECRET;
  return apiKey === validKey;
}

/**
 * POST /api/workflows/content
 * 
 * Start content automation workflow
 * 
 * Body options:
 * - { action: "optimize" } - Run daily content optimization
 * - { action: "outline", topic: "..." } - Generate blog post outline
 * - { action: "seo-check", content: "...", keyword: "..." } - Check content SEO
 * - { action: "schedule", slug: "...", publishDate: "..." } - Schedule content
 */
export async function POST(request: NextRequest) {
  try {
    const isCron = request.headers.get("x-vercel-cron") === "true";
    if (!isCron && !verifyApiKey(request)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({ action: "optimize" }));
    const { action } = body;

    switch (action) {
      case "optimize": {
        // Start daily content optimization (fire and forget)
        const run = await start(runDailyContentOptimization, []);

        return NextResponse.json({
          message: "Content optimization workflow started",
          runId: run.runId,
        });
      }

      case "outline": {
        const { topic } = body;
        if (!topic) {
          return NextResponse.json(
            { error: "Topic is required for outline generation" },
            { status: 400 }
          );
        }

        // Generate blog outline and wait for result
        const run = await start(generateBlogOutline, [topic]);
        const outline = await run.returnValue;

        return NextResponse.json({
          message: "Blog outline generated",
          runId: run.runId,
          outline,
        });
      }

      case "seo-check": {
        const { content, keyword } = body;
        if (!content || !keyword) {
          return NextResponse.json(
            { error: "Content and keyword are required" },
            { status: 400 }
          );
        }

        // Optimize content and wait for result
        const run = await start(optimizeContent, [content, keyword]);
        const result = await run.returnValue;

        return NextResponse.json({
          message: "Content SEO analysis complete",
          runId: run.runId,
          ...result,
        });
      }

      case "schedule": {
        const { slug, publishDate } = body;
        if (!slug || !publishDate) {
          return NextResponse.json(
            { error: "Slug and publishDate are required" },
            { status: 400 }
          );
        }

        const date = new Date(publishDate);
        if (isNaN(date.getTime())) {
          return NextResponse.json(
            { error: "Invalid publishDate format" },
            { status: 400 }
          );
        }

        // Schedule content
        const run = await start(scheduleContent, [slug, date]);
        const result = await run.returnValue;

        return NextResponse.json({
          message: "Content scheduling processed",
          runId: run.runId,
          ...result,
        });
      }

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("[Content Workflow API] Error:", error);
    return NextResponse.json(
      { error: "Failed to start workflow", details: String(error) },
      { status: 500 }
    );
  }
}

/**
 * GET /api/workflows/content
 * 
 * Get content workflow info or trigger via cron
 */
export async function GET(request: NextRequest) {
  const isCron = request.headers.get("x-vercel-cron") === "true";

  if (isCron) {
    // Triggered by Vercel cron - start daily optimization
    try {
      const run = await start(runDailyContentOptimization, []);
      return NextResponse.json({
        message: "Daily content optimization triggered by cron",
        runId: run.runId,
      });
    } catch (error) {
      console.error("[Content Cron] Error:", error);
      return NextResponse.json(
        { error: "Cron trigger failed" },
        { status: 500 }
      );
    }
  }

  // Return API documentation
  return NextResponse.json({
    endpoint: "/api/workflows/content",
    description: "Content automation workflows for drsayuj.info",
    actions: {
      optimize: "Run daily content optimization",
      outline: "Generate blog post outline (requires 'topic' param)",
      "seo-check": "Analyze content for SEO (requires 'content' and 'keyword')",
      schedule: "Schedule content for publishing (requires 'slug' and 'publishDate')",
    },
    usage: {
      method: "POST",
      headers: { "x-api-key": "your-api-key" },
      body: { action: "outline", topic: "Best exercises for sciatica relief" },
    },
  });
}
