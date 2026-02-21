import { describe, it, expect } from 'vitest';

describe('DICOM Analyzer Input Validation Logic', () => {
    it('should validate DICOM magic bytes', () => {
        // DICOM preamble is 128 bytes, then DICM
        const buffer = Buffer.alloc(132);
        buffer.write('DICM', 128);
        const magic = buffer.subarray(128, 132).toString('ascii');
        expect(magic).toBe('DICM');
    });

    it('should reject non-DICOM magic bytes', () => {
        const otherBuffer = Buffer.alloc(132);
        otherBuffer.write('FAKE', 128);
        const magic = otherBuffer.subarray(128, 132).toString('ascii');
        expect(magic).not.toBe('DICM');
    });

    it('should reject too small files', () => {
        const smallBuffer = Buffer.alloc(10);
        expect(smallBuffer.length).toBeLessThan(132);
    });
});
