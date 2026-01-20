import { describe, it, expect } from 'vitest';
import { validateLeadPayload, LEAD_VALIDATION } from '../lib/validation';

describe('validateLeadPayload', () => {
  const validPayload = {
    fullName: 'John Doe',
    phone: '1234567890',
    email: 'john@example.com',
    city: 'New York',
    concern: 'I have a headache.',
    source: 'website',
  };

  it('should pass for a valid payload', () => {
    const result = validateLeadPayload(validPayload);
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should fail if name is too long', () => {
    const result = validateLeadPayload({
      ...validPayload,
      fullName: 'a'.repeat(LEAD_VALIDATION.MAX_NAME_LENGTH + 1),
    });
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('Name exceeds limit');
  });

  it('should fail if phone is too long', () => {
    const result = validateLeadPayload({
      ...validPayload,
      phone: '1'.repeat(LEAD_VALIDATION.MAX_PHONE_LENGTH + 1),
    });
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('Phone exceeds limit');
  });

  // These tests are expected to fail until implementation
  it('should fail for invalid email format', () => {
    const invalidEmails = ['plainaddress', '#@%^%#$@#$@#.com', '@example.com', 'Joe Smith <email@example.com>', 'email.example.com'];

    invalidEmails.forEach(email => {
      const result = validateLeadPayload({
        ...validPayload,
        email,
      });
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid email format');
    });
  });

  it('should fail for invalid phone format', () => {
      // Assuming we want to allow only digits, spaces, dashes, +, and parens
      // and ensure there are enough digits
      const invalidPhones = ['abcdefg', '123', 'phone number', '!!!'];

      invalidPhones.forEach(phone => {
        const result = validateLeadPayload({
            ...validPayload,
            phone,
        });
        expect(result.isValid).toBe(false);
        expect(result.error).toContain('Invalid phone format');
      });
  });
});
