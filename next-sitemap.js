module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.seonest.net',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: ['https://www.seonest.net/server-sitemap.xml'],
  },
};
