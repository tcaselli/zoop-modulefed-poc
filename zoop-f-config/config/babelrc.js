module.exports = () => ({
  presets: [
    ['@babel/preset-env'],
    ['@babel/preset-typescript'],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties'],
    ['@babel/proposal-object-rest-spread'],
    ['@babel/plugin-transform-runtime'],
    ['@babel/plugin-syntax-top-level-await'],
    ['@babel/plugin-syntax-jsx'],
  ],
});
