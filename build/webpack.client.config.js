const base = require("./webpack.base.config")
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

const config = Object.assign({},base,{
  plugins: (base.plugins || []).concat([
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'assets/js/[name].js'
    })
  ])
})

config.module.rules
  .filter(x => { return x.loader == 'vue-loader'})
  .forEach( x => x.options.extractCSS = true)

config.plugins.push(
  new ExtractTextPlugin('assets/styles.css')
)

// Will minify and ofuscate js
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  )
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  )
}

module.exports = config
