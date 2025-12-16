/**
 * Follow-Up Care Workflow API Route
 *
 * Triggers the follow-up care workflow
 */

import { start } from "workflow/api";
import { handleFollowUpCare } from "@/workflows/follow-up-care";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      patientId,
      name,
      email,
      phone,
      surgeryDate,
      procedure,
      complications,
      currentSymptoms,
    } = body;

    // Validate required fields
    if (!patientId || !name || !email || !phone || !surgeryDate || !procedure) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          required: [
            "patientId",
            "name",
            "email",
            "phone",
            "surgeryDate",
            "procedure",
          ],
        },
        { status: 400 }
      );
    }

    console.log(
      `[API] Starting follow-up care workflow for patient ${patientId}, procedure: ${procedure}`
    );

    const followUpRequest = {
      patientId,
      name,
      email,
      phone,
      surgeryDate,
      procedure,
      complications: complications || [],
      currentSymptoms: currentSymptoms || [],
    };

    // Start the workflow (executes asynchronously)
    const result = await start(handleFollowUpCare, [followUpRequest]);

    return NextResponse.json({
      message: "Follow-up care workflow started successfully",
      workflowId: result.id,
      patientId,
      procedure,
      status: "processing",
    });
  } catch (error) {
    console.error("[API] Error starting follow-up workflow:", error);
    return NextResponse.json(
      {
        error: "Failed to start follow-up workflow",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
