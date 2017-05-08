const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./components/entry.jsx",
  output: {
    path: path.resolve(__dirname),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  devtool: 'source-maps',
  stats: {
    warnings: false
  },
  resolve: {
    extensions: [ ".js", ".jsx", "*" ]
  }
};
