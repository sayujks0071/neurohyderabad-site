/**
 * Hyderabad SEO Optimization API
 * 
 * Endpoints for Hyderabad-focused neurosurgery SEO
 */

import { NextRequest, NextResponse } from "next/server";
import { start } from "workflow/api";
import {
  runHyderabadSEOOptimization,
  generateLocalityContent,
  monitorGoogleBusinessProfile,
} from "@/workflows/hyderabad-seo";

export const runtime = "nodejs";
export const maxDuration = 300;

/**
 * GET: Quick status or GBP metrics
 * POST: Run full Hyderabad SEO optimization
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  try {
    if (action === "gbp") {
      // Get Google Business Profile metrics
      const run = await start(monitorGoogleBusinessProfile, []);
      return NextResponse.json({
        success: true,
        runId: run.runId,
        message: "GBP monitoring started",
      });
    }

    if (action === "locality") {
      const locality = searchParams.get("locality") || "kondapur";
      const run = await start(generateLocalityContent, [locality]);
      return NextResponse.json({
        success: true,
        runId: run.runId,
        locality,
        message: "Locality content generation started",
      });
    }

    // Default: return info
    return NextResponse.json({
      service: "Hyderabad SEO Optimization",
      endpoints: {
        "POST /": "Run full Hyderabad SEO optimization",
        "GET /?action=gbp": "Monitor Google Business Profile",
        "GET /?action=locality&locality=kondapur": "Generate locality content",
      },
      targetKeywords: [
        "neurosurgeon hyderabad",
        "best neurosurgeon in hyderabad",
        "spine surgeon hyderabad",
        "brain surgeon hyderabad",
      ],
      localities: [
        "kondapur", "gachibowli", "madhapur", "hitech city",
        "jubilee hills", "kukatpally", "secunderabad",
      ],
    });
  } catch (error) {
    console.error("[Hyderabad SEO API] Error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { action } = body;

    if (action === "locality" && body.locality) {
      const run = await start(generateLocalityContent, [body.locality]);
      return NextResponse.json({
        success: true,
        runId: run.runId,
        message: `Locality content generation started for ${body.locality}`,
      });
    }

    // Default: Run full Hyderabad SEO optimization
    const run = await start(runHyderabadSEOOptimization, []);
    
    return NextResponse.json({
      success: true,
      runId: run.runId,
      message: "Hyderabad SEO optimization started",
      description: "Analyzing keywords, local SEO, and competitor data for Hyderabad market",
    });
  } catch (error) {
    console.error("[Hyderabad SEO API] Error:", error);
    return NextResponse.json(
      { error: "Failed to start workflow" },
      { status: 500 }
    );
  }
}
