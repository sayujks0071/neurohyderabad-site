
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from './route';
import { processBooking } from '@/src/lib/appointments/service';
import { inngest } from '@/src/lib/inngest';
import { NextRequest } from 'next/server';

// Mock dependencies
vi.mock('@/src/lib/appointments/service', () => ({
  processBooking: vi.fn(),
}));

vi.mock('@/src/lib/inngest', () => ({
  inngest: {
    send: vi.fn(),
  },
}));

describe('Booking Workflow API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should parse painScore string "8" correctly', async () => {
    const body = {
      patientName: 'Test Patient',
      email: 'test@example.com',
      phone: '1234567890',
      appointmentDate: '2023-10-27',
      chiefComplaint: 'Back pain',
      painScore: '8', // String input
      mriScanAvailable: false,
    };

    const req = new NextRequest('http://localhost/api/workflows/booking', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    (processBooking as any).mockResolvedValue({
      success: true,
      message: 'Success',
      patientName: 'Test Patient',
      status: 'confirmed',
      confirmationMessage: 'Confirmed',
      usedAI: false,
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    expect(processBooking).toHaveBeenCalledWith(
      expect.objectContaining({
        painScore: 8, // Should be number
      }),
      expect.anything()
    );
  });

  it('should clamp painScore > 10 to 10', async () => {
    const body = {
      patientName: 'Test Patient',
      email: 'test@example.com',
      phone: '1234567890',
      appointmentDate: '2023-10-27',
      chiefComplaint: 'Back pain',
      painScore: 100, // Out of range
      mriScanAvailable: false,
    };

    const req = new NextRequest('http://localhost/api/workflows/booking', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    (processBooking as any).mockResolvedValue({
      success: true,
      message: 'Success',
      patientName: 'Test Patient',
      status: 'confirmed',
      confirmationMessage: 'Confirmed',
      usedAI: false,
    });

    await POST(req);

    expect(processBooking).toHaveBeenCalledWith(
      expect.objectContaining({
        painScore: 10,
      }),
      expect.anything()
    );
  });

  it('should parse mriScanAvailable string "true" correctly', async () => {
    const body = {
      patientName: 'Test Patient',
      email: 'test@example.com',
      phone: '1234567890',
      appointmentDate: '2023-10-27',
      chiefComplaint: 'Back pain',
      painScore: 5,
      mriScanAvailable: 'true', // String input
    };

    const req = new NextRequest('http://localhost/api/workflows/booking', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    (processBooking as any).mockResolvedValue({
      success: true,
      message: 'Success',
      patientName: 'Test Patient',
      status: 'confirmed',
      confirmationMessage: 'Confirmed',
      usedAI: false,
    });

    await POST(req);

    expect(processBooking).toHaveBeenCalledWith(
      expect.objectContaining({
        mriScanAvailable: true,
      }),
      expect.anything()
    );
  });

   it('should default painScore to 5 if invalid', async () => {
    const body = {
      patientName: 'Test Patient',
      email: 'test@example.com',
      phone: '1234567890',
      appointmentDate: '2023-10-27',
      chiefComplaint: 'Back pain',
      painScore: 'abc', // Invalid
      mriScanAvailable: false,
    };

    const req = new NextRequest('http://localhost/api/workflows/booking', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    (processBooking as any).mockResolvedValue({
      success: true,
      message: 'Success',
      patientName: 'Test Patient',
      status: 'confirmed',
      confirmationMessage: 'Confirmed',
      usedAI: false,
    });

    await POST(req);

    expect(processBooking).toHaveBeenCalledWith(
      expect.objectContaining({
        painScore: 5,
      }),
      expect.anything()
    );
  });
});
