/**
 * Appointment Booking API Route (Direct Implementation)
 *
 * Replaces the Vercel Workflow with direct execution to avoid bundler issues.
 * Performs validation, saves to CRM (Sheets), sends emails (Resend), and integrates with AI.
 */

import { NextRequest, NextResponse } from "next/server";
import type { BookingData } from "@/packages/appointment-form/types";
import { sendConfirmationEmail, sendAdminNotificationEmail } from "@/src/lib/appointments/email";
import { submitToGoogleSheets } from "@/src/lib/google-sheets";
import { buildWebhookPayload, notifyAppointmentWebhooks } from "@/src/lib/appointments/webhooks";
import { appointments } from "@/src/lib/db";
import { inngest } from "@/src/lib/inngest";

type WorkflowAppointmentType = "new-consultation" | "follow-up" | "second-opinion";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Parse and normalize input data
    const name = String(body.name ?? body.patientName ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const preferredDate = String(body.preferredDate ?? body.appointmentDate ?? "").trim();
    const preferredTime = String(body.preferredTime ?? body.appointmentTime ?? "").trim();

    const appointmentTypeRaw = typeof body.appointmentType === "string" ? body.appointmentType.trim() : "";
    const appointmentType = (["new-consultation", "follow-up", "second-opinion"] as const).includes(appointmentTypeRaw as WorkflowAppointmentType)
      ? (appointmentTypeRaw as WorkflowAppointmentType)
      : "new-consultation";

    const chiefComplaint = String(body.chiefComplaint ?? body.symptoms ?? "").trim();
    const intakeNotes = typeof body.intakeNotes === "string" ? body.intakeNotes.trim() : "";
    const ageValue = body.age == null ? "" : String(body.age).trim();

    const genderRaw = typeof body.gender === "string" ? body.gender.trim().toLowerCase() : "";
    const gender = (["male", "female", "other"] as const).includes(genderRaw as "male" | "female" | "other")
      ? (genderRaw as BookingData["gender"])
      : "other"; // Default fallback

    const painScore = typeof body.painScore === "number" ? body.painScore : 5;
    const mriScanAvailable = typeof body.mriScanAvailable === "boolean" ? body.mriScanAvailable : false;
    const source = typeof body.source === "string" ? body.source : undefined;

    // Validate required fields
    if (!name || !email || !phone || !preferredDate || !chiefComplaint || painScore === undefined || mriScanAvailable === undefined) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          required: ["name", "email", "phone", "preferredDate", "chiefComplaint", "painScore", "mriScanAvailable"],
        },
        { status: 400 }
      );
    }

    const bookingReason = intakeNotes || chiefComplaint;
    const booking: BookingData = {
      patientName: name,
      email,
      phone,
      age: ageValue,
      gender,
      appointmentDate: preferredDate,
      appointmentTime: preferredTime || "10:00",
      reason: bookingReason,
      painScore,
      mriScanAvailable,
    };

    const result = await processBooking(booking, {
      source: source || "website",
      appointmentType,
      intakeNotes,
      chiefComplaint: chiefComplaint // Pass original chiefComplaint for DB column
    });

    if (result.success) {
      return NextResponse.json({
        message: result.message,
        patientName: result.patientName,
        status: result.status,
        confirmationMessage: result.confirmationMessage,
        usedAI: result.usedAI,
      });
    } else {
      return NextResponse.json(
        {
          error: result.error || "Failed to process booking",
          message: result.message || "Unknown error",
        },
        { status: 500 }
      );
    }

    // 4. Trigger Webhooks
    await notifyAppointmentWebhooks(
      buildWebhookPayload({
        booking,
        confirmationMessage,
        emailResult: confirmationResult,
        usedAI,
        source,
      })
    );

    // 5. Trigger Analytics Conversion Event
    await inngest.send({
      name: "analytics/conversion",
      data: {
        conversionType: "appointment",
        page: source || "website",
        value: 100,
        timestamp: new Date().toISOString(),
        patientEmail: booking.email,
        patientName: booking.patientName,
        condition: booking.reason,
        userAgent: request.headers.get("user-agent") || undefined,
        referrer: request.headers.get("referer") || undefined,
      },
    });

    console.log(`[API] Booking completed successfully for ${name}`);

    return NextResponse.json({
      message: "Appointment booking processed successfully",
      patientName: name,
      status: "confirmed",
      confirmationMessage,
      usedAI,
    });

  } catch (error) {
    console.error("[API] Error processing booking:", error);
    return NextResponse.json(
      {
        error: "Failed to process booking",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
