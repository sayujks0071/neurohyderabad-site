/**
 * Streaming Workflow API
 * 
 * Real-time streaming endpoints for www.drsayuj.info
 */

import { start, getRun } from "workflow/api";
import { NextRequest, NextResponse } from "next/server";
import { 
  streamBlogGeneration,
  streamHealthDashboard,
  streamBatchSEOOptimization,
  streamPatientEducation,
} from "@/workflows/streaming-workflows";

// Verify API key
function verifyApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get("x-api-key");
  const validKey = process.env.WORKFLOW_API_KEY || process.env.CRON_SECRET;
  return apiKey === validKey;
}

/**
 * POST /api/workflows/stream
 * 
 * Start streaming workflows
 * 
 * Body options:
 * - { type: "blog", topic: "...", keywords: [...] } - Stream blog generation
 * - { type: "health", duration: 5 } - Stream health monitoring (minutes)
 * - { type: "seo", tasks: [...] } - Stream SEO optimization
 * - { type: "education", condition: "...", appointmentType: "..." } - Stream patient education
 */
export async function POST(request: NextRequest) {
  try {
    if (!verifyApiKey(request)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { type } = body;

    switch (type) {
      case "blog": {
        const { topic, keywords = [] } = body;
        if (!topic) {
          return NextResponse.json(
            { error: "Topic is required" },
            { status: 400 }
          );
        }

        const run = await start(streamBlogGeneration, [topic, keywords]);

        // Return the stream to the client
        return new Response(run.readable, {
          headers: {
            "Content-Type": "application/x-ndjson",
            "X-Run-Id": run.runId,
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
          },
        });
      }

      case "health": {
        const { duration = 5 } = body;

        const run = await start(streamHealthDashboard, [duration]);

        // Return metrics stream (use namespace for specific stream)
        const metricsStream = run.getReadable({ namespace: "metrics" });

        return new Response(metricsStream, {
          headers: {
            "Content-Type": "application/x-ndjson",
            "X-Run-Id": run.runId,
            "Cache-Control": "no-cache",
          },
        });
      }

      case "seo": {
        const { tasks } = body;
        if (!tasks || !Array.isArray(tasks)) {
          return NextResponse.json(
            { error: "Tasks array is required" },
            { status: 400 }
          );
        }

        const run = await start(streamBatchSEOOptimization, [tasks]);

        return new Response(run.readable, {
          headers: {
            "Content-Type": "application/x-ndjson",
            "X-Run-Id": run.runId,
            "Cache-Control": "no-cache",
          },
        });
      }

      case "education": {
        const { condition, appointmentType = "consultation" } = body;
        if (!condition) {
          return NextResponse.json(
            { error: "Condition is required" },
            { status: 400 }
          );
        }

        const run = await start(streamPatientEducation, [condition, appointmentType]);

        return new Response(run.readable, {
          headers: {
            "Content-Type": "application/x-ndjson",
            "X-Run-Id": run.runId,
            "Cache-Control": "no-cache",
          },
        });
      }

      default:
        return NextResponse.json(
          { error: `Unknown stream type: ${type}` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("[Stream Workflow API] Error:", error);
    return NextResponse.json(
      { error: "Failed to start stream", details: String(error) },
      { status: 500 }
    );
  }
}

/**
 * GET /api/workflows/stream
 * 
 * Get API documentation
 */
export async function GET() {
  return NextResponse.json({
    endpoint: "/api/workflows/stream",
    description: "Real-time streaming workflows for drsayuj.info",
    streams: {
      blog: {
        description: "Stream AI-generated blog content with progress updates",
        body: {
          type: "blog",
          topic: "Best exercises for sciatica relief",
          keywords: ["sciatica", "exercises", "pain relief", "hyderabad"],
        },
        output: "NDJSON stream with progress, content chunks, and status",
      },
      health: {
        description: "Stream live site health metrics",
        body: {
          type: "health",
          duration: 5, // minutes
        },
        output: "NDJSON stream with health metrics (latency, status, etc.)",
      },
      seo: {
        description: "Stream batch SEO optimization progress",
        body: {
          type: "seo",
          tasks: [
            { url: "/services/spine-surgery", type: "meta" },
            { url: "/conditions/slip-disc", type: "schema" },
          ],
        },
        output: "NDJSON stream with task progress and results",
      },
      education: {
        description: "Stream personalized patient education content",
        body: {
          type: "education",
          condition: "herniated disc",
          appointmentType: "consultation",
        },
        output: "NDJSON stream with educational content sections",
      },
    },
    resuming: {
      description: "Resume a stream from a specific point",
      endpoint: "/api/workflows/stream/resume/[runId]?startIndex=N",
    },
  });
}
