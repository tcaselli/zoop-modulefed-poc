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
let PROD_BUILD_WITHOUT_DOCKER_COMPOSE = true; // Default to false;

if (PROD_BUILD_WITHOUT_DOCKER_COMPOSE) {
  require('dotenv').config();
}

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
      'process.env': {
        MOCK_WITH_MSW: false, // MSW must never be used in prod
      },
    }),
    // Extracts CSS into separate files.
    // Note: style-loader is for development, MiniCssExtractPlugin is for production.
    // They cannot be used together in the same config.
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash].css',
      chunkFilename: 'assets/css/[id].css',
    }),
    // ModuleFederation configuration
    // Module federation
    new ModuleFederationPlugin({
      name: 'layout',
      remotes: {
        app1: `app1@http://${process.env.MF_APP1_DOMAIN}:${process.env.MF_APP1_PORT}/remoteEntry.js`,
        app2: `app2@http://${process.env.MF_APP2_DOMAIN}:${process.env.MF_APP2_PORT}/remoteEntry.js`,
      },
      // ! Do not share treeshaked libraries, it breaks the optimisation.
      shared: {
        react: {
          // eager: load the chunk synchronously, allow to be sure that it is downloaded first then shared and not duplicated by remotes
          eager: true,
          requiredVersion: deps.react,
          singleton: true,
        },
        'react-dom': {
          eager: true,
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
