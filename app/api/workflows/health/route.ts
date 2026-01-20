/**
 * Site Health Workflow API
 * 
 * Monitors www.drsayuj.info health and uptime
 */

import { start } from "workflow/api";
import { NextRequest, NextResponse } from "next/server";
import { 
  runSiteHealthCheck, 
  quickHealthCheck 
} from "@/workflows/site-health";

// Verify API key for protected endpoints
function verifyApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get("x-api-key");
  const validKey = process.env.WORKFLOW_API_KEY || process.env.CRON_SECRET;
  return apiKey === validKey;
}

/**
 * POST /api/workflows/health
 * 
 * Start health check workflow
 * 
 * Body options:
 * - { action: "full" } - Run comprehensive health check
 * - { action: "quick" } - Quick status check (fast)
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

    const body = await request.json().catch(() => ({ action: "full" }));
    const { action } = body;

    switch (action) {
      case "full": {
        // Start comprehensive health check
        const run = await start(runSiteHealthCheck, []);
        
        // Wait for result since health checks should complete quickly
        const result = await run.returnValue;

        return NextResponse.json({
          message: "Health check completed",
          runId: run.runId,
          result,
        });
      }

      case "quick": {
        // Quick health check - returns immediately
        const run = await start(quickHealthCheck, []);
        const result = await run.returnValue;

        return NextResponse.json({
          message: "Quick health check completed",
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
    console.error("[Health Workflow API] Error:", error);
    return NextResponse.json(
      { error: "Failed to run health check", details: String(error) },
      { status: 500 }
    );
  }
}

/**
 * GET /api/workflows/health
 * 
 * Quick health status endpoint (public for status pages)
 */
export async function GET(request: NextRequest) {
  const isCron = request.headers.get("x-vercel-cron") === "true";

  if (isCron) {
    // Triggered by Vercel cron - run full health check
    try {
      const run = await start(runSiteHealthCheck, []);
      const result = await run.returnValue;

      // Log alerts if any
      if (result.alerts.length > 0) {
        console.warn("[Health Cron] Alerts:", result.alerts);
      }

      return NextResponse.json({
        message: "Health check completed via cron",
        runId: run.runId,
        overall: result.overall,
        alertCount: result.alerts.length,
      });
    } catch (error) {
      console.error("[Health Cron] Error:", error);
      return NextResponse.json(
        { error: "Cron health check failed", status: "unhealthy" },
        { status: 500 }
      );
    }
  }

  // Public quick health check for status pages
  try {
    const run = await start(quickHealthCheck, []);
    const result = await run.returnValue;

    // Add cache headers for status checks
    const headers = new Headers();
    headers.set("Cache-Control", "public, max-age=60, stale-while-revalidate=30");

    return NextResponse.json(
      {
        status: result.status,
        latency: result.latency,
        timestamp: new Date().toISOString(),
        site: "www.drsayuj.info",
      },
      { headers }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "outage",
        error: "Health check failed",
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
