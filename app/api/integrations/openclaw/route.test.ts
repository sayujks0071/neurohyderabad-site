import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from './route';
import { NextRequest } from 'next/server';
import { appointments, patients } from '@/src/lib/db';

// Mock the db module
vi.mock('@/src/lib/db', () => ({
  appointments: {
    getStats: vi.fn(),
    getRecent: vi.fn(),
  },
  patients: {
    findByEmail: vi.fn(),
  },
}));

describe('OpenClaw Integration API', () => {
  const MOCK_API_KEY = 'test-secret-key';

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.OPENCLAW_API_KEY = MOCK_API_KEY;
  });

  const createRequest = (url: string, headers: Record<string, string> = {}) => {
    return new NextRequest(new URL(url, 'http://localhost'), {
      headers: new Headers(headers),
    });
  };

  it('should return 401 if API key is missing', async () => {
    const req = createRequest('http://localhost/api/integrations/openclaw?tool=dashboard');
    const res = await GET(req);
    expect(res.status).toBe(401);
  });

  it('should return 401 if API key is invalid', async () => {
    const req = createRequest('http://localhost/api/integrations/openclaw?tool=dashboard', {
      'x-api-key': 'wrong-key',
    });
    const res = await GET(req);
    expect(res.status).toBe(401);
  });

  it('should return usage info if no tool is specified', async () => {
    const req = createRequest('http://localhost/api/integrations/openclaw', {
      'x-api-key': MOCK_API_KEY,
    });
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.tools).toBeDefined();
  });

  it('should return dashboard stats', async () => {
    const mockStats = { total: '10', pending: '2', confirmed: '5', completed: '2', cancelled: '1' };
    vi.mocked(appointments.getStats).mockResolvedValue(mockStats);

    const req = createRequest('http://localhost/api/integrations/openclaw?tool=dashboard', {
      'x-api-key': MOCK_API_KEY,
    });
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.tool).toBe('dashboard');
    expect(data.data).toEqual(mockStats);
  });

  it('should return recent appointments', async () => {
    const mockAppointments = [{ id: 1, patient_name: 'Test' }];
    // @ts-ignore
    vi.mocked(appointments.getRecent).mockResolvedValue(mockAppointments);

    const req = createRequest('http://localhost/api/integrations/openclaw?tool=appointments', {
      'x-api-key': MOCK_API_KEY,
    });
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.tool).toBe('appointments');
    expect(data.data).toEqual(mockAppointments);
  });

  it('should return patient data by email', async () => {
    const mockPatient = { id: 1, name: 'John', email: 'john@example.com' };
    // @ts-ignore
    vi.mocked(patients.findByEmail).mockResolvedValue(mockPatient);

    const req = createRequest('http://localhost/api/integrations/openclaw?tool=patients&email=john@example.com', {
      'x-api-key': MOCK_API_KEY,
    });
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.tool).toBe('patients');
    expect(data.data).toEqual(mockPatient);
  });

  it('should return 400 if email is missing for patients tool', async () => {
    const req = createRequest('http://localhost/api/integrations/openclaw?tool=patients', {
      'x-api-key': MOCK_API_KEY,
    });
    const res = await GET(req);
    expect(res.status).toBe(400);
  });

  it('should return 404 if patient not found', async () => {
    vi.mocked(patients.findByEmail).mockResolvedValue(null);

    const req = createRequest('http://localhost/api/integrations/openclaw?tool=patients&email=unknown@example.com', {
      'x-api-key': MOCK_API_KEY,
    });
    const res = await GET(req);
    expect(res.status).toBe(404);
  });

  it('should return 400 for invalid tool', async () => {
    const req = createRequest('http://localhost/api/integrations/openclaw?tool=invalid', {
      'x-api-key': MOCK_API_KEY,
    });
    const res = await GET(req);
    expect(res.status).toBe(400);
  });
});
