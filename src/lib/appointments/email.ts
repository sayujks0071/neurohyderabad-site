import type { BookingData, EmailResult } from "@/packages/appointment-form/types";
import { EmailService } from "@/src/lib/email";

const SIMULATED_FAILURE_RATE = 0.1;

export async function sendConfirmationEmail(
  data: BookingData,
  confirmationMessage: string
): Promise<EmailResult> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (Math.random() < SIMULATED_FAILURE_RATE) {
      throw new Error("Simulated email server connection timeout.");
    }

    console.info("--- APPOINTMENT EMAIL (simulation) ---");
    console.info(`To: patient@example.com (placeholder)`);
    console.info(`From: hellodr@drsayuj.info`);
    console.info(`Subject: Appointment Request with Dr. Sayuj Krishnan`);
    console.info("---------------------------------------");
    console.info(confirmationMessage);
    console.info("\nRequest summary:");
    console.info(`Patient: ${data.patientName} (${data.age}, ${data.gender})`);
    console.info(`Date: ${data.appointmentDate} at ${data.appointmentTime}`);
    console.info(`Reason: ${data.reason}`);
    console.info("--- END OF SIMULATION ---");

    return { success: true };
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
