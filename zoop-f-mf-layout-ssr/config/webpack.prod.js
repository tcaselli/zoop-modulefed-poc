/* eslint-disable @typescript-eslint/no-require-imports */
const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const DefinePlugin = require('webpack').DefinePlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  prodModuleRulesBase,
  prodOptimizationConfigBase,
  prodPerformanceConfigBase,
} = require('@com.zooplus/zoop-f-config/config/webpack');
const { serverConfigBase, clientConfigBase } = require('./webpack.common');
const path = require('path');
const deps = require('../package.json').dependencies;

// Set by hand if you want to load environment variables from env file to test prod build without docker compose setting environment variables
// let PROD_BUILD_WITHOUT_DOCKER_COMPOSE = true; // Default to false;

// if (PROD_BUILD_WITHOUT_DOCKER_COMPOSE) {
const dotenv = require('dotenv').config();
// }

const serverConfig = merge(serverConfigBase, {
  mode: 'production',
  devtool: 'inline-source-map',
  plugins: [
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    }),
    // Extracts CSS into separate files.
    // Note: style-loader is for development, MiniCssExtractPlugin is for production.
    // They cannot be used together in the same config.
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash].css',
      chunkFilename: 'assets/css/[id].css',
    }),
    new ModuleFederationPlugin({
      name: 'layout',
      filename: 'serverEntry.js',
      library: { type: 'commonjs-module' },
      remotes: {
        app1: path.resolve(__dirname, '../../zoop-f-mf-app1/dist/serverEntry.js'),
        app2: path.resolve(__dirname, '../../zoop-f-mf-app2/dist/serverEntry.js'),
        app4: path.resolve(__dirname, '../../zoop-f-mf-app4-ssr/dist/serverEntry.js'),
      },
      exposes: {
        './Title': './src/client/components/Title.tsx',
      },
      // ! Do not share treeshaked libraries, it breaks the optimisation.
      shared: [
        {
          react: { requiredVersion: deps.react, eager: true },
          'react-dom': { requiredVersion: deps['react-dom'], eager: true },
        },
      ],
    }),

    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
    }),
  ],

  module: {
    rules: [...prodModuleRulesBase],
  },
  optimization: {
    ...prodOptimizationConfigBase,
  },
  performance: {
    ...prodPerformanceConfigBase,
  },
});

const clientConfig = merge(clientConfigBase, {
  mode: 'production',
  devtool: 'inline-source-map',
  plugins: [
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    }),
    // Extracts CSS into separate files.
    // Note: style-loader is for development, MiniCssExtractPlugin is for production.
    // They cannot be used together in the same config.
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash].css',
      chunkFilename: 'assets/css/[id].css',
    }),
    // ModuleFederation configuration
    new ModuleFederationPlugin({
      name: 'layout',
      filename: 'remoteEntry.js',
      remotes: {
        app1: 'app1@http://localhost:1901/remoteEntry.js',
        app2: 'app2@http://localhost:1902/remoteEntry.js',
        app4: 'app4@http://localhost:1904/remoteEntry.js',
      },
      exposes: {
        './Title': './src/client/components/Title.tsx',
      },
      // ! Do not share treeshaked libraries, it breaks the optimisation.
      shared: [
        {
          react: { requiredVersion: deps.react, eager: true },
          'react-dom': { requiredVersion: deps['react-dom'], eager: true },
        },
      ],
    }),

    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
    }),
  ],

  module: {
    rules: [...prodModuleRulesBase],
  },
  optimization: {
    ...prodOptimizationConfigBase,
  },
  performance: {
    ...prodPerformanceConfigBase,
  },
});

module.exports = [serverConfig, clientConfig];
