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

import { FatalError, fetch } from "workflow";
import { generateText } from "ai";
import type { BookingData, EmailResult } from "@/packages/appointment-form/types";
import { sendConfirmationEmail as sendAppointmentConfirmationEmail, sendAdminNotificationEmail } from "@/src/lib/appointments/email";
import { buildWebhookPayload, notifyAppointmentWebhooks } from "@/src/lib/appointments/webhooks";
import { submitToGoogleSheets } from "@/src/lib/google-sheets";
import { getTextModel, hasAIConfig } from "@/src/lib/ai/gateway";
import { inngest } from "@/src/lib/inngest";

interface PatientInfo {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  appointmentType: "new-consultation" | "follow-up" | "second-opinion";
  chiefComplaint: string;
  hasEmergencySymptoms?: boolean;
  intakeNotes?: string;
  age?: string;
  gender?: BookingData["gender"];
  painScore?: number;
  mriScanAvailable?: boolean;
  source?: string;
  confirmationMessage?: string;
  usedAI?: boolean;
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

const DEFAULT_TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
];

const DEFAULT_CONFIRMATION_MESSAGE =
  "Appointment request received. Please bring any MRI/CT scans with you. We will confirm via phone shortly.";

// Structured logging helper with PII redaction
function log(event: string, context: Record<string, any> = {}) {
  const safeContext = { ...context };

  // Redact PII fields
  ['name', 'patientName', 'phone'].forEach(field => {
    if (field in safeContext) safeContext[field] = '***REDACTED***';
  });

  if (safeContext.email) {
    const [user, domain] = String(safeContext.email).split('@');
    safeContext.email = domain ? `${user.substring(0, 2)}***@${domain}` : '***INVALID***';
  }

  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    event,
    ...safeContext
  }));
}

function normalizeTimeSlot(time: string): string | null {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/i);
  if (!match) {
    return null;
  }

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const meridiem = match[3]?.toUpperCase();

  if (!Number.isFinite(hours) || !Number.isFinite(minutes) || minutes < 0 || minutes > 59) {
    return null;
  }

  if (meridiem) {
    if (hours === 12) {
      hours = meridiem === "AM" ? 0 : 12;
    } else if (meridiem === "PM") {
      hours += 12;
    }
  }

  if (hours < 0 || hours > 23) {
    return null;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

function parseDateString(date: string): Date | null {
  const match = date.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
    return null;
  }

  const parsed = new Date(year, month - 1, day);
  if (
    Number.isNaN(parsed.getTime()) ||
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    return null;
  }

  return parsed;
}

