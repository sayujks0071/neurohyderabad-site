/** @type {import('next').NextConfig} */
const nextConfig = {
  // FIX: Disable Next.js compression to prevent double compression with Vercel
  // Vercel handles compression automatically at the edge level
  compress: false,
  poweredByHeader: false,
  
  // Consistent trailing slash behavior - disabled for API routes
  trailingSlash: false,
  
  // Performance optimizations
  experimental: {
    // Reduce hydration data size for Safari compatibility
    optimizePackageImports: ['@/components', '@/lib'],
    // Enable partial pre-rendering for better performance
    ppr: false,
  },
  
  // Webpack optimizations for better performance
  webpack: (config, { dev, isServer }) => {
    // Optimize for production builds
    if (!dev && !isServer) {
      // Enable modern JavaScript features - target modern browsers
      config.target = ['web', 'es2022'];
      
      // Optimize bundle splitting for better performance
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 20,
        maxAsyncRequests: 20,
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
            maxSize: 200000, // 200KB max chunk size
          },
          common: {
            name: 'common',
            minChunks: 2,
            priority: -5,
            reuseExistingChunk: true,
            maxSize: 100000, // 100KB max chunk size
          },
          // Split analytics into separate chunks
          analytics: {
            test: /[\\/]node_modules[\\/](statsig|@google-analytics|gtag)[\\/]/,
            name: 'analytics',
            priority: 10,
            chunks: 'async',
          },
          // Split UI components
          ui: {
            test: /[\\/]src[\\/]components[\\/]/,
            name: 'ui',
            priority: 5,
            chunks: 'all',
            maxSize: 150000, // 150KB max chunk size
          },
        },
      };
      
      // Reduce polyfills for modern browsers
      config.resolve.fallback = {
        ...config.resolve.fallback,
        // Remove unnecessary polyfills for modern browsers
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
  
  // Server external packages (moved from experimental.serverComponentsExternalPackages)
  serverExternalPackages: ['@openai/agents'],
  
  // Turbopack configuration (moved from experimental)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  
  // Configure images for dynamic OG generation and local images
  images: {
    formats: ['image/avif', 'image/webp'],
    // Enable modern image formats with fallbacks
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Enable responsive images
    minimumCacheTTL: 31536000, // 1 year
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
      // CRITICAL: Domain redirects to actual domain (www.drsayuj.info)
      {
        source: '/((?!api|_next|images|favicon.ico|robots.txt|sitemap.xml|site.webmanifest).*)',
        has: [{ type: 'host', value: 'drsayuj.com' }],
        destination: 'https://www.drsayuj.info/$1',
        permanent: true,
      },
      {
        source: '/((?!api|_next|images|favicon.ico|robots.txt|sitemap.xml|site.webmanifest).*)',
        has: [{ type: 'host', value: 'www.drsayuj.com' }],
        destination: 'https://www.drsayuj.info/$1',
        permanent: true,
      },
      // CRITICAL: Fix 404 redirect for epilepsy surgery
      {
        source: '/services/epilepsy-surgery',
        destination: '/services/epilepsy-surgery-hyderabad',
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
          
          // Content Security Policy (CSP) - High Security
          { 
            key: "Content-Security-Policy", 
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://statsig.com https://api.statsig.com https://cdn.statsig.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https: blob:",
              "media-src 'self' https:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "connect-src 'self' https://www.google-analytics.com https://statsig.com https://api.statsig.com https://cdn.statsig.com https://api.whatsapp.com https://wa.me",
              "frame-src 'self' https://www.youtube.com",
              "worker-src 'self' blob:",
              "manifest-src 'self'",
              "trusted-types nextjs#bundler default"
            ].join("; ")
          },
          
          // Cross-Origin-Opener-Policy (COOP) - High Security
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          
          // Cross-Origin-Embedder-Policy (COEP) - Enhanced Security
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
          
          // Cross-Origin-Resource-Policy (CORP) - Enhanced Security
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
          
          // Safari optimization: Help with content decoding
          { key: "Content-Type", value: "text/html; charset=utf-8" },
          { key: "Cache-Control", value: "public, s-maxage=3600, max-age=600, stale-while-revalidate=86400" },
          // Performance hints
          { key: "X-DNS-Prefetch-Control", value: "on" },
          // Compression headers
          { key: "Vary", value: "Accept-Encoding" },
        ]
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=3600" },
          // API Security Headers
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // API-specific CSP
          { 
            key: "Content-Security-Policy", 
            value: "default-src 'self'; script-src 'none'; style-src 'none'; img-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'"
          }
        ]
      },
      {
        source: "/_next/static/css/:path*",
        headers: [
          { key: "Content-Type", value: "text/css; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Cross-Origin-Resource-Policy", value: "cross-origin" }
        ]
      },
      {
        source: "/_next/static/js/:path*",
        headers: [
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Cross-Origin-Resource-Policy", value: "cross-origin" }
        ]
      },
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Cross-Origin-Resource-Policy", value: "cross-origin" }
        ]
      },
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "Expires", value: "Thu, 31 Dec 2025 23:59:59 GMT" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Cross-Origin-Resource-Policy", value: "cross-origin" }
        ]
      },
      {
        source: "/:all*(svg|jpg|jpeg|png|gif|webp|avif|ico|js|css|woff2)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "Expires", value: "Thu, 31 Dec 2025 23:59:59 GMT" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Cross-Origin-Resource-Policy", value: "cross-origin" }
        ]
      },
      {
        source: "/_next/image/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "Expires", value: "Thu, 31 Dec 2025 23:59:59 GMT" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Cross-Origin-Resource-Policy", value: "cross-origin" }
        ]
      },
    ];
  }
};

export default nextConfig;// COMPRESSION FIX: Thu Oct  9 22:30:00 IST 2025 - Disable Next.js compression to fix Chrome ERR_CONTENT_DECODING_FAILED
