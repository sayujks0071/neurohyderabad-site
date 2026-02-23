import { describe, it, expect } from 'vitest';
import { serializeJsonLd } from './jsonld';

describe('serializeJsonLd', () => {
  it('should serialize simple JSON correctly', () => {
    const input = { key: 'value', number: 123 };
    const expected = JSON.stringify(input);
    const result = serializeJsonLd(input);
    expect(result.__html).toBe(expected);
  });

  it('should escape HTML tags to prevent XSS', () => {
    const input = {
      description: 'Some description with <script>alert(1)</script> tags'
    };

    const result = serializeJsonLd(input);

    // < should be replaced with \u003c
    expect(result.__html).not.toContain('<script>');
    expect(result.__html).toContain('\\u003cscript>');
    expect(result.__html).toContain('\\u003c/script>');

    // Check that it's still valid JSON when parsed (after reversing the escape manually if needed,
    // but JSON.parse understands \u003c as <)
    const parsed = JSON.parse(result.__html);
    expect(parsed).toEqual(input);
  });

  it('should handle complex nested objects', () => {
    const input = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Test <Page>",
      "description": "A page with <unsafe> content"
    };

    const result = serializeJsonLd(input);

    expect(result.__html).toContain('"name":"Test \\u003cPage>"');
    expect(result.__html).toContain('"description":"A page with \\u003cunsafe> content"');

    const parsed = JSON.parse(result.__html);
    expect(parsed).toEqual(input);
  });
});
