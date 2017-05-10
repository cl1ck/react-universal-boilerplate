try {
  const clientContext = require.context('../client/', true, /[^.spec]\.jsx?$/)
  clientContext.keys().forEach(clientContext)

  const commonContext = require.context('../common/', true, /[^\spec]\.jsx?$/)
  commonContext.keys().forEach(commonContext)

  const serverContext = require.context('../server/', true, /[^.spec]\.jsx?$/)
  serverContext.keys().forEach(serverContext)
} catch (e) {
  // silently ignore errors
}
