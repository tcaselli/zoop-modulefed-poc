/* eslint-disable @typescript-eslint/no-require-imports */
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const paths = require('./paths');
const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const DefinePlugin = require('webpack').DefinePlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { devModuleRulesBase } = require('@com.zooplus/zoop-f-config/config/webpack');
const deps = require('../package.json').dependencies;

// Load environment variables needed for development
const dotenv = require('dotenv').config();

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    // Refers to https://github.com/bripkens/connect-history-api-fallback
    historyApiFallback: true,
    contentBase: paths.build,
    open: false,
    compress: true,
    // Hot reloading
    // Currently not working with React and Webpack 5, waiting for update
    // hot: true,
    // Get PORT from .env file
    port: process.env.PORT || 3000,
    // Output only errors in the console.
    stats: 'minimal',
    // Setting host to 0.0.0.0 allow the server to be accessible outside of the docker container
    // https://webpack.js.org/configuration/dev-server/#devserverhost
    // https://okteto.com/docs/tutorials/webpack/index.html
    host: '0.0.0.0',
    // This option triggers a full refresh of the page when content changes, this is needed because hot reloading does not work properly with webpack 5 and module federation.
    watchContentBase: true,
  },
  output: {
    publicPath: `http://${process.env.DOMAIN}:${process.env.PORT}/`,
  },
  plugins: [
    // Only update what has changed.
    new HotModuleReplacementPlugin(),
    // Make environment variables available within the code
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    }),
    // Module federation
    new ModuleFederationPlugin({
      name: 'layout',
      remotes: {
        app1: `app1@http://${process.env.MF_APP1_DOMAIN}:${process.env.MF_APP1_PORT}/remoteEntry.js`,
        app2: `app2@http://${process.env.MF_APP2_DOMAIN}:${process.env.MF_APP2_PORT}/remoteEntry.js`,
        app3: `app3@http://${process.env.MF_APP3_DOMAIN}:${process.env.MF_APP3_PORT}/_next/static/runtime/remoteEntry.js`,
        app4: `app4@http://${process.env.MF_APP4_DOMAIN}:${process.env.MF_APP4_PORT}/remoteEntry.js`,
      },
      // ! Do not share treeshaked libraries, it breaks the optimisation.
      shared: {
        react: {
          requiredVersion: deps.react,
          singleton: true,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: deps['react-router-dom'],
        },
        axios: {
          singleton: true,
          requiredVersion: deps.axios,
        },
      },
    }),
  ],
  module: {
    rules: [...devModuleRulesBase],
  },
});
// Copy service worker for MSW (if env var is enabled) to build directory
if (Boolean(JSON.parse(process.env.MOCK_WITH_MSW))) {
  module.exports.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${paths.src}/services/msw/mockServiceWorker.js`,
          to: `${paths.build}`,
        },
      ],
    }),
  );
}
