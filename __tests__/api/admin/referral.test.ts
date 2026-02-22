import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/admin/referral/analyze/route';
import { verifyAdminAccess } from '@/src/lib/security';
import { extractPdfTextInSandbox } from '@/lib/pdf/extract-sandbox';
import { analyzeReferral } from '@/lib/referral/analyze';
import { NextResponse } from 'next/server';

// Mock dependencies
vi.mock('@/src/lib/security', () => ({
  verifyAdminAccess: vi.fn()
}));
vi.mock('@/lib/pdf/extract-sandbox', () => ({
  extractPdfTextInSandbox: vi.fn()
}));
vi.mock('@/lib/referral/analyze', () => ({
  analyzeReferral: vi.fn()
}));
vi.mock('@/lib/pdf/validation', () => ({
  validatePdf: vi.fn()
}));

// Mock validatePdf to simplify test (or use real one if imported)
// I mocked it above.

describe('POST /api/admin/referral/analyze', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return 401 if unauthorized', async () => {
    (verifyAdminAccess as any).mockResolvedValue({
      isAuthorized: false,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    });

    const request = new Request('http://localhost/api/admin/referral/analyze', {
      method: 'POST',
    });

    const response = await POST(request);
    expect(response.status).toBe(401);
  });

  it('should process valid request', async () => {
    (verifyAdminAccess as any).mockResolvedValue({ isAuthorized: true });

    const mockValidation = { isValid: true };
    const mockExtraction = { text: "Referral text", numpages: 1, truncated: false };
    const mockAnalysis = { patientName: "John" };

    const { validatePdf } = await import('@/lib/pdf/validation');
    (validatePdf as any).mockResolvedValue(mockValidation);
    (extractPdfTextInSandbox as any).mockResolvedValue(mockExtraction);
    (analyzeReferral as any).mockResolvedValue(mockAnalysis);

    const formData = new FormData();
    const file = new File(['%PDF-1.4 content'], 'referral.pdf', { type: 'application/pdf' });
    formData.append('file', file);

    const request = new Request('http://localhost/api/admin/referral/analyze', {
      method: 'POST',
      body: formData,
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json).toEqual({
      extraction: { numpages: 1, extractedChars: 13, truncated: false },
      analysis: mockAnalysis
    });
  });
});
