const webpack = require('webpack')

const clientConfig = require('./webpack.client.config')

// export modules for live reload and will use this in the server.js configuration
// instead of creating the dist file in disk it will create the dist directory in memory
module.exports = function setupDevServer(app){
  clientConfig.entry.app = [
    'webpack-hot-middleware/client',
    clientConfig.entry.app
  ]
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
  const clientCompiler = webpack(clientConfig)
  app.use(
    require('webpack-dev-middleware')(clientCompiler, {
      stats: {
        colors: true
      }
    })
  )
  app.use(require('webpack-hot-middleware')(clientCompiler))
}
