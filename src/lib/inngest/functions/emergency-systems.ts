import { inngest } from "@/src/lib/inngest";
import type { Events } from "@/src/lib/inngest";
import { emergencyCaseRepository } from "@/src/lib/emergency/repository";
import EmailService from "@/src/lib/email";

// Emergency Notification System
export const emergencyNotificationSystem = inngest.createFunction(
  { id: "emergency-notification-system" },
  { event: "emergency/alert" },
  async ({ event, step }) => {
    const { emergencyType, patientInfo, location, severity, contactInfo } = event.data;

    // Step 1: Immediate emergency response
    await step.run("immediate-emergency-response", async () => {
      console.log(`🚨 EMERGENCY ALERT: ${emergencyType} - Severity: ${severity}`);
      
      const emergencyResponse = {
        timestamp: new Date().toISOString(),
        type: emergencyType,
        severity,
        patientInfo,
        location,
        contactInfo,
        status: "active"
      };

      // TODO: Send immediate alerts to emergency contacts
      // - SMS to Dr. Sayuj's phone
      // - Push notification to hospital staff
      // - Email to emergency team
      
      console.log("Emergency response initiated:", emergencyResponse);
      return { emergencyResponseInitiated: true };
    });

    // Step 2: Notify hospital emergency department
    await step.run("notify-hospital-emergency", async () => {
      console.log(`Notifying hospital emergency department`);
      const result = await EmailService.sendEmergencyNotification(
        emergencyType,
        patientInfo,
        severity
      );

      return {
        hospitalNotified: result.success,
        messageId: result.messageId,
        error: result.error,
        development: result.development
      };
    });

    // Step 3: Create emergency case record
    await step.run("create-emergency-case", async () => {
      console.log(`Creating emergency case record`);
      
      const caseRecord = {
        caseId: `emergency_${Date.now()}`,
        emergencyType,
        patientInfo,
        location,
        severity,
        timestamp: new Date().toISOString(),
        status: "active",
        assignedDoctor: "Dr. Sayuj Krishnan"
      };

      // Store in emergency case management system
      await emergencyCaseRepository.create(caseRecord);

      console.log("Emergency case created:", caseRecord);
      return { caseCreated: true, caseId: caseRecord.caseId };
    });

    // Step 4: Schedule follow-up check
    await step.run("schedule-follow-up-check", async () => {
      const followUpTime = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
      
      await inngest.send({
        name: "emergency/follow-up",
        data: {
          caseId: `emergency_${Date.now()}`,
          emergencyType,
          patientInfo,
          originalTimestamp: new Date().toISOString()
        },
        ts: followUpTime.getTime()
      });

      return { followUpScheduled: true };
    });

    return {
      success: true,
      emergencyType,
      severity,
      responseInitiated: true,
      hospitalNotified: true,
      caseCreated: true
    };
  }
);

// Post-Surgery Monitoring and Alerts
export const postSurgeryMonitoring = inngest.createFunction(
  { id: "post-surgery-monitoring" },
  { event: "surgery/post-operative-monitoring" },
  async ({ event, step }) => {
    const { patientId, surgeryType, surgeryDate, patientContact, familyContact } = event.data;

    // Step 1: Schedule immediate post-surgery check
    await step.run("schedule-immediate-check", async () => {
      console.log(`Scheduling immediate post-surgery check for ${patientId}`);
      
      const immediateCheckTime = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
      
      await inngest.send({
        name: "patient/post-surgery-check",
        data: {
          patientId,
          surgeryType,
          checkType: "immediate",
          patientContact,
          familyContact
        },
        ts: immediateCheckTime.getTime()
      });

      return { immediateCheckScheduled: true };
    });

    // Step 2: Schedule daily monitoring for first week
    await step.run("schedule-daily-monitoring", async () => {
      console.log(`Scheduling daily monitoring for ${patientId}`);
      
      for (let day = 1; day <= 7; day++) {
        const checkTime = new Date(Date.now() + day * 24 * 60 * 60 * 1000);
        
        await inngest.send({
          name: "patient/daily-check",
          data: {
            patientId,
            surgeryType,
            day,
            patientContact,
            familyContact
          },
          ts: checkTime.getTime()
        });
      }

      return { dailyMonitoringScheduled: true, days: 7 };
    });

    // Step 3: Schedule follow-up appointment reminders
    await step.run("schedule-follow-up-reminders", async () => {
      console.log(`Scheduling follow-up appointment reminders for ${patientId}`);
      
      const followUpDates = [7, 14, 30, 90]; // days after surgery
      
      for (const days of followUpDates) {
        const reminderTime = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
        
        await inngest.send({
          name: "appointment/reminder",
          data: {
            appointmentId: `followup_${patientId}_${days}d`,
            patientEmail: patientContact.email,
            patientName: patientContact.name,
            appointmentDate: reminderTime.toISOString(),
            reminderType: "follow-up",
            surgeryType
          },
          ts: reminderTime.getTime()
        });
      }

      return { followUpRemindersScheduled: true };
    });

    return {
      success: true,
      patientId,
      surgeryType,
      monitoringScheduled: true,
      immediateCheckScheduled: true,
      dailyMonitoringScheduled: true
    };
  }
);

