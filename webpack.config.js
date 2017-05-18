const path = require('path');


module.exports = {
  entry: ['babel-polyfill', './client/index.js'],

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ],
  },
};