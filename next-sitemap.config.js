/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.drsayuj.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
  exclude: ["/api/*", "/404", "/500", "/drafts", "/drafts/*", "/statsig-test", "/simple-statsig-test"],
  changefreq: "weekly",
  priority: 0.7,
  sitemapBaseFileName: "sitemap",
};
