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
  '/test-compression',
  '/test-inngest'
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
    sitemap: 'https://www.drsayuj.info/sitemap.xml',
    host: 'https://www.drsayuj.info',
  };
}
