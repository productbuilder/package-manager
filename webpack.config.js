const path = require('path');

const commonConfig = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  },
  devtool: 'eval-source-map',
};

const renderConfig = {
  ...commonConfig,
  name: 'renderConfig',
  target: 'electron-renderer',
  entry: './src/render/index.tsx',
  output: {
    path: `${__dirname}/build`,
    filename: 'render.js',
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.(s[ac]ss|css)$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { url: false } },
          'sass-loader',
        ],
        exclude: /\.module\.(s[ac]ss|css)$/,
      },

      {
        test: /\.(s[ac]ss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          'sass-loader',
        ],
        include: /\.module\.(s[ac]ss|css)$/,
      },

    ],
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './build',
    host: require('os').hostname().toLowerCase(),
    port: 3000,
  },
};

const mainConfig = {
  ...commonConfig,
  name: 'mainConfig',
  target: 'electron-main',
  entry: './src/main/index.ts',
  output: {
    path: `${__dirname}/build`,
    filename: 'main.js',
  },
};

module.exports = (env, argv) => [renderConfig, mainConfig];
