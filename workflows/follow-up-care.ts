/**
 * Follow-Up Care Workflow
 *
 * Orchestrates post-treatment follow-up care including:
 * - Recovery check-ins
 * - Medication reminders
 * - Physical therapy scheduling
 * - Progress tracking
 * - Complication monitoring
 */

import { sleep } from "workflow";
import { generateObject, jsonSchema } from "ai";
import {
  getTextModel,
  hasAIConfig,
} from "@/src/lib/ai/gateway";

interface FollowUpRequest {
  patientId: string;
  name: string;
  email: string;
  phone: string;
  surgeryDate: string;
  procedure: string;
  complications?: string[];
  currentSymptoms?: string[];
}

interface CheckInSchedule {
  day: number;
  title: string;
  questions: string[];
  urgentSymptoms: string[];
}

interface FollowUpResult {
  patientId: string;
  checkInsScheduled: CheckInSchedule[];
  nextCheckInDate: string;
  currentStatus: "on-track" | "needs-attention" | "urgent";
  recommendations: string[];
  therapyScheduled: boolean;
  alertsSent: number;
}

/**
 * Main follow-up care workflow
 */
export async function handleFollowUpCare(
  request: FollowUpRequest
): Promise<FollowUpResult> {
  "use workflow";

  console.log(
    `[Follow-Up Workflow] Starting for patient ${request.patientId}, procedure: ${request.procedure}`
  );

  const surgeryDate = new Date(request.surgeryDate);
  const daysSinceSurgery = Math.floor(
    (Date.now() - surgeryDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  console.log(`[Follow-Up Workflow] Days since surgery: ${daysSinceSurgery}`);

  // Step 1: Create check-in schedule based on procedure
  const checkInSchedule = await createCheckInSchedule(
    request.procedure,
    request.surgeryDate
  );

  // Step 2: Monitor for complications
  await sleep("2s");
  const complicationStatus = await monitorComplications(
    request.currentSymptoms || [],
    request.complications || [],
    daysSinceSurgery
  );

  // Step 3: Send personalized check-in (based on recovery day)
  await sleep("1s");
  await sendPersonalizedCheckIn(
    request,
    daysSinceSurgery,
    checkInSchedule
  );

  // Step 4: Track recovery progress
  await sleep("2s");
  const recoveryStatus = await assessRecoveryProgress(
    request.procedure,
    daysSinceSurgery,
    request.currentSymptoms || []
  );

  // Step 5: Schedule physical therapy if needed
  await sleep("1s");
  const therapyScheduled = await schedulePhysicalTherapy(
    request,
    recoveryStatus,
    daysSinceSurgery
  );

  // Step 6: Generate personalized recommendations
  await sleep("2s");
  const recommendations = await generateRecommendations(
    request.procedure,
    daysSinceSurgery,
    recoveryStatus,
    complicationStatus
  );

  // Step 7: Send medication reminders
  await sleep("3s");
  await sendMedicationReminders(request, daysSinceSurgery);

  // Step 8: Schedule next check-in
  await sleep("1s");
  const nextCheckInDate = await scheduleNextCheckIn(
    request,
    daysSinceSurgery,
    checkInSchedule
  );

  // Step 9: Alert medical team if urgent
  let alertsSent = 0;
  if (complicationStatus.isUrgent || recoveryStatus.status === "urgent") {
    await sleep("1s");
    await alertMedicalTeam(request, complicationStatus, recoveryStatus);
    alertsSent = 1;
  }

  // Step 10: Update patient portal
  await sleep("2s");
  await updatePatientPortal(request.patientId, recoveryStatus, recommendations);

  console.log(
    `[Follow-Up Workflow] Completed for patient ${request.patientId}, status: ${recoveryStatus.status}`
  );

  return {
    patientId: request.patientId,
    checkInsScheduled: checkInSchedule,
    nextCheckInDate,
    currentStatus: recoveryStatus.status,
    recommendations,
    therapyScheduled,
    alertsSent,
  };
}

/**
 * Step: Create check-in schedule
 */
async function createCheckInSchedule(
  procedure: string,
  surgeryDate: string
): Promise<CheckInSchedule[]> {
  "use step";

  console.log(`[Follow-Up] Creating check-in schedule for ${procedure}`);

  if (hasAIConfig()) {
    try {
      const { object } = await generateObject({
        model: getTextModel(),
        schema: jsonSchema({
          type: "object",
          properties: {
            checkIns: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  day: { type: "number" },
                  title: { type: "string" },
                  questions: { type: "array", items: { type: "string" } },
                  urgentSymptoms: { type: "array", items: { type: "string" } },
                },
                required: ["day", "title", "questions", "urgentSymptoms"],
                additionalProperties: false,
              },
            },
          },
          required: ["checkIns"],
          additionalProperties: false,
        }),
        prompt: `Create a follow-up check-in schedule for a patient who had ${procedure}.

Return JSON with a "checkIns" array using this structure:
{"checkIns": [{"day": 1, "title": "Day 1 Post-Surgery Check", "questions": ["How is your pain level?"], "urgentSymptoms": ["severe bleeding"]}]}

Include check-ins for: Day 1, Day 3, Week 1, Week 2, Week 4, Week 8, Month 3, Month 6`,
        temperature: 0.5,
      });
      type CheckInScheduleResult = { checkIns: CheckInSchedule[] };
      const result = object as CheckInScheduleResult;
      return result.checkIns;
    } catch (error) {
      console.error("[Follow-Up] Error parsing schedule:", error);
    }
  }

  // Default schedule
  return [
    {
      day: 1,
      title: "Day 1 Post-Surgery",
      questions: [
        "How is your pain level (1-10)?",
        "Are you able to move comfortably?",
        "Any unusual symptoms?",
      ],
      urgentSymptoms: [
        "Severe bleeding",
        "High fever (>101°F)",
        "Inability to urinate",
        "Severe headache",
      ],
    },
    {
      day: 3,
      title: "Day 3 Check-In",
      questions: [
        "How is your pain today?",
        "Are you able to walk?",
        "Any swelling or redness?",
      ],
      urgentSymptoms: ["Wound infection signs", "Persistent fever", "New weakness"],
    },
    {
      day: 7,
      title: "1 Week Follow-Up",
      questions: [
        "How is your recovery progressing?",
        "Are you following medication schedule?",
        "Any concerns?",
      ],
      urgentSymptoms: [
        "Increasing pain",
        "Wound not healing",
        "New neurological symptoms",
      ],
    },
  ];
}

