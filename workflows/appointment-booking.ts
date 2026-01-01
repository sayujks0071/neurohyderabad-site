/**
 * Appointment Booking Workflow
 *
 * Orchestrates the complete appointment booking process including:
 * - Patient information collection
 * - Availability checking
 * - Confirmation emails
 * - Reminders scheduling
 * - Follow-up care coordination
 */

import { sleep, FatalError } from "workflow";
import { generateText } from "ai";
import { getTextModel, hasAIConfig } from "@/src/lib/ai/gateway";

interface PatientInfo {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  appointmentType: "new-consultation" | "follow-up" | "second-opinion";
  chiefComplaint: string;
  hasEmergencySymptoms?: boolean;
}

interface AppointmentBookingResult {
  bookingId: string;
  status:
    | "confirmed"
    | "pending"
    | "emergency-redirect"
    | "waitlist"
    | "cancelled";
  appointmentDate: string;
  appointmentTime: string;
  confirmationSent: boolean;
  reminderScheduled: boolean;
  estimatedWaitTime?: number;
  nextSteps: string[];
}

/**
 * Main appointment booking workflow
 */
export async function handleAppointmentBooking(
  patientInfo: PatientInfo
): Promise<AppointmentBookingResult> {
  "use workflow";

  const bookingId = generateBookingId();
  console.log(
    `[Appointment Workflow] Starting booking ${bookingId} for ${patientInfo.name}`
  );

  try {
    // Step 1: Validate patient information
    await validatePatientInfo(patientInfo);

    // Step 2: Check for emergency symptoms
    const emergencyCheck = await checkEmergencySymptoms(
      patientInfo.chiefComplaint
    );
    if (emergencyCheck.isEmergency) {
      console.log(
        `[Appointment Workflow] Emergency detected for ${bookingId}`
      );
      await notifyEmergencyTeam(patientInfo, emergencyCheck.symptoms);
      return {
        bookingId,
        status: "emergency-redirect",
        appointmentDate: new Date().toISOString(),
        appointmentTime: "IMMEDIATE",
        confirmationSent: true,
        reminderScheduled: false,
        nextSteps: [
          "Call +91-9778280044 immediately",
          "Visit the nearest emergency room",
          "Our team has been notified",
        ],
      };
    }

    // Step 3: Check availability
    const availability = await checkAvailability(
      patientInfo.preferredDate,
      patientInfo.preferredTime
    );

    let finalDate = patientInfo.preferredDate;
    let finalTime = patientInfo.preferredTime;
    let status: AppointmentBookingResult["status"] = "confirmed";

    if (!availability.available) {
      console.log(
        `[Appointment Workflow] Preferred slot unavailable for ${bookingId}`
      );

      // Step 4: Find alternative slots
      const alternatives = await findAlternativeSlots(
        patientInfo.preferredDate,
        patientInfo.preferredTime
      );

      if (alternatives.length > 0) {
        finalDate = alternatives[0].date;
        finalTime = alternatives[0].time;
      } else {
        status = "waitlist";
      }
    }

    // Step 5: Create booking record
    await createBookingRecord(bookingId, patientInfo, finalDate, finalTime);

    // Step 6: Wait for 2 seconds before sending confirmation
    await sleep("2s");

    // Step 7: Send confirmation email
    const confirmationSent = await sendConfirmationEmail(
      patientInfo,
      bookingId,
      finalDate,
      finalTime
    );

    // Step 8: Schedule reminders
    await sleep("1s");
    const reminderScheduled = await scheduleReminders(
      bookingId,
      patientInfo,
      finalDate,
      finalTime
    );

    // Step 9: Prepare patient education content
    await sleep("5s");
    await preparePatientEducation(patientInfo.chiefComplaint, patientInfo.email);

    // Step 10: Update analytics
    await trackBookingAnalytics(bookingId, patientInfo, status);

    console.log(
      `[Appointment Workflow] Completed booking ${bookingId} with status: ${status}`
    );

    return {
      bookingId,
      status,
      appointmentDate: finalDate,
      appointmentTime: finalTime,
      confirmationSent,
      reminderScheduled,
      estimatedWaitTime: status === "waitlist" ? 7 : undefined,
      nextSteps: generateNextSteps(status, finalDate, finalTime),
    };
  } catch (error) {
    console.error(`[Appointment Workflow] Error in booking ${bookingId}:`, error);
    throw error;
  }
}

