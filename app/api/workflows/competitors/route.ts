/**
 * Competitor Monitoring API
 * 
 * Track and analyze competitors in Hyderabad neurosurgery market
 */

import { NextRequest, NextResponse } from "next/server";
import { start } from "workflow/api";
import {
  runCompetitorAnalysis,
  streamCompetitorUpdates,
  getCompetitorIntelligence,
} from "@/workflows/competitor-monitor";

export const runtime = "nodejs";
export const maxDuration = 300;

/**
 * GET: Quick competitor intelligence
 * POST: Run full competitor analysis
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  try {
    if (action === "intelligence") {
      const run = await start(getCompetitorIntelligence, []);
      return NextResponse.json({
        success: true,
        runId: run.runId,
        message: "Competitor intelligence gathering started",
      });
    }

    if (action === "stream") {
      const duration = parseInt(searchParams.get("duration") || "60", 10);
      const run = await start(streamCompetitorUpdates, [duration]);
      return NextResponse.json({
        success: true,
        runId: run.runId,
        message: `Competitor monitoring stream started for ${duration} minutes`,
        streamEndpoint: `/api/workflows/stream/resume/${run.runId}`,
      });
    }

    // Default: return competitor list
    return NextResponse.json({
      service: "Competitor Monitoring",
      competitors: {
        direct: [
          { name: "Dr. Raveesh", domain: "drraveesh.com" },
          { name: "Spine Surgeon India", domain: "spinesurgeon.in" },
        ],
        hospitals: [
          { name: "Apollo Hospitals", domain: "apollohospitals.com" },
          { name: "Yashoda Hospitals", domain: "yashoda-hospitals.org" },
          { name: "KIMS Hospital", domain: "kimshospitals.com" },
        ],
      },
      endpoints: {
        "POST /": "Run full competitor analysis",
        "GET /?action=intelligence": "Quick competitor intelligence",
        "GET /?action=stream&duration=60": "Stream real-time updates",
      },
    });
  } catch (error) {
    console.error("[Competitor API] Error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const run = await start(runCompetitorAnalysis, []);
    
    return NextResponse.json({
      success: true,
      runId: run.runId,
      message: "Competitor analysis started",
      description: "Analyzing rankings, content gaps, and opportunities vs competitors",
    });
  } catch (error) {
    console.error("[Competitor API] Error:", error);
    return NextResponse.json(
      { error: "Failed to start workflow" },
      { status: 500 }
    );
  }
}
