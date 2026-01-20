/**
 * Comprehensive Optimization Workflow API
 * 
 * Runs full site optimization for www.drsayuj.info
 */

import { start } from "workflow/api";
import { NextRequest, NextResponse } from "next/server";
import { 
  runWeeklyOptimization,
  runOptimizationWithCallback,
  runOptimizationWithDeadline,
} from "@/workflows/comprehensive-optimization";

// Verify API key
function verifyApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get("x-api-key");
  const validKey = process.env.WORKFLOW_API_KEY || process.env.CRON_SECRET;
  return apiKey === validKey;
}

/**
 * POST /api/workflows/optimize
 * 
 * Run comprehensive site optimization
 * 
 * Body options:
 * - { mode: "full" } - Run full weekly optimization
 * - { mode: "callback", callbackUrl: "..." } - Run with external callback
 * - { mode: "deadline", minutes: 5 } - Run with time deadline
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

    const body = await request.json().catch(() => ({ mode: "full" }));
    const { mode, callbackUrl, minutes } = body;

    switch (mode) {
      case "full": {
        // Fire and forget - full optimization
        const run = await start(runWeeklyOptimization, []);

        return NextResponse.json({
          message: "Comprehensive optimization started",
          runId: run.runId,
          mode: "full",
        });
      }

      case "callback": {
        if (!callbackUrl) {
          return NextResponse.json(
            { error: "callbackUrl is required for callback mode" },
            { status: 400 }
          );
        }

        // Run with external callback
        const run = await start(runOptimizationWithCallback, [callbackUrl]);

        return NextResponse.json({
          message: "Optimization with callback started",
          runId: run.runId,
          mode: "callback",
          callbackUrl,
        });
      }

      case "deadline": {
        const deadlineMinutes = minutes || 5;

        // Run with deadline and wait for result
        const run = await start(runOptimizationWithDeadline, [deadlineMinutes]);
        const result = await run.returnValue;

        if ("status" in result && result.status === "timeout") {
          return NextResponse.json({
            message: "Optimization timed out",
            runId: run.runId,
            status: "timeout",
            deadlineMinutes,
          }, { status: 408 });
        }

        return NextResponse.json({
          message: "Optimization completed",
          runId: run.runId,
          result,
        });
      }

      default:
        return NextResponse.json(
          { error: `Unknown mode: ${mode}. Use 'full', 'callback', or 'deadline'` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("[Optimize Workflow API] Error:", error);
    return NextResponse.json(
      { error: "Failed to start optimization", details: String(error) },
      { status: 500 }
    );
  }
}

/**
 * GET /api/workflows/optimize
 * 
 * Trigger via cron or get API info
 */
export async function GET(request: NextRequest) {
  const isCron = request.headers.get("x-vercel-cron") === "true";

  if (isCron) {
    // Weekly cron trigger
    try {
      const run = await start(runWeeklyOptimization, []);
      return NextResponse.json({
        message: "Weekly optimization triggered by cron",
        runId: run.runId,
      });
    } catch (error) {
      console.error("[Optimize Cron] Error:", error);
      return NextResponse.json(
        { error: "Cron trigger failed" },
        { status: 500 }
      );
    }
  }

  // Return API documentation
  return NextResponse.json({
    endpoint: "/api/workflows/optimize",
    description: "Comprehensive site optimization for drsayuj.info",
    modes: {
      full: "Run complete weekly optimization (fire & forget)",
      callback: "Run with external webhook callback (requires callbackUrl)",
      deadline: "Run with time deadline (optional 'minutes' param, default 5)",
    },
    phases: [
      "Health & Performance - Parallel endpoint checks",
      "SEO Optimization - Sitemap, schema, meta tags",
      "Content Freshness - Update key page timestamps",
      "Analytics & Reporting - Generate optimization report",
    ],
    usage: {
      method: "POST",
      headers: { "x-api-key": "your-api-key" },
      body: { mode: "full" },
    },
  });
}
