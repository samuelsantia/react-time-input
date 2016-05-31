const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  source: path.join(__dirname, 'src'),
  examples: path.join(__dirname, 'examples')
};

process.env.BABEL_ENV = TARGET;

const common = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.examples + '/build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: [PATHS.source, PATHS.examples],
        exclude: /node_modules/
      }
    ],
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        include: [PATHS.source],
        exclude: /node_modules/
      }
    ]
  }
};

if ( TARGET === 'start' ) {
  module.exports = merge(common, {
    entry: [
      'webpack/hot/dev-server',
      PATHS.examples + '/example.js'
    ],
    devtool: 'eval-source-map',
    devServer: {
      contentBase: PATHS.examples,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'only-errors',
      port: 3000
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
      }),
      new HtmlWebpackPlugin({
        template: PATHS.examples + '/index.html'
      }),
      new webpack.NoErrorsPlugin()
    ]
  });
}

if ( TARGET === 'build:examples' ) {
  module.exports = merge(common, {
    entry: PATHS.examples + '/example.js',
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true
        }
      }),
      new HtmlWebpackPlugin({
        template: PATHS.examples + '/index.html'
      }),
      new webpack.NoErrorsPlugin()
    ]
  });
}
