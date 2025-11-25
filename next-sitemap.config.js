/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.drsayuj.info",
  generateRobotsTxt: false, // Robots.txt served via app/robots.ts
  generateIndexSitemap: false, // single sitemap for simplicity
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
  ],
  changefreq: "weekly",
  priority: 0.7,
  sitemapBaseFileName: "sitemap",
  // Add dynamic priority based on page type
  transform: async (config, path) => {
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
