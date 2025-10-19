import type { BookingData, EmailResult } from "./types";

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
    console.info(`From: neurospinehyd@drsayuj.com`);
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
