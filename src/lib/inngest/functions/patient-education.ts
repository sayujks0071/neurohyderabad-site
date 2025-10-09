import { inngest } from "@/src/lib/inngest";
import type { Events } from "@/src/lib/inngest";

// Patient Education Content Delivery
export const patientEducationDelivery = inngest.createFunction(
  { id: "patient-education-delivery" },
  { event: "patient/education-requested" },
  async ({ event, step }) => {
    const { patientId, condition, educationType, patientEmail, patientName } = event.data;

    // Step 1: Curate personalized education content
    const educationContent = await step.run("curate-education-content", async () => {
      console.log(`Curating education content for ${condition} - ${educationType}`);
      
      const contentLibrary: Record<string, Record<string, string[]>> = {
        "brain-tumor": {
          "pre-surgery": [
            "Understanding Brain Tumors: A Patient Guide",
            "Pre-Surgery Preparation Checklist",
            "What to Expect During Brain Tumor Surgery",
            "Questions to Ask Your Neurosurgeon"
          ],
          "post-surgery": [
            "Recovery Timeline After Brain Tumor Surgery",
            "Managing Post-Surgery Symptoms",
            "Physical Therapy and Rehabilitation",
            "Long-term Follow-up Care"
          ]
        },
        "spine-surgery": {
          "pre-surgery": [
            "Understanding Your Spine Condition",
            "Endoscopic Spine Surgery: What to Know",
            "Pre-Surgery Exercise and Preparation",
            "Anesthesia and Pain Management Options"
          ],
          "post-surgery": [
            "Recovery After Endoscopic Spine Surgery",
            "Physical Therapy Exercises",
            "Returning to Work and Daily Activities",
            "Preventing Future Spine Problems"
          ]
        },
        "epilepsy": {
          "treatment": [
            "Understanding Epilepsy and Seizures",
            "Medication Management for Epilepsy",
            "Lifestyle Modifications for Epilepsy",
            "When to Seek Emergency Care"
          ]
        }
      };

      const relevantContent = contentLibrary[condition]?.[educationType] || 
                            contentLibrary[condition]?.["general"] || 
                            ["General Health Information"];

      return {
        condition,
        educationType,
        content: relevantContent,
        personalized: true
      };
    });

    // Step 2: Send education materials via email
    await step.run("send-education-materials", async () => {
      console.log(`Sending education materials to ${patientEmail}`);
      
      const educationEmail = {
        to: patientEmail,
        subject: `Your Personalized Health Education - Dr. Sayuj Krishnan`,
        template: "patient-education",
        data: {
          patientName,
          condition,
          educationType,
          content: educationContent.content,
          doctorName: "Dr. Sayuj Krishnan",
          contactInfo: {
            phone: "+91-9778280044",
            email: "neurospinehyd@drsayuj.com"
          }
        }
      };

      // TODO: Send actual email with attachments/links
      console.log("Education email:", educationEmail);
      return { educationSent: true };
    });

    // Step 3: Schedule follow-up education delivery
    await step.run("schedule-follow-up-education", async () => {
      const followUpDelay = educationType === "pre-surgery" ? "3d" : 
                           educationType === "post-surgery" ? "7d" : "14d";
      
      const followUpTime = new Date(Date.now() + 
        (educationType === "pre-surgery" ? 3 * 24 * 60 * 60 * 1000 :
         educationType === "post-surgery" ? 7 * 24 * 60 * 60 * 1000 :
         14 * 24 * 60 * 60 * 1000));

      await inngest.send({
        name: "patient/education-follow-up",
        data: {
          patientId,
          condition,
          educationType,
          patientEmail,
          patientName,
          originalContent: educationContent.content
        },
        ts: followUpTime.getTime()
      });

      return { followUpEducationScheduled: true };
    });

    // Step 4: Track education engagement
    await step.run("track-education-engagement", async () => {
      console.log(`Tracking education engagement for ${patientId}`);
      
      const engagementData = {
        patientId,
        condition,
        educationType,
        contentDelivered: educationContent.content,
        timestamp: new Date().toISOString(),
        deliveryMethod: "email"
      };

      // TODO: Store engagement data for analytics
      console.log("Engagement tracked:", engagementData);
      return { engagementTracked: true };
    });

    return {
      success: true,
      patientId,
      condition,
      educationType,
      contentDelivered: educationContent.content.length,
      followUpScheduled: true
    };
  }
);

