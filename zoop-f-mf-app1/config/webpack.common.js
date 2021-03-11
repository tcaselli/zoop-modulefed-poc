/* eslint-disable @typescript-eslint/no-require-imports */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');
const { commonModulesRulesBase } = require('@com.zooplus/zoop-f-config/config/webpack');

module.exports = {
  entry: [`${paths.src}/index.tsx`],
  target: 'web',
  output: {
    path: paths.build,
    filename: 'assets/js/[name].bundle.js',
    publicPath: '/',
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
  plugins: [
    // Copy static assets (not imported in the code)
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${paths.src}/assets/public`,
          to: `${paths.build}/assets/public`,
        },
        {
          from: `${paths.server}`,
          to: `${paths.build}`,
        },
      ],
    }),
    // Generates an HTML file from a template.
    new HtmlWebpackPlugin({
      template: `${paths.src}/index.html`,
      filename: 'index.html',
    }),
  ],
  // Determine how modules within the project are treated.
  module: {
    rules: [...commonModulesRulesBase],
  },
};
