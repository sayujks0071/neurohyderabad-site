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
  status: string;
  source: string;
  created_at: string;
  pain_score?: number;
  mri_scan_available?: boolean;
}

/** Shape expected by generateWhatsappUrl */
export interface WhatsappAppointment {
  id: string;
  fullName: string;
  phone: string;
  preferredDate: string;
}
