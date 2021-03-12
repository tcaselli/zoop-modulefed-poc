/* eslint-disable @typescript-eslint/no-require-imports */
const paths = require('./paths');
const { commonModulesRulesBase } = require('@com.zooplus/zoop-f-config/config/webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const serverConfigBase = {
  target: 'async-node',
  entry: paths.serverEntry,
  output: {
    publicPath: `http://${process.env.DOMAIN}:${process.env.PORT}/`,
    path: paths.serverOut,
    filename: '[name].node.bundle.js',
    globalObject: 'this',
    libraryTarget: 'commonjs-module',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    mainFields: ['browser', 'module', 'main'],
  },
  // These options change how loaders are resolved.
  // postcss-loader is in a nested node_module directory, to be able to resolve it we need to add this nested node_modules to the resolve loader
  resolveLoader: {
    modules: ['node_modules', `${paths.root}/node_modules/@com.zooplus/zoop-f-config/node_modules`],
  },
  // Determine how modules within the project are treated.
  module: {
    rules: [...commonModulesRulesBase],
  },
  plugins: [
    /**
     * All files inside webpack's output.path directory will be removed once, but the
     * directory itself will not be. If using webpack 4+'s default configuration,
     * everything under <PROJECT_DIR>/dist/ will be removed.
     * Use cleanOnceBeforeBuildPatterns to override this behavior.
     *
     * During rebuilds, all webpack assets that are not used anymore
     * will be removed automatically.
     *
     * See `Options and Defaults` for information
     */
    new CleanWebpackPlugin(),
    new NodePolyfillPlugin(),
  ],
};

const clientConfigBase = {
  entry: paths.clientEntry,
  output: {
    path: paths.clientOut,
    filename: '[name].bundle.js',
    publicPath: `http://${process.env.DOMAIN}:${process.env.PORT}/`,
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    mainFields: ['browser', 'module', 'main'],
  },
  // These options change how loaders are resolved.
  // postcss-loader is in a nested node_module directory, to be able to resolve it we need to add this nested node_modules to the resolve loader
  resolveLoader: {
    modules: ['node_modules', `${paths.root}/node_modules/@com.zooplus/zoop-f-config/node_modules`],
  },
  // Determine how modules within the project are treated.
  module: {
    rules: [...commonModulesRulesBase],
  },
  plugins: [
    /**
     * All files inside webpack's output.path directory will be removed once, but the
     * directory itself will not be. If using webpack 4+'s default configuration,
     * everything under <PROJECT_DIR>/dist/ will be removed.
     * Use cleanOnceBeforeBuildPatterns to override this behavior.
     *
     * During rebuilds, all webpack assets that are not used anymore
     * will be removed automatically.
     *
     * See `Options and Defaults` for information
     */
    new CleanWebpackPlugin(),
  ],
};

module.exports = { serverConfigBase, clientConfigBase };