/**
 * Step: Validate patient information
 */
async function validatePatientInfo(patientInfo: PatientInfo) {
  "use step";

  console.log(`[Appointment Workflow] Validating patient info`);

  if (!patientInfo.name || patientInfo.name.length < 2) {
    throw new FatalError("Invalid patient name");
  }

  if (!patientInfo.email || !patientInfo.email.includes("@")) {
    throw new FatalError("Invalid email address");
  }

  if (!patientInfo.phone || patientInfo.phone.length < 10) {
    throw new FatalError("Invalid phone number");
  }

  if (!patientInfo.chiefComplaint || patientInfo.chiefComplaint.length < 5) {
    throw new FatalError("Chief complaint is required");
  }

  console.log(`[Appointment Workflow] Validation passed`);
}

/**
 * Step: Check for emergency symptoms
 */
async function checkEmergencySymptoms(
  chiefComplaint: string
): Promise<{ isEmergency: boolean; symptoms: string[] }> {
  "use step";

  console.log(`[Appointment Workflow] Checking for emergency symptoms`);

  const emergencyKeywords = [
    "stroke",
    "seizure",
    "severe headache",
    "sudden weakness",
    "paralysis",
    "loss of vision",
    "severe neck pain",
    "trauma",
    "accident",
    "unconscious",
    "convulsion",
  ];

  const lowerComplaint = chiefComplaint.toLowerCase();
  const detectedSymptoms = emergencyKeywords.filter((keyword) =>
    lowerComplaint.includes(keyword)
  );

  const isEmergency = detectedSymptoms.length > 0;

  console.log(
    `[Appointment Workflow] Emergency check: ${isEmergency} (symptoms: ${detectedSymptoms.join(", ")})`
  );

  return { isEmergency, symptoms: detectedSymptoms };
}

/**
 * Step: Notify emergency team
 */
async function notifyEmergencyTeam(
  patientInfo: PatientInfo,
  symptoms: string[]
) {
  "use step";

  console.log(
    `[Appointment Workflow] Notifying emergency team for ${patientInfo.name}`
  );

  // In production, this would:
  // - Send SMS to emergency contact
  // - Create high-priority alert in hospital system
  // - Notify on-call doctor

  console.log(
    `Emergency notification sent for patient ${patientInfo.name} with symptoms: ${symptoms.join(", ")}`
  );
}

/**
 * Step: Check availability
 */
async function checkAvailability(
  date: string,
  time: string
): Promise<{ available: boolean; reason?: string }> {
  "use step";

  console.log(`[Appointment Workflow] Checking availability for ${date} ${time}`);

  // Simulate availability check
  // In production, this would query the actual booking system

  const requestedDate = new Date(date);
  const dayOfWeek = requestedDate.getDay();

  // Sunday is closed
  if (dayOfWeek === 0) {
    return { available: false, reason: "Clinic closed on Sundays" };
  }

  // Random availability for demo (80% chance)
  const available = Math.random() > 0.2;

  return { available };
}

/**
 * Step: Find alternative slots
 */
async function findAlternativeSlots(
  preferredDate: string,
  preferredTime: string
): Promise<Array<{ date: string; time: string }>> {
  "use step";

  console.log(`[Appointment Workflow] Finding alternative slots`);

  const alternatives: Array<{ date: string; time: string }> = [];
  const baseDate = new Date(preferredDate);

  // Suggest next 3 available days
  for (let i = 1; i <= 7; i++) {
    const altDate = new Date(baseDate);
    altDate.setDate(altDate.getDate() + i);

    if (altDate.getDay() !== 0) {
      // Skip Sundays
      alternatives.push({
        date: altDate.toISOString().split("T")[0],
        time: preferredTime,
      });

      if (alternatives.length >= 3) break;
    }
  }

  console.log(`[Appointment Workflow] Found ${alternatives.length} alternatives`);
  return alternatives;
}

/**
 * Step: Create booking record
 */
