/* globals __DEV__ */
import {compiler, initialBuildDone} from 'dev/compiler'
import startApp from 'common/http/startApp'
import attachHotServer from 'webpack-hot-socket-server'
import devConfig from 'config/dev'
import {dev as log} from 'common/log'
import app from './app'

let stopServer
const startServer = async () => {
  stopServer = await startApp(
    'Dev server',
    app,
    devConfig.host,
    devConfig.port,
    log
  )

  log.debug('Waiting for initial build...')
  await initialBuildDone
  attachHotServer(compiler, {
    port: devConfig.hotSocketPort,
    path: '/__webpack_hmr'
  })
  log.debug('Initial build done.')
}
export default startServer()

if (module.hot) {
  module.hot.accept('./app', async () => {
    const nextApp = require('./app').default // eslint-disable-line
    await stopServer()
    stopServer = await startApp(
      'Dev server',
      nextApp,
      devConfig.host,
      devConfig.port,
      log
    )
  })
}
