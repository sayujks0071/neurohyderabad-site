import { generateBookingConfirmation } from "@/src/lib/appointments/gemini";
import type { BookingData } from "@/packages/appointment-form/types";
import { sendConfirmationEmail, sendAdminNotificationEmail } from "@/src/lib/appointments/email";
import { submitToGoogleSheets } from "@/src/lib/google-sheets";
import { buildWebhookPayload, notifyAppointmentWebhooks } from "@/src/lib/appointments/webhooks";
import { appointments, patients } from "@/src/lib/db";

export interface BookingResult {
  success: boolean;
  message?: string;
  error?: string;
  patientName?: string;
  status?: string;
  confirmationMessage?: string;
  usedAI?: boolean;
}

export type WorkflowAppointmentType = "new-consultation" | "follow-up" | "second-opinion";

export interface ProcessBookingOptions {
  source?: string;
  appointmentType?: WorkflowAppointmentType;
  intakeNotes?: string;
  chiefComplaint?: string; // Optional override for DB column if different from booking.reason
}

export async function processBooking(booking: BookingData, options: ProcessBookingOptions = {}): Promise<BookingResult> {
  const { source = "website", appointmentType = "new-consultation", intakeNotes = "", chiefComplaint } = options;

  try {
    console.log(`[Service] Processing booking for ${booking.patientName}`);

    // 0. Conflict Check (CRM Logic)
    if (booking.appointmentDate && booking.appointmentTime) {
      const existingCount = await appointments.checkSlot(booking.appointmentDate, booking.appointmentTime);
      if (existingCount > 0) {
        console.warn(`[Service] Conflict detected for ${booking.appointmentDate} at ${booking.appointmentTime}`);
        // For now, we log the conflict but proceed (soft failure), 
        // to avoid blocking urgent cases. In a strict CRM, we would throw:
        // throw new Error("Slot already booked");
      }
    }

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

    // 2.5 Save to Postgres Database
    // Use provided chiefComplaint option, or fallback to booking.reason
    const dbChiefComplaint = chiefComplaint || booking.reason;

    void appointments.create({
      patient_name: booking.patientName,
      patient_email: booking.email,
      patient_phone: booking.phone,
      preferred_date: booking.appointmentDate,
      preferred_time: booking.appointmentTime,
      appointment_type: appointmentType,
      chief_complaint: dbChiefComplaint,
      intake_notes: intakeNotes,
      patient_age: Number(booking.age) || undefined,
      patient_gender: booking.gender,
      pain_score: booking.painScore,
      mri_scan_available: booking.mriScanAvailable,
      source: source,
      confirmation_message: confirmationMessage,
      used_ai_confirmation: usedAI,
    }).catch((error) => {
      console.error("[Service] Failed to save to Postgres:", error);
    });

    // 2.6 Upsert Patient Record (CRM Logic)
    void patients.upsert({
      email: booking.email,
      name: booking.patientName,
      phone: booking.phone,
      age: Number(booking.age) || undefined,
      primary_condition: booking.reason.slice(0, 100), // Infer primary condition from reason
      gender: booking.gender,
      acquisition_source: source,
      insurance_provider: (booking as any).insuranceProvider,
      insurance_policy_number: (booking as any).insurancePolicyNumber,
      emergency_contact_name: (booking as any).emergencyContactName,
      emergency_contact_phone: (booking as any).emergencyContactPhone
    }).catch((error) => {
      console.error("[Service] Failed to upsert patient record:", error);
    });

    // 3. Sync to Google Sheets (CRM)
    const sheetsResult = await submitToGoogleSheets({
      fullName: booking.patientName,
      email: booking.email,
      phone: booking.phone,
      concern: booking.reason.slice(0, 100),
      preferredDate: booking.appointmentDate,
      preferredTime: booking.appointmentTime,
      source: source,
      painScore: booking.painScore,
      mriScanAvailable: booking.mriScanAvailable,
      metadata: {
        age: booking.age,
        gender: booking.gender,
        bookingReason: booking.reason,
        painScore: booking.painScore,
        mriScanAvailable: booking.mriScanAvailable,
        insuranceProvider: (booking as any).insuranceProvider,
        emergencyContactName: (booking as any).emergencyContactName
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
      status: "confirmed",
      confirmationMessage,
      usedAI,
    };

  } catch (error) {
    console.error("[Service] Error processing booking:", error);
    return {
      success: false,
      error: "Failed to process booking",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
