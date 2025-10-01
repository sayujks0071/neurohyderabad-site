/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable compression
  compress: true,
  
  // Consistent trailing slash behavior
  trailingSlash: true,
  
  // Configure images for dynamic OG generation and local images
  images: {
    remotePatterns: [
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
        source: '/:path*',
        has: [{ type: 'host', value: 'drsayuj.com' }],
        destination: 'https://www.drsayuj.com/:path*',
        permanent: true,
      },
      // Brain tumor surgery redirects
      {
        source: '/brain-tumor-surgery-hyderabad',
        destination: '/services/brain-tumor-surgery-hyderabad',
        permanent: true,
      },
      // Endoscopic spine surgery redirects
      {
        source: '/endoscopic-spine-surgery-hyderabad',
        destination: '/services/minimally-invasive-spine-surgery',
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
    ];
  },
  
  // Security and SEO-friendly defaults with caching
  async headers() {
    return [
      {
        source: "/:path*",
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
    ];
  }
};

export default nextConfig;