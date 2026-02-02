import { generateBookingConfirmation } from "@/src/lib/appointments/gemini";
import type { BookingData } from "@/packages/appointment-form/types";
import { sendConfirmationEmail, sendAdminNotificationEmail } from "@/src/lib/appointments/email";
import { submitToGoogleSheets } from "@/src/lib/google-sheets";
import { buildWebhookPayload, notifyAppointmentWebhooks } from "@/src/lib/appointments/webhooks";

export interface BookingResult {
  success: boolean;
  message?: string;
  patientName?: string;
  confirmationMessage?: string;
  usedAI?: boolean;
  error?: string;
}

export function normalizeBookingData(body: any): { booking: BookingData; error?: string; missingFields?: string[] } {
  // Parse and normalize input data
  const name = String(body.name ?? body.patientName ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const preferredDate = String(body.preferredDate ?? body.appointmentDate ?? "").trim();
  const preferredTime = String(body.preferredTime ?? body.appointmentTime ?? "").trim();

  // Validate required fields
  if (!name || !email || !phone || !preferredDate) {
     const missing = [];
     if (!name) missing.push("name");
     if (!email) missing.push("email");
     if (!phone) missing.push("phone");
     if (!preferredDate) missing.push("preferredDate");
     // chiefComplaint is validated in original code, check below
     return {
       booking: {} as BookingData,
       error: "Missing required fields",
       missingFields: missing
     };
  }

  const chiefComplaint = String(body.chiefComplaint ?? body.symptoms ?? "").trim();
  if (!chiefComplaint) {
      return {
       booking: {} as BookingData,
       error: "Missing required fields",
       missingFields: ["chiefComplaint"]
     };
  }

  const intakeNotes = typeof body.intakeNotes === "string" ? body.intakeNotes.trim() : "";
  const ageValue = body.age == null ? "" : String(body.age).trim();

  const genderRaw = typeof body.gender === "string" ? body.gender.trim().toLowerCase() : "";
  const gender = (["male", "female", "other"] as const).includes(genderRaw as "male" | "female" | "other")
    ? (genderRaw as BookingData["gender"])
    : "other"; // Default fallback

  const painScore = typeof body.painScore === "number" ? body.painScore : undefined;
  const mriScanAvailable = typeof body.mriScanAvailable === "boolean" ? body.mriScanAvailable : undefined;

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

  return { booking };
}

export async function processBooking(booking: BookingData, source: string = "website"): Promise<BookingResult> {
  try {
    console.log(`[Service] Processing booking for ${booking.patientName}`);

    // 1. Generate AI Confirmation
    const { message: confirmationMessage, usedAI } = await generateBookingConfirmation(booking);

    // 2. Send Emails (Parallel)
    const [confirmationResult, adminEmailResult] = await Promise.all([
      sendConfirmationEmail(booking, confirmationMessage),
      sendAdminNotificationEmail(booking, source),
    ]);

    if (!confirmationResult.success) {
      console.error(`[Service] Failed to send user confirmation email: ${confirmationResult.error}`);
    }

    if (!adminEmailResult.success) {
      console.error(`[Service] Failed to send admin notification: ${adminEmailResult.error}`);
    }

    // 3. Sync to Google Sheets (CRM)
    const sheetsResult = await submitToGoogleSheets({
      fullName: booking.patientName,
      email: booking.email,
      phone: booking.phone,
      concern: booking.reason.slice(0, 100),
      preferredDate: booking.appointmentDate,
      preferredTime: booking.appointmentTime,
      source: source,
      metadata: {
        age: booking.age,
        gender: booking.gender,
        bookingReason: booking.reason,
        painScore: booking.painScore,
        mriScanAvailable: booking.mriScanAvailable,
      },
    });

    if (!sheetsResult.success) {
      console.warn(`[Service] Google Sheets sync failed: ${sheetsResult.message}`);
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

    console.log(`[Service] Booking completed successfully for ${booking.patientName}`);

    return {
      success: true,
      message: "Appointment booking processed successfully",
      patientName: booking.patientName,
      confirmationMessage,
      usedAI,
    };

  } catch (error) {
    console.error("[Service] Error processing booking:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