// Patient Safety Alerts
export const patientSafetyAlerts = inngest.createFunction(
  { id: "patient-safety-alerts" },
  { event: "patient/safety-alert" },
  async ({ event, step }) => {
    const { alertType, patientId, severity, details, contactInfo } = event.data;

    // Step 1: Assess alert severity
    const severityAssessment = await step.run("assess-alert-severity", async () => {
      console.log(`Assessing safety alert severity: ${alertType}`);
      
      const severityLevels: Record<string, string> = {
        "medication-error": "high",
        "allergic-reaction": "critical",
        "post-surgery-complication": "high",
        "missed-appointment": "medium",
        "medication-compliance": "medium"
      };

      const assessedSeverity = severityLevels[alertType] || severity;
      
      return {
        alertType,
        assessedSeverity,
        requiresImmediateAction: assessedSeverity === "critical" || assessedSeverity === "high"
      };
    });

    // Step 2: Immediate response for critical alerts
    if (severityAssessment.requiresImmediateAction) {
      await step.run("immediate-safety-response", async () => {
        console.log(`🚨 IMMEDIATE SAFETY RESPONSE: ${alertType}`);
        
        const safetyResponse = {
          alertType,
          patientId,
          severity: severityAssessment.assessedSeverity,
          details,
          timestamp: new Date().toISOString(),
          actions: [
            "Contact patient immediately",
            "Notify medical team",
            "Review patient records",
            "Schedule emergency consultation if needed"
          ]
        };

        // TODO: Send immediate notifications
        console.log("Safety response:", safetyResponse);
        return { immediateResponseInitiated: true };
      });
    }

    // Step 3: Create safety incident record
    await step.run("create-safety-incident", async () => {
      console.log(`Creating safety incident record for ${patientId}`);
      
      const incidentRecord = {
        incidentId: `safety_${Date.now()}`,
        alertType,
        patientId,
        severity: severityAssessment.assessedSeverity,
        details,
        timestamp: new Date().toISOString(),
        status: "active",
        assignedTo: "Dr. Sayuj Krishnan"
      };

      // TODO: Store in safety management system
      console.log("Safety incident created:", incidentRecord);
      return { incidentCreated: true, incidentId: incidentRecord.incidentId };
    });

    // Step 4: Schedule follow-up safety check
    await step.run("schedule-safety-follow-up", async () => {
      const followUpDelay = severityAssessment.assessedSeverity === "critical" ? "1h" : 
                           severityAssessment.assessedSeverity === "high" ? "4h" : "24h";
      
      const followUpTime = new Date(Date.now() + 
        (severityAssessment.assessedSeverity === "critical" ? 60 * 60 * 1000 :
         severityAssessment.assessedSeverity === "high" ? 4 * 60 * 60 * 1000 :
         24 * 60 * 60 * 1000));

      await inngest.send({
        name: "patient/safety-follow-up",
        data: {
          incidentId: `safety_${Date.now()}`,
          alertType,
          patientId,
          originalSeverity: severityAssessment.assessedSeverity
        },
        ts: followUpTime.getTime()
      });

      return { safetyFollowUpScheduled: true, delay: followUpDelay };
    });

    return {
      success: true,
      alertType,
      severity: severityAssessment.assessedSeverity,
      immediateResponse: severityAssessment.requiresImmediateAction,
      incidentCreated: true
    };
  }
);
