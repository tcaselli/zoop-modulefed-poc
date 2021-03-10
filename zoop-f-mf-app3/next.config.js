const { withModuleFederation, MergeRuntime } = require("@module-federation/nextjs-mf");
const path = require("path");
module.exports = {
  future: { webpack5: true },
  webpack: (config, options) => {
    const { buildId, dev, isServer, defaultLoaders, webpack } = options;
    const mfConf = {
      // mergeRuntime: true,
      name: "app3",
      library: { type: config.output.libraryTarget, name: "app3" },
      remotes: {
        app1: isServer ? path.resolve(__dirname, "../zoop-f-mf-app1/dist/serverEntry.js") : "app1", // for client, treat it as a global
      },
      exposes: {},
      shared: [],
    };
    // Configures ModuleFederation and other Webpack properties
    withModuleFederation(config, options, mfConf);
    if (!isServer) {
      config.output.publicPath = "http://localhost:1904/_next/";
    }
    return config;
  },
};