function formatDateString(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function normalizeBlockedSlot(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const [datePart, timePart] = trimmed.split(/\s+/);
  if (!datePart || !timePart) {
    return null;
  }

  const normalizedTime = normalizeTimeSlot(timePart);
  if (!normalizedTime) {
    return null;
  }

  return `${datePart} ${normalizedTime}`;
}

const CLINIC_TIME_SLOTS = (() => {
  const envSlots = process.env.APPOINTMENT_TIME_SLOTS?.split(",") ?? [];
  const normalized = envSlots
    .map((slot) => normalizeTimeSlot(slot))
    .filter(Boolean) as string[];
  return normalized.length ? Array.from(new Set(normalized)) : DEFAULT_TIME_SLOTS;
})();

const CLOSED_WEEKDAYS = (() => {
  const envDays = process.env.APPOINTMENT_CLOSED_WEEKDAYS?.split(",") ?? [];
  const parsed = envDays
    .map((day) => Number(day.trim()))
    .filter((day) => Number.isInteger(day) && day >= 0 && day <= 6);
  return new Set(parsed.length ? parsed : [0]);
})();

const BLOCKED_DATES = new Set(
  (process.env.APPOINTMENT_BLOCKED_DATES ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
);

const BLOCKED_SLOTS = new Set(
  (process.env.APPOINTMENT_BLOCKED_SLOTS ?? "")
    .split(",")
    .map((value) => normalizeBlockedSlot(value))
    .filter(Boolean) as string[]
);

function evaluateAvailability(
  date: string,
  time: string
): { available: boolean; reason?: string } {
  const parsedDate = parseDateString(date);
  const normalizedTime = normalizeTimeSlot(time);

  if (!parsedDate || !normalizedTime) {
    return { available: false, reason: "Invalid appointment date or time." };
  }

  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (parsedDate < todayStart) {
    return { available: false, reason: "Requested date is in the past." };
  }

  if (CLOSED_WEEKDAYS.has(parsedDate.getDay())) {
    return { available: false, reason: "Clinic is closed on the selected day." };
  }

  if (BLOCKED_DATES.has(date)) {
    return { available: false, reason: "Clinic is unavailable on the selected date." };
  }

  if (!CLINIC_TIME_SLOTS.includes(normalizedTime)) {
    return { available: false, reason: "Requested time is outside clinic hours." };
  }

  const blockedKey = `${date} ${normalizedTime}`;
  if (BLOCKED_SLOTS.has(blockedKey)) {
    return { available: false, reason: "Requested slot is already booked." };
  }

  return { available: true };
}

function buildAppointmentDateTime(date: string, time: string): Date | null {
  const parsedDate = parseDateString(date);
  const normalizedTime = normalizeTimeSlot(time);
  if (!parsedDate || !normalizedTime) {
    return null;
  }

  const [hours, minutes] = normalizedTime
    .split(":")
    .map((value) => Number(value));

  const appointmentDate = new Date(
    parsedDate.getFullYear(),
    parsedDate.getMonth(),
    parsedDate.getDate(),
    hours,
    minutes
  );

  if (Number.isNaN(appointmentDate.getTime())) {
    return null;
  }

  return appointmentDate;
}

function buildBookingData(
  patientInfo: PatientInfo,
  date: string,
  time: string
): BookingData {
  return {
    patientName: patientInfo.name,
    email: patientInfo.email,
    phone: patientInfo.phone,
    age: patientInfo.age ? String(patientInfo.age) : "",
    gender: patientInfo.gender ?? "",
    appointmentDate: date,
    appointmentTime: time,
    reason: patientInfo.intakeNotes || patientInfo.chiefComplaint,
    painScore: patientInfo.painScore,
    mriScanAvailable: patientInfo.mriScanAvailable,
  };
}

/**
 * Main appointment booking workflow
 */
export async function handleAppointmentBooking(
  patientInfo: PatientInfo
): Promise<AppointmentBookingResult> {
  "use workflow";
  globalThis.fetch = fetch;

  const bookingId = generateBookingId();
  const start = Date.now();
  log("WorkflowStarted", { bookingId });

  try {
    // Step 1: Validate patient information
    await validatePatientInfo(patientInfo);

    // Step 2: Check for emergency symptoms
    const emergencyCheck = await checkEmergencySymptoms(
      patientInfo.chiefComplaint
    );
    if (emergencyCheck.isEmergency) {
      log("EmergencyDetected", { bookingId, symptoms: emergencyCheck.symptoms });
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
      log("PreferredSlotUnavailable", { bookingId, reason: availability.reason });

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

    const booking = buildBookingData(patientInfo, finalDate, finalTime);
    const confirmationMessage =
      patientInfo.confirmationMessage || DEFAULT_CONFIRMATION_MESSAGE;
    const usedAI = patientInfo.usedAI ?? false;

    // Parallelize operations: Emails, Sync, Reminders, Education, Analytics
    const confirmationPromise = sendBookingConfirmationEmail(booking, confirmationMessage);
    const adminEmailPromise = sendBookingAdminAlert(booking, patientInfo.source);
    const syncPromise = syncBookingLead(bookingId, booking, patientInfo.source);
    const remindersPromise = scheduleReminders(bookingId, patientInfo, finalDate, finalTime);
    const educationPromise = preparePatientEducation(patientInfo.chiefComplaint, patientInfo.email);
    const analyticsPromise = trackBookingAnalytics(bookingId, patientInfo, status);

    // Wait for confirmation email to trigger webhooks (webhook payload depends on email result)
    const confirmationResult = await confirmationPromise;

    // Trigger webhooks (now parallel with remaining tasks)
    const webhooksPromise = triggerAppointmentWebhooks(
      booking,
      confirmationMessage,
      confirmationResult,
      usedAI,
      patientInfo.source
    );

    // Await all remaining background tasks
    const [
      adminEmailResult,
      _sync,
      reminderScheduled,
      _education,
      _analytics,
      _webhooks
    ] = await Promise.all([
      adminEmailPromise,
      syncPromise,
      remindersPromise,
      educationPromise,
      analyticsPromise,
      webhooksPromise
    ]);

    if (!adminEmailResult.success) {
      log("AdminNotificationFailed", { error: adminEmailResult.error });
    }

    log("WorkflowCompleted", {
      bookingId,
      status,
      duration: Date.now() - start
    });

    return {
      bookingId,
      status,
      appointmentDate: finalDate,
      appointmentTime: finalTime,
      confirmationSent: confirmationResult.success,
      reminderScheduled,
      estimatedWaitTime: status === "waitlist" ? 7 : undefined,
      nextSteps: generateNextSteps(status, finalDate, finalTime),
    };
  } catch (error) {
    log("WorkflowError", { bookingId, error: error instanceof Error ? error.message : String(error) });
    throw error;
  }
}

/**
 * Step: Validate patient information
 */
async function validatePatientInfo(patientInfo: PatientInfo) {
  "use step";

  log("ValidatingPatientInfo");

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
}

/**
 * Step: Check for emergency symptoms
 */
async function checkEmergencySymptoms(
  chiefComplaint: string
): Promise<{ isEmergency: boolean; symptoms: string[] }> {
  "use step";

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

  // Only log if symptoms detected
  if (isEmergency) {
    log("EmergencyCheck", { isEmergency, symptoms: detectedSymptoms });
  }

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

  log("NotifyingEmergencyTeam", { patientName: patientInfo.name, symptoms });

  // In production, this would:
  // - Send SMS to emergency contact
  // - Create high-priority alert in hospital system
  // - Notify on-call doctor
}

/**
 * Step: Check availability
 */
async function checkAvailability(
  date: string,
  time: string
): Promise<{ available: boolean; reason?: string }> {
  "use step";

  log("CheckingAvailability", { date, time });

  const availability = evaluateAvailability(date, time);
  if (!availability.available && availability.reason) {
    log("AvailabilityFailed", { reason: availability.reason });
  }

  return availability;
}

/**
 * Step: Find alternative slots
 */
async function findAlternativeSlots(
  preferredDate: string,
  preferredTime: string
): Promise<Array<{ date: string; time: string }>> {
  "use step";

  log("FindingAlternativeSlots");

  const alternatives: Array<{ date: string; time: string }> = [];
  const baseDate = parseDateString(preferredDate) ?? new Date();
  const preferredSlot = normalizeTimeSlot(preferredTime);
  const candidateSlots = preferredSlot
    ? [preferredSlot, ...CLINIC_TIME_SLOTS.filter((slot) => slot !== preferredSlot)]
    : CLINIC_TIME_SLOTS;

  // Suggest next 3 available slots within the next two weeks
  for (let i = 1; i <= 14; i++) {
    const altDate = new Date(baseDate);
    altDate.setDate(altDate.getDate() + i);
    const dateString = formatDateString(altDate);

    for (const slot of candidateSlots) {
      const availability = evaluateAvailability(dateString, slot);
      if (availability.available) {
        alternatives.push({ date: dateString, time: slot });
        break;
      }
    }

    if (alternatives.length >= 3) {
      break;
    }
  }

  log("AlternativesFound", { count: alternatives.length });
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

  log("CreatingBookingRecord", { bookingId, patientName: patientInfo.name });
  // In production, this would save to database
}

/**
 * Step: Send confirmation email
 */
async function sendBookingConfirmationEmail(
  booking: BookingData,
  confirmationMessage: string
): Promise<EmailResult> {
  "use step";

  log("SendingConfirmationEmail", { email: booking.email });
  return await sendAppointmentConfirmationEmail(booking, confirmationMessage);
}

/**
 * Step: Send admin alert
 */
async function sendBookingAdminAlert(
  booking: BookingData,
  source?: string
): Promise<EmailResult> {
  "use step";

  log("SendingAdminAlert", { patientName: booking.patientName });
  return await sendAdminNotificationEmail(booking, source);
}

/**
 * Step: Sync booking to CRM / Google Sheets
 */
async function syncBookingLead(
  bookingId: string,
  booking: BookingData,
  source?: string
): Promise<boolean> {
  "use step";

  const result = await submitToGoogleSheets({
    requestId: bookingId,
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
  });

  if (!result.success) {
    console.error("[Appointment Workflow] Google Sheets sync failed:", result.message);
  }

  return result.success;
}

/**
 * Step: Notify appointment webhooks
 */
async function triggerAppointmentWebhooks(
  booking: BookingData,
  confirmationMessage: string,
  emailResult: EmailResult,
  usedAI: boolean,
  source?: string
): Promise<void> {
  "use step";

  await notifyAppointmentWebhooks(
    buildWebhookPayload({
      booking,
      confirmationMessage,
      emailResult,
      usedAI,
      source,
    })
  );
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

  log("SchedulingReminders", { bookingId });

  if (!process.env.INNGEST_EVENT_KEY) {
    log("InngestKeyMissing", { message: "Skipping reminders" });
    return false;
  }

  const appointmentDateTime = buildAppointmentDateTime(date, time);
  if (!appointmentDateTime) {
    log("InvalidAppointmentTime", { date, time });
    return false;
  }

  const reminders = [
    { type: "24h" as const, offsetMs: 24 * 60 * 60 * 1000 },
    { type: "1h" as const, offsetMs: 60 * 60 * 1000 },
  ];

  let scheduledCount = 0;
  const appointmentIso = appointmentDateTime.toISOString();

  for (const reminder of reminders) {
    const reminderTime = new Date(appointmentDateTime.getTime() - reminder.offsetMs);
    if (reminderTime > new Date()) {
      // Use bookingId + reminder type as idempotency key to prevent duplicate reminders
      const idempotencyKey = `${bookingId}-${reminder.type}`;
      
      await inngest.send({
        id: idempotencyKey, // Inngest uses 'id' for idempotency
        name: "appointment/reminder",
        data: {
          appointmentId: bookingId,
          patientEmail: patientInfo.email,
          patientName: patientInfo.name,
          appointmentDate: appointmentIso,
          reminderType: reminder.type,
        },
        ts: reminderTime.getTime(),
      });
      scheduledCount += 1;
    }
  }

  log("RemindersScheduled", { bookingId, count: scheduledCount });
  return scheduledCount > 0;
}

/**
 * Step: Prepare patient education content
 */
async function preparePatientEducation(
  chiefComplaint: string,
  email: string
) {
  "use step";

  log("PreparingEducationContent");

  if (!hasAIConfig()) {
    log("AIConfigMissing");
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

    log("EducationContentPrepared", { length: text.length });
  } catch (error) {
    log("AIEducationError", { error: error instanceof Error ? error.message : String(error) });
  }
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

  log("TrackingAnalytics", { bookingId, status, type: patientInfo.appointmentType });
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
