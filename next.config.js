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
    reactStrictMode: true,
    webpack: (config) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: {
                  removeViewBox: false,
                },
              },
            },
          },
        ],
      });
      return config;
    },
    images: {
      domains: ['files.seonest.net'],
    },
  })
);
