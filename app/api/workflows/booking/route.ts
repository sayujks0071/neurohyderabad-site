/**
 * Appointment Booking Workflow API Route
 *
 * Triggers the appointment booking workflow
 */

import { start } from "workflow/api";
import { handleAppointmentBooking } from "@/workflows/appointment-booking";
import { generateBookingConfirmation } from "@/src/lib/appointments/gemini";
import type { BookingData } from "@/packages/appointment-form/types";
import { NextRequest, NextResponse } from "next/server";

type WorkflowAppointmentType = "new-consultation" | "follow-up" | "second-opinion";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body.name ?? body.patientName ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const preferredDate = String(body.preferredDate ?? body.appointmentDate ?? "").trim();
    const preferredTime = String(body.preferredTime ?? body.appointmentTime ?? "").trim();
    const appointmentTypeRaw =
      typeof body.appointmentType === "string" ? body.appointmentType.trim() : "";
    const appointmentType = (
      ["new-consultation", "follow-up", "second-opinion"] as const
    ).includes(appointmentTypeRaw as WorkflowAppointmentType)
      ? (appointmentTypeRaw as WorkflowAppointmentType)
      : "new-consultation";
    const chiefComplaint = String(body.chiefComplaint ?? body.symptoms ?? "").trim();
    const intakeNotes =
      typeof body.intakeNotes === "string" ? body.intakeNotes.trim() : "";
    const ageValue = body.age == null ? "" : String(body.age).trim();
    const genderRaw =
      typeof body.gender === "string" ? body.gender.trim().toLowerCase() : "";
    const gender = (["male", "female", "other"] as const).includes(
      genderRaw as "male" | "female" | "other"
    )
      ? (genderRaw as BookingData["gender"])
      : "";
    const painScore =
      typeof body.painScore === "number"
        ? body.painScore
        : body.painScore
        ? Number(body.painScore)
        : undefined;
    const mriScanAvailable =
      typeof body.mriScanAvailable === "boolean" ? body.mriScanAvailable : undefined;
    const source = typeof body.source === "string" ? body.source : undefined;
    const hasEmergencySymptoms = Boolean(body.hasEmergencySymptoms);

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

    const appointmentTime = preferredTime || "10:00";
    const bookingReason = intakeNotes || chiefComplaint;
    const booking: BookingData = {
      patientName: name,
      email,
      phone,
      age: ageValue,
      gender,
      appointmentDate: preferredDate,
      appointmentTime,
      reason: bookingReason,
      painScore,
      mriScanAvailable,
    };
    const { message: confirmationMessage, usedAI } =
      await generateBookingConfirmation(booking);

    console.log(`[API] Starting appointment booking workflow for ${name}`);

    const patientInfo = {
      name,
      email,
      phone,
      preferredDate,
      preferredTime: appointmentTime,
      appointmentType,
      chiefComplaint,
      hasEmergencySymptoms,
      intakeNotes: intakeNotes || undefined,
      age: ageValue || undefined,
      gender,
      painScore,
      mriScanAvailable,
      source,
      confirmationMessage,
      usedAI,
    };

    // Start the workflow (executes asynchronously)
    // Note: start() returns a Run<T> which executes the workflow
    // The workflow ID can be viewed in the Workflow DevKit Web UI (npx workflow web)
    const run = await start(handleAppointmentBooking, [patientInfo]);

    return NextResponse.json({
      message: "Appointment booking workflow started successfully",
      patientName: name,
      status: "processing",
      runId: run.runId,
      confirmationMessage,
      usedAI,
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
