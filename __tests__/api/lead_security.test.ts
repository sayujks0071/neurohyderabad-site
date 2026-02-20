
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/lead/route';
import { NextRequest } from 'next/server';

// Mock next/server
vi.mock('next/server', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next/server')>();
  return {
    ...actual,
    after: vi.fn((fn) => fn()), // Execute immediately
  };
});

// Mock dependencies
vi.mock('@/src/lib/rate-limit', () => ({
  rateLimit: vi.fn().mockReturnValue({ success: true }),
}));

vi.mock('@/lib/google-sheets', () => ({
  submitToGoogleSheets: vi.fn(),
}));

// Mock the DB
vi.mock('@/src/lib/db', () => ({
  patients: {
    upsert: vi.fn(),
  },
}));

import { patients } from '@/src/lib/db';

describe('Lead API Security (POST)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should NOT leak database errors in the response', async () => {
    const payload = {
      fullName: 'Security Test',
      email: 'security@example.com',
      concern: 'Testing',
    };

    // Simulate a database error with sensitive info
    const sensitiveError = 'Relation "public.secret_table" does not exist';
    (patients.upsert as any).mockRejectedValue(new Error(sensitiveError));

    const req = new NextRequest('http://localhost/api/lead', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const res = await POST(req);
    expect(res.status).toBe(200); // Should return success to client
    const body = await res.json();

    // 🛡️ Sentinel: Verify sensitive error is NOT exposed
    expect(body.crmError).not.toBe(sensitiveError);
    // It should be either null or a generic message
    expect(['CRM Sync Failed', null]).toContain(body.crmError);
  });
});
