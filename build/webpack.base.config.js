// Webpack to build, include the path module here too
const path = require('path')

// Configure the entry point?? to client-entry.js, then the output to create a dist directory
// what's the public path ??? why??
// will place all the js into app.js(redundant?) (or the name from the entry object) file into the
// assets/js directory
const config = {
  entry: {
    app: path.resolve(__dirname, '../src/client-entry.js'),
    // adding vendors to put all the js from other files in just one file
    vendor: ['vue', 'vue-router', 'vuex', 'axios']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /(\.js$)|(\.vue$)/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          css: 'css-loader',
          'scss': 'css-loader|sass-loader'
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'assets/js/[name].js'
  }
}

module.exports = config
