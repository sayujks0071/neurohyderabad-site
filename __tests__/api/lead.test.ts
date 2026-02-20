
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/lead/route';
import { NextRequest } from 'next/server';

// Hoist mocks to ensure they are available for vi.mock
const { upsertMock } = vi.hoisted(() => ({
  upsertMock: vi.fn(),
}));

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
  getClientIp: vi.fn().mockReturnValue('127.0.0.1'),
}));

vi.mock('@/lib/google-sheets', () => ({
  submitToGoogleSheets: vi.fn(),
}));

// Mock the new @/src/lib/db implementation
vi.mock('@/src/lib/db', () => ({
  patients: {
    upsert: upsertMock,
  },
}));

describe('Lead API (POST)', () => {
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
    expect(upsertMock).not.toHaveBeenCalled();
  });

  it('should create/update a patient in CRM via upsert', async () => {
    const payload = {
      fullName: 'New Patient',
      email: 'new@example.com',
      phone: '1234567890',
      concern: 'Back pain',
      city: 'Hyderabad',
      source: 'website',
    };

    upsertMock.mockResolvedValue({ id: 100, ...payload });

    const req = new NextRequest('http://localhost/api/lead', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    expect(upsertMock).toHaveBeenCalledWith(expect.objectContaining({
      email: payload.email,
      name: payload.fullName,
      phone: payload.phone,
      primary_condition: payload.concern,
      acquisition_source: payload.source,
      notes: payload.concern,
    }));
  });

  it('should handle clinical metadata (painScore, mriScanAvailable)', async () => {
     const payload = {
      fullName: 'Clinical Patient',
      email: 'clinical@example.com',
      painScore: 8,
      mriScanAvailable: true,
      concern: 'Severe pain',
    };

    upsertMock.mockResolvedValue({ id: 300 });

    const req = new NextRequest('http://localhost/api/lead', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    await POST(req);

    expect(upsertMock).toHaveBeenCalledWith(
      expect.objectContaining({
        pain_score: 8,
        mri_scan_available: true,
        notes: payload.concern, // Notes should still be populated
      })
    );
  });

  it('should not fail request if CRM throws error', async () => {
    const payload = {
      fullName: 'Error Patient',
      email: 'error@example.com',
    };

    upsertMock.mockRejectedValue(new Error('DB Connection Failed'));

    const req = new NextRequest('http://localhost/api/lead', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const res = await POST(req);
    expect(res.status).toBe(200); // Should still return success to the client
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.crmError).toBe('CRM Sync Failed'); // Optional check
  });
});
