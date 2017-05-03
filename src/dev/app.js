import Koa from 'koa'
import convert from 'koa-convert'
import proxy from 'koa-proxy'
import logger from 'server/middleware/logger'
import errorHandler from 'server/middleware/errorHandler'
// import prepareProxy from 'server/middleware/prepareProxy'
import devMiddleware from 'server/middleware/devMiddleware'
import {dev as log} from 'common/log'
import serverConfig from 'config/server'
import logConfig from 'config/log'
import webpackDevConfig from 'webpack/devMiddleware'
import {compiler, validateBundle} from 'dev/compiler'

const host = `http://${serverConfig.host}:${serverConfig.port}`
const app = new Koa()

app.use(errorHandler(log))
if (logConfig.devRequests) {
  app.use(logger(log, logConfig.devResponses))
}
app
  .use(devMiddleware(compiler, webpackDevConfig, validateBundle))
  // .use(prepareProxy(false))
  .use(convert(proxy({
    host,
    jar: true
  })))

export default app
