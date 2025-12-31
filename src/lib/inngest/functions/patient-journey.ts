import { inngest } from "@/src/lib/inngest";
import type { Events } from "@/src/lib/inngest";
import { crm } from "@/src/lib/crm";
// import EmailService from "@/src/lib/email";

// Patient Journey: Initial Contact to Consultation
export const patientJourneyOrchestrator = inngest.createFunction(
  { id: "patient-journey-orchestrator" },
  { event: "patient/journey.started" },
  async ({ event, step }) => {
    const { patientEmail, patientName, source, condition, urgency } = event.data;

    // Step 1: Send immediate welcome email
    await step.run("send-welcome-email", async () => {
      console.log(`Sending welcome email to ${patientEmail}`);
      // TODO: Integrate with email service
      return {
        emailSent: true,
        template: "welcome",
        recipient: patientEmail,
        messageId: "dev_mode"
      };
    });

    // Step 2: Schedule follow-up based on urgency
    const followUpDelay = urgency === "high" ? "2h" : urgency === "medium" ? "24h" : "72h";
    
    await step.run("schedule-follow-up", async () => {
      console.log(`Scheduling ${followUpDelay} follow-up for ${patientEmail}`);
      
      // Schedule follow-up email
      await inngest.send({
        name: "patient/follow-up",
        data: {
          patientEmail,
          patientName,
          condition,
          followUpType: "initial-contact",
          source
        },
        ts: Date.now() + (urgency === "high" ? 2 * 60 * 60 * 1000 : 
                          urgency === "medium" ? 24 * 60 * 60 * 1000 : 
                          72 * 60 * 60 * 1000)
      });

      return { followUpScheduled: true, delay: followUpDelay };
    });

    // Step 3: Add to CRM/lead tracking
    await step.run("add-to-crm", async () => {
      console.log(`Adding ${patientName} to CRM system`);

      const leadScore = urgency === "high" ? 90 : urgency === "medium" ? 70 : 50;

      const addResult = await crm.addLead({
        email: patientEmail,
        firstName: patientName.split(' ')[0],
        lastName: patientName.split(' ').slice(1).join(' '),
        source,
        condition,
        urgency
      });

      if (addResult.success) {
        await crm.updateLeadScore(patientEmail, leadScore);
      }

      return {
        crmAdded: addResult.success,
        leadId: addResult.id,
        leadScore
      };
    });

    return {
      success: true,
      patientEmail,
      journeyStarted: true,
      nextSteps: ["welcome-email", "follow-up-scheduled", "crm-added"]
    };
  }
);

// Patient Follow-up Sequence
export const patientFollowUp = inngest.createFunction(
  { id: "patient-follow-up" },
  { event: "patient/follow-up" },
  async ({ event, step }) => {
    const { patientEmail, patientName, condition, followUpType, source } = event.data;

    // Step 1: Check if patient has already booked
    const hasBooked = await step.run("check-appointment-status", async () => {
      console.log(`Checking appointment status for ${patientEmail}`);
      // TODO: Check database for existing appointments
      return { hasAppointment: false }; // Placeholder
    });

    if (hasBooked.hasAppointment) {
      return { skipped: true, reason: "Patient already has appointment" };
    }

    // Step 2: Send personalized follow-up email
    await step.run("send-follow-up-email", async () => {
      console.log(`Sending ${followUpType} follow-up to ${patientEmail}`);
      
      const emailContent = {
        to: patientEmail,
        subject: `Your ${condition} Consultation - Dr. Sayuj Krishnan`,
        template: followUpType,
        personalization: {
          patientName,
          condition,
          source
        }
      };

      // TODO: Send actual email
      console.log("Email content:", emailContent);
      return { emailSent: true };
    });

    // Step 3: Schedule next follow-up if no response
    await step.run("schedule-next-follow-up", async () => {
      const nextFollowUpDelay = followUpType === "initial-contact" ? "7d" : "14d";
      
      await inngest.send({
        name: "patient/follow-up",
        data: {
          patientEmail,
          patientName,
          condition,
          followUpType: "reminder",
          source
        },
        ts: Date.now() + (followUpType === "initial-contact" ? 7 * 24 * 60 * 60 * 1000 : 14 * 24 * 60 * 60 * 1000)
      });

      return { nextFollowUpScheduled: true };
    });

    return {
      success: true,
      followUpSent: true,
      patientEmail,
      followUpType
    };
  }
);

