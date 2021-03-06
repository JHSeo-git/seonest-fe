const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/**
 * @type {import('next').NextConfig}
 */
module.exports = withBundleAnalyzer(
  withPWA({
    pwa: {
      dest: 'public',
      disable: process.env.NODE_ENV === 'development',
      runtimeCaching,
      buildExcludes: [/middleware-manifest.json$/],
      register: true,
      skipWaiting: true,
    },
    // swcMinify: true,
    experimental: {
      images: {
        allowFutureImage: true,
      },
    },
    reactStrictMode: true,
    webpack: (config) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      });
      return config;
    },
    images: {
      domains: ['files.seonest.net', 'd1ml1bwdb9n1pg.cloudfront.net'],
    },
    // images: {
    //   loader: 'imgix',
    //   path: '',
    // },
  })
);
