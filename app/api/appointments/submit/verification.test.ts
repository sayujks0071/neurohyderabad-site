import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';

// Mocks
vi.mock('@/src/lib/appointments/gemini', () => ({
  generateBookingConfirmation: vi.fn().mockResolvedValue({ message: 'Confirmed', usedAI: true }),
}));

vi.mock('@/src/lib/appointments/email', () => ({
  sendAdminNotificationEmail: vi.fn().mockResolvedValue({ success: true }),
  sendConfirmationEmail: vi.fn().mockResolvedValue({ success: true }),
}));

vi.mock('@/src/lib/appointments/webhooks', () => ({
  buildWebhookPayload: vi.fn(),
  notifyAppointmentWebhooks: vi.fn(),
}));

vi.mock('@/src/lib/google-sheets', () => ({
  submitToGoogleSheets: vi.fn().mockResolvedValue({ success: true }),
}));

vi.mock('@/src/lib/rate-limit', () => ({
  rateLimit: vi.fn().mockReturnValue({ success: true }),
}));

vi.mock('@/src/lib/db', () => ({
  appointments: {
    create: vi.fn().mockResolvedValue({ id: 'mock-db-id' }),
  },
}));

vi.mock('@/src/lib/ai/triage', () => ({
  analyzeTriage: vi.fn().mockResolvedValue({ urgencyLevel: 'routine' }),
}));

// We need to import the mocked modules to make assertions on them
import { appointments } from '@/src/lib/db';
import { submitToGoogleSheets } from '@/src/lib/google-sheets';

describe('POST /api/appointments/submit', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should successfully process a valid booking request with painScore and mriScanAvailable', async () => {
    const payload = {
      patientName: 'Test Patient',
      email: 'test@example.com',
      phone: '9876543210',
      age: '35',
      gender: 'male',
      appointmentDate: '2024-12-25',
      appointmentTime: '10:00 AM',
      reason: 'Persistent back pain checking neurosurgeon availability',
      painScore: 7,
      mriScanAvailable: true,
    };

    const request = new Request('http://localhost/api/appointments/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-booking-source': 'test-verification',
      },
      body: JSON.stringify(payload),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.booking).toBeDefined();
    expect(body.booking.painScore).toBe(7);
    expect(body.booking.mriScanAvailable).toBe(true);

    // Verify DB insertion
    expect(appointments.create).toHaveBeenCalledWith(expect.objectContaining({
      patient_name: 'Test Patient',
      pain_score: 7,
      mri_scan_available: true,
      source: 'test-verification',
    }));

    // Verify Google Sheets submission
    expect(submitToGoogleSheets).toHaveBeenCalledWith(expect.objectContaining({
      fullName: 'Test Patient',
      metadata: expect.objectContaining({
        painScore: 7,
        mriScanAvailable: true,
      }),
    }));
  });

  it('should handle missing optional fields (painScore/mriScanAvailable)', async () => {
    const payload = {
      patientName: 'Test Patient 2',
      email: 'test2@example.com',
      phone: '9876543211',
      age: 40,
      gender: 'female',
      appointmentDate: '2024-12-26',
      appointmentTime: '11:00 AM',
      reason: 'Consultation for headaches',
      // Missing painScore and mriScanAvailable
    };

    const request = new Request('http://localhost/api/appointments/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);

    expect(appointments.create).toHaveBeenCalledWith(expect.objectContaining({
      patient_name: 'Test Patient 2',
      pain_score: undefined,
      mri_scan_available: undefined,
    }));
  });

  it('should reject invalid painScore values', async () => {
    const payload = {
      patientName: 'Test Patient',
      email: 'test@example.com',
      phone: '9876543210',
      age: '30',
      gender: 'male',
      appointmentDate: '2024-12-25',
      appointmentTime: '10:00 AM',
      reason: 'Back pain validation check',
      painScore: 11, // Invalid
    };

    const request = new Request('http://localhost/api/appointments/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toMatch(/pain/i);
  });
});
