/**
 * Approval Workflow API
 * 
 * Human-in-the-loop approval endpoints
 */

import { start, resumeHook } from "workflow/api";
import { NextRequest, NextResponse } from "next/server";
import { 
  contentApprovalWorkflow,
  contentApprovalHook,
  appointmentConfirmationWorkflow,
  emergencyEscalationWorkflow,
} from "@/workflows/approval-workflow";

// Verify API key
function verifyApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get("x-api-key");
  const validKey = process.env.WORKFLOW_API_KEY || process.env.CRON_SECRET;
  return apiKey === validKey;
}

/**
 * POST /api/workflows/approve
 * 
 * Start approval workflows or resume pending approvals
 * 
 * Body options:
 * - { action: "start-content", draft: {...} } - Start content approval
 * - { action: "start-appointment", appointment: {...} } - Start appointment confirmation
 * - { action: "start-emergency", emergency: {...} } - Start emergency escalation
 * - { action: "approve-content", contentId, approved, approvedBy, ... } - Resume content approval
 * - { action: "emergency-event", caseId, event: {...} } - Send emergency event
 */
export async function POST(request: NextRequest) {
  try {
    if (!verifyApiKey(request)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action } = body;

    switch (action) {
      // ================== Start Workflows ==================
      
      case "start-content": {
        const { draft } = body;
        if (!draft?.id || !draft?.title) {
          return NextResponse.json(
            { error: "Draft with id and title required" },
            { status: 400 }
          );
        }

        const run = await start(contentApprovalWorkflow, [draft]);

        return NextResponse.json({
          message: "Content approval workflow started",
          runId: run.runId,
          approvalToken: `content-approval:${draft.id}`,
          instructions: "Use the approvalToken to approve/reject via the approve-content action",
        });
      }

      case "start-appointment": {
        const { appointment } = body;
        if (!appointment?.appointmentId) {
          return NextResponse.json(
            { error: "Appointment data required" },
            { status: 400 }
          );
        }

        const run = await start(appointmentConfirmationWorkflow, [appointment]);

        return NextResponse.json({
          message: "Appointment confirmation workflow started",
          runId: run.runId,
          webhookToken: `appointment-confirm:${appointment.appointmentId}`,
        });
      }

      case "start-emergency": {
        const { emergency } = body;
        if (!emergency?.caseId) {
          return NextResponse.json(
            { error: "Emergency case data required" },
            { status: 400 }
          );
        }

        const run = await start(emergencyEscalationWorkflow, [emergency]);

        return NextResponse.json({
          message: "Emergency escalation workflow started",
          runId: run.runId,
          eventToken: `emergency:${emergency.caseId}`,
          instructions: "Send events (acknowledged, resolved, escalated) using the emergency-event action",
        });
      }

      // ================== Resume Workflows ==================

      case "approve-content": {
        const { contentId, approved, approvedBy, comment, publishImmediately } = body;
        
        if (!contentId || typeof approved !== "boolean" || !approvedBy) {
          return NextResponse.json(
            { error: "contentId, approved (boolean), and approvedBy required" },
            { status: 400 }
          );
        }

        try {
          // Use the type-safe hook to resume with validation
          const result = await contentApprovalHook.resume(
            `content-approval:${contentId}`,
            {
              contentId,
              approved,
              approvedBy,
              comment: comment || "",
              publishImmediately: publishImmediately || false,
            }
          );

          return NextResponse.json({
            message: `Content ${approved ? "approved" : "rejected"}`,
            runId: result.runId,
          });
        } catch (error) {
          return NextResponse.json(
            { error: "Invalid approval token or validation failed", details: String(error) },
            { status: 400 }
          );
        }
      }

      case "emergency-event": {
        const { caseId, event } = body;
        
        if (!caseId || !event?.type) {
          return NextResponse.json(
            { error: "caseId and event with type required" },
            { status: 400 }
          );
        }

        // Add timestamp to event
        const eventWithTimestamp = {
          ...event,
          at: new Date().toISOString(),
        };

        try {
          const result = await resumeHook(`emergency:${caseId}`, eventWithTimestamp);

          return NextResponse.json({
            message: `Emergency event ${event.type} recorded`,
            runId: result.runId,
          });
        } catch (error) {
          return NextResponse.json(
            { error: "Invalid case ID or event", details: String(error) },
            { status: 400 }
          );
        }
      }

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("[Approval Workflow API] Error:", error);
    return NextResponse.json(
      { error: "Failed to process request", details: String(error) },
      { status: 500 }
    );
  }
}

/**
 * GET /api/workflows/approve
 * 
 * Get API documentation
 */
export async function GET() {
  return NextResponse.json({
    endpoint: "/api/workflows/approve",
    description: "Human-in-the-loop approval workflows",
    actions: {
      "start-content": {
        description: "Start content approval workflow",
        body: {
          action: "start-content",
          draft: {
            id: "unique-content-id",
            title: "Content Title",
            slug: "content-slug",
            content: "Content body...",
            author: "Author Name",
            createdAt: "2026-01-20T00:00:00Z",
          },
        },
      },
      "approve-content": {
        description: "Approve or reject pending content",
        body: {
          action: "approve-content",
          contentId: "unique-content-id",
          approved: true,
          approvedBy: "Reviewer Name",
          comment: "Optional comment",
          publishImmediately: false,
        },
      },
      "start-appointment": {
        description: "Start appointment confirmation workflow",
        body: {
          action: "start-appointment",
          appointment: {
            appointmentId: "APT-123",
            patientName: "Patient Name",
            patientEmail: "patient@email.com",
            patientPhone: "+91-9876543210",
            requestedDate: "2026-01-25",
            requestedTime: "10:00",
            reason: "Back pain consultation",
          },
        },
      },
      "start-emergency": {
        description: "Start emergency escalation workflow",
        body: {
          action: "start-emergency",
          emergency: {
            caseId: "EMR-001",
            patientName: "Patient Name",
            symptoms: ["severe headache", "vision loss"],
            severity: "critical",
            reportedAt: "2026-01-20T15:00:00Z",
          },
        },
      },
      "emergency-event": {
        description: "Send event to emergency workflow",
        body: {
          action: "emergency-event",
          caseId: "EMR-001",
          event: {
            type: "acknowledged",
            by: "Dr. Smith",
          },
        },
      },
    },
  });
}
