/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');

module.exports = {
  root: path.resolve(process.cwd()),
  src: path.resolve(__dirname, '../src'),
  build: path.resolve(__dirname, '../dist'),
  server: path.resolve(__dirname, '../server'),
};
