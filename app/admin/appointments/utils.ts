import { Appointment } from './data';

export const generateWhatsappUrl = (patient: Appointment): string => {
  // Sanitize phone number: remove non-digits
  let cleanNumber = patient.contactNumber.replace(/\D/g, '');

  // Normalize Indian numbers: if it starts with 91 and is 12 digits, strip the 91
  // because the URL format adds it back.
  if (cleanNumber.startsWith('91') && cleanNumber.length === 12) {
    cleanNumber = cleanNumber.slice(2);
  }

  // Dynamic Message
  const message = `Hello ${patient.patientName}, this is regarding your appointment with Dr. Sayuj on ${patient.requestedDate}. We confirm your slot. Please bring your MRI/CT scans.`;

  return `https://wa.me/91${cleanNumber}?text=${encodeURIComponent(message)}`;
};
