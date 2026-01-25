export interface ConsultationPrepProps {
  patientName: string;
  surgeryType: string;
  appointmentDate: string; // YYYY-MM-DD format
  appointmentTime: string;
  prepSteps: {
    step: number;
    title: string;
    description: string;
  }[];
}
