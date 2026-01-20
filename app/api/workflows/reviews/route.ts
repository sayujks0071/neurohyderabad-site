/**
 * Patient Reviews API
 * 
 * Manage patient reviews and testimonials
 */

import { NextRequest, NextResponse } from "next/server";
import { start } from "workflow/api";
import {
  requestPatientReview,
  monitorDailyReviews,
  runReviewCampaign,
  generateReviewInsights,
} from "@/workflows/patient-reviews";

export const runtime = "nodejs";
export const maxDuration = 300;

/**
 * GET: Review stats and insights
 * POST: Request review or run campaign
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  try {
    if (action === "monitor") {
      const run = await start(monitorDailyReviews, []);
      return NextResponse.json({
        success: true,
        runId: run.runId,
        message: "Daily review monitoring started",
      });
    }

    if (action === "insights") {
      const run = await start(generateReviewInsights, []);
      return NextResponse.json({
        success: true,
        runId: run.runId,
        message: "Review insights generation started",
      });
    }

    // Default: return service info
    return NextResponse.json({
      service: "Patient Reviews Management",
      endpoints: {
        "POST /": "Request review from patient",
        "POST / (campaign)": "Run review collection campaign",
        "GET /?action=monitor": "Monitor daily reviews",
        "GET /?action=insights": "Generate review insights",
      },
      platforms: ["Google Business Profile", "Practo", "Lybrate", "Website"],
    });
  } catch (error) {
    console.error("[Reviews API] Error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Check if this is a campaign request
    if (body.campaign && Array.isArray(body.patients)) {
      const run = await start(runReviewCampaign, [body.patients]);
      return NextResponse.json({
        success: true,
        runId: run.runId,
        message: `Review campaign started for ${body.patients.length} patients`,
      });
    }

    // Single patient review request
    const {
      patientId,
      patientName,
      patientEmail,
      patientPhone,
      appointmentDate,
      procedureType,
      satisfactionScore,
    } = body;

    if (!patientId || !patientEmail || !appointmentDate) {
      return NextResponse.json(
        { error: "Missing required fields: patientId, patientEmail, appointmentDate" },
        { status: 400 }
      );
    }

    const run = await start(requestPatientReview, [{
      patientId,
      patientName: patientName || "Patient",
      patientEmail,
      patientPhone: patientPhone || "",
      appointmentDate,
      procedureType: procedureType || "Consultation",
      satisfactionScore,
    }]);

    return NextResponse.json({
      success: true,
      runId: run.runId,
      message: `Review request workflow started for patient ${patientId}`,
    });
  } catch (error) {
    console.error("[Reviews API] Error:", error);
    return NextResponse.json(
      { error: "Failed to start workflow" },
      { status: 500 }
    );
  }
}
