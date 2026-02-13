import { POST } from '@/app/api/mri/analyze/route';
import { NextRequest } from 'next/server';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('@/src/lib/rate-limit', () => ({
  rateLimit: vi.fn().mockReturnValue({ success: true, limit: 10, remaining: 9, reset: 0 }),
}));

vi.mock('@/lib/mri/pdfExtract', () => ({
  extractPdfTextInSandbox: vi.fn(),
}));

vi.mock('@/lib/interpretReport', () => ({
  interpretReportText: vi.fn(),
}));

describe('MRI Analyzer API', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should return 404 if MRI_ANALYZER_ENABLED is not set', async () => {
    delete process.env.MRI_ANALYZER_ENABLED;
    const req = new NextRequest('http://localhost/api/mri/analyze', {
      method: 'POST',
    });

    const res = await POST(req);
    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body.error).toBe('Feature disabled');
  });

  it('should return 404 if MRI_ANALYZER_ENABLED is "0"', async () => {
    process.env.MRI_ANALYZER_ENABLED = '0';
    const req = new NextRequest('http://localhost/api/mri/analyze', {
      method: 'POST',
    });

    const res = await POST(req);
    expect(res.status).toBe(404);
  });

  it('should proceed if MRI_ANALYZER_ENABLED is "1"', async () => {
    process.env.MRI_ANALYZER_ENABLED = '1';

    // We expect 400 because no file is provided, which means it passed the feature flag check
    const formData = new FormData();
    const req = new NextRequest('http://localhost/api/mri/analyze', {
      method: 'POST',
      body: formData,
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe('No file uploaded');
  });
});
