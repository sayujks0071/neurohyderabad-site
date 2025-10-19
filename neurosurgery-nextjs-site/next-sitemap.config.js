/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.drsayuj.info",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
  exclude: ["/api/*", "/404", "/500"],
  changefreq: "weekly",
  priority: 0.7,
  sitemapBaseFileName: "sitemap",
};
