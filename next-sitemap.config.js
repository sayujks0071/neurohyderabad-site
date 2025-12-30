/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.drsayuj.info",
  generateRobotsTxt: false, // Robots.txt served via app/robots.ts
  generateIndexSitemap: false, // CRITICAL: Disable index generation - single sitemap.xml with all URLs
  outDir: "public", // Output directly to public/ for static serving
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/auth/",
          "/drafts",
          "/drafts/",
          "/cache-test-new",
          "/force-cache-clear",
          "/force-redeploy-test",
          "/simple-statsig-test",
          "/statsig-test",
          "/test-compression",
          "/test-inngest",
          "/test-error",
          "/email-test",
        ]
      }
    ],
  },
  exclude: [
    "/api/*",
    "/auth/*",
    "/404",
    "/500",
    "/drafts",
    "/drafts/*",
    "/cache-test-new",
    "/force-cache-clear",
    "/force-redeploy-test",
    "/simple-statsig-test",
    "/statsig-test",
    "/test-*",
    "/email-test",
    // Exclude blog posts with forbidden keywords (handled in transform, but added here for clarity)
    "/blog/*example*",
    "/blog/*test*",
    "/blog/*draft*",
    "/blog/*sample*",
    "/blog/*template*",
    "/blog/*placeholder*",
  ],
  changefreq: "weekly",
  priority: 0.7,
  sitemapBaseFileName: "sitemap",
  // Add dynamic priority based on page type
  transform: async (config, path) => {
    // CRITICAL: Exclude paths with forbidden keywords (example, test, draft, etc.)
    // This prevents example/test/draft content from being indexed by search engines
    const FORBIDDEN_KEYWORDS = ['example', 'test', 'draft', 'sample', 'template', 'placeholder'];
    const lowerPath = path.toLowerCase();
    const hasForbiddenKeyword = FORBIDDEN_KEYWORDS.some(keyword => lowerPath.includes(keyword));
    
    if (hasForbiddenKeyword) {
      // Return null to exclude this path from the sitemap
      return null;
    }

    // High priority pages
    if (path === '/' ||
      path.includes('/spine-surgery') ||
      path.includes('/brain-surgery') ||
      path.includes('/about')) {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }

    // Medium-high priority (service and condition pages)
    if (path.includes('/services/') || path.includes('/conditions/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }

    // Medium priority (blog posts and locations)
    if (path.includes('/blog/') || path.includes('/locations/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      };
    }

    // Default
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
