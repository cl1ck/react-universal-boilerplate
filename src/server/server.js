import serverConfig from 'config/server'
import {server as log} from 'common/log'
import startApp from 'common/http/startApp'
import prettyError from 'pretty-error'
import connect from './connect'
import app from './app'

prettyError.start()

let stopServer
const startServer = async () => {
  stopServer = await startApp(
    'Server',
    app,
    serverConfig.host,
    serverConfig.port,
    log
  )
  connect(app)
}
export default startServer()

if (module.hot) {
  const handler = async () => {
    const nextApp = require('./app').default // eslint-disable-line
    const nextConnect = require('./connect').default // eslint-disable-line
    await stopServer()
    stopServer = await startApp(
      'Server',
      nextApp,
      serverConfig.host,
      serverConfig.port,
      log
    )
    nextConnect(nextApp)
  }

  module.hot.accept('./app', handler)
  module.hot.accept('./connect', handler)
}