/**
 * Step: Monitor for complications
 */
async function monitorComplications(
  currentSymptoms: string[],
  knownComplications: string[],
  daysSinceSurgery: number
): Promise<{ isUrgent: boolean; concerns: string[]; recommendations: string[] }> {
  "use step";

  console.log(
    `[Follow-Up] Monitoring complications (day ${daysSinceSurgery})`
  );

  const urgentSymptoms = [
    "severe bleeding",
    "high fever",
    "severe headache",
    "loss of consciousness",
    "seizure",
    "paralysis",
    "severe weakness",
    "wound infection",
  ];

  const concerns: string[] = [];
  const isUrgent =
    currentSymptoms.some((symptom) =>
      urgentSymptoms.some((urgent) =>
        symptom.toLowerCase().includes(urgent.toLowerCase())
      )
    ) || knownComplications.length > 0;

  if (isUrgent) {
    concerns.push(
      "Urgent symptoms detected",
      "Immediate medical attention recommended"
    );
  }

  const recommendations: string[] = [];
  if (isUrgent) {
    recommendations.push(
      "Call +91-9778280044 immediately",
      "Visit emergency room if severe",
      "Do not wait for scheduled appointment"
    );
  }

  return { isUrgent, concerns, recommendations };
}

/**
 * Step: Send personalized check-in
 */
