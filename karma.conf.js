const path = require('path');
const webpack = require('webpack');

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  test: path.resolve(__dirname, 'test')
}

module.exports = function (config) {

  config.set({
    singleRun: true,
    browsers: ['Chrome'],
    frameworks: ['mocha'],
    files: [
      'karma.webpack.js'
    ],
    preprocessors: {
      'karma.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'dots', 'coverage' ],
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            loader: 'babel',
            include: [PATHS.src, PATHS.test],
            exclude: /node_modules/
          }
        ],
        preLoaders: [
          {
            test: /\.jsx?$/,
            loader: 'isparta?',
            include: PATHS.src,
            exclude: /node_modules/
          },
          {
            test: /\.jsx?$/,
            loader: 'eslint',
            include: PATHS.src,
            exclude: /node_modules/
          }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('test')
        })
      ]
    },
    webpackServer: {
      noInfo: true
    }
  });
};
