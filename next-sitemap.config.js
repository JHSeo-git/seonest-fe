/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.seonest.net',
  generateRobotsTxt: false,
  autoLastmod: false,
  exclude: [
    '/admin',
    '/admin/*',
    '/categories/*',
    '/lab',
    '/lab/*',
    '/write',
    '/write/*',
    '/server-sitemap.xml',
    '/temps',
    '/temps/*',
    '/404',
    '/500',
  ],
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  // exclude: ['/server-sitemap.xml'],
  // robotsTxtOptions: {
  //   additionalSitemaps: ['https://www.seonest.net/server-sitemap.xml'],
  // },
};
