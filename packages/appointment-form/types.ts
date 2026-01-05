export interface BookingData {
  patientName: string;
  email: string;
  phone: string;
  age: string;
  gender: "male" | "female" | "other" | "";
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
}

export interface EmailResult {
  success: boolean;
  error?: string;
}
