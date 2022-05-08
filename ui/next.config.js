/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withTM = require('next-transpile-modules')(); // pass the modules you would like to see transpiled
const compose = require('next-compose');

module.exports = compose([
  [withBundleAnalyzer][withTM],
  {
    poweredByHeader: false,
    trailingSlash: true,
    basePath: '',
    reactStrictMode: true,
    // experimental: { esmExternals: true },
    webpack: (config, { isServer }) => {
      if (!isServer) {
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
