import { describe, it, expect } from 'vitest';
import { validateReferralFile, MAX_FILE_SIZE } from '@/lib/referral/validation';

describe('validateReferralFile', () => {
  it('should return valid for a correct PDF file', () => {
    const file = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });
    const result = validateReferralFile(file);
    expect(result.valid).toBe(true);
  });

  it('should fail if no file is provided', () => {
    const result = validateReferralFile(null as any);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('No file provided');
  });

  it('should fail if file type is not PDF', () => {
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const result = validateReferralFile(file);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Invalid file type');
  });

  it('should fail if file size is too large', () => {
    const bigContent = new Array(MAX_FILE_SIZE + 100).fill('a').join('');
    const file = new File([bigContent], 'big.pdf', { type: 'application/pdf' });
    // Mock size because JSDOM/Node File implementation might not calculate it automatically from string content in the same way or it might be slow
    // Actually File constructor sets size.
    // However, creating 10MB string is slow.
    // Let's mock the size property property access if possible, or just trust the logic.
    // Better: define a file with a mocked size property.
    const mockFile = {
        name: 'big.pdf',
        type: 'application/pdf',
        size: MAX_FILE_SIZE + 1,
    } as File;

    const result = validateReferralFile(mockFile);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('File size exceeds limit');
  });
});
