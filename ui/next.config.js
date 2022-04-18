/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  fs: false,
  fs: 'empty',
});
const withTM = require('next-transpile-modules')(); // pass the modules you would like to see transpiled
const compose = require('next-compose');

module.exports = compose([
  [withTM],
  {
    poweredByHeader: false,
    trailingSlash: true,
    basePath: '',
    fs: false,
    fs: 'empty',
    crypto: 'empty',
    // The starter code load resources from `public` folder with `router.basePath` in React components.
    // So, the source code is "basePath-ready".
    // You can remove `basePath` if you don't need it.
    reactStrictMode: true,
    // experimental: { esmExternals: true },
    webpack: (config, { isServer }) => {
      if (!isServer) {
        // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
        config.resolve.fallback = {
          fs: false,
          stream: false,
          path: false,
          worker_threads: false,
          crypto: require.resolve('crypto-browserify'),
          os: false,
        };
        // /https://github.com/ethers-io/ethers.js/issues/998
        config.resolve.alias.https = 'https-browserify';
        config.resolve.alias.http = 'http-browserify';
      }

      return config;
    },
  },
]);
