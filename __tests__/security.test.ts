import { describe, it, expect } from 'vitest';
import { secureCompare } from '../src/lib/security';

describe('Security Utilities', () => {
  describe('secureCompare', () => {
    it('should return true for identical strings', async () => {
      const result = await secureCompare('secret', 'secret');
      expect(result).toBe(true);
    });

    it('should return false for different strings', async () => {
      const result = await secureCompare('secret', 'wrong');
      expect(result).toBe(false);
    });

    it('should return false for strings of different lengths', async () => {
      const result = await secureCompare('secret', 'secret1');
      expect(result).toBe(false);
    });

    it('should return false for empty strings', async () => {
      const result = await secureCompare('', 'secret');
      expect(result).toBe(false);
    });

    it('should handle special characters', async () => {
      const result = await secureCompare('!@#$%^&*()', '!@#$%^&*()');
      expect(result).toBe(true);
    });
  });
});
