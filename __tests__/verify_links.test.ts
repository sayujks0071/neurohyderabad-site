import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { locations } from '../src/data/locations';

const APP_DIR = path.join(process.cwd(), 'app');

function getFilePathFromSlug(type: 'service' | 'condition', slug: string): string {
  let relativePath = '';
  if (slug.startsWith('/')) {
    relativePath = slug;
  } else {
    relativePath = `/${type}s/${slug}`;
  }

  // Remove leading slash for join
  if (relativePath.startsWith('/')) {
    relativePath = relativePath.substring(1);
  }

  return path.join(APP_DIR, relativePath, 'page.tsx');
}

describe('Internal Linking Verification', () => {
  it('should verify all top_services_slugs point to existing pages', () => {
    locations.forEach(location => {
      location.top_services_slugs.forEach(slug => {
        const filePath = getFilePathFromSlug('service', slug);
        const exists = fs.existsSync(filePath);
        expect(exists, `Service page for slug "${slug}" (location: ${location.id}) not found at ${filePath}`).toBe(true);
      });
    });
  });

  it('should verify all top_conditions_slugs point to existing pages', () => {
    locations.forEach(location => {
      location.top_conditions_slugs.forEach(slug => {
        const filePath = getFilePathFromSlug('condition', slug);
        const exists = fs.existsSync(filePath);
        expect(exists, `Condition page for slug "${slug}" (location: ${location.id}) not found at ${filePath}`).toBe(true);
      });
    });
  });
});
