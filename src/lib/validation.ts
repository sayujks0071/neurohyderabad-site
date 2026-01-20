
// 🛡️ Sentinel: Input length limits to prevent DoS
export const LEAD_VALIDATION = {
  MAX_NAME_LENGTH: 100,
  MAX_PHONE_LENGTH: 20,
  MAX_EMAIL_LENGTH: 254, // RFC 5321
  MAX_CITY_LENGTH: 100,
  MAX_CONCERN_LENGTH: 5000, // Generous but bounded
  MAX_SOURCE_LENGTH: 50,
  // Basic email validation: something@something.something
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  // Phone validation: Allow digits, spaces, dashes, parentheses, plus sign.
  PHONE_ALLOWED_CHARS_REGEX: /^[\d\s\-\(\)\+]+$/,
  MIN_PHONE_DIGITS: 7,
};

export function validateLeadPayload(payload: {
  fullName?: string;
  phone?: string;
  email?: string;
  city?: string;
  concern?: string;
  source?: string;
}): { isValid: boolean; error?: string } {
  if (payload.fullName && payload.fullName.length > LEAD_VALIDATION.MAX_NAME_LENGTH) {
    return { isValid: false, error: `Name exceeds limit of ${LEAD_VALIDATION.MAX_NAME_LENGTH} characters` };
  }

  if (payload.phone) {
    if (payload.phone.length > LEAD_VALIDATION.MAX_PHONE_LENGTH) {
      return { isValid: false, error: `Phone exceeds limit of ${LEAD_VALIDATION.MAX_PHONE_LENGTH} characters` };
    }
    if (!LEAD_VALIDATION.PHONE_ALLOWED_CHARS_REGEX.test(payload.phone)) {
      return { isValid: false, error: 'Invalid phone format' };
    }
    const digitCount = (payload.phone.match(/\d/g) || []).length;
    if (digitCount < LEAD_VALIDATION.MIN_PHONE_DIGITS) {
      return { isValid: false, error: 'Invalid phone format' };
    }
  }

  if (payload.email) {
    if (payload.email.length > LEAD_VALIDATION.MAX_EMAIL_LENGTH) {
      return { isValid: false, error: `Email exceeds limit of ${LEAD_VALIDATION.MAX_EMAIL_LENGTH} characters` };
    }
    if (!LEAD_VALIDATION.EMAIL_REGEX.test(payload.email)) {
      return { isValid: false, error: 'Invalid email format' };
    }
  }

  if (payload.city && payload.city.length > LEAD_VALIDATION.MAX_CITY_LENGTH) {
    return { isValid: false, error: `City exceeds limit of ${LEAD_VALIDATION.MAX_CITY_LENGTH} characters` };
  }
  if (payload.concern && payload.concern.length > LEAD_VALIDATION.MAX_CONCERN_LENGTH) {
    return { isValid: false, error: `Concern exceeds limit of ${LEAD_VALIDATION.MAX_CONCERN_LENGTH} characters` };
  }
  if (payload.source && payload.source.length > LEAD_VALIDATION.MAX_SOURCE_LENGTH) {
    return { isValid: false, error: `Source exceeds limit of ${LEAD_VALIDATION.MAX_SOURCE_LENGTH} characters` };
  }
  return { isValid: true };
}

// 🛡️ Sentinel: Sanitize user input before sending to LLM to prevent prompt injection
export function sanitizeForPrompt(input: unknown, maxLength: number = 1000): string {
  if (input === null || input === undefined) return "";

  // 1. Convert to string and trim whitespace
  let sanitized = String(input).trim();

  // 2. Remove null bytes and other dangerous control characters
  // Keep \n (10) and \r (13) for formatting, and \t (9)
  // Remove other non-printable characters in ASCII range 0-31 and 127
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

  // 3. Normalize newlines to single \n to prevent layout manipulation
  sanitized = sanitized.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  // 4. Enforce max length to prevent token exhaustion / DoS
  if (sanitized.length > maxLength) {
    sanitized = sanitized.slice(0, maxLength);
  }

  return sanitized;
}
