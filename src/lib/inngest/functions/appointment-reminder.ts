import { inngest } from "@/src/lib/inngest";
import type { Events } from "@/src/lib/inngest";
// import EmailService from "@/src/lib/email";

// Example function: Send appointment reminder
export const appointmentReminder = inngest.createFunction(
  { id: "appointment-reminder" },
  { event: "appointment/reminder" },
  async ({ event, step }) => {
    const { appointmentId, patientEmail, patientName, appointmentDate, reminderType } = event.data;

    // Step 1: Validate appointment data
    const appointment = await step.run("validate-appointment", async () => {
      // Add your appointment validation logic here
      console.log(`Validating appointment ${appointmentId} for ${patientName}`);
      return {
        id: appointmentId,
        email: patientEmail,
        name: patientName,
        date: appointmentDate,
        valid: true
      };
    });

    // Step 2: Send email reminder
    const emailResult = await step.run("send-reminder-email", async () => {
      console.log(`Sending ${reminderType} reminder to ${patientEmail}`);
      // TODO: Integrate with email service
      
      return { 
        success: true, 
        messageId: "dev_mode"
      };
    });

    // Step 3: Log the reminder
    await step.run("log-reminder", async () => {
      console.log(`Reminder sent successfully for appointment ${appointmentId}`);
      return { logged: true, timestamp: new Date().toISOString() };
    });

    return {
      success: true,
      appointmentId,
      emailSent: emailResult.success,
      reminderType
    };
  }
);

// Example function: Handle appointment creation
export const appointmentCreated = inngest.createFunction(
  { id: "appointment-created" },
  { event: "appointment/created" },
  async ({ event, step }) => {
    const { appointmentId, patientName, patientEmail, appointmentDate, appointmentType } = event.data;

    // Step 1: Send confirmation email
    await step.run("send-confirmation", async () => {
      console.log(`Sending confirmation email to ${patientEmail} for appointment ${appointmentId}`);
      // Add your email sending logic here
      return { confirmationSent: true };
    });

    // Step 2: Schedule reminder emails
    await step.run("schedule-reminders", async () => {
      const appointmentDateTime = new Date(appointmentDate);
      
      // Schedule 24-hour reminder
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

      // Schedule 1-hour reminder
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

    return {
      success: true,
      appointmentId,
      confirmationsSent: true,
      remindersScheduled: true
    };
  }
);
