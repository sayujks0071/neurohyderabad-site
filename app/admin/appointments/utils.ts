import { WhatsappAppointment } from './types';

// Message template for WhatsApp confirmation (includes MRI/CT instruction)
// Used in the 'Quick Action' feature on the admin appointment list.
// Standardized format: Hello {name}, ... on {date}.
export const WHATSAPP_MESSAGE_TEMPLATE = (name: string, date: string) =>
  `Hello ${name}, this is regarding your appointment with Dr. Sayuj on ${date}. We confirm your slot. Please bring your MRI/CT scans.`;

/**
 * Generates a WhatsApp API URL for appointment confirmation.
 *
 * Logic:
 * 1. Sanitizes the phone number (removes non-digits).
 * 2. Normalizes Indian numbers (strips existing 91 or 0 prefix).
 * 3. Constructs the URL with '91' prefix and encoded message.
 */
export const generateWhatsappUrl = (patient: WhatsappAppointment): string => {
  // Sanitize phone number: remove all non-digit characters (spaces, dashes, parens, etc.)
  // This ensures we have a clean string of numbers to work with.
  let sanitizedNumber = patient.phone.replace(/\D/g, '');

  // Normalize Indian numbers: if the user entered 91XXXXXXXXXX (12 digits), we strip the '91' prefix.
  // This is because our URL template explicitly adds '91', so we avoid '9191...' duplication.
  // For other lengths (e.g. 10 digits), we assume it's a local number and the template adds '91'.
  if (sanitizedNumber.startsWith('91') && sanitizedNumber.length === 12) {
    sanitizedNumber = sanitizedNumber.slice(2);
  } else if (sanitizedNumber.startsWith('0') && sanitizedNumber.length === 11) {
    // Handle case where user entered 0 prefix (e.g. 09876543210)
    sanitizedNumber = sanitizedNumber.slice(1);
  }

  // Generate the dynamic message using the template
  const message = WHATSAPP_MESSAGE_TEMPLATE(patient.fullName, patient.preferredDate);

  // Construct the final WhatsApp API URL with the sanitized number and encoded message
  return `https://wa.me/91${sanitizedNumber}?text=${encodeURIComponent(message)}`;
};

/**
 * Formats a date string to 'D MMM YYYY' (e.g., '1 Oct 2023').
 * Returns the original string if parsing fails.
 */
export const formatDate = (dateStr: string) => {
  try {
    const date = new Date(dateStr);
    // If date is invalid, getTime() is NaN. Return original string in that case.
    if (isNaN(date.getTime())) {
      return dateStr;
    }
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
};
