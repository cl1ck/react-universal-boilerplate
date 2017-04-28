import webpackDevMiddleware from 'webpack-dev-middleware'
import convertExpressMiddleware from './convertExpressMiddleware'

export default (compiler, option, bundleValid) => {
  const middleware = webpackDevMiddleware(compiler, option)
  middleware.waitUntilValid(bundleValid)

  return convertExpressMiddleware(middleware)
}
