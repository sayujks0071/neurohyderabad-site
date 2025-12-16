/**
 * Appointment Booking Workflow API Route
 *
 * Triggers the appointment booking workflow
 */

import { start } from "workflow/api";
import { handleAppointmentBooking } from "@/workflows/appointment-booking";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      preferredDate,
      preferredTime,
      appointmentType,
      chiefComplaint,
      hasEmergencySymptoms,
    } = body;

    // Validate required fields
    if (!name || !email || !phone || !preferredDate || !chiefComplaint) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          required: [
            "name",
            "email",
            "phone",
            "preferredDate",
            "chiefComplaint",
          ],
        },
        { status: 400 }
      );
    }

    console.log(`[API] Starting appointment booking workflow for ${name}`);

    const patientInfo = {
      name,
      email,
      phone,
      preferredDate,
      preferredTime: preferredTime || "10:00",
      appointmentType: appointmentType || "new-consultation",
      chiefComplaint,
      hasEmergencySymptoms: hasEmergencySymptoms || false,
    };

    // Start the workflow (executes asynchronously)
    // Note: start() returns a Run<T> which executes the workflow
    // The workflow ID can be viewed in the Workflow DevKit Web UI (npx workflow web)
    await start(handleAppointmentBooking, [patientInfo]);

    return NextResponse.json({
      message: "Appointment booking workflow started successfully",
      patientName: name,
      status: "processing",
      // Workflow execution can be monitored via: npx workflow web
    });
  } catch (error) {
    console.error("[API] Error starting booking workflow:", error);
    return NextResponse.json(
      {
        error: "Failed to start booking workflow",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
