/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');

module.exports = {
  root: path.resolve(process.cwd()),
  clientEntry: path.resolve(__dirname, '../src/client/index.tsx'),
  clientOut: path.resolve(__dirname, '../public'),
  serverEntry: path.resolve(__dirname, '../src/index.ts'),
  serverOut: path.resolve(__dirname, '../dist'),
  serverBundle: path.resolve(__dirname, '../dist/bundle.js'),
};
