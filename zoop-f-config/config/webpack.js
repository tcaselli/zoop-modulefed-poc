const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

/**
 * Modules
 *
 * Determine how modules within the project are treated.
 */
exports.commonModulesRulesBase = [
  /**
   * JavaScript & Typescript
   *
   * Use Babel to transpile JavaScript files.
   */
  {
    test: /\.(js|jsx|ts|tsx)$/,
    use: ['babel-loader'],
    exclude: /node_modules/,
  },

  /**
   * Images
   *
   * Copy image files to build folder.
   */
  {
    test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
    loader: 'file-loader',
    options: {
      name: 'assets/images/[name].[ext]',
    },
  },
  /**
   * Fonts
   *
   * Inline font files.
   */
  {
    test: /\.(woff(2)?|eot|ttf|otf|)$/,
    loader: 'url-loader',
    options: {
      limit: 8192,
      name: 'assets/fonts/[name].[ext]',
    },
  },
];

exports.prodModuleRulesBase = [
  /**
   * Styles
   *
   * Inject CSS into the head.
   */
  {
    test: /\.(css)$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            config: 'config/postcss.config.js',
          },
        },
      },
    ],
    exclude: [/node_modules/, /\.module\.css$/],
  },
  {
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-modules-typescript-loader',
      {
        loader: 'css-loader',
        options: {
          import: false,
          modules: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            config: 'config/postcss.config.js',
          },
        },
      },
    ],
    include: /\.module\.css$/,
  },
  /**
   * Styles
   * Inject SCSS into the head.
   */
  {
    test: /\.(scss)$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
    exclude: [/node_modules/, /\.module\.scss$/],
  },
  {
    test: /\.(scss)$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-modules-typescript-loader',
      {
        loader: 'css-loader',
        options: {
          import: false,
          modules: true,
        },
      },
      'sass-loader',
    ],
    include: /\.module\.scss$/,
  },
];

exports.devModuleRulesBase = [
  /**
   * Styles
   *
   * Inject CSS into the head with source maps.
   */
  {
    test: /\.(css)$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            // Path to configuration to use
            config: 'config/postcss.config.js',
          },
        },
      },
    ],
    exclude: [/node_modules/, /\.module\.css$/],
  },

  {
    test: /\.css$/,
    use: [
      'style-loader',
      'css-modules-typescript-loader',
      {
        loader: 'css-loader',
        options: {
          // Disable modules on imported ressources
          import: false,
          modules: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            config: 'config/postcss.config.js',
          },
        },
      },
    ],
    include: /\.module\.css$/,
  },
  /**
   * Styles
   * Inject SCSS into the head.
   */
  {
    test: /\.(scss)$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    exclude: [/node_modules/, /\.module\.scss$/],
  },
  {
    test: /\.(scss)$/,
    use: [
      'style-loader',
      'css-modules-typescript-loader',
      {
        loader: 'css-loader',
        options: {
          import: false,
          modules: true,
        },
      },
      'sass-loader',
    ],
    include: /\.module\.scss$/,
  },
];

/**
 * Optimization
 *
 * Production minimizing of JavaSvript and CSS assets.
 */
exports.prodOptimizationConfigBase = {
  minimize: true,
  minimizer: [new TerserPlugin()],
  // ! DO NOT USE runtimeChunk with module federation
  runtimeChunk: false,
  // Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
  // This breaks apart commonly shared deps (react, semantic ui, etc) into one shared bundle. And we don't want that
  splitChunks: {
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        minSize: 50000,
        minChunks: 1,
        chunks: 'initial',
        priority: 1,
      },
      styles: {
        name: 'styles',
        test: /\.css$/,
        chunks: 'all',
        enforce: true,
      },
    },
  },
};

/**
 * Performance
 *
 * These options allows you to control how webpack notifies you of assets and entry points that exceed a specific file limit.
 */
exports.prodPerformanceConfigBase = {
  hints: false,
  maxEntrypointSize: 512000,
  maxAssetSize: 512000,
};
