import { Appointment } from './data';

// Message template for WhatsApp confirmation
export const WHATSAPP_MESSAGE_TEMPLATE = (name: string, date: string) =>
  `Hello ${name}, this is regarding your appointment with Dr. Sayuj on ${date}. We confirm your slot. Please bring your MRI/CT scans.`;

export const generateWhatsappUrl = (patient: Appointment): string => {
  // Sanitize phone number: remove all non-digit characters (spaces, dashes, parens, etc.)
  // This ensures we have a clean string of numbers to work with.
  let cleanNumber = patient.contactNumber.replace(/\D/g, '');

  // Normalize Indian numbers: if the user entered 91XXXXXXXXXX (12 digits), we strip the '91' prefix.
  // This is because our URL template explicitly adds '91', so we avoid '9191...' duplication.
  // For other lengths (e.g. 10 digits), we assume it's a local number and the template adds '91'.
  if (cleanNumber.startsWith('91') && cleanNumber.length === 12) {
    cleanNumber = cleanNumber.slice(2);
  }

  // Generate the dynamic message using the template
  const message = WHATSAPP_MESSAGE_TEMPLATE(patient.patientName, patient.requestedDate);

  // Construct the final WhatsApp API URL with the sanitized number and encoded message
  return `https://wa.me/91${cleanNumber}?text=${encodeURIComponent(message)}`;
};
