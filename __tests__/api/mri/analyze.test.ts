import { describe, it, expect, vi } from 'vitest';
import { POST } from '@/app/api/mri/analyze/route';
import { extractPdfTextInSandbox } from '@/lib/pdf/extract-sandbox';
import { interpretReportText } from '@/lib/interpretReport';
import { validatePdf } from '@/lib/pdf/validation';

// Mock dependencies
vi.mock('@/lib/pdf/extract-sandbox', () => ({
  extractPdfTextInSandbox: vi.fn()
}));
vi.mock('@/lib/interpretReport', () => ({
  interpretReportText: vi.fn()
}));
vi.mock('@/lib/pdf/validation', () => ({
  validatePdf: vi.fn()
}));

describe('POST /api/mri/analyze', () => {
  it('should process valid request', async () => {
    (validatePdf as any).mockResolvedValue({ isValid: true });
    (extractPdfTextInSandbox as any).mockResolvedValue({ text: "MRI Report", numpages: 1, truncated: false });
    (interpretReportText as any).mockResolvedValue({ plainEnglishSummary: "Summary", keyTakeaways: [] });

    const formData = new FormData();
    const file = new File(['%PDF-1.4 content'], 'mri.pdf', { type: 'application/pdf' });
    formData.append('file', file);

    const request = new Request('http://localhost/api/mri/analyze', {
      method: 'POST',
      body: formData,
    });

    // Set feature flag
    process.env.MRI_ANALYZER_ENABLED = '1';

    const response = await POST(request);
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.analysis.plainEnglishSummary).toBe("Summary");
  });
});
