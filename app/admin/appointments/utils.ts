import { WhatsappAppointment } from './types';

// Message template for WhatsApp confirmation (includes MRI/CT instruction)
export const WHATSAPP_MESSAGE_TEMPLATE = (name: string, date: string) =>
  `Hello ${name}, this is regarding your appointment with Dr. Sayuj on ${date}. We confirm your slot. Please bring your MRI/CT scans.`;

/**
 * Generates the WhatsApp API URL for the "Quick Action" feature in the admin dashboard.
 *
 * Logic verified against requirements:
 * 1. Sanitizes phone number by removing all non-digits (spaces, dashes, etc.).
 * 2. Uses the standard +91 India country code.
 * 3. Encodes a pre-defined message template with patient name and appointment date.
 */
export const generateWhatsappUrl = (patient: WhatsappAppointment): string => {
  // Sanitize phone number: remove all non-digit characters (spaces, dashes, parens, etc.)
  // This ensures we have a clean string of numbers to work with.
  let cleanNumber = patient.phone.replace(/\D/g, '');

  // Normalize Indian numbers: if the user entered 91XXXXXXXXXX (12 digits), we strip the '91' prefix.
  // This is because our URL template explicitly adds '91', so we avoid '9191...' duplication.
  // For other lengths (e.g. 10 digits), we assume it's a local number and the template adds '91'.
  if (cleanNumber.startsWith('91') && cleanNumber.length === 12) {
    cleanNumber = cleanNumber.slice(2);
  } else if (cleanNumber.startsWith('0') && cleanNumber.length === 11) {
    // Handle case where user entered 0 prefix (e.g. 09876543210)
    cleanNumber = cleanNumber.slice(1);
  }

  // Generate the dynamic message using the template
  const message = WHATSAPP_MESSAGE_TEMPLATE(patient.fullName, patient.preferredDate);

  // Construct the final WhatsApp API URL with the sanitized number and encoded message
  return `https://wa.me/91${cleanNumber}?text=${encodeURIComponent(message)}`;
};
