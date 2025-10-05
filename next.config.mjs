/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable compression
  compress: true,
  
  // Consistent trailing slash behavior - disabled for API routes
  trailingSlash: false,
  
  // Safari optimization: Reduce hydration payload
  experimental: {
    // Reduce hydration data size for Safari compatibility
    optimizePackageImports: ['@/components', '@/lib'],
    // Enable partial pre-rendering for better performance
    ppr: false,
  },
  
  // Configure images for dynamic OG generation and local images
  images: {
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
      // Brain tumor surgery redirects
      {
        source: '/brain-tumor-surgery-hyderabad',
        destination: '/services/brain-tumor-surgery-hyderabad',
        permanent: true,
      },
      // Trigeminal neuralgia redirects
      {
        source: '/conditions/trigeminal-neuralgia',
        destination: '/conditions/trigeminal-neuralgia-treatment',
        permanent: true,
      },
      // Slip disc redirects
      {
        source: '/slip-disc-treatment-hyderabad',
        destination: '/conditions/slip-disc-treatment-hyderabad',
        permanent: true,
      },
      // Consolidate specific endoscopic procedures to main MISS page
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
      // Redirect MVD and radiosurgery to trigeminal neuralgia page
      {
        source: '/services/microvascular-decompression-mvd-hyderabad',
        destination: '/services/microvascular-decompression',
        permanent: true,
      },
      {
        source: '/services/radiosurgery-gamma-knife-hyderabad',
        destination: '/services/radiosurgery-gamma-knife',
        permanent: true,
      },
      {
        source: '/services/microvascular-decompression/',
        destination: '/services/microvascular-decompression',
        permanent: true,
      },
      {
        source: '/services/radiosurgery-gamma-knife/',
        destination: '/services/radiosurgery-gamma-knife',
        permanent: true,
      },
      {
        source: '/conditions/trigeminal-neuralgia-treatment/',
        destination: '/conditions/trigeminal-neuralgia-treatment',
        permanent: true,
      },
      {
        source: '/conditions/lumbar-spinal-stenosis/',
        destination: '/conditions/lumbar-spinal-stenosis-treatment',
        permanent: true,
      },
      {
        source: '/conditions/cervical-radiculopathy/',
        destination: '/conditions/cervical-radiculopathy-treatment',
        permanent: true,
      },
      {
        source: '/conditions/cervical-radiculopathy-treatment-hyderabad',
        destination: '/conditions/cervical-radiculopathy-treatment',
        permanent: true,
      },
      {
        source: '/conditions/cervical-radiculopathy-treatment-hyderabad/',
        destination: '/conditions/cervical-radiculopathy-treatment',
        permanent: true,
      },
      {
        source: '/:path((?!_next|api|images|favicon\\.ico|robots\\.txt|sitemap\\.xml|site\\.webmanifest).+)/',
        destination: '/:path',
        permanent: true,
      },
      {
        source: '/conditions/sciatica/',
        destination: '/conditions/sciatica-treatment',
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
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=31536000, immutable" }
        ]
      },
    ];
  }
};

export default nextConfig;// Force deployment Fri Oct  3 12:33:37 IST 2025
