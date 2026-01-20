import { appointmentCreated, appointmentReminder } from "@/src/lib/inngest/functions/appointment-reminder";
import {
  patientEducationDelivery,
  healthReminders,
  patientFeedbackCollection,
} from "@/src/lib/inngest/functions/patient-education";
import {
  patientJourneyOrchestrator,
  patientFollowUp,
  appointmentPreparation,
  postAppointmentFollowUp,
} from "@/src/lib/inngest/functions/patient-journey";
import {
  emergencyNotificationSystem,
  postSurgeryMonitoring,
  patientSafetyAlerts,
} from "@/src/lib/inngest/functions/emergency-systems";
import {
  analyticsProcessor,
  conversionTracker,
  contentPerformanceTracker,
} from "@/src/lib/inngest/functions/analytics-tracking";
import {
  helloWorld,
  testAppointmentFlow,
  testErrorHandling,
} from "@/src/lib/inngest/functions/test-functions";

export const inngestFunctions = [
  appointmentCreated,
  appointmentReminder,
  patientEducationDelivery,
  healthReminders,
  patientFeedbackCollection,
  patientJourneyOrchestrator,
  patientFollowUp,
  appointmentPreparation,
  postAppointmentFollowUp,
  emergencyNotificationSystem,
  postSurgeryMonitoring,
  patientSafetyAlerts,
  analyticsProcessor,
  conversionTracker,
  contentPerformanceTracker,
  helloWorld,
  testAppointmentFlow,
  testErrorHandling,
];
