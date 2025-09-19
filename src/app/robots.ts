import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/_next/',
        '/patient-portal/',
        '/private/',
      ],
    },
    sitemap: 'https://neurohyderabad.com/sitemap.xml',
  }
}