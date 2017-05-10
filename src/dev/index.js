import serverConfig from 'webpack/server'
import debugConfig from 'config/debug'
import prettyError from 'pretty-error'
import startWebpackCompiler from 'dev/utils/startWebpackCompiler'

if (process.env.NODE_ENV === 'development') {
  prettyError.start()
  global.__BROWSER__ = false
  global.__DEV__ = true
  const { dev: log } = require('common/log')
  startWebpackCompiler('DEV', serverConfig, debugConfig.dev, log)
}
