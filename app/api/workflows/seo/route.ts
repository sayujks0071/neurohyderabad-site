/**
 * SEO Workflow API
 * 
 * Triggers SEO optimization workflows for www.drsayuj.info
 */

import { start } from "workflow/api";
import { NextRequest, NextResponse } from "next/server";
import { 
  runDailySEOOptimization, 
  requestUrlIndexing,
  generateSEOReport 
} from "@/workflows/seo-optimization";

// Verify API key for protected endpoints
function verifyApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get("x-api-key");
  const validKey = process.env.WORKFLOW_API_KEY || process.env.CRON_SECRET;
  return apiKey === validKey;
}

/**
 * POST /api/workflows/seo
 * 
 * Start SEO optimization workflow
 * 
 * Body options:
 * - { action: "optimize" } - Run full daily optimization
 * - { action: "index", url: "/path" } - Request indexing for specific URL
 * - { action: "report" } - Generate SEO report
 */
export async function POST(request: NextRequest) {
  try {
    // Verify API key for non-cron requests
    const isCron = request.headers.get("x-vercel-cron") === "true";
    if (!isCron && !verifyApiKey(request)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({ action: "optimize" }));
    const { action, url } = body;

    switch (action) {
      case "optimize": {
        // Start daily SEO optimization (fire and forget)
        const run = await start(runDailySEOOptimization, []);
        
        return NextResponse.json({
          message: "SEO optimization workflow started",
          runId: run.runId,
        });
      }

      case "index": {
        if (!url) {
          return NextResponse.json(
            { error: "URL is required for indexing" },
            { status: 400 }
          );
        }

        // Start indexing workflow and wait for result
        const run = await start(requestUrlIndexing, [url]);
        const result = await run.returnValue;

        return NextResponse.json({
          message: "Indexing request processed",
          runId: run.runId,
          result,
        });
      }

      case "report": {
        // Generate SEO report and wait for result
        const run = await start(generateSEOReport, []);
        const report = await run.returnValue;

        return NextResponse.json({
          message: "SEO report generated",
          runId: run.runId,
          report,
        });
      }

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("[SEO Workflow API] Error:", error);
    return NextResponse.json(
      { error: "Failed to start workflow", details: String(error) },
      { status: 500 }
    );
  }
}

/**
 * GET /api/workflows/seo
 * 
 * Get SEO workflow status or trigger via cron
 */
export async function GET(request: NextRequest) {
  const isCron = request.headers.get("x-vercel-cron") === "true";
  
  if (isCron) {
    // Triggered by Vercel cron - start optimization
    try {
      const run = await start(runDailySEOOptimization, []);
      return NextResponse.json({
        message: "Daily SEO optimization triggered by cron",
        runId: run.runId,
      });
    } catch (error) {
      console.error("[SEO Cron] Error:", error);
      return NextResponse.json(
        { error: "Cron trigger failed" },
        { status: 500 }
      );
    }
  }

  // Return API documentation
  return NextResponse.json({
    endpoint: "/api/workflows/seo",
    description: "SEO optimization workflows for drsayuj.info",
    actions: {
      optimize: "Run full daily SEO optimization",
      index: "Request indexing for a specific URL (requires 'url' param)",
      report: "Generate comprehensive SEO report",
    },
    usage: {
      method: "POST",
      headers: { "x-api-key": "your-api-key" },
      body: { action: "optimize" },
    },
  });
}