async function sendPersonalizedCheckIn(
  request: FollowUpRequest,
  daysSinceSurgery: number,
  schedule: CheckInSchedule[]
) {
  "use step";

  console.log(
    `[Follow-Up] Sending check-in to ${request.email} (day ${daysSinceSurgery})`
  );

  // Find the appropriate check-in for current day
  const currentCheckIn = schedule.find(
    (checkIn) =>
      daysSinceSurgery === checkIn.day ||
      (daysSinceSurgery >= checkIn.day &&
        daysSinceSurgery < (schedule[schedule.indexOf(checkIn) + 1]?.day || 999))
  );

  if (currentCheckIn) {
    console.log(
      `Sending "${currentCheckIn.title}" check-in to ${request.email}`
    );
    // In production, send actual email/SMS with check-in questions
  }
}

/**
 * Step: Assess recovery progress
 */
async function assessRecoveryProgress(
  procedure: string,
  daysSinceSurgery: number,
  currentSymptoms: string[]
): Promise<{
  status: "on-track" | "needs-attention" | "urgent";
  progressPercentage: number;
  concerns: string[];
}> {
  "use step";

  console.log(`[Follow-Up] Assessing recovery progress for ${procedure}`);

  if (hasAIConfig()) {
    try {
      const { object } = await generateObject({
        model: getTextModel(),
        schema: jsonSchema({
          type: "object",
          properties: {
            status: { type: "string", enum: ["on-track", "needs-attention", "urgent"] },
            progressPercentage: { type: "number" },
            concerns: { type: "array", items: { type: "string" } },
          },
          required: ["status", "progressPercentage", "concerns"],
          additionalProperties: false,
        }),
        prompt: `Assess recovery progress for a patient who had ${procedure} ${daysSinceSurgery} days ago.

Current symptoms: ${currentSymptoms.join(", ") || "None reported"}

Return as JSON:
{
  "status": "on-track" | "needs-attention" | "urgent",
  "progressPercentage": 0-100,
  "concerns": ["concern1", ...]
}

Consider typical recovery timelines for neurosurgery procedures.`,
        temperature: 0.3,
      });
      type RecoveryProgressResult = {
        status: "on-track" | "needs-attention" | "urgent";
        progressPercentage: number;
        concerns: string[];
      };
      return object as RecoveryProgressResult;
    } catch (error) {
      console.error("[Follow-Up] Error parsing recovery status:", error);
    }
  }

  // Default assessment
  const progressPercentage = Math.min((daysSinceSurgery / 42) * 100, 100); // 6 weeks typical
  return {
    status: "on-track",
    progressPercentage,
    concerns: [],
  };
}

/**
 * Step: Schedule physical therapy
 */
async function schedulePhysicalTherapy(
  request: FollowUpRequest,
  recoveryStatus: any,
  daysSinceSurgery: number
): Promise<boolean> {
  "use step";

  console.log(`[Follow-Up] Checking physical therapy needs for patient ${request.patientId}`);

  // Typically schedule PT after 2 weeks for spine surgery
  const needsTherapy =
    daysSinceSurgery >= 14 &&
    (request.procedure.toLowerCase().includes("spine") ||
      request.procedure.toLowerCase().includes("back"));

  if (needsTherapy) {
    console.log(`Physical therapy scheduled for patient ${request.patientId}`);
    // In production, integrate with PT scheduling system
  }

  return needsTherapy;
}

/**
 * Step: Generate recommendations
 */
