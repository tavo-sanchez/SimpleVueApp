const base = require('./webpack.base.config')

let config = Object.assign({}, base, {})

// no need to app entry during test
delete config.entry

module.exports = config
