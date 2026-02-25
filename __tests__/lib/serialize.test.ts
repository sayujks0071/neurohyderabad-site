import { describe, it, expect } from 'vitest';
import { serializeJsonLd } from '@/src/lib/seo/serialize';

describe('serializeJsonLd', () => {
  it('should serialize simple object', () => {
    const data = { key: 'value' };
    // serializeJsonLd should replace < with \u003c
    // "key":"value" has no <
    expect(serializeJsonLd(data)).toBe('{"key":"value"}');
  });

  it('should escape < script > tags', () => {
    const data = { content: '<script>alert(1)</script>' };
    const serialized = serializeJsonLd(data);

    // JSON.stringify would be {"content":"<script>alert(1)</script>"}
    // serializeJsonLd should be {"content":"\u003cscript>alert(1)\u003c/script>"}

    expect(serialized).toContain('\\u003cscript>');
    expect(serialized).toContain('\\u003c/script>');
    expect(serialized).not.toContain('<script>');
  });

  it('should handle array', () => {
    const data = ['<foo>', 'bar'];
    expect(serializeJsonLd(data)).toBe('["\\u003cfoo>","bar"]');
  });
});
