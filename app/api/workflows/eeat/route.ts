/**
 * E-E-A-T & Medical Authority API
 * 
 * Manage Experience, Expertise, Authoritativeness, and Trustworthiness
 */

import { NextRequest, NextResponse } from "next/server";
import { start } from "workflow/api";
import {
  runEEATAudit,
  auditContentQuality,
  enhanceContentWithEEAT,
  streamEEATMonitoring,
} from "@/workflows/medical-authority";

export const runtime = "nodejs";
export const maxDuration = 300;

/**
 * GET: E-E-A-T status and info
 * POST: Run E-E-A-T audit or content enhancement
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  try {
    if (action === "audit") {
      const run = await start(runEEATAudit, []);
      return NextResponse.json({
        success: true,
        runId: run.runId,
        message: "E-E-A-T audit started",
      });
    }

    if (action === "stream") {
      const duration = parseInt(searchParams.get("duration") || "60", 10);
      const run = await start(streamEEATMonitoring, [duration]);
      return NextResponse.json({
        success: true,
        runId: run.runId,
        message: `E-E-A-T monitoring stream started for ${duration} minutes`,
        streamEndpoint: `/api/workflows/stream/resume/${run.runId}`,
      });
    }

    // Default: return E-E-A-T info
    return NextResponse.json({
      service: "E-E-A-T & Medical Authority",
      description: "Experience, Expertise, Authoritativeness, Trustworthiness optimization",
      doctorCredentials: {
        name: "Dr. Sayuj",
        qualifications: ["MBBS", "MS (General Surgery)", "MCh (Neurosurgery)"],
        specializations: [
          "Minimally Invasive Spine Surgery",
          "Endoscopic Spine Surgery",
          "Brain Tumor Surgery",
        ],
      },
      endpoints: {
        "GET /?action=audit": "Run full E-E-A-T audit",
        "GET /?action=stream&duration=60": "Stream E-E-A-T monitoring",
        "POST / (audit)": "Audit specific content URLs",
        "POST / (enhance)": "Enhance content with E-E-A-T elements",
      },
      factors: {
        experience: "Patient testimonials, case studies, video testimonials",
        expertise: "Medical credentials, publications, citations",
        authoritativeness: "Backlinks, affiliations, awards",
        trustworthiness: "Security, contact info, disclaimers",
      },
    });
  } catch (error) {
    console.error("[E-E-A-T API] Error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Content quality audit for specific URLs
    if (body.action === "audit" && Array.isArray(body.urls)) {
      const run = await start(auditContentQuality, [body.urls]);
      return NextResponse.json({
        success: true,
        runId: run.runId,
        message: `Content quality audit started for ${body.urls.length} pages`,
      });
    }

    // Enhance content with E-E-A-T elements
    if (body.action === "enhance" && body.content && body.topic) {
      const run = await start(enhanceContentWithEEAT, [body.content, body.topic]);
      return NextResponse.json({
        success: true,
        runId: run.runId,
        message: "Content enhancement started",
      });
    }

    // Default: Run full E-E-A-T audit
    const run = await start(runEEATAudit, []);
    
    return NextResponse.json({
      success: true,
      runId: run.runId,
      message: "E-E-A-T audit started",
      description: "Analyzing Experience, Expertise, Authoritativeness, and Trustworthiness signals",
    });
  } catch (error) {
    console.error("[E-E-A-T API] Error:", error);
    return NextResponse.json(
      { error: "Failed to start workflow" },
      { status: 500 }
    );
  }
}
