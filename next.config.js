const path = require('path');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

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
    reactStrictMode: true,
    webpack: (config) => {
      // config.plugins.push(new DuplicatePackageCheckerPlugin());
      // config.resolve.alias = {
      //   ...config.resolve.alias,
      //   'fast-deep-equal': path.resolve(
      //     __dirname,
      //     'node_modules',
      //     'fast-deep-equal'
      //   ),
      // };

      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      });
      return config;
    },
    // images: {
    //   domains: ['files.seonest.net', 'd1ml1bwdb9n1pg.cloudfront.net'],
    // },
    images: {
      loader: 'imgix',
      path: '',
    },
  })
);
