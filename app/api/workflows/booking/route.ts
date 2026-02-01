/**
 * Appointment Booking API Route (Direct Implementation)
 *
 * Replaces the Vercel Workflow with direct execution to avoid bundler issues.
 * Performs validation, saves to CRM (Sheets), sends emails (Resend), and integrates with AI.
 */

import { NextRequest, NextResponse } from "next/server";
import { generateBookingConfirmation } from "@/src/lib/appointments/gemini";
import type { BookingData } from "@/packages/appointment-form/types";
import { sendConfirmationEmail, sendAdminNotificationEmail } from "@/src/lib/appointments/email";
import { submitToGoogleSheets } from "@/src/lib/google-sheets";
import { buildWebhookPayload, notifyAppointmentWebhooks } from "@/src/lib/appointments/webhooks";
import { retry } from "@/src/lib/retry";

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

    const painScore = typeof body.painScore === "number" ? body.painScore : undefined;
    const mriScanAvailable = typeof body.mriScanAvailable === "boolean" ? body.mriScanAvailable : undefined;
    const source = typeof body.source === "string" ? body.source : undefined;

    // Validate required fields
    if (!name || !email || !phone || !preferredDate || !chiefComplaint) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          required: ["name", "email", "phone", "preferredDate", "chiefComplaint"],
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

    console.log(`[API] Processing booking for ${name}`);

    // 1. Generate AI Confirmation
    const { message: confirmationMessage, usedAI } = await generateBookingConfirmation(booking);

    // 2. Execute Parallel Actions: Emails & CRM Sync (with Retry)
    // We group these independent operations to minimize total duration.
    const [confirmationResult, adminEmailResult, sheetsResult] = await Promise.all([
      retry(
        () => sendConfirmationEmail(booking, confirmationMessage),
        { name: "send-confirmation-email", predicate: (res) => res.success }
      ),
      retry(
        () => sendAdminNotificationEmail(booking, source),
        { name: "send-admin-email", predicate: (res) => res.success }
      ),
      retry(
        () => submitToGoogleSheets({
          fullName: booking.patientName,
          email: booking.email,
          phone: booking.phone,
          concern: booking.reason.slice(0, 100),
          preferredDate: booking.appointmentDate,
          preferredTime: booking.appointmentTime,
          source: source || "website",
          metadata: {
            age: booking.age,
            gender: booking.gender,
            bookingReason: booking.reason,
            painScore: booking.painScore,
            mriScanAvailable: booking.mriScanAvailable,
          },
        }),
        { name: "sync-google-sheets", predicate: (res) => res.success }
      ),
    ]);

    if (!confirmationResult.success) {
      console.error(`[API] Failed to send user confirmation email: ${confirmationResult.error}`);
    }

    if (!adminEmailResult.success) {
      console.error(`[API] Failed to send admin notification: ${adminEmailResult.error}`);
    }

    if (!sheetsResult.success) {
      console.warn(`[API] Google Sheets sync failed: ${sheetsResult.message}`);
    }

    // 3. Trigger Webhooks (after emails, as it needs emailResult)
    await notifyAppointmentWebhooks(
      buildWebhookPayload({
        booking,
        confirmationMessage,
        emailResult: confirmationResult,
        usedAI,
        source,
      })
    );

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
