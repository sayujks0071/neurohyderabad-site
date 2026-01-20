/**
 * Approval Workflow with Hooks & Webhooks
 *
 * Human-in-the-loop workflows for www.drsayuj.info:
 * - Content approval before publishing
 * - Appointment confirmation by staff
 * - Emergency case escalation
 */

import { createHook, createWebhook, defineHook, type RequestWithResponse } from "workflow";
import { sleep, FatalError, getStepMetadata } from "workflow";
import { z } from "zod";

// ============================================================
// Type-Safe Approval Hook with Zod Schema
// ============================================================

const contentApprovalSchema = z.object({
  contentId: z.string(),
  approved: z.boolean(),
  approvedBy: z.string(),
  comment: z.string().transform((value) => value.trim()).optional(),
  publishImmediately: z.boolean().default(false),
});

export const contentApprovalHook = defineHook({
  schema: contentApprovalSchema,
});

interface ContentDraft {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  createdAt: string;
}

interface ApprovalResult {
  contentId: string;
  status: "approved" | "rejected" | "timeout";
  approvedBy?: string;
  comment?: string;
  publishedAt?: string;
}

/**
 * Content Approval Workflow
 * Waits for human approval before publishing content
 */
export async function contentApprovalWorkflow(
  draft: ContentDraft
): Promise<ApprovalResult> {
  "use workflow";

  console.log(`[Approval] Starting approval workflow for: ${draft.title}`);

  // Create a deterministic hook token based on content ID
  const hook = contentApprovalHook.create({
    token: `content-approval:${draft.id}`,
  });

  // Notify reviewers
  await notifyReviewers(draft, hook.token);

  // Race between approval and timeout (7 days)
  const result = await Promise.race([
    hook.then((approval) => ({ type: "approval" as const, data: approval })),
    sleep("7 days").then(() => ({ type: "timeout" as const })),
  ]);

  if (result.type === "timeout") {
    console.log(`[Approval] Timeout for content: ${draft.id}`);
    await notifyTimeout(draft);
    return {
      contentId: draft.id,
      status: "timeout",
    };
  }

  const approval = result.data;

  if (approval.approved) {
    console.log(`[Approval] Content approved by ${approval.approvedBy}`);
    
    if (approval.publishImmediately) {
      await publishContent(draft);
    }

    return {
      contentId: draft.id,
      status: "approved",
      approvedBy: approval.approvedBy,
      comment: approval.comment,
      publishedAt: approval.publishImmediately ? new Date().toISOString() : undefined,
    };
  } else {
    console.log(`[Approval] Content rejected by ${approval.approvedBy}`);
    await notifyRejection(draft, approval.comment);
    
    return {
      contentId: draft.id,
      status: "rejected",
      approvedBy: approval.approvedBy,
      comment: approval.comment,
    };
  }
}

// ============================================================
// Appointment Confirmation Webhook
// ============================================================

interface AppointmentData {
  appointmentId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  requestedDate: string;
  requestedTime: string;
  reason: string;
}

interface ConfirmationResult {
  appointmentId: string;
  status: "confirmed" | "rescheduled" | "cancelled" | "timeout";
  confirmedDate?: string;
  confirmedTime?: string;
  notes?: string;
}

/**
 * Appointment Confirmation Workflow
 * Staff confirms/reschedules appointments via webhook
 */
export async function appointmentConfirmationWorkflow(
  appointment: AppointmentData
): Promise<ConfirmationResult> {
  "use workflow";

  console.log(`[Appointment] Waiting for confirmation: ${appointment.appointmentId}`);

  // Create webhook with custom token for this appointment
  const webhook = createWebhook({
    token: `appointment-confirm:${appointment.appointmentId}`,
    respondWith: "manual",
  });

  // Send confirmation request to staff
  await sendStaffNotification(appointment, webhook.url);

  // Wait for response with 24-hour timeout
  const result = await Promise.race([
    webhook.then((req) => ({ type: "response" as const, request: req })),
    sleep("24 hours").then(() => ({ type: "timeout" as const })),
  ]);

  if (result.type === "timeout") {
    console.log(`[Appointment] Confirmation timeout: ${appointment.appointmentId}`);
    return {
      appointmentId: appointment.appointmentId,
      status: "timeout",
    };
  }

  // Process the webhook response
  return await processConfirmationResponse(result.request, appointment);
}

