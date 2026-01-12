export enum AppointmentStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export enum AppointmentType {
  NEW_CONSULTATION = "New Consultation",
  FOLLOW_UP = "Follow-up",
  POST_OP_CHECK = "Post-Op Check",
  REPORT_REVIEW = "Report Review",
  BRAIN_SPECIALIST = "Brain Specialist Consultation",
  SPINE_SPECIALIST = "Spine Specialist Consultation",
}

export interface Report {
  id: string;
  type: "MRI" | "CT" | "X-RAY" | "BLOOD_WORK";
  url: string;
  date: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  lastVisit?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  type: AppointmentType;
  symptoms: string;
  status: AppointmentStatus;
  priority: Priority;
  aiTriageSummary?: string;
  aiTriageConcerns?: string[];
  fullAiAnalysis?: string;
  reports?: Report[];
  painScore?: number;
  mriScanAvailable?: boolean;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}
