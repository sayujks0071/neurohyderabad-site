import { POST } from '@/app/api/mri/analyze/route';
import { NextRequest } from 'next/server';
import { extractPdfTextInSandbox } from '@/lib/mri/pdfExtract';
import { interpretReportText } from '@/lib/mri/interpretReport';
import { rateLimit } from '@/src/lib/rate-limit';
import { vi, describe, it, expect } from 'vitest';

vi.mock('@/lib/mri/pdfExtract');
vi.mock('@/lib/mri/interpretReport');
vi.mock('@/src/lib/rate-limit');

// Helper to create a request with FormData
function createRequest(file: File | null) {
  const formData = new FormData();
  if (file) {
    formData.append('file', file);
  }
  return new NextRequest('http://localhost/api/mri/analyze', {
    method: 'POST',
    body: formData,
  });
}

describe('POST /api/mri/analyze', () => {
  // Mock rate limit to always succeed
  vi.mocked(rateLimit).mockReturnValue({
    success: true,
    limit: 10,
    remaining: 10,
    reset: Date.now() + 1000,
  });

  it('should return 400 if no file is uploaded', async () => {
    const formData = new FormData();
    const req = new NextRequest('http://localhost/api/mri/analyze', {
        method: 'POST',
        body: formData,
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("No file uploaded");
  });

  it('should return 400 for invalid file type', async () => {
    const file = new File(['dummy'], 'test.txt', { type: 'text/plain' });
    const req = createRequest(file);
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("Invalid file type. Only PDF is allowed.");
  });

  it('should return 413 for file too large', async () => {
    // Create a large string efficiently
    const largeContent = 'a'.repeat(11 * 1024 * 1024);
    const file = new File([largeContent], 'large.pdf', { type: 'application/pdf' });
    const req = createRequest(file);
    const res = await POST(req);
    expect(res.status).toBe(413);
    const json = await res.json();
    expect(json.error).toBe("File too large. Max size is 10MB.");
  });

  it('should return 200 for valid PDF', async () => {
     // Mock successful extraction and analysis
     const mockExtraction = { text: 'Report content', numpages: 1, truncated: false };
     const mockAnalysis = { plainEnglishSummary: 'Summary', keyTakeaways: ['Point 1'] };

     vi.mocked(extractPdfTextInSandbox).mockResolvedValue(mockExtraction);
     vi.mocked(interpretReportText).mockResolvedValue(mockAnalysis);

     const file = new File(['%PDF-1.4 content'], 'valid.pdf', { type: 'application/pdf' });
     const req = createRequest(file);
     const res = await POST(req);

     expect(res.status).toBe(200);
     const json = await res.json();
     expect(json).toEqual({
         extraction: {
             numpages: 1,
             extractedChars: 14,
             truncated: false,
         },
         analysis: mockAnalysis
     });
  });
});