// Automated Health Reminders
export const healthReminders = inngest.createFunction(
  { id: "health-reminders" },
  { event: "patient/health-reminder" },
  async ({ event, step }) => {
    const { patientId, reminderType, patientEmail, patientName, condition } = event.data;

    // Step 1: Generate personalized reminder content
    const reminderContent = await step.run("generate-reminder-content", async () => {
      console.log(`Generating ${reminderType} reminder for ${patientId}`);
      
      const reminderTemplates: Record<string, any> = {
        "medication": {
          subject: "Medication Reminder - Dr. Sayuj Krishnan",
          content: "Don't forget to take your prescribed medication. If you have any questions about your medication, please contact us.",
          priority: "high"
        },
        "appointment": {
          subject: "Upcoming Appointment Reminder",
          content: "This is a reminder about your upcoming appointment. Please arrive 15 minutes early and bring all necessary documents.",
          priority: "high"
        },
        "follow-up": {
          subject: "Follow-up Care Reminder",
          content: "It's time for your follow-up care. Please schedule an appointment if you haven't already.",
          priority: "medium"
        },
        "lifestyle": {
          subject: "Health and Wellness Reminder",
          content: "Remember to maintain a healthy lifestyle with proper diet, exercise, and stress management.",
          priority: "low"
        }
      };

      const template = reminderTemplates[reminderType] || reminderTemplates["lifestyle"];
      
      return {
        ...template,
        personalized: true,
        patientName,
        condition
      };
    });

    // Step 2: Send reminder via preferred method
    await step.run("send-reminder", async () => {
      console.log(`Sending ${reminderType} reminder to ${patientEmail}`);
      
      const reminder = {
        to: patientEmail,
        subject: reminderContent.subject,
        template: "health-reminder",
        data: {
          patientName,
          reminderType,
          content: reminderContent.content,
          condition,
          doctorContact: "+91-9778280044"
        }
      };

      // TODO: Send actual reminder (email, SMS, push notification)
      console.log("Reminder sent:", reminder);
      return { reminderSent: true };
    });

    // Step 3: Schedule next reminder if recurring
    if (reminderType === "medication" || reminderType === "lifestyle") {
      await step.run("schedule-next-reminder", async () => {
        const nextReminderDelay = reminderType === "medication" ? "24h" : "7d";
        const nextReminderTime = new Date(Date.now() + 
          (reminderType === "medication" ? 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000));

        await inngest.send({
          name: "patient/health-reminder",
          data: {
            patientId,
            reminderType,
            patientEmail,
            patientName,
            condition
          },
          ts: nextReminderTime.getTime()
        });

        return { nextReminderScheduled: true };
      });
    }

    return {
      success: true,
      patientId,
      reminderType,
      reminderSent: true,
      nextScheduled: reminderType === "medication" || reminderType === "lifestyle"
    };
  }
);

// Patient Satisfaction and Feedback Collection
export const patientFeedbackCollection = inngest.createFunction(
  { id: "patient-feedback-collection" },
  { event: "patient/feedback-request" },
  async ({ event, step }) => {
    const { patientId, serviceType, patientEmail, patientName, appointmentDate } = event.data;

    // Step 1: Generate personalized feedback request
    const feedbackRequest = await step.run("generate-feedback-request", async () => {
      console.log(`Generating feedback request for ${patientId}`);
      
      const feedbackTemplates: Record<string, any> = {
        "consultation": {
          subject: "How was your consultation with Dr. Sayuj Krishnan?",
          questions: [
            "How would you rate your overall experience?",
            "Was Dr. Sayuj able to answer all your questions?",
            "How would you rate the clinic facilities?",
            "Would you recommend Dr. Sayuj to others?"
          ]
        },
        "surgery": {
          subject: "Feedback on your surgery experience",
          questions: [
            "How was your pre-surgery preparation?",
            "Rate your surgery experience",
            "How is your recovery going?",
            "Any suggestions for improvement?"
          ]
        },
        "follow-up": {
          subject: "Follow-up care feedback",
          questions: [
            "How was your follow-up appointment?",
            "Are you satisfied with your recovery progress?",
            "Any concerns about your treatment?",
            "How can we improve our services?"
          ]
        }
      };

      const template = feedbackTemplates[serviceType] || feedbackTemplates["consultation"];
      
      return {
        ...template,
        patientName,
        appointmentDate,
        personalized: true
      };
    });

    // Step 2: Send feedback request
    await step.run("send-feedback-request", async () => {
      console.log(`Sending feedback request to ${patientEmail}`);
      
      const feedbackEmail = {
        to: patientEmail,
        subject: feedbackRequest.subject,
        template: "feedback-request",
        data: {
          patientName,
          serviceType,
          appointmentDate,
          questions: feedbackRequest.questions,
          feedbackLink: `https://www.drsayuj.com/feedback?patient=${patientId}&service=${serviceType}`
        }
      };

      // TODO: Send actual feedback request
      console.log("Feedback request sent:", feedbackEmail);
      return { feedbackRequestSent: true };
    });

    // Step 3: Schedule follow-up if no response
    await step.run("schedule-feedback-follow-up", async () => {
      const followUpTime = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
      
      await inngest.send({
        name: "patient/feedback-follow-up",
        data: {
          patientId,
          serviceType,
          patientEmail,
          patientName,
          originalRequestDate: new Date().toISOString()
        },
        ts: followUpTime.getTime()
      });

      return { feedbackFollowUpScheduled: true };
    });

    return {
      success: true,
      patientId,
      serviceType,
      feedbackRequestSent: true,
      followUpScheduled: true
    };
  }
);
