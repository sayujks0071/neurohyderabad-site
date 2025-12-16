/**
 * Patient Education Workflow API Route
 *
 * Triggers the patient education workflow
 */

import { start } from "workflow/api";
import { handlePatientEducation } from "@/workflows/patient-education";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { patientId, condition, treatmentPlan, surgeryDate, email, language } = body;

    // Validate required fields
    if (!patientId || !condition || !email) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          required: ["patientId", "condition", "email"],
        },
        { status: 400 }
      );
    }

    console.log(
      `[API] Starting patient education workflow for patient ${patientId}, condition: ${condition}`
    );

    const educationRequest = {
      patientId,
      condition,
      treatmentPlan,
      surgeryDate,
      email,
      language: language || "en",
    };

    // Start the workflow (executes asynchronously)
    const result = await start(handlePatientEducation, [educationRequest]);

    return NextResponse.json({
      message: "Patient education workflow started successfully",
      workflowId: result.id,
      patientId,
      condition,
      status: "processing",
    });
  } catch (error) {
    console.error("[API] Error starting education workflow:", error);
    return NextResponse.json(
      {
        error: "Failed to start education workflow",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
