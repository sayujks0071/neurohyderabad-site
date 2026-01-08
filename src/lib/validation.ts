
// 🛡️ Sentinel: Input length limits to prevent DoS
export const LEAD_VALIDATION = {
  MAX_NAME_LENGTH: 100,
  MAX_PHONE_LENGTH: 20,
  MAX_EMAIL_LENGTH: 254, // RFC 5321
  MAX_CITY_LENGTH: 100,
  MAX_CONCERN_LENGTH: 5000, // Generous but bounded
  MAX_SOURCE_LENGTH: 50,
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
  if (payload.phone && payload.phone.length > LEAD_VALIDATION.MAX_PHONE_LENGTH) {
    return { isValid: false, error: `Phone exceeds limit of ${LEAD_VALIDATION.MAX_PHONE_LENGTH} characters` };
  }
  if (payload.email && payload.email.length > LEAD_VALIDATION.MAX_EMAIL_LENGTH) {
    return { isValid: false, error: `Email exceeds limit of ${LEAD_VALIDATION.MAX_EMAIL_LENGTH} characters` };
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
