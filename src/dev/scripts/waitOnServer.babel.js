import waitOn from 'wait-on'
import serverConfig from 'config/server'
import { dev as log } from 'common/log'

const server = 'http://' + serverConfig.host + ':' + serverConfig.port
const opts = {
  resources: [
    server
  ],
  delay: 2000
}
log.info(`Waiting for ${server}`)

try {
  waitOn(opts)
} catch (e) {
  log.info(e)
  process.exit(1)
}

log.info(`${server} is reachable`)
setTimeout(() => process.exit(0), 1000)
