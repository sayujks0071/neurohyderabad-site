/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.drsayuj.info",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
  exclude: [
    "/api/*", 
    "/404", 
    "/500", 
    "/drafts", 
    "/drafts/*", 
    "/statsig-test", 
    "/simple-statsig-test",
    "/cache-test-new",
    "/force-cache-clear",
    "/force-redeploy-test",
    "/test-compression",
    "/test-inngest",
    "/auth/callback"
  ],
  changefreq: "weekly",
  priority: 0.7,
  sitemapBaseFileName: "sitemap",
};
