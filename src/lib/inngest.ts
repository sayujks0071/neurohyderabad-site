import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "neurosurgery-nextjs-site",
  name: "Dr. Sayuj Krishnan - Neurosurgery Website",
  // Optional: Add environment-specific configuration
  ...(process.env.INNGEST_BASE_URL && {
    baseUrl: process.env.INNGEST_BASE_URL,
  }),
  ...(process.env.INNGEST_EVENT_KEY && {
    eventKey: process.env.INNGEST_EVENT_KEY,
  }),
  ...(process.env.INNGEST_SIGNING_KEY && {
    signingKey: process.env.INNGEST_SIGNING_KEY,
  }),
});

// Export types for better TypeScript support
export type Events = {
  // Appointment events
  "appointment/created": {
    data: {
      appointmentId: string;
      patientName: string;
      patientEmail: string;
      appointmentDate: string;
      appointmentType: string;
    };
  };

  "appointment/confirmed": {
    data: {
      appointmentId: string;
      patientEmail: string;
      confirmationTime: string;
    };
  };

  "appointment/reminder": {
    data: {
      appointmentId: string;
      patientEmail: string;
      patientName: string;
      appointmentDate: string;
      reminderType: "24h" | "1h" | "same-day";
    };
  };

  // Patient communication events
  "patient/welcome": {
    data: {
      patientEmail: string;
      patientName: string;
      referralSource?: string;
    };
  };

  "patient/follow-up-procedure": {
    data: {
      patientEmail: string;
      patientName: string;
      procedureType: string;
      followUpDate: string;
    };
  };

  // Website events
  "website/contact-form": {
    data: {
      name: string;
      email: string;
      phone?: string;
      message: string;
      source: string;
      timestamp: string;
    };
  };

  "website/consultation-request": {
    data: {
      patientName: string;
      patientEmail: string;
      patientPhone: string;
      condition: string;
      urgency: "low" | "medium" | "high";
      preferredDate?: string;
    };
  };

  // Analytics events
  "analytics/page-view": {
    data: {
      page: string;
      userAgent: string;
      referrer?: string;
      timestamp: string;
    };
  };

  "analytics/conversion": {
    data: {
      conversionType: "appointment" | "consultation" | "download" | "page-view" | "contact-form" | "phone-call";
      page: string;
      value?: number;
      timestamp: string;
      patientEmail?: string;
      patientName?: string;
      condition?: string;
      userAgent?: string;
      referrer?: string;
    };
  };

  // Test events
  "test/hello.world": {
    data: {
      email: string;
    };
  };

  "test/appointment.flow": {
    data: {
      patientName: string;
      patientEmail: string;
    };
  };

  "test/error.handling": {
    data: {
      shouldFail: boolean;
      errorMessage?: string;
    };
  };

  // Patient Journey Events
  "patient/journey.started": {
    data: {
      patientEmail: string;
      patientName: string;
      source: string;
      condition: string;
      urgency: "low" | "medium" | "high";
    };
  };

  "patient/follow-up": {
    data: {
      patientEmail: string;
      patientName: string;
      condition: string;
      followUpType: "initial-contact" | "reminder" | "treatment-follow-up";
      source?: string;
      followUpDate?: string;
    };
  };

  "appointment/completed": {
    data: {
      appointmentId: string;
      patientEmail: string;
      patientName: string;
      appointmentType: string;
      diagnosis: string;
      treatmentPlan: {
        requiresFollowUp: boolean;
        followUpDays?: number;
        nextSteps?: string[];
      };
    };
  };

  // Emergency Events
  "emergency/alert": {
    data: {
      emergencyType: string;
      patientInfo: any;
      location: string;
      severity: "low" | "medium" | "high" | "critical";
      contactInfo: any;
    };
  };

  "emergency/follow-up": {
    data: {
      caseId: string;
      emergencyType: string;
      patientInfo: any;
      originalTimestamp: string;
    };
  };

  "surgery/post-operative-monitoring": {
    data: {
      patientId: string;
      surgeryType: string;
      surgeryDate: string;
      patientContact: any;
      familyContact: any;
    };
  };

  "patient/safety-alert": {
    data: {
      alertType: string;
      patientId: string;
      severity: string;
      details: any;
      contactInfo: any;
    };
  };

  "patient/safety-follow-up": {
    data: {
      incidentId: string;
      alertType: string;
      patientId: string;
      originalSeverity: string;
    };
  };

  // Patient Education Events
  "patient/education-requested": {
    data: {
      patientId: string;
      condition: string;
      educationType: string;
      patientEmail: string;
      patientName: string;
    };
  };

  "patient/education-follow-up": {
    data: {
      patientId: string;
      condition: string;
      educationType: string;
      patientEmail: string;
      patientName: string;
      originalContent: string[];
    };
  };

  "patient/health-reminder": {
    data: {
      patientId: string;
      reminderType: string;
      patientEmail: string;
      patientName: string;
      condition: string;
    };
  };

  "patient/feedback-request": {
    data: {
      patientId: string;
      serviceType: string;
      patientEmail: string;
      patientName: string;
      appointmentDate: string;
    };
  };

  "patient/feedback-follow-up": {
    data: {
      patientId: string;
      serviceType: string;
      patientEmail: string;
      patientName: string;
      originalRequestDate: string;
    };
  };

  // Content Performance Events
  "content/performance": {
    data: {
      contentId: string;
      contentType: string;
      metrics: {
        pageViews: number;
        timeOnPage: number;
        bounceRate: number;
        conversions: number;
      };
    };
  };
};
