/* globals __DEV__ */
import Koa from 'koa'
import convert from 'koa-convert'
import passport from 'koa-passport'
import Router from 'koa-router'
// import session from 'koa-session2'
import parser from 'koa-bodyparser'
import json from 'koa-json'
import compress from 'koa-compress'
import cors from 'koa-cors'
import serve from 'koa-static'
import mount from 'koa-mount'
import serverConfig from 'config/server'
import logConfig from 'config/log'
import { server as log } from 'common/log'
import rethinkdb from 'common/database/rethinkdb'
import favicon from 'server/middleware/favicon'
import logger from 'server/middleware/logger'
import errorHandler from 'server/middleware/errorHandler'
import dynamicMiddleware from 'server/middleware/dynamicMiddleware'
// import SessionStore from 'server/modules/SessionStore'
import Auth from 'server/modules/Auth'
import routes from 'server/routes'
import serverSideRenderer from 'server/serverSideRenderer'

const app = new Koa()

// global error handler
app.use(errorHandler(log))

// optimization
app
  .use(
    convert(
      cors({
        origin: true,
        credentials: true
      })
    )
  )
  .use(convert(compress()))

// logging
if (logConfig.serverRequests) {
  app.use(logger(log, __DEV__ && logConfig.serverResponses))
}
if (__DEV__) {
  app.use(convert(json()))
}

// auth
const auth = new Auth(rethinkdb)
auth.attach(passport)
// todo: attach auth to Koa

// favicon
app.use(favicon)

// Static
if (!__DEV__) {
  app.use(convert(mount('/', serve(`${__dirname}/static`))))
}

// user defined middlewares
app.use(convert(parser())).use(async (ctx, next) => {
  ctx.r = rethinkdb
  await next()
})

// Routing
const router = new Router({
  prefix: serverConfig.apiEndpoint
})
routes.forEach(addRoute => {
  addRoute(router)
})

// wildcard routing to react server side renderer
if (__DEV__ && module.hot) {
  let dynamicServerSideRenderer
  let dynamicRouterRoutes
  let dynamicRouterMethods

  dynamicRouterRoutes = dynamicMiddleware(router.routes())
  dynamicRouterMethods = dynamicMiddleware(router.allowedMethods())
  dynamicServerSideRenderer = dynamicMiddleware(serverSideRenderer)

  app
    .use(dynamicRouterRoutes.middleware)
    .use(dynamicRouterMethods.middleware)
    .use(dynamicServerSideRenderer.middleware)

  module.hot.accept('./serverSideRenderer', () => {
    const nextServerSideRenderer = require('./serverSideRenderer').default
    dynamicServerSideRenderer.change(nextServerSideRenderer)
  })

  module.hot.accept('./routes', () => {
    const nextRoutes = require('./routes').default // eslint-disable-line
    const nextRouter = new Router({
      prefix: serverConfig.apiEndpoint
    })
    nextRoutes.forEach(addRoute => {
      addRoute(nextRouter)
    })
    dynamicRouterRoutes.change(nextRouter.routes())
    dynamicRouterMethods.change(nextRouter.allowedMethods())
  })
} else {
  app.use(router.routes()).use(router.allowedMethods()).use(serverSideRenderer)
}

export default app
