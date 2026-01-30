import pkg from "workflow/next";
const { withWorkflow } = pkg;
import MiddlewareWebpackPlugin from "@middleware.io/sourcemap-uploader/dist/webpack-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable production sourcemaps for Middleware
  productionBrowserSourceMaps: true,

  // Enable compression
  compress: true,

  // Consistent trailing slash behavior - disabled for API routes
  trailingSlash: false,

  // Disable X-Powered-By header for security (Info Leakage)
  poweredByHeader: false,

  // Performance optimizations
  experimental: {
    // Reduce hydration data size for Safari compatibility
    optimizePackageImports: ['@/components', '@/lib', 'lucide-react'],
    // Enable partial pre-rendering for better performance
    ppr: false,
    // Enable optimized CSS loading
    optimizeCss: true,
  },
  // Server external packages (moved from experimental)
  serverExternalPackages: ['sharp', '@remotion/lambda'],

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
      // {
      //   source: '/SITEMAP.XML',
      //   destination: '/sitemap.xml',
      //   permanent: true,
      // },
      // CRITICAL: Apex domain redirect to www (single hop 301)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'drsayuj.com' }],
        destination: 'https://www.drsayuj.com/:path*',
        permanent: true,
      },
      // CRITICAL: Apex domain redirect for drsayuj.info to www (single hop 301)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'drsayuj.info' }],
        destination: 'https://www.drsayuj.info/:path*',
        permanent: true,
      },
      // SITE ARCHITECTURE CONSOLIDATION: Reduce 5 hub pages to 2
      // Redirect /specializations to /services (consolidate "what we do")
      {
        source: '/specializations',
        destination: '/services',
        permanent: true,
      },
      // Redirect /treatments to /services (consolidate treatments/services)
      {
        source: '/treatments',
        destination: '/services',
        permanent: true,
      },
      // Redirect /disease-guides to /conditions (consolidate medical info)
      // {
      //   source: '/disease-guides/:path*',
      //   destination: '/conditions/:path*',
      //   permanent: true,
      // },
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
      // Duplicate content consolidation
      {
        source: '/endoscopic-spine-surgery-hyderabad',
        destination: '/services/endoscopic-spine-surgery-hyderabad',
        permanent: true,
      },
      // Redirect legacy booking URL to the new appointments page
      {
        source: '/book-appointment',
        destination: '/appointments',
        permanent: true,
      },
      // Location typo redirects (hitec vs hitech)
      {
        source: '/locations/brain-spine-surgeon-hitech-city',
        destination: '/locations/brain-spine-surgeon-hitec-city',
        permanent: true,
      },
      {
        source: '/neurosurgeon-hitec-city',
        destination: '/neurosurgeon-hitech-city',
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
          // Prevent Adobe Flash and PDF documents from including data from across domains
          { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
          // Enable DNS prefetching control
          { key: "X-DNS-Prefetch-Control", value: "on" },
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
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" }
        ]
      },
      {
        source: "/:all*(svg|jpg|jpeg|png|gif|webp|avif|ico|js|css|woff2)",
        headers: [
          // Aggressive caching for static public assets to reduce repeat Edge Requests.
          // If an asset changes, it should be cache-busted by filename.
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" }
        ]
      },
      {
        source: "/site.webmanifest",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=86400" }
        ]
      },
      {
        source: "/sitemap.xml",
        headers: [
          { key: "Content-Type", value: "application/xml; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400" }
        ]
      },
      {
        source: "/sitemap-:path.xml",
        headers: [
          { key: "Content-Type", value: "application/xml; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400" }
        ]
      },
    ];
  },

  // Webpack configuration for Middleware sourcemap uploader
  webpack: (config, { isServer }) => {
    // Only add plugin for client-side builds in production if account key is present
    if (!isServer && process.env.NODE_ENV === 'production' && process.env.MIDDLEWARE_ACCOUNT_KEY) {
      config.plugins.push(
        new MiddlewareWebpackPlugin(
          process.env.MIDDLEWARE_ACCOUNT_KEY, // Account key of the application
          "1.0.0", // Application version
          ".next/", // By default path of next.js where sourcemap resides
          "_next/", // Base path where your sourcemap will reside after upload
          "https://hjptv.middleware.io/api/v1/rum/getSasUrl"
        )
      );
    }
    return config;
  },
};

// Wrap with withWorkflow to enable workflow directives
// The workflow package handles both webpack and turbopack configurations internally
export default withWorkflow(nextConfig);
