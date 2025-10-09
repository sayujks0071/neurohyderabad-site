import { inngest } from "@/src/lib/inngest";
import type { Events } from "@/src/lib/inngest";

// Utility functions for sending events
export class InngestEvents {
  // Send appointment created event
  static async appointmentCreated(data: Events["appointment/created"]["data"]) {
    return await inngest.send({
      name: "appointment/created",
      data
    });
  }

  // Send appointment reminder event
  static async appointmentReminder(data: Events["appointment/reminder"]["data"]) {
    return await inngest.send({
      name: "appointment/reminder",
      data
    });
  }

  // Send patient welcome event
  static async patientWelcome(data: Events["patient/welcome"]["data"]) {
    return await inngest.send({
      name: "patient/welcome",
      data
    });
  }

  // Send contact form event
  static async contactForm(data: Events["website/contact-form"]["data"]) {
    return await inngest.send({
      name: "website/contact-form",
      data
    });
  }

  // Send consultation request event
  static async consultationRequest(data: Events["website/consultation-request"]["data"]) {
    return await inngest.send({
      name: "website/consultation-request",
      data
    });
  }

  // Send page view event
  static async pageView(data: Events["analytics/page-view"]["data"]) {
    return await inngest.send({
      name: "analytics/page-view",
      data
    });
  }

  // Send conversion event
  static async conversion(data: Events["analytics/conversion"]["data"]) {
    return await inngest.send({
      name: "analytics/conversion",
      data
    });
  }

  // Test events
  static async testHelloWorld(data: Events["test/hello.world"]["data"]) {
    return await inngest.send({
      name: "test/hello.world",
      data
    });
  }

  static async testAppointmentFlow(data: Events["test/appointment.flow"]["data"]) {
    return await inngest.send({
      name: "test/appointment.flow",
      data
    });
  }

  static async testErrorHandling(data: Events["test/error.handling"]["data"]) {
    return await inngest.send({
      name: "test/error.handling",
      data
    });
  }
}

// Export the class and individual functions for convenience
export default InngestEvents;

export const {
  appointmentCreated,
  appointmentReminder,
  patientWelcome,
  contactForm,
  consultationRequest,
  pageView,
  conversion,
  testHelloWorld,
  testAppointmentFlow,
  testErrorHandling
} = InngestEvents;
