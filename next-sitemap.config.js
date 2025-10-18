const EXCLUDED_PATHS = [
  "/api/*",
  "/auth/*",
  "/drafts",
  "/drafts/*",
  "/statsig-test",
  "/simple-statsig-test",
  "/cache-test-new",
  "/force-cache-clear",
  "/force-redeploy-test",
  "/test-compression",
  "/test-inngest",
  "/auth/callback",
  "/404",
  "/500"
];

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.drsayuj.info",
  generateRobotsTxt: false,
  exclude: EXCLUDED_PATHS,
  changefreq: "weekly",
  priority: 0.7,
  sitemapBaseFileName: "sitemap",
};
