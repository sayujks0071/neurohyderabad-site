export interface BookingData {
  patientName: string;
  email: string;
  phone: string;
  age: string;
  gender: "male" | "female" | "other" | "";
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
  painScore: number;
  mriScanAvailable: boolean;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
}

export interface EmailResult {
  success: boolean;
  error?: string;
}
