import 'webpack/hotreload/signal'
import browserSyncConfig from 'config/browserSync'
import { dev as log } from 'common/log'
import startBrowserSync from 'dev/browsersync/startBrowserSync'
import server from 'server/server'
import dev from 'dev/server'
import prettyError from 'pretty-error'

prettyError.start()

process.on('unhandledRejection', err => {
  log.error('unhandled rejection', err, err.stack)
  process.exit(1)
})

process.on('uncaughtException', err => {
  log.error('uncaught exception:', err, err.stack)
  process.exit(2)
})

const startDevEnvironment = async () => {
  await Promise.all([server, dev])
  await startBrowserSync()
  log.debug(
    `(⌐■_■) DEV ENVIRONMENT READY (■_■¬)\n` +
      `Open http://${browserSyncConfig.host}:${browserSyncConfig.port} ` +
      `to start developing.\n`
  )
}

startDevEnvironment()
