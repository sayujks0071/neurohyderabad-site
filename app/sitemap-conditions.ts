import { MetadataRoute } from 'next';
import { CONDITION_RESOURCES } from '@/src/data/conditionsIndex';

const SITE_URL = 'https://www.drsayuj.info';

export default function sitemapConditions(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Filter for condition pages only to avoid overlap with services sitemap
  const dynamicConditions = CONDITION_RESOURCES
    .filter(resource => resource.primaryPath.startsWith('/conditions/'))
    .map(resource => ({
      url: `${SITE_URL}${resource.primaryPath}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: resource.primaryPath.includes('hyderabad') ? 0.8 : 0.7, // High priority for local keywords
    }));

  return dynamicConditions;
}
