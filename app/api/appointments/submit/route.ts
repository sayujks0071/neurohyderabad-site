import { NextResponse } from "next/server";
import { generateBookingConfirmation } from "@/src/lib/appointments/gemini";
import {
  sendAdminNotificationEmail,
  sendConfirmationEmail,
} from "@/src/lib/appointments/email";
import { buildWebhookPayload, notifyAppointmentWebhooks } from "@/src/lib/appointments/webhooks";
import { submitToGoogleSheets } from "@/src/lib/google-sheets";
import { rateLimit } from "@/src/lib/rate-limit";
import { appointments } from "@/src/lib/db";
import { analyzeTriage } from "@/src/lib/ai/triage";
import { parseBookingData, ValidationError } from "./validation";

export async function POST(request: Request) {
  try {
    // Get IP from x-forwarded-for (first IP is the real client IP) or fallback
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    const { success } = rateLimit(ip, 5, 60 * 1000); // 5 requests per minute

    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const booking = parseBookingData(body);

    // AI Triage Analysis
    let triageResult = null;
    try {
      triageResult = await analyzeTriage({
        symptoms: [], // AI will extract from description if empty
        description: booking.reason,
        age: Number(booking.age),
      });
    } catch (error) {
      console.error("[appointments/submit] Triage analysis failed:", error);
    }

    const { message, usedAI } = await generateBookingConfirmation(booking);
    const emailResult = await sendConfirmationEmail(booking, message);
    const adminEmailResult = await sendAdminNotificationEmail(
      booking,
      request.headers.get("x-booking-source") || "website",
      triageResult
    );
    if (!adminEmailResult.success) {
      console.error(
        "[appointments/submit] Admin notification failed:",
        adminEmailResult.error
      );
    }

    // Save to database (async, non-blocking)
    const source = request.headers.get("x-booking-source") || "website";
    void appointments.create({
      patient_name: booking.patientName,
      patient_email: booking.email,
      patient_phone: booking.phone,
      preferred_date: booking.appointmentDate,
      preferred_time: booking.appointmentTime,
      chief_complaint: booking.reason,
      patient_age: Number(booking.age),
      patient_gender: booking.gender,
      pain_score: booking.painScore,
      mri_scan_available: booking.mriScanAvailable,
      source,
      confirmation_message: message,
      used_ai_confirmation: usedAI,
      has_emergency_symptoms: triageResult ? ['emergency', 'urgent'].includes(triageResult.urgencyLevel) : false,
      intake_notes: triageResult ? JSON.stringify(triageResult) : undefined,
    }).catch((error) => {
      console.error("[appointments/submit] Failed to save to database:", error);
    });

    // Add lead to CRM / Google Sheet (async, non-blocking)
    void submitToGoogleSheets({
      fullName: booking.patientName,
      email: booking.email,
      phone: booking.phone,
      concern: booking.reason.substring(0, 100),
      preferredDate: booking.appointmentDate,
      preferredTime: booking.appointmentTime,
      source,
      painScore: booking.painScore,
      mriScanAvailable: booking.mriScanAvailable,
      metadata: {
        age: booking.age,
        gender: booking.gender,
        bookingReason: booking.reason,
        painScore: booking.painScore,
        mriScanAvailable: booking.mriScanAvailable,
      },
    }).catch((error) => {
      console.error("[appointments/submit] Failed to submit to Google Sheet:", error);
    });

    void notifyAppointmentWebhooks(
      buildWebhookPayload({
        booking,
        confirmationMessage: message,
        emailResult,
        usedAI,
        source: request.headers.get("x-booking-source"),
      })
    );

    // 🛡️ Sentinel: Redact sensitive PII from logs for audit trail
    console.log("[appointments/submit] Appointment received:", {
      patientName: booking.patientName,
      phone: booking.phone ? `${booking.phone.slice(0, 3)}***${booking.phone.slice(-3)}` : undefined,
      email: booking.email ? `${booking.email[0]}***@${booking.email.split('@')[1]}` : undefined,
      appointmentDate: booking.appointmentDate,
      source
    });

    return NextResponse.json({
      booking,
      confirmationMessage: message,
      emailResult,
      usedAI,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to process appointment.";
    const status = error instanceof ValidationError ? 400 : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
