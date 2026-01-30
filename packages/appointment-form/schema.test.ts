import { describe, it, expect } from 'vitest';
import { appointmentSchema } from './schema';

describe('appointmentSchema Validation', () => {
  const validBaseData = {
    patientName: 'John Doe',
    email: 'john@example.com',
    contactNumber: '9876543210',
    age: '30',
    gender: 'male',
    requestedDate: new Date(Date.now() + 86400000), // Tomorrow
    appointmentTime: '10:00 AM',
    reason: 'Regular checkup for persistent headache',
    painScore: 5,
    mriScanAvailable: false,
  };

  it('should validate a correct form submission', () => {
    const result = appointmentSchema.safeParse(validBaseData);
    expect(result.success).toBe(true);
  });

  it('should reject patientName shorter than 2 characters', () => {
    const invalidData = { ...validBaseData, patientName: 'J' };
    const result = appointmentSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      const error = result.error.issues.find(i => i.path.includes('patientName'));
      expect(error?.message).toBe("Name is too short");
    }
  });

  it('should reject invalid contactNumber format', () => {
    // Test with invalid prefix
    let result = appointmentSchema.safeParse({ ...validBaseData, contactNumber: '1234567890' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const error = result.error.issues.find(i => i.path.includes('contactNumber'));
      expect(error?.message).toBe("Please enter a valid 10-digit mobile number");
    }

    // Test with incorrect length
    result = appointmentSchema.safeParse({ ...validBaseData, contactNumber: '987654321' });
    expect(result.success).toBe(false);
  });

  it('should reject requestedDate in the past', () => {
    const pastDate = new Date(Date.now() - 86400000); // Yesterday
    const result = appointmentSchema.safeParse({ ...validBaseData, requestedDate: pastDate });
    expect(result.success).toBe(false);
    if (!result.success) {
       const error = result.error.issues.find(i => i.path.includes('requestedDate'));
       expect(error?.message).toBe("Date must be in the future");
    }
  });

  it('should validate painScore range', () => {
     // Test min (0)
     let result = appointmentSchema.safeParse({ ...validBaseData, painScore: 0 });
     expect(result.success).toBe(false);

     // Test max (11)
     result = appointmentSchema.safeParse({ ...validBaseData, painScore: 11 });
     expect(result.success).toBe(false);

     // Test valid (1 and 10)
     result = appointmentSchema.safeParse({ ...validBaseData, painScore: 1 });
     expect(result.success).toBe(true);
     result = appointmentSchema.safeParse({ ...validBaseData, painScore: 10 });
     expect(result.success).toBe(true);
  });
});
