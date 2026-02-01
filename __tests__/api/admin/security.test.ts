import { NextRequest } from 'next/server';
import { GET as getAppointments } from '../../../app/api/admin/appointments/route';
import { GET as getStats } from '../../../app/api/admin/stats/route';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

// Mock the DB module
vi.mock('@/src/lib/db', () => ({
  db: {
    queryOne: vi.fn().mockResolvedValue({ total: '0', running: '0', failed: '0' }),
    healthCheck: vi.fn().mockResolvedValue({ ok: true, latencyMs: 10 }),
  },
  appointments: {
    getRecent: vi.fn().mockResolvedValue([]),
    updateStatus: vi.fn(),
    getStats: vi.fn().mockResolvedValue({ total: '0' }),
  }
}));

const OLD_ENV = process.env;

describe('Admin API Security Defense-in-Depth', () => {
    beforeEach(() => {
        vi.resetModules();
        process.env = { ...OLD_ENV, ADMIN_ACCESS_KEY: 'secret123' };
    });

    afterEach(() => {
        process.env = OLD_ENV;
    });

    it('appointments endpoint should return 401 without auth header', async () => {
        const req = new NextRequest('http://localhost/api/admin/appointments');
        const res = await getAppointments(req);
        expect(res.status).toBe(401);
    });

    it('stats endpoint should return 401 without auth header', async () => {
        const req = new NextRequest('http://localhost/api/admin/stats');
        const res = await getStats(req);
        expect(res.status).toBe(401);
    });

    it('appointments endpoint should return 200 with valid auth header', async () => {
        const req = new NextRequest('http://localhost/api/admin/appointments');
        req.headers.set('x-admin-key', 'secret123');

        const res = await getAppointments(req);
        expect(res.status).toBe(200);
    });

    it('stats endpoint should return 200 with valid auth header', async () => {
        const req = new NextRequest('http://localhost/api/admin/stats');
        req.headers.set('x-admin-key', 'secret123');

        const res = await getStats(req);
        expect(res.status).toBe(200);
    });
});
