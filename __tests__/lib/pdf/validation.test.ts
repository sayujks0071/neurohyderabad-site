import { describe, it, expect } from 'vitest';
import { validatePdf, MAX_FILE_SIZE } from '../../../lib/pdf/validation';

describe('validatePdf', () => {
  it('should return error if no file provided', async () => {
    const result = await validatePdf(null as any);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('No file uploaded');
  });

  it('should return error if wrong mime type', async () => {
    const file = new File(['dummy'], 'test.txt', { type: 'text/plain' });
    const result = await validatePdf(file);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('Invalid file type');
  });

  it('should return error if file too large', async () => {
    // Create a large string or buffer without allocating huge memory if possible
    // But File constructor needs content.
    // For 10MB it's fine.
    const size = MAX_FILE_SIZE + 1024;
    const largeContent = Buffer.alloc(size);
    const file = new File([largeContent], 'large.pdf', { type: 'application/pdf' });
    const result = await validatePdf(file);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('File too large');
  });

  it('should return error if magic bytes mismatch', async () => {
    const file = new File(['not a pdf'], 'test.pdf', { type: 'application/pdf' });
    const result = await validatePdf(file);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('Invalid file format');
  });

  it('should pass for valid pdf', async () => {
    const pdfHeader = '%PDF-1.4\n';
    const file = new File([pdfHeader], 'test.pdf', { type: 'application/pdf' });
    const result = await validatePdf(file);
    expect(result.isValid).toBe(true);
  });
});
