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
const common = require('./webpack.common');
const paths = require('./paths');
const deps = require('../package.json').dependencies;

// Set by hand if you want to load environment variables from env file to test prod build without docker compose setting environment variables
// let PROD_BUILD_WITHOUT_DOCKER_COMPOSE = true; // Default to false;

// if (PROD_BUILD_WITHOUT_DOCKER_COMPOSE) {
const dotenv = require('dotenv').config();
// }

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    path: paths.build,
    publicPath: `http://${process.env.DOMAIN}:${process.env.PORT}/`,
    filename: 'assets/js/[name].[contenthash].bundle.js',
  },
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
