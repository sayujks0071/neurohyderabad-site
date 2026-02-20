import { describe, it, expect } from 'vitest';
import { validateDicom } from '@/lib/dicom/validation';

describe('DICOM Validation', () => {
  it('should reject file larger than 10MB', async () => {
    const largeFile = {
      size: 11 * 1024 * 1024,
      arrayBuffer: async () => new ArrayBuffer(0),
    } as any;
    const result = await validateDicom(largeFile);
    expect(result.isValid).toBe(false);
    expect(result.status).toBe(413);
  });

  it('should reject file without DICM magic bytes', async () => {
    const buffer = new Uint8Array(132);
    // Fill with zeros, so bytes 128-131 are 0000, not DICM
    const file = {
      size: 1024,
      arrayBuffer: async () => buffer.buffer,
    } as any;
    const result = await validateDicom(file);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('Missing DICM header');
  });

  it('should accept valid DICOM file', async () => {
    const buffer = new Uint8Array(132);
    // Write 'DICM' at offset 128
    buffer[128] = 'D'.charCodeAt(0);
    buffer[129] = 'I'.charCodeAt(0);
    buffer[130] = 'C'.charCodeAt(0);
    buffer[131] = 'M'.charCodeAt(0);

    const file = {
      size: 1024,
      arrayBuffer: async () => buffer.buffer,
    } as any;

    const result = await validateDicom(file);
    expect(result.isValid).toBe(true);
  });
});
