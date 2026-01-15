import { Appointment } from './data';

// Message template for WhatsApp confirmation
export const WHATSAPP_MESSAGE_TEMPLATE = (name: string, date: string) =>
  `Hello ${name}, this is regarding your appointment with Dr. Sayuj on ${date}. We confirm your slot. Please bring your MRI/CT scans.`;

export const generateWhatsappUrl = (patient: Appointment): string => {
  // Sanitize phone number: remove non-digits
  let cleanNumber = patient.contactNumber.replace(/\D/g, '');

  // Normalize Indian numbers: if it starts with 91 and is 12 digits, strip the 91
  // because the URL format adds it back.
  if (cleanNumber.startsWith('91') && cleanNumber.length === 12) {
    cleanNumber = cleanNumber.slice(2);
  }

  // Generate the message
  const message = WHATSAPP_MESSAGE_TEMPLATE(patient.patientName, patient.requestedDate);

  return `https://wa.me/91${cleanNumber}?text=${encodeURIComponent(message)}`;
};
