import type { BookingData, EmailResult } from "@/packages/appointment-form/types";
import { EmailService } from "@/src/lib/email";

export async function sendConfirmationEmail(
  data: BookingData,
  confirmationMessage: string
): Promise<EmailResult> {
  try {
    const result = await EmailService.sendAppointmentRequestConfirmation(
      data.email,
      data.patientName,
      data.appointmentDate,
      data.appointmentTime,
      confirmationMessage,
      data.reason
    );

    if (result.success) {
      return { success: true };
    }

    return {
      success: false,
      error: result.error || "Failed to send appointment confirmation.",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown email error";
    console.error("[appointments] Failed to send confirmation email:", message);
    return {
      success: false,
      error:
        "We couldn't send a confirmation email, but your request is safely recorded. Our team will contact you shortly.",
    };
  }
}

export async function sendAdminNotificationEmail(
  data: BookingData,
  source?: string
): Promise<EmailResult> {
  try {
    const result = await EmailService.sendAppointmentRequestAlert({
      patientName: data.patientName,
      age: data.age,
      gender: data.gender,
      appointmentDate: data.appointmentDate,
      appointmentTime: data.appointmentTime,
      reason: data.reason,
      source,
      email: data.email,
      phone: data.phone,
    });

    if (result.success) {
      return { success: true };
    }

    return {
      success: false,
      error: result.error || "Failed to send appointment admin alert.",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown email error";
    console.error("[appointments] Failed to notify admin:", message);
    return { success: false, error: message };
  }
}
