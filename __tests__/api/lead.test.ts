
import { describe, it, expect, vi, beforeEach } from 'vitest';
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

// Mock DB
const mockUpsert = vi.fn();
vi.mock('@/src/lib/db', () => ({
  patients: {
    upsert: mockUpsert,
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

    // Should not call DB
    expect(mockUpsert).not.toHaveBeenCalled();
  });

  it('should upsert patient in CRM', async () => {
    const payload = {
      fullName: 'New Patient',
      email: 'new@example.com',
      phone: '1234567890',
      concern: 'Back pain',
      city: 'Hyderabad',
    };

    mockUpsert.mockResolvedValue({ id: 100 });

    const req = new NextRequest('http://localhost/api/lead', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    expect(mockUpsert).toHaveBeenCalledWith(expect.objectContaining({
      email: payload.email,
      name: payload.fullName,
      phone: payload.phone,
      notes: payload.concern,
      acquisition_source: 'website',
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

    mockUpsert.mockResolvedValue({ id: 300 });

    const req = new NextRequest('http://localhost/api/lead', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    await POST(req);

    expect(mockUpsert).toHaveBeenCalledWith(
      expect.objectContaining({
        pain_score: 8,
        mri_scan_available: true,
      })
    );
  });

  it('should not fail request if CRM throws error', async () => {
    const payload = {
      fullName: 'Error Patient',
      email: 'error@example.com',
    };

    mockUpsert.mockRejectedValue(new Error('DB Connection Failed'));

    const req = new NextRequest('http://localhost/api/lead', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const res = await POST(req);
    expect(res.status).toBe(200); // Should still return success to the client
    const body = await res.json();
    expect(body.ok).toBe(true);
    // Verify security fix: no crmError exposed
    expect(body.crmError).toBeUndefined();
  });
});
