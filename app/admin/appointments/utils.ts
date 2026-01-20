import { Appointment } from './data';

// Message template for WhatsApp confirmation
// Requirement: Dynamic Message: 'Hello {patientName}, this is regarding your appointment with Dr. Sayuj on {requestedDate}. We confirm your slot. Please bring your MRI/CT scans.'
export const WHATSAPP_MESSAGE_TEMPLATE = (name: string, date: string) =>
  `Hello ${name}, this is regarding your appointment with Dr. Sayuj on ${date}. We confirm your slot. Please bring your MRI/CT scans.`;

export const generateWhatsappUrl = (patient: Appointment): string => {
  // Requirement: Sanitize phone number (remove spaces or dashes) before inserting it into the link.
  // Format: https://wa.me/91{contactNumber}?text={message}
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
