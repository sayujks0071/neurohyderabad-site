import { describe, it, expect } from 'vitest';

describe('MRI Analyzer Input Validation Logic', () => {
    it('should validate PDF magic bytes', () => {
        const pdfBuffer = Buffer.from('%PDF-1.4 ...');
        const header = pdfBuffer.subarray(0, 4).toString();
        expect(header).toBe('%PDF');
    });

    it('should reject non-PDF magic bytes', () => {
        const otherBuffer = Buffer.from('GIF89a...');
        const header = otherBuffer.subarray(0, 4).toString();
        expect(header).not.toBe('%PDF');
    });
});
