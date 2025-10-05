import { MetadataRoute } from 'next';

// ISR: Revalidate every week
export const revalidate = 604800;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/drafts/', '/api/'],
    },
    sitemap: 'https://www.drsayuj.com/sitemap.xml',
  };
}

