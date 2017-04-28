export default initialMiddleware => {
  let activeMiddleware = initialMiddleware

  const change = newMiddleware => {
    if (!(newMiddleware instanceof Function)) {
      throw new Error('Middleware must be a function!')
    }
    activeMiddleware = newMiddleware
  }

  const middleware = async (ctx, next) => {
    await activeMiddleware(ctx, next)
  }

  return {
    middleware,
    change
  }
}
