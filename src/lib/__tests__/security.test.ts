import { describe, it, expect } from 'vitest';
import { escapeHtml } from '../security';

describe('escapeHtml', () => {
  it('should escape basic HTML characters', () => {
    const input = '<script>alert(1)</script>';
    const expected = '&lt;script&gt;alert(1)&lt;/script&gt;';
    expect(escapeHtml(input)).toBe(expected);
  });

  it('should escape quotes', () => {
    const input = '"quote" and \'single\'';
    const expected = '&quot;quote&quot; and &#039;single&#039;';
    expect(escapeHtml(input)).toBe(expected);
  });

  it('should escape ampersands', () => {
    const input = 'Tom & Jerry';
    const expected = 'Tom &amp; Jerry';
    expect(escapeHtml(input)).toBe(expected);
  });

  it('should handle numbers', () => {
    expect(escapeHtml(123)).toBe('123');
  });

  it('should handle null and undefined', () => {
    expect(escapeHtml(null)).toBe('');
    expect(escapeHtml(undefined)).toBe('');
  });

  it('should handle safe strings unchanged', () => {
    const input = 'Hello World';
    expect(escapeHtml(input)).toBe(input);
  });
});
