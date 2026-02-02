import { describe, it, expect } from 'vitest';
import { appointmentSchema } from '@/packages/appointment-form/schema';

describe('appointmentSchema Validation', () => {
  const validData = {
    patientName: 'John Doe',
    email: 'john@example.com',
    contactNumber: '9876543210',
    age: '30',
    gender: 'male',
    requestedDate: new Date(Date.now() + 86400000), // Tomorrow
    appointmentTime: '10:00 AM',
    reason: 'I have a headache and need consultation.',
    painScore: 5,
    hasMRI: false,
  };

  it('validates correct data successfully', () => {
    const result = appointmentSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('fails if patientName is too short', () => {
    const result = appointmentSchema.safeParse({ ...validData, patientName: 'J' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Name is too short');
    }
  });

  it('fails if contactNumber is invalid', () => {
    const result = appointmentSchema.safeParse({ ...validData, contactNumber: '1234567890' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Invalid Indian mobile number');
    }
  });

  it('validates Indian mobile number format', () => {
      // Starts with 6-9
      expect(appointmentSchema.safeParse({ ...validData, contactNumber: '6000000000' }).success).toBe(true);
      expect(appointmentSchema.safeParse({ ...validData, contactNumber: '5999999999' }).success).toBe(false);
  });

  it('fails if painScore is out of range', () => {
    const resultHigh = appointmentSchema.safeParse({ ...validData, painScore: 11 });
    expect(resultHigh.success).toBe(false);

    const resultLow = appointmentSchema.safeParse({ ...validData, painScore: 0 });
    expect(resultLow.success).toBe(false);
  });

  it('coerces string painScore to number', () => {
      const result = appointmentSchema.safeParse({ ...validData, painScore: "8" });
      expect(result.success).toBe(true);
      if(result.success) {
          expect(result.data.painScore).toBe(8);
      }
  });

  it('fails if requestedDate is in the past', () => {
    const pastDate = new Date(Date.now() - 86400000); // Yesterday
    const result = appointmentSchema.safeParse({ ...validData, requestedDate: pastDate });
    expect(result.success).toBe(false);
     if (!result.success) {
      expect(result.error.issues[0].message).toBe('Date must be in the future');
    }
  });

   it('validates hasMRI default', () => {
    const dataWithoutMRI = { ...validData };
    delete (dataWithoutMRI as any).hasMRI;
    const result = appointmentSchema.safeParse(dataWithoutMRI);
    expect(result.success).toBe(true);
    if (result.success) {
        expect(result.data.hasMRI).toBe(false);
    }
  });
});
