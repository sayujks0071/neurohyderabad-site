/**
 * Types for appointment management
 */
export interface Appointment {
  id: string;
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  preferred_date: string;
  preferred_time: string;
  appointment_type: string;
  chief_complaint: string;
  pain_score?: number;
  mri_scan_available?: boolean;
  status: string;
  source: string;
  created_at: string;
}

/** Shape expected by generateWhatsappUrl */
export interface WhatsappAppointment {
  id: string;
  fullName: string;
  phone: string;
  preferredDate: string;
}
