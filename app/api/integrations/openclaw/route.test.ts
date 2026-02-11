import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET, POST } from './route';
import { NextRequest } from 'next/server';
import { appointments, patients } from '@/src/lib/db';
import { processBooking } from '@/src/lib/appointments/service';

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

// Mock the booking service
vi.mock('@/src/lib/appointments/service', () => ({
  processBooking: vi.fn(),
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

  const createPostRequest = (url: string, body: any, headers: Record<string, string> = {}) => {
    return new NextRequest(new URL(url, 'http://localhost'), {
      method: 'POST',
      headers: new Headers(headers),
      body: JSON.stringify(body),
    });
  };

  describe('GET', () => {
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

    it('should handle invalid limit parameter gracefully', async () => {
      const mockAppointments = [{ id: 1, patient_name: 'Test' }];
      // @ts-ignore
      vi.mocked(appointments.getRecent).mockResolvedValue(mockAppointments);

      const req = createRequest('http://localhost/api/integrations/openclaw?tool=appointments&limit=invalid', {
        'x-api-key': MOCK_API_KEY,
      });
      const res = await GET(req);
      expect(res.status).toBe(200);
      expect(appointments.getRecent).toHaveBeenCalledWith(10);
    });

    it('should clamp limit parameter', async () => {
      const mockAppointments = [{ id: 1, patient_name: 'Test' }];
      // @ts-ignore
      vi.mocked(appointments.getRecent).mockResolvedValue(mockAppointments);

      const req = createRequest('http://localhost/api/integrations/openclaw?tool=appointments&limit=1000', {
        'x-api-key': MOCK_API_KEY,
      });
      await GET(req);
      expect(appointments.getRecent).toHaveBeenCalledWith(100);
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

  describe('POST', () => {
    const validBookingPayload = {
      patientName: 'Test Patient',
      email: 'test@example.com',
      phone: '1234567890',
      appointmentDate: '2025-10-30',
      reason: 'Test reason',
    };

    it('should return 401 if API key is missing', async () => {
      const req = createPostRequest('http://localhost/api/integrations/openclaw?tool=book_appointment', validBookingPayload);
      const res = await POST(req);
      expect(res.status).toBe(401);
    });

    it('should return 400 if tool is missing', async () => {
      const req = createPostRequest('http://localhost/api/integrations/openclaw', validBookingPayload, {
        'x-api-key': MOCK_API_KEY,
      });
      const res = await POST(req);
      expect(res.status).toBe(400);
    });

    it('should return 400 if payload is invalid', async () => {
      const req = createPostRequest('http://localhost/api/integrations/openclaw?tool=book_appointment', {}, {
        'x-api-key': MOCK_API_KEY,
      });
      const res = await POST(req);
      expect(res.status).toBe(400);
    });

    it('should process booking successfully', async () => {
      vi.mocked(processBooking).mockResolvedValue({
        success: true,
        message: 'Success',
        patientName: 'Test Patient',
        status: 'confirmed',
      });

      const req = createPostRequest('http://localhost/api/integrations/openclaw?tool=book_appointment', validBookingPayload, {
        'x-api-key': MOCK_API_KEY,
      });
      const res = await POST(req);
      expect(res.status).toBe(200);
      expect(processBooking).toHaveBeenCalledWith(
        expect.objectContaining({
            patientName: 'Test Patient'
        }),
        expect.objectContaining({
            source: 'openclaw-agent'
        })
      );
    });

    it('should return 500 if booking fails', async () => {
      vi.mocked(processBooking).mockResolvedValue({
        success: false,
        error: 'Failed',
      });

      const req = createPostRequest('http://localhost/api/integrations/openclaw?tool=book_appointment', validBookingPayload, {
        'x-api-key': MOCK_API_KEY,
      });
      const res = await POST(req);
      expect(res.status).toBe(500);
    });
  });
});
