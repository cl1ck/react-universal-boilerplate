function applyMiddleware (middleware, req, res) {
  const originalEnd = res.end

  return new Promise(resolve => {
    res.end = (...args) => {
      originalEnd.apply(this, args)
      resolve(false)
    }
    middleware(req, res, () => {
      resolve(true)
    })
  })
}

export default function convertExpressMiddleware (middleware) {
  return async (ctx, next) => {
    const hasNext = await applyMiddleware(middleware, ctx.req, {
      end: content => {
        ctx.body = content
      },
      setHeader: (...args) => {
        ctx.set(...args)
      }
    })
    if (hasNext) {
      await next()
    }
  }
}
