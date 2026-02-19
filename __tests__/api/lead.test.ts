
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { POST } from '@/app/api/lead/route';
import { NextRequest } from 'next/server';

// Mock next/server to handle `after`
vi.mock('next/server', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next/server')>();
  return {
    ...actual,
    after: vi.fn(),
  };
});

// Mock dependencies
vi.mock('@/src/lib/rate-limit', () => ({
  rateLimit: vi.fn().mockReturnValue({ success: true }),
}));

vi.mock('@/lib/google-sheets', () => ({
  submitToGoogleSheets: vi.fn(),
}));

// Mock the CRM client which is dynamically imported
vi.mock('@/lib/crm-client', () => ({
  createPatient: vi.fn(),
  findPatientByEmail: vi.fn(),
  updatePatient: vi.fn(),
}));

import { createPatient, findPatientByEmail, updatePatient } from '@/lib/crm-client';

// TODO: Fix this test suite. It tests `@/lib/crm-client` which does not exist.
// The code now uses `@/src/lib/db`.
describe.skip('Lead API (POST)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return 400 if required fields are missing', async () => {
    const req = new NextRequest('http://localhost/api/lead', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe('Missing required fields');
  });

  it('should return 400 if validation fails', async () => {
    const req = new NextRequest('http://localhost/api/lead', {
      method: 'POST',
      body: JSON.stringify({
        fullName: 'Test User',
        email: 'invalid-email', // Invalid email format
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe('Validation Error');
  });

  it('should treat honeypot submissions as spam (success but no action)', async () => {
    const req = new NextRequest('http://localhost/api/lead', {
      method: 'POST',
      body: JSON.stringify({
        fullName: 'Spam Bot',
        company: 'Spam Corp', // Honeypot field
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.message).toBe('Received');

    // Should not call CRM or Sheets
    expect(createPatient).not.toHaveBeenCalled();
  });

  it('should create a new patient in CRM if not exists', async () => {
    const payload = {
      fullName: 'New Patient',
      email: 'new@example.com',
      phone: '1234567890',
      concern: 'Back pain',
      city: 'Hyderabad',
    };

    (findPatientByEmail as any).mockResolvedValue(null);
    (createPatient as any).mockResolvedValue({ id: 100, ...payload });

    const req = new NextRequest('http://localhost/api/lead', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    expect(findPatientByEmail).toHaveBeenCalledWith(payload.email);
    expect(createPatient).toHaveBeenCalledWith(expect.objectContaining({
      email: payload.email,
      firstName: 'New',
      lastName: 'Patient',
      phone: payload.phone,
      city: payload.city,
      notes: payload.concern,
    }));
  });

  it('should update existing patient in CRM if exists', async () => {
    const payload = {
      fullName: 'Existing Patient',
      email: 'existing@example.com',
      phone: '9876543210',
      concern: 'Neck pain',
    };

    const existingPatient = {
      id: 200,
      email: payload.email,
      phone: '1111111111',
      notes: 'Previous note',
    };

    (findPatientByEmail as any).mockResolvedValue(existingPatient);
    (updatePatient as any).mockResolvedValue({ ...existingPatient, phone: payload.phone });

    const req = new NextRequest('http://localhost/api/lead', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    expect(findPatientByEmail).toHaveBeenCalledWith(payload.email);
    expect(updatePatient).toHaveBeenCalledWith(
      200,
      expect.objectContaining({
        phone: payload.phone,
        notes: expect.stringContaining('Previous note'),
      })
    );
    // Should verify the new note is appended
    const updateCall = (updatePatient as any).mock.calls[0];
    expect(updateCall[1].notes).toContain('Neck pain');
  });

  it('should handle clinical metadata (painScore, mriScanAvailable)', async () => {
     const payload = {
      fullName: 'Clinical Patient',
      email: 'clinical@example.com',
      painScore: 8,
      mriScanAvailable: true,
      concern: 'Severe pain',
    };

    (findPatientByEmail as any).mockResolvedValue(null);
    (createPatient as any).mockResolvedValue({ id: 300 });

    const existingPatient = {
      id: 300,
      email: payload.email,
      notes: 'Old note',
    };
    (findPatientByEmail as any).mockResolvedValue(existingPatient);

    const req = new NextRequest('http://localhost/api/lead', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    await POST(req);

    expect(updatePatient).toHaveBeenCalledWith(
      300,
      expect.objectContaining({
        notes: expect.stringContaining('Pain Score: 8/10'),
      })
    );
     const updateCall = (updatePatient as any).mock.calls[0];
     expect(updateCall[1].notes).toContain('MRI Scan: Available');
  });

  it('should not fail request if CRM throws error', async () => {
    const payload = {
      fullName: 'Error Patient',
      email: 'error@example.com',
    };

    (findPatientByEmail as any).mockRejectedValue(new Error('DB Connection Failed'));

    const req = new NextRequest('http://localhost/api/lead', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const res = await POST(req);
    expect(res.status).toBe(200); // Should still return success to the client
    const body = await res.json();
    expect(body.ok).toBe(true);
  });
});