async function generateRecommendations(
  procedure: string,
  daysSinceSurgery: number,
  recoveryStatus: any,
  complicationStatus: any
): Promise<string[]> {
  "use step";

  console.log(`[Follow-Up] Generating recommendations`);

  if (hasAIConfig()) {
    try {
      const { object } = await generateObject({
        model: getTextModel(),
        schema: jsonSchema({
          type: "object",
          properties: {
            recommendations: { type: "array", items: { type: "string" } },
          },
          required: ["recommendations"],
          additionalProperties: false,
        }),
        prompt: `Generate 5-7 personalized recovery recommendations for a patient who had ${procedure} ${daysSinceSurgery} days ago.

Recovery status: ${recoveryStatus.status}
Complications: ${complicationStatus.isUrgent ? "Yes" : "No"}

Return ONLY JSON with a "recommendations" array, e.g., {"recommendations": ["recommendation1", "recommendation2", ...]}

Focus on practical, actionable advice for this stage of recovery.`,
        temperature: 0.6,
      });
      type RecommendationsResult = { recommendations: string[] };
      const result = object as RecommendationsResult;
      return result.recommendations;
    } catch (error) {
      console.error("[Follow-Up] Error parsing recommendations:", error);
    }
  }

  return [
    "Continue taking prescribed medications",
    "Get adequate rest and sleep",
    "Gradually increase activity level",
    "Attend all follow-up appointments",
    "Contact doctor if symptoms worsen",
  ];
}

/**
 * Step: Send medication reminders
 */
async function sendMedicationReminders(
  request: FollowUpRequest,
  daysSinceSurgery: number
) {
  "use step";

  console.log(`[Follow-Up] Sending medication reminders to ${request.phone}`);

  // In production, this would:
  // - Check medication schedule
  // - Send SMS/email reminders
  // - Track medication adherence
  // - Alert if doses are missed

  console.log(`Medication reminders sent for day ${daysSinceSurgery} post-op`);
}

/**
 * Step: Schedule next check-in
 */
async function scheduleNextCheckIn(
  request: FollowUpRequest,
  daysSinceSurgery: number,
  schedule: CheckInSchedule[]
): Promise<string> {
  "use step";

  console.log(`[Follow-Up] Scheduling next check-in`);

  // Find next scheduled check-in
  const nextCheckIn = schedule.find(
    (checkIn) => checkIn.day > daysSinceSurgery
  );

  if (nextCheckIn) {
    const surgeryDate = new Date(request.surgeryDate);
    const nextDate = new Date(surgeryDate);
    nextDate.setDate(nextDate.getDate() + nextCheckIn.day);

    console.log(`Next check-in scheduled for ${nextDate.toISOString()}`);
    return nextDate.toISOString();
  }

  // Default: 1 week from now
  const defaultNext = new Date();
  defaultNext.setDate(defaultNext.getDate() + 7);
  return defaultNext.toISOString();
}

/**
 * Step: Alert medical team
 */
async function alertMedicalTeam(
  request: FollowUpRequest,
  complicationStatus: any,
  recoveryStatus: any
) {
  "use step";

  console.log(
    `[Follow-Up] ALERT: Notifying medical team for patient ${request.patientId}`
  );

  const alertDetails = {
    patientId: request.patientId,
    patientName: request.name,
    procedure: request.procedure,
    urgency: complicationStatus.isUrgent ? "HIGH" : "MEDIUM",
    concerns: [
      ...complicationStatus.concerns,
      ...recoveryStatus.concerns,
    ],
    contactInfo: {
      phone: request.phone,
      email: request.email,
    },
  };

  console.log(`Medical team alerted:`, JSON.stringify(alertDetails, null, 2));

  // In production, this would:
  // - Send SMS to on-call doctor
  // - Create high-priority ticket in hospital system
  // - Send email to patient care coordinator
  // - Update patient's medical record
}

/**
 * Step: Update patient portal
 */
async function updatePatientPortal(
  patientId: string,
  recoveryStatus: any,
  recommendations: string[]
) {
  "use step";

  console.log(`[Follow-Up] Updating patient portal for ${patientId}`);

  const portalUpdate = {
    patientId,
    lastUpdated: new Date().toISOString(),
    recoveryStatus: recoveryStatus.status,
    progressPercentage: recoveryStatus.progressPercentage,
    recommendations,
    concerns: recoveryStatus.concerns,
  };

  console.log(`Patient portal updated:`, JSON.stringify(portalUpdate, null, 2));

  // In production, this would update the actual patient portal/dashboard
}