async function processConfirmationResponse(
  request: RequestWithResponse,
  appointment: AppointmentData
): Promise<ConfirmationResult> {
  "use step";

  try {
    const data = await request.json();
    const { action, date, time, notes } = data;

    let result: ConfirmationResult;

    switch (action) {
      case "confirm":
        result = {
          appointmentId: appointment.appointmentId,
          status: "confirmed",
          confirmedDate: appointment.requestedDate,
          confirmedTime: appointment.requestedTime,
          notes,
        };
        await request.respondWith(
          Response.json({ success: true, message: "Appointment confirmed" })
        );
        break;

      case "reschedule":
        if (!date || !time) {
          await request.respondWith(
            Response.json({ error: "Date and time required for reschedule" }, { status: 400 })
          );
          throw new FatalError("Missing reschedule date/time");
        }
        result = {
          appointmentId: appointment.appointmentId,
          status: "rescheduled",
          confirmedDate: date,
          confirmedTime: time,
          notes,
        };
        await request.respondWith(
          Response.json({ success: true, message: "Appointment rescheduled" })
        );
        break;

      case "cancel":
        result = {
          appointmentId: appointment.appointmentId,
          status: "cancelled",
          notes,
        };
        await request.respondWith(
          Response.json({ success: true, message: "Appointment cancelled" })
        );
        break;

      default:
        await request.respondWith(
          Response.json({ error: "Invalid action" }, { status: 400 })
        );
        throw new FatalError(`Invalid action: ${action}`);
    }

    return result;
  } catch (error) {
    // Ensure response is sent even on error
    if (error instanceof FatalError) {
      throw error; // Already responded before throwing
    }
    await request.respondWith(
      Response.json({ error: "Internal server error" }, { status: 500 })
    );
    throw new FatalError(`Webhook processing failed: ${error}`);
  }
}

// ============================================================
// Emergency Escalation with Multiple Events
// ============================================================

interface EmergencyCase {
  caseId: string;
  patientName: string;
  symptoms: string[];
  severity: "high" | "critical";
  reportedAt: string;
}

type EscalationEvent =
  | { type: "acknowledged"; by: string; at: string }
  | { type: "resolved"; by: string; notes: string; at: string }
  | { type: "escalated"; to: string; reason: string; at: string };

/**
 * Emergency Escalation Workflow
 * Handles multiple events for a single emergency case
 */
export async function emergencyEscalationWorkflow(
  emergency: EmergencyCase
): Promise<{ caseId: string; events: EscalationEvent[]; finalStatus: string }> {
  "use workflow";

  console.log(`[Emergency] Starting escalation for case: ${emergency.caseId}`);

  // Create a reusable hook for this emergency case
  const hook = createHook<EscalationEvent>({
    token: `emergency:${emergency.caseId}`,
  });

  // Initial notification
  await notifyEmergencyTeam(emergency, hook.token);

  const events: EscalationEvent[] = [];
  let acknowledged = false;
  let resolved = false;

  // Auto-escalate if not acknowledged in 5 minutes
  const autoEscalateTimer = sleep("5 minutes").then(() => ({
    type: "auto-escalate" as const,
  }));

  // Process events until resolved
  for await (const event of hook) {
    events.push(event);
    console.log(`[Emergency] Event received: ${event.type}`);

    if (event.type === "acknowledged") {
      acknowledged = true;
      await confirmAcknowledgment(emergency, event.by);
    }

    if (event.type === "escalated") {
      await notifyEscalation(emergency, event.to, event.reason);
    }

    if (event.type === "resolved") {
      resolved = true;
      await closeEmergencyCase(emergency, event.notes);
      break;
    }

    // Check for auto-escalation
    if (!acknowledged) {
      const raceResult = await Promise.race([
        hook.then((e) => ({ type: "event" as const, event: e })),
        autoEscalateTimer,
      ]);

      if (raceResult.type === "auto-escalate") {
        console.log(`[Emergency] Auto-escalating case: ${emergency.caseId}`);
        await autoEscalate(emergency);
      }
    }
  }

  return {
    caseId: emergency.caseId,
    events,
    finalStatus: resolved ? "resolved" : "pending",
  };
}

// ============================================================
// External Integration Webhook (e.g., Payment Gateway)
// ============================================================

interface PaymentRequest {
  orderId: string;
  amount: number;
  currency: string;
  patientEmail: string;
}

/**
 * Payment Confirmation Workflow
 * Waits for payment gateway webhook callback
 */
export async function paymentConfirmationWorkflow(
  payment: PaymentRequest
): Promise<{ orderId: string; status: string; transactionId?: string }> {
  "use workflow";

  console.log(`[Payment] Waiting for payment confirmation: ${payment.orderId}`);

  // Create webhook for payment gateway callback
  const webhook = createWebhook({
    token: `payment:${payment.orderId}`,
    // Static response for payment gateway
    respondWith: Response.json({ received: true }, { status: 200 }),
  });

  // Initiate payment with gateway (passing our webhook URL)
  await initiatePayment(payment, webhook.url);

  // Wait for callback with 30-minute timeout
  const result = await Promise.race([
    webhook.then((req) => ({ type: "callback" as const, request: req })),
    sleep("30 minutes").then(() => ({ type: "timeout" as const })),
  ]);

  if (result.type === "timeout") {
    console.log(`[Payment] Timeout for order: ${payment.orderId}`);
    return {
      orderId: payment.orderId,
      status: "timeout",
    };
  }

  // Process payment callback
  return await processPaymentCallback(result.request, payment);
}

