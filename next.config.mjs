/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable Next.js compression to match Vercel's advertised headers
  compress: true,
  poweredByHeader: false,
  
  // Consistent trailing slash behavior - disabled for API routes
  trailingSlash: false,
  
  // Safari optimization: Reduce hydration payload
  experimental: {
    // Reduce hydration data size for Safari compatibility
    optimizePackageImports: ['@/components', '@/lib'],
    // Enable partial pre-rendering for better performance
    ppr: false,
  },
  
  // External packages for APM
  serverExternalPackages: ['@middleware.io/agent-apm-nextjs'],
  
  // Configure images for dynamic OG generation and local images
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.wp.com',
      },
      {
        protocol: 'https',
        hostname: '**.wordpress.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Allow query strings for dynamic OG images
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Allow local images with query strings (for OG images)
    unoptimized: false,
    // Configure domains for external images if needed
    domains: [],
  },
  
  // 301 redirects for legacy URLs to consolidate duplicate content
  async redirects() {
    return [
      // CRITICAL: Apex domain redirect to www (single hop 301)
      {
        source: '/((?!api|_next|images|favicon.ico|robots.txt|sitemap.xml|site.webmanifest).*)',
        has: [{ type: 'host', value: 'drsayuj.com' }],
        destination: 'https://www.drsayuj.com/$1',
        permanent: true,
      },
      // Existing service consolidation
      {
        source: '/brain-tumor-surgery-hyderabad',
        destination: '/services/brain-tumor-surgery-hyderabad',
        permanent: true,
      },
      {
        source: '/slip-disc-treatment-hyderabad',
        destination: '/conditions/slip-disc-treatment-hyderabad',
        permanent: true,
      },
      {
        source: '/services/endoscopic-foraminotomy-hyderabad',
        destination: '/services/minimally-invasive-spine-surgery',
        permanent: true,
      },
      {
        source: '/services/endoscopic-ulbd-hyderabad',
        destination: '/services/minimally-invasive-spine-surgery',
        permanent: true,
      },
      {
        source: '/services/endoscopic-cervical-discectomy-hyderabad',
        destination: '/services/minimally-invasive-spine-surgery',
        permanent: true,
      },
      {
        source: '/services/cervical-foraminotomy-hyderabad',
        destination: '/services/minimally-invasive-spine-surgery',
        permanent: true,
      },
      // Updated neurosurgery redirects
      {
        source: '/services/microvascular-decompression-mvd-hyderabad',
        destination: '/conditions/trigeminal-neuralgia-treatment-hyderabad',
        permanent: true,
      },
      {
        source: '/services/radiosurgery-gamma-knife-hyderabad',
        destination: '/conditions/trigeminal-neuralgia-treatment-hyderabad',
        permanent: true,
      },
      {
        source: '/services/microvascular-decompression',
        destination: '/conditions/trigeminal-neuralgia-treatment-hyderabad',
        permanent: true,
      },
      {
        source: '/services/microvascular-decompression/',
        destination: '/conditions/trigeminal-neuralgia-treatment-hyderabad',
        permanent: true,
      },
      {
        source: '/services/radiosurgery-gamma-knife',
        destination: '/conditions/trigeminal-neuralgia-treatment-hyderabad',
        permanent: true,
      },
      {
        source: '/services/radiosurgery-gamma-knife/',
        destination: '/conditions/trigeminal-neuralgia-treatment-hyderabad',
        permanent: true,
      },
      {
        source: '/conditions/trigeminal-neuralgia',
        destination: '/conditions/trigeminal-neuralgia-treatment-hyderabad',
        permanent: true,
      },
      {
        source: '/conditions/trigeminal-neuralgia-treatment',
        destination: '/conditions/trigeminal-neuralgia-treatment-hyderabad',
        permanent: true,
      },
      {
        source: '/conditions/trigeminal-neuralgia-treatment/',
        destination: '/conditions/trigeminal-neuralgia-treatment-hyderabad',
        permanent: true,
      },
      {
        source: '/conditions/brain-tumor-surgery',
        destination: '/conditions/brain-tumor-surgery-hyderabad',
        permanent: true,
      },
      {
        source: '/conditions/cervical-radiculopathy',
        destination: '/conditions/cervical-radiculopathy-treatment-hyderabad',
        permanent: true,
      },
      {
        source: '/conditions/cervical-radiculopathy-treatment',
        destination: '/conditions/cervical-radiculopathy-treatment-hyderabad',
        permanent: true,
      },
      {
        source: '/conditions/cervical-radiculopathy-treatment/',
        destination: '/conditions/cervical-radiculopathy-treatment-hyderabad',
        permanent: true,
      },
      {
        source: '/conditions/lumbar-spinal-stenosis',
        destination: '/conditions/lumbar-spinal-stenosis-treatment',
        permanent: true,
      },
      {
        source: '/conditions/lumbar-spinal-stenosis-treatment',
        destination: '/services/minimally-invasive-spine-surgery',
        permanent: true,
      },
      {
        source: '/conditions/sciatica',
        destination: '/conditions/sciatica-treatment',
        permanent: true,
      },
      {
        source: '/conditions/sciatica-treatment',
        destination: '/services/endoscopic-discectomy-hyderabad',
        permanent: true,
      },
      {
        source: '/conditions/pain-on-top-of-head',
        destination: '/symptoms/pain-on-top-of-head-causes',
        permanent: true,
      },
      {
        source: '/conditions/signs-of-brain-tumor',
        destination: '/symptoms/signs-of-brain-tumor',
        permanent: true,
      },
      {
        source: '/:path((?!_next|api|images|favicon\\.ico|robots\\.txt|sitemap\\.xml|site\\.webmanifest).+)/',
        destination: '/:path',
        permanent: true,
      },
    ];
  },
  
  // Security and SEO-friendly defaults with caching
  async headers() {
    return [
      {
        source: "/((?!_next|api|images|favicon.ico|robots.txt|sitemap.xml|site.webmanifest).*)",
        headers: [
          // Security headers
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // HSTS for security (after redirects are confirmed)
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
          // Safari optimization: Help with content decoding
          { key: "Content-Type", value: "text/html; charset=utf-8" },
          { key: "Cache-Control", value: "public, s-maxage=3600, max-age=600, stale-while-revalidate=86400" },
          // Compression headers
          { key: "Vary", value: "Accept-Encoding" },
        ]
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=3600" }
        ]
      },
      {
        source: "/_next/static/css/:path*",
        headers: [
          { key: "Content-Type", value: "text/css; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" }
        ]
      },
      {
        source: "/_next/static/js/:path*",
        headers: [
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" }
        ]
      },
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" }
        ]
      },
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" }
        ]
      },
      {
        source: "/:all*(svg|jpg|jpeg|png|gif|webp|avif|ico|js|css|woff2)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" }
        ]
      },
    ];
  }
};

export default nextConfig;// Force deployment Thu Oct  9 20:10:00 IST 2025 - Enable compression to match headers