async function createBookingRecord(
  bookingId: string,
  patientInfo: PatientInfo,
  date: string,
  time: string
) {
  "use step";

  console.log(`[Appointment Workflow] Creating booking record ${bookingId}`);

  // In production, this would save to database
  console.log(`Booking ${bookingId} created for ${patientInfo.name} on ${date} at ${time}`);
}

/**
 * Step: Send confirmation email
 */
async function sendConfirmationEmail(
  patientInfo: PatientInfo,
  bookingId: string,
  date: string,
  time: string
): Promise<boolean> {
  "use step";

  console.log(`[Appointment Workflow] Sending confirmation email to ${patientInfo.email}`);

  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

    const response = await fetch(`${baseUrl}/api/email/appointment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: patientInfo.email,
        name: patientInfo.name,
        bookingId,
        appointmentDate: date,
        appointmentTime: time,
        chiefComplaint: patientInfo.chiefComplaint,
      }),
    });

    const success = response.ok;
    console.log(`[Appointment Workflow] Confirmation email sent: ${success}`);
    return success;
  } catch (error) {
    console.error(`[Appointment Workflow] Error sending confirmation:`, error);
    return false;
  }
}

/**
 * Step: Schedule reminders
 */
async function scheduleReminders(
  bookingId: string,
  patientInfo: PatientInfo,
  date: string,
  time: string
): Promise<boolean> {
  "use step";

  console.log(`[Appointment Workflow] Scheduling reminders for ${bookingId}`);

  // In production, this would use Inngest or similar to schedule:
  // - 24 hours before: Email + SMS reminder
  // - 2 hours before: SMS reminder
  // - After appointment: Follow-up email

  console.log(
    `Reminders scheduled for ${bookingId}: 24h before, 2h before, and post-appointment`
  );
  return true;
}

/**
 * Step: Prepare patient education content
 */
async function preparePatientEducation(
  chiefComplaint: string,
  email: string
) {
  "use step";

  console.log(`[Appointment Workflow] Preparing patient education content`);

  if (!hasAIConfig()) {
    console.log(
      `[Appointment Workflow] AI config missing, skipping education content`
    );
    return;
  }

  try {
    const { text } = await generateText({
      model: getTextModel(),
      prompt: `Based on the patient's chief complaint: "${chiefComplaint}", generate a brief patient education summary (2-3 paragraphs) covering:
1. Common causes
2. What to expect during consultation
3. Typical diagnostic tests
4. General preparation tips

Keep it simple and reassuring.`,
      temperature: 0.7,
    });

    console.log(`Patient education content prepared (${text.length} chars)`);
  } catch (error) {
    console.error(`[Appointment Workflow] AI education content error:`, error);
  }
  // In production, this would be emailed or saved to patient portal
}

/**
 * Step: Track booking analytics
 */
async function trackBookingAnalytics(
  bookingId: string,
  patientInfo: PatientInfo,
  status: string
) {
  "use step";

  console.log(`[Appointment Workflow] Tracking analytics for ${bookingId}`);

  // In production, this would send to analytics platforms
  console.log(`Analytics tracked: booking ${bookingId}, status: ${status}, type: ${patientInfo.appointmentType}`);
}

/**
 * Helper: Generate booking ID
 */
function generateBookingId(): string {
  return `BK${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

/**
 * Helper: Generate next steps based on status
 */
function generateNextSteps(
  status: string,
  date: string,
  time: string
): string[] {
  switch (status) {
    case "confirmed":
      return [
        `Your appointment is confirmed for ${new Date(date).toLocaleDateString()} at ${time}`,
        "You will receive a confirmation email shortly",
        "Bring any relevant medical records and MRI scans",
        "Arrive 15 minutes early for registration",
        "Location: Yashoda Hospital, Room 317, OPD Block, Malakpet",
      ];
    case "waitlist":
      return [
        "You have been added to our waitlist",
        "We will notify you when a slot becomes available",
        "Average wait time is 7 days",
        "For urgent concerns, call +91-9778280044",
      ];
    case "emergency-redirect":
      return [
        "Call +91-9778280044 immediately",
        "Visit the nearest emergency room",
        "Our team has been notified",
      ];
    default:
      return ["Contact us at +91-9778280044 for assistance"];
  }
}
