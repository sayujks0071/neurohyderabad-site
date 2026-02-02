import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { GET, PATCH } from '@/app/api/admin/appointments/route';
import { NextRequest } from 'next/server';

// Mock the database
vi.mock('@/src/lib/db', () => ({
  appointments: {
    getRecent: vi.fn().mockResolvedValue([{ id: 1, patient: 'Test' }]),
    updateStatus: vi.fn().mockResolvedValue({ id: 1, status: 'confirmed' }),
  },
  db: {},
}));

describe('Admin API Security', () => {
  const adminKey = 'test-admin-key';

  beforeEach(() => {
    // Safely set environment variable for tests
    vi.stubEnv('ADMIN_ACCESS_KEY', adminKey);
  });

  afterEach(() => {
    // Restore environment variables
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it('GET /api/admin/appointments returns 401 without admin key', async () => {
    // Create request without key
    const req = new NextRequest('http://localhost/api/admin/appointments');

    const res = await GET(req);
    expect(res.status).toBe(401);
  });

  it('GET /api/admin/appointments returns 200 with valid header key', async () => {
    const req = new NextRequest('http://localhost/api/admin/appointments', {
      headers: {
        'x-admin-key': adminKey
      }
    });

    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.appointments).toHaveLength(1);
  });

  it('PATCH /api/admin/appointments returns 401 without admin key', async () => {
    const req = new NextRequest('http://localhost/api/admin/appointments', {
      method: 'PATCH',
      body: JSON.stringify({ id: 1, status: 'confirmed' })
    });

    const res = await PATCH(req);
    expect(res.status).toBe(401);
  });

  it('PATCH /api/admin/appointments returns 200 with valid header key', async () => {
    const req = new NextRequest('http://localhost/api/admin/appointments', {
      method: 'PATCH',
      headers: {
        'x-admin-key': adminKey
      },
      body: JSON.stringify({ id: 1, status: 'confirmed' })
    });

    const res = await PATCH(req);
    expect(res.status).toBe(200);
  });
});
