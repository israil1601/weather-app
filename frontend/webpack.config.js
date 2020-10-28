const webpack = require('webpack');
const path = require('path');

const TransferWebpackPlugin = require('transfer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const GLOBALS = {
  'process.env.ENDPOINT': JSON.stringify(process.env.ENDPOINT || 'http://localhost:9000/api'),
};

module.exports = {
  mode: 'development',
  cache: true,
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: ['@babel/polyfill', path.join(__dirname, 'src/index.js')],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'src',
      'node_modules',
    ],
  },
  devServer: {
    contentBase: 'public',
    historyApiFallback: true,
    disableHostCheck: true,
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 8000,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: [
            '@babel/preset-react',
            ['@babel/env', { targets: { browsers: ['last 2 versions'] }, modules: false }],
          ],
          plugins: [
            '@babel/plugin-proposal-class-properties',
          ],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new TransferWebpackPlugin([{ from: 'public' }], '.'),
    new webpack.DefinePlugin(GLOBALS),
  ],
};
