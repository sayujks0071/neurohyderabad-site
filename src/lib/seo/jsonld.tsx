export function safeJsonLdStringify(data: any): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

// Lightweight JSON-LD injector for SEO schemas
export function JsonLd({ json }: { json: object }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(json) }}
    />
  );
}

// Helper to load JSON-LD from file system
export async function loadJsonLd(slug: string): Promise<object | null> {
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    
    const file = path.join(process.cwd(), 'schemas', `${slug}.jsonld`);
    const raw = await fs.readFile(file, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    console.warn(`Failed to load JSON-LD for ${slug}:`, error);
    return null;
  }
}

// Helper to load multiple JSON-LD schemas
export async function loadMultipleJsonLd(slugs: string[]): Promise<object[]> {
  const results = await Promise.all(
    slugs.map(slug => loadJsonLd(slug))
  );
  return results.filter((json): json is object => json !== null);
}

// Helper to load and parse multi-block JSON-LD
export async function loadMultiBlockJsonLd(slug: string): Promise<object[]> {
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    const { parseJsonLd } = await import('./load-jsonld');
    
    const file = path.join(process.cwd(), 'schemas', `${slug}.jsonld`);
    const raw = await fs.readFile(file, 'utf8');
    return parseJsonLd(raw);
  } catch (error) {
    console.warn(`Failed to load multi-block JSON-LD for ${slug}:`, error);
    return [];
  }
}
