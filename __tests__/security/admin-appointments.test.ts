import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from '@/app/api/admin/appointments/route';
import { verifyAdminAccess } from '@/src/lib/security';
import { NextRequest, NextResponse } from 'next/server';

// Mock dependencies
vi.mock('@/src/lib/security', () => ({
  verifyAdminAccess: vi.fn(),
}));

vi.mock('@/src/lib/db', () => ({
  appointments: {
    getRecent: vi.fn().mockResolvedValue([]),
    updateStatus: vi.fn(),
  },
  db: {
    queryOne: vi.fn().mockResolvedValue({}),
    healthCheck: vi.fn().mockResolvedValue({ ok: true }),
  },
}));

describe('Admin Appointments API Security', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should block unauthorized GET access', async () => {
    // Mock unauthorized response
    (verifyAdminAccess as any).mockReturnValue({
      isAuthorized: false,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    });

    const req = new NextRequest('http://localhost/api/admin/appointments');

    // Call the handler
    const res = await GET(req as any);

    // Verify security check was called and access denied
    expect(verifyAdminAccess).toHaveBeenCalled();
    expect(res.status).toBe(401);
  });

  it('should allow authorized GET access', async () => {
    // Mock authorized response
    (verifyAdminAccess as any).mockReturnValue({
      isAuthorized: true,
    });

    const req = new NextRequest('http://localhost/api/admin/appointments');
    const res = await GET(req as any);

    // Verify security check was called and access granted
    expect(verifyAdminAccess).toHaveBeenCalled();
    expect(res.status).toBe(200);
  });
});
