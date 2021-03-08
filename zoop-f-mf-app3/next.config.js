const path = require("path");
const { MergeRuntime, withModuleFederation } = require("@module-federation/nextjs-mf");
const deps = require("./package.json").dependencies;

module.exports = {
  future: { webpack5: true },
  webpack: (config, options) => {
    const { buildId, dev, isServer, defaultLoaders, webpack } = options;
    const mfConf = {
      // mergeRuntime: true, // experimental
      name: "app3/consumer",
      filename: "static/runtime/remoteEntry.js",
      exposes: {},
      remotes: {},
    };
    withModuleFederation(config, options, mfConf);

    if (!isServer) {
      config.output.publicPath = "http://localhost:1903/_next/";
    }
    return config;
  },
  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
};
