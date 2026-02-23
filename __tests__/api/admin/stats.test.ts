/**
 * @vitest-environment node
 */
import { GET } from '@/app/api/admin/stats/route';
import { NextRequest } from 'next/server';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock dependencies to avoid DB calls
vi.mock('@/src/lib/db', () => ({
  db: {
    queryOne: vi.fn().mockResolvedValue({ total: '0', running: '0', failed: '0' }),
    healthCheck: vi.fn().mockResolvedValue({ ok: true, latencyMs: 10 }),
  },
  appointments: {
    getStats: vi.fn().mockResolvedValue({ total: '0', pending: '0', confirmed: '0' }),
  },
  workflowRuns: {},
}));

describe('Admin Stats API Route', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    process.env.ADMIN_ACCESS_KEY = 'test-secret';
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.clearAllMocks();
  });

  it('should return 401 when no auth is provided', async () => {
    const req = new NextRequest('http://localhost/api/admin/stats');
    const response = await GET(req);

    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data.error).toBe('Unauthorized');
  });

  it('should return 401 when invalid key is provided', async () => {
    const req = new NextRequest('http://localhost/api/admin/stats', {
      headers: { 'x-admin-key': 'wrong-key' }
    });
    const response = await GET(req);

    expect(response.status).toBe(401);
  });

  it('should return 200 when valid header key is provided', async () => {
    const req = new NextRequest('http://localhost/api/admin/stats', {
      headers: { 'x-admin-key': 'test-secret' }
    });
    const response = await GET(req);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.health.status).toBe('healthy');
  });

  it('should return 500 if ADMIN_ACCESS_KEY is not configured', async () => {
    delete process.env.ADMIN_ACCESS_KEY;
    const req = new NextRequest('http://localhost/api/admin/stats');
    const response = await GET(req);

    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data.error).toContain('Server misconfiguration');
  });
});
