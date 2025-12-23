import { MetadataRoute } from 'next';

// Regenerate once per week
export const revalidate = 604800;

const DISALLOW_PATHS = [
  '/api/',
  '/auth/',
  '/drafts',
  '/drafts/',
  '/cache-test-new',
  '/force-cache-clear',
  '/force-redeploy-test',
  '/simple-statsig-test',
  '/statsig-test',
  '/statsig-test/',
  '/test-compression',
  '/test-inngest',
  '/test-routes',
  '/test-routes/',
  '/test-error',
  '/email-test',
  '/utm-links',
  '/utm-links/'
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOW_PATHS,
      },
    ],
    sitemap: [
      'https://www.drsayuj.info/sitemap.xml',
      'https://www.drsayuj.info/sitemap-images.xml',
      'https://www.drsayuj.info/sitemap-videos.xml',
    ],
    host: 'https://www.drsayuj.info',
  };
}
