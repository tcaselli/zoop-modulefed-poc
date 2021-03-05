const path = require("path");
const { MergeRuntime, withModuleFederation } = require("@module-federation/nextjs-mf");

module.exports = {
  future: { webpack5: true },
  webpack: (config, options) => {
    const { buildId, dev, isServer, defaultLoaders, webpack } = options;
    const mfConf = {
      mergeRuntime: true, // experimental
      name: "app3",
      filename: "static/runtime/remoteEntry.js",
      exposes: {
        "./exposedTitle": "./components/exposedTitle",
      },
      remotes: {
        layout: isServer
          ? path.resolve(__dirname, "../zoop-f-mf-layout/dist/remoteEntry.js")
          : "layout",
      },
    };
    if (!isServer) {
      config.output.publicPath = "http://localhost:1903/_next/";
    }
    withModuleFederation(config, options, mfConf);
    return config;
  },
  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
};
