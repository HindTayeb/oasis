const { createSecureHeaders } = require('next-secure-headers');
const { join } = require('path');

module.exports = {
  async headers() {
    return [{ source: '/(.*)', headers: createSecureHeaders() }];
  },
  async redirects() {
    return [
      {
        source: '/user/:username',
        destination: '/u/:username',
        permanent: true,
      }
    ];
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
    }

    return config;
  },
  env: {
    PROJECT_ROOT: join(__dirname, '../..'),
    IS_NEXT: true,
  },
};
