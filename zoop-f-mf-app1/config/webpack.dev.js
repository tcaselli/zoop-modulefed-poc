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

const clientConfig = merge(common, {
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
      name: 'app1',
      filename: 'remoteEntry.js',
      exposes: {
        './Card': './src/components/AppCard.tsx',
        './Header': './src/components/Header.tsx',
        './Counter': './src/components/Counter/Exposed.tsx',
      },
      // ! Do not share treeshaked libraries, it breaks the optimisation.
      shared: [
        { react: { requiredVersion: deps.react } },
        { 'react-dom': { requiredVersion: deps['react-dom'] } },
        'react-router-dom',
        'axios',
        'redux',
        'react-redux',
        '@reduxjs/toolkit',
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${paths.src}/services/msw/mockServiceWorker.js`,
          to: `${paths.build}`,
        },
      ],
    }),
  ],
  module: {
    rules: [...devModuleRulesBase],
  },
});

const serverConfig = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'node',
  output: {
    path: paths.build,
    publicPath: `http://${process.env.DOMAIN}:${process.env.PORT}/`,
    filename: 'assets/js/[name].[contenthash].node.bundle.js',
    globalObject: 'this',
    libraryTarget: 'commonjs-module',
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
      name: 'app1',
      filename: 'serverEntry.js',
      library: { type: 'commonjs-module' },
      exposes: {
        './Card': './src/components/AppCard.tsx',
        './Header': './src/components/Header.tsx',
        './Counter': './src/components/Counter/Exposed.tsx',
      },
      // ! Do not share treeshaked libraries, it breaks the optimisation.
      shared: [
        { react: { requiredVersion: deps.react } },
        { 'react-dom': { requiredVersion: deps['react-dom'] } },
        'react-router-dom',
        'axios',
        'redux',
        'react-redux',
        '@reduxjs/toolkit',
      ],
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${paths.src}/services/msw/mockServiceWorker.js`,
          to: `${paths.build}`,
        },
      ],
    }),
  ],
  module: {
    rules: [...devModuleRulesBase],
  },
});

module.exports = [serverConfig, clientConfig];
