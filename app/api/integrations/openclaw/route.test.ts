import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GET } from './route';
import { NextRequest } from 'next/server';

// Mock the DB module
vi.mock('@/src/lib/db', () => ({
  appointments: {
    getStats: vi.fn().mockResolvedValue({ total: 10, pending: 2 }),
    getRecent: vi.fn().mockResolvedValue([{ id: 1, patient_name: 'Test' }]),
  },
  patients: {
    findByEmail: vi.fn().mockImplementation(async (email) => {
      if (email === 'exists@test.com') return { name: 'Patient Email' };
      return null;
    }),
  },
  db: {
    queryRows: vi.fn().mockResolvedValue([{ name: 'Patient Name Match' }]),
  }
}));

describe('OpenClaw Integration API', () => {
  const API_KEY = 'test-secret';

  beforeEach(() => {
    vi.stubEnv('OPENCLAW_API_KEY', API_KEY);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('returns 401 if unauthorized (no key)', async () => {
    const req = new NextRequest('http://localhost/api?tool=dashboard');
    const res = await GET(req);
    expect(res.status).toBe(401);
  });

  it('returns 401 if unauthorized (wrong key)', async () => {
    const req = new NextRequest('http://localhost/api?tool=dashboard', {
        headers: { 'x-api-key': 'wrong-key' }
    });
    const res = await GET(req);
    expect(res.status).toBe(401);
  });

  it('returns dashboard stats', async () => {
    const req = new NextRequest('http://localhost/api?tool=dashboard', {
        headers: { 'x-api-key': API_KEY }
    });
    const res = await GET(req);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.tool).toBe('dashboard');
    expect(json.stats.total).toBe(10);
  });

   it('returns appointments', async () => {
    const req = new NextRequest('http://localhost/api?tool=appointments&limit=5', {
        headers: { 'x-api-key': API_KEY }
    });
    const res = await GET(req);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.tool).toBe('appointments');
    expect(json.data).toHaveLength(1);
  });

  it('searches patients by email', async () => {
    const req = new NextRequest('http://localhost/api?tool=patients&query=exists@test.com', {
        headers: { 'x-api-key': API_KEY }
    });
    const res = await GET(req);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.searchType).toBe('email');
    expect(json.data[0].name).toBe('Patient Email');
  });

   it('searches patients by name', async () => {
    const req = new NextRequest('http://localhost/api?tool=patients&query=John', {
        headers: { 'x-api-key': API_KEY }
    });
    const res = await GET(req);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.searchType).toBe('name');
    expect(json.data[0].name).toBe('Patient Name Match');
  });

  it('returns 400 for missing tool', async () => {
    const req = new NextRequest('http://localhost/api', {
        headers: { 'x-api-key': API_KEY }
    });
    const res = await GET(req);
    expect(res.status).toBe(400);
  });
});