// Appointment Confirmation and Preparation
export const appointmentPreparation = inngest.createFunction(
  { id: "appointment-preparation" },
  { event: "appointment/confirmed" },
  async ({ event, step }) => {
    const { appointmentId, patientEmail, patientName, appointmentDate, appointmentType } = event.data;

    // Step 1: Send confirmation email with preparation instructions
    await step.run("send-confirmation-email", async () => {
      console.log(`Sending confirmation email to ${patientEmail}`);
      
      const preparationInstructions: Record<string, string[]> = {
        "consultation": [
          "Bring all previous medical reports and MRI/CT scans",
          "List of current medications",
          "Insurance card and ID",
          "Arrive 15 minutes early"
        ],
        "surgery": [
          "Complete pre-operative tests",
          "Follow fasting instructions",
          "Bring a family member",
          "Review post-operative care plan"
        ]
      };

      const instructions = preparationInstructions[appointmentType] || preparationInstructions["consultation"];
      // TODO: Integrate with email service
      console.log("Appointment confirmation email:", {
        patientEmail,
        patientName,
        appointmentDate,
        appointmentType,
        instructions
      });

      return { 
        confirmationSent: true,
        messageId: "dev_mode"
      };
    });

    // Step 2: Schedule pre-appointment reminders
    await step.run("schedule-pre-appointment-reminders", async () => {
      const appointmentDateTime = new Date(appointmentDate);
      
      // 24-hour reminder
      const reminder24h = new Date(appointmentDateTime.getTime() - 24 * 60 * 60 * 1000);
      if (reminder24h > new Date()) {
        await inngest.send({
          name: "appointment/reminder",
          data: {
            appointmentId,
            patientEmail,
            patientName,
            appointmentDate,
            reminderType: "24h"
          },
          ts: reminder24h.getTime()
        });
      }

      // 1-hour reminder
      const reminder1h = new Date(appointmentDateTime.getTime() - 60 * 60 * 1000);
      if (reminder1h > new Date()) {
        await inngest.send({
          name: "appointment/reminder",
          data: {
            appointmentId,
            patientEmail,
            patientName,
            appointmentDate,
            reminderType: "1h"
          },
          ts: reminder1h.getTime()
        });
      }

      return { remindersScheduled: true };
    });

    // Step 3: Add to calendar and send calendar invite
    await step.run("create-calendar-invite", async () => {
      console.log(`Creating calendar invite for ${patientEmail}`);

      // 1. Generate ICS
      const { icsContent, error } = await CalendarService.generateCalendarInvite(
        patientEmail,
        patientName,
        appointmentDate,
        appointmentType
      );

      if (error || !icsContent) {
        console.error("Failed to generate calendar invite:", error);
        return { calendarInviteSent: false, error };
      }

      // 2. Send Email with Attachment
      const result = await EmailService.sendCalendarInvite(
        patientEmail,
        patientName,
        appointmentDate,
        icsContent
      );

      return {
        calendarInviteSent: result.success,
        messageId: result.messageId,
        error: result.error
      };
    });

    return {
      success: true,
      appointmentId,
      confirmationsSent: true,
      remindersScheduled: true,
      calendarInviteSent: true
    };
  }
);

// Post-Appointment Follow-up
export const postAppointmentFollowUp = inngest.createFunction(
  { id: "post-appointment-follow-up" },
  { event: "appointment/completed" },
  async ({ event, step }) => {
    const { appointmentId, patientEmail, patientName, appointmentType, diagnosis, treatmentPlan } = event.data;

    // Step 1: Send post-appointment summary
    await step.run("send-appointment-summary", async () => {
      console.log(`Sending appointment summary to ${patientEmail}`);
      
      const summaryEmail = {
        to: patientEmail,
        subject: `Your Appointment Summary - Dr. Sayuj Krishnan`,
        template: "appointment-summary",
        data: {
          patientName,
          appointmentType,
          diagnosis,
          treatmentPlan,
          nextSteps: treatmentPlan.nextSteps || []
        }
      };

      console.log("Summary email:", summaryEmail);
      return { summarySent: true };
    });

    // Step 2: Schedule follow-up based on treatment plan
    if (treatmentPlan.requiresFollowUp) {
      await step.run("schedule-treatment-follow-up", async () => {
        const followUpDate = new Date(Date.now() + (treatmentPlan.followUpDays || 30) * 24 * 60 * 60 * 1000);
        
        await inngest.send({
          name: "patient/follow-up",
          data: {
            patientEmail,
            patientName,
            condition: diagnosis,
            followUpType: "treatment-follow-up",
            followUpDate: followUpDate.toISOString()
          },
          ts: followUpDate.getTime()
        });

        return { treatmentFollowUpScheduled: true };
      });
    }

    // Step 3: Send patient education materials
    await step.run("send-education-materials", async () => {
      console.log(`Sending education materials to ${patientEmail}`);
      
      const educationContent = {
        condition: diagnosis,
        materials: [
          "Condition-specific information guide",
          "Treatment options overview",
          "Recovery timeline and expectations",
          "When to seek emergency care"
        ]
      };

      // TODO: Send actual education materials
      console.log("Education materials:", educationContent);
      return { educationSent: true };
    });

    return {
      success: true,
      appointmentId,
      summarySent: true,
      educationSent: true,
      followUpScheduled: treatmentPlan.requiresFollowUp
    };
  }
);
