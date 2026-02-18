
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/lead/route';
import { NextRequest } from 'next/server';

// Mock next/server
vi.mock('next/server', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next/server')>();
  return {
    ...actual,
    after: vi.fn(),
  };
});

// Mock rate limit
vi.mock('@/src/lib/rate-limit', () => ({
  rateLimit: vi.fn().mockReturnValue({ success: true }),
}));

// Mock Google Sheets
vi.mock('@/src/lib/google-sheets', () => ({
  submitToGoogleSheets: vi.fn(),
}));

// Mock DB
const mockUpsert = vi.fn();
vi.mock('@/src/lib/db', () => ({
  patients: {
    upsert: mockUpsert,
  },
}));

describe('Lead API Security', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should NOT leak CRM error details in response', async () => {
    // Arrange
    const payload = {
      fullName: 'Security Test',
      email: 'security@test.com',
      phone: '1234567890',
    };

    // Simulate a database error with sensitive info
    const dbError = new Error('SQL Error: Table "patients_secret" does not exist');
    mockUpsert.mockRejectedValue(dbError);

    const req = new NextRequest('http://localhost/api/lead', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    // Act
    const res = await POST(req);
    const body = await res.json();

    // Assert
    expect(res.status).toBe(200);
    expect(body.ok).toBe(true);

    // 🛡️ Sentinel: This check will fail if the vulnerability exists
    // We expect crmError to be undefined or generic, not the actual error message
    expect(body.crmError).toBeUndefined();
  });
});
