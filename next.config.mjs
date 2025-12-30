// #region agent log
import pkg from "workflow/next";
const { withWorkflow } = pkg;
// #endregion

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable compression
  compress: true,

  // Consistent trailing slash behavior - disabled for API routes
  trailingSlash: false,

  // Performance optimizations
  experimental: {
    // Reduce hydration data size for Safari compatibility
    optimizePackageImports: ['@/components', '@/lib'],
    // Enable partial pre-rendering for better performance
    ppr: false,
    // Enable optimized CSS loading
    optimizeCss: true,
  },
  // Server external packages (moved from experimental)
  serverExternalPackages: ['sharp'],

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
    contentDispositionType: 'inline',
    contentSecurityPolicy: "default-src 'self'; script-src 'none';",
    // Allow local images with query strings (for OG images)
    unoptimized: false,
    // Configure domains for external images if needed
    domains: [],
    // Performance optimizations
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 year
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // 301 redirects for legacy URLs to consolidate duplicate content
  async redirects() {
    return [
      // Fix: Redirect uppercase SITEMAP.XML to lowercase sitemap.xml (for Google Search Console)
      {
        source: '/SITEMAP.XML',
        destination: '/sitemap.xml',
        permanent: true,
      },
      // CRITICAL: Apex domain redirect to www (single hop 301)
      {
        source: '/((?!api|_next|images|favicon.ico|robots.txt|sitemap.xml|site.webmanifest).*)',
        has: [{ type: 'host', value: 'drsayuj.com' }],
        destination: 'https://www.drsayuj.com/$1',
        permanent: true,
      },
      // CRITICAL: Apex domain redirect for drsayuj.info to www (single hop 301)
      {
        source: '/((?!api|_next|images|favicon.ico|robots.txt|sitemap.xml|site.webmanifest).*)',
        has: [{ type: 'host', value: 'drsayuj.info' }],
        destination: 'https://www.drsayuj.info/$1',
        permanent: true,
      },
      // SITE ARCHITECTURE CONSOLIDATION: Reduce 5 hub pages to 2
      // Redirect /specializations to /services (consolidate "what we do")
      {
        source: '/specializations',
        destination: '/services',
        permanent: true,
      },
      // Redirect /disease-guides to /conditions (consolidate medical info)
      {
        source: '/disease-guides/:path*',
        destination: '/conditions/:path*',
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
        destination: '/conditions/trigeminal-neuralgia-treatment-hyderabad',
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
        destination: '/conditions/trigeminal-neuralgia-treatment-hyderabad',
        permanent: true,
      },
      {
        source: '/services/radiosurgery-gamma-knife-hyderabad',
        destination: '/conditions/trigeminal-neuralgia-treatment-hyderabad',
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

// #region agent log
// Wrap with withWorkflow to enable workflow directives
const wrappedConfig = withWorkflow(nextConfig);
// #endregion

export default wrappedConfig;// Force deployment Fri Oct  3 12:33:37 IST 2025