async function processPaymentCallback(
  request: Request,
  payment: PaymentRequest
): Promise<{ orderId: string; status: string; transactionId?: string }> {
  "use step";

  const data = await request.json();
  const { status, transactionId, errorMessage } = data;

  if (status === "success") {
    console.log(`[Payment] Payment successful: ${transactionId}`);
    await sendPaymentConfirmation(payment.patientEmail, payment.orderId, transactionId);
    return {
      orderId: payment.orderId,
      status: "success",
      transactionId,
    };
  } else {
    console.log(`[Payment] Payment failed: ${errorMessage}`);
    await sendPaymentFailure(payment.patientEmail, payment.orderId, errorMessage);
    return {
      orderId: payment.orderId,
      status: "failed",
    };
  }
}

// ============================================================
// Helper Step Functions
// ============================================================

async function notifyReviewers(draft: ContentDraft, token: string): Promise<void> {
  "use step";
  console.log(`[Approval] Notifying reviewers for: ${draft.title}`);
  console.log(`[Approval] Approval token: ${token}`);
  // In production: send email/Slack notification with approval link
}

async function notifyTimeout(draft: ContentDraft): Promise<void> {
  "use step";
  console.log(`[Approval] Sending timeout notification for: ${draft.title}`);
}

async function notifyRejection(draft: ContentDraft, comment?: string): Promise<void> {
  "use step";
  console.log(`[Approval] Notifying rejection: ${draft.title}, reason: ${comment}`);
}

async function publishContent(draft: ContentDraft): Promise<void> {
  "use step";
  console.log(`[Approval] Publishing content: ${draft.title}`);
  // In production: publish to CMS
}

async function sendStaffNotification(appointment: AppointmentData, webhookUrl: string): Promise<void> {
  "use step";
  
  const { stepId } = getStepMetadata();
  console.log(`[Appointment] Notifying staff for: ${appointment.appointmentId}`);
  console.log(`[Appointment] Confirmation webhook: ${webhookUrl}`);
  
  // In production: send email/SMS with idempotency key
  // await emailService.send({
  //   to: "staff@drsayuj.info",
  //   subject: `New Appointment Request: ${appointment.patientName}`,
  //   idempotencyKey: stepId, // Prevents duplicate notifications on retry
  // });
}

async function notifyEmergencyTeam(emergency: EmergencyCase, token: string): Promise<void> {
  "use step";
  console.log(`[Emergency] Alerting team for case: ${emergency.caseId}`);
  console.log(`[Emergency] Event token: ${token}`);
}

async function confirmAcknowledgment(emergency: EmergencyCase, by: string): Promise<void> {
  "use step";
  console.log(`[Emergency] Case ${emergency.caseId} acknowledged by ${by}`);
}

async function notifyEscalation(emergency: EmergencyCase, to: string, reason: string): Promise<void> {
  "use step";
  console.log(`[Emergency] Case ${emergency.caseId} escalated to ${to}: ${reason}`);
}

async function closeEmergencyCase(emergency: EmergencyCase, notes: string): Promise<void> {
  "use step";
  console.log(`[Emergency] Case ${emergency.caseId} closed: ${notes}`);
}

async function autoEscalate(emergency: EmergencyCase): Promise<void> {
  "use step";
  console.log(`[Emergency] Auto-escalating case ${emergency.caseId} to senior staff`);
}

async function initiatePayment(payment: PaymentRequest, callbackUrl: string): Promise<void> {
  "use step";
  console.log(`[Payment] Initiating payment for order: ${payment.orderId}`);
  console.log(`[Payment] Callback URL: ${callbackUrl}`);
  // In production: call payment gateway API
}

async function sendPaymentConfirmation(email: string, orderId: string, transactionId: string): Promise<void> {
  "use step";
  
  const { stepId } = getStepMetadata();
  console.log(`[Payment] Sending confirmation to ${email} for order ${orderId}`);
  
  // Use stepId as idempotency key to prevent duplicate emails on retry
  // await emailService.send({
  //   to: email,
  //   template: "payment-confirmation",
  //   data: { orderId, transactionId },
  //   idempotencyKey: stepId,
  // });
}

async function sendPaymentFailure(email: string, orderId: string, error: string): Promise<void> {
  "use step";
  
  const { stepId } = getStepMetadata();
  console.log(`[Payment] Sending failure notification to ${email} for order ${orderId}: ${error}`);
  
  // Use stepId as idempotency key
  // await emailService.send({
  //   to: email,
  //   template: "payment-failed",
  //   data: { orderId, error },
  //   idempotencyKey: stepId,
  // });
}
