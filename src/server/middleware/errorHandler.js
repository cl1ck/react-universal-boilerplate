export default function (log) {
  return async function errorHandlerMiddleware (ctx, next) {
    try {
      await next()
    } catch (e) {
      log.error(`${e.name}: ${e.message}`)
      log.error(e.stack)
      ctx.status = 500
      ctx.body = 'Internal server error'
    }
  }
}
