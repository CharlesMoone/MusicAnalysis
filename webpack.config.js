const path = require('path');


module.exports = {
  entry: ['babel-polyfill', './client/index.jsx'],

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules', path.resolve(__dirname, 'client')],
  },

  module: {
    loaders: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, include: /node_modules/, loader: 'style-loader!css-loader' },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=__[local]__[name]__[hash:base64:5]',
      },
    ],
  },
};