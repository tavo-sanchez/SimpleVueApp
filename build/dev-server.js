const webpack = require('webpack')

const clientConfig = require('./webpack.client.config')
// Server configuration
const serverConfig = require('./webpack.server.config')
const MFS = require('memory-fs')
const path = require("path");

// export modules for live reload and will use this in the server.js configuration
// instead of creating the dist file in disk it will create the dist directory in memory
module.exports = function setupDevServer(app, onUpdate){
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

  // create files in memory, not in file system
  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()
  const outputPath = path.join(serverConfig.output.path, 'server/main.js')
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, () => {
    onUpdate(mfs.readFileSync(outputPath, 'utf-8'))
  })
}
