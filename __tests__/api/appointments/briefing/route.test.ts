import { NextRequest } from 'next/server';
import { POST } from '@/app/api/appointments/briefing/route';
import { generatePatientEducation } from '@/src/lib/gemini/file-search';
import { sendPreAppointmentBriefingEmail } from '@/lib/email';
import { rateLimit } from '@/src/lib/rate-limit';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock dependencies
vi.mock('@/src/lib/gemini/file-search', () => ({
  generatePatientEducation: vi.fn(),
}));

vi.mock('@/lib/email', () => ({
  sendPreAppointmentBriefingEmail: vi.fn(),
}));

vi.mock('@/src/lib/rate-limit', () => ({
  rateLimit: vi.fn(),
}));

describe('Briefing API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const validBody = {
    patientEmail: 'test@example.com',
    patientName: 'John Doe',
    condition: 'Back Pain',
    procedureType: 'Microdiscectomy',
  };

  const createRequest = (body: any, ip = '127.0.0.1') => {
    return new NextRequest('http://localhost:3000/api/appointments/briefing', {
      method: 'POST',
      headers: {
        'x-forwarded-for': ip,
      },
      body: JSON.stringify(body),
    });
  };

  it('should return 429 if rate limit exceeded', async () => {
    (rateLimit as any).mockReturnValue({ success: false });

    const req = createRequest(validBody);
    const res = await POST(req);

    expect(res.status).toBe(429);
    expect(await res.json()).toEqual({ error: 'Too many requests. Please try again later.' });
  });

  it('should call generatePatientEducation directly with correct context and pass sources', async () => {
    (rateLimit as any).mockReturnValue({ success: true });

    // Sentinel: Mock response structure updated to object
    (generatePatientEducation as any).mockResolvedValue({
      answer: 'Education content',
      sources: [{ displayName: 'Medical_Guide.pdf', fileUri: 'gs://...', excerpt: '...' }]
    });

    (sendPreAppointmentBriefingEmail as any).mockResolvedValue({ success: true, messageId: '123' });

    const req = createRequest(validBody);
    const res = await POST(req);

    expect(res.status).toBe(200);
    expect(generatePatientEducation).toHaveBeenCalledWith(
      'Microdiscectomy for Back Pain',
      []
    );

    // Verify sources are passed to email service
    expect(sendPreAppointmentBriefingEmail).toHaveBeenCalledWith(expect.objectContaining({
      sources: ['Medical_Guide.pdf']
    }));
  });

  it('should handle validation errors', async () => {
    (rateLimit as any).mockReturnValue({ success: true });

    const req = createRequest({ ...validBody, patientEmail: 'invalid-email' });
    const res = await POST(req);

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: 'A valid patientEmail is required' });
  });

  it('should sanitize logs and error messages', async () => {
     (rateLimit as any).mockReturnValue({ success: true });
     (generatePatientEducation as any).mockRejectedValue(new Error('Gemini Error'));

     const req = createRequest(validBody);
     const res = await POST(req);

     expect(res.status).toBe(500);
     const json = await res.json();
     expect(json.details).toBe('An internal error occurred');
     expect(json.error).toBe('Failed to send briefing');
  });
});
