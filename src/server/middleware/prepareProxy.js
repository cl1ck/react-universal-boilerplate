/* globals __DEV__ */
export default throwError => async (ctx, next) => {
  ctx.forwarded = true
  try {
    await next()
  } catch (e) {
    if (throwError) {
      throw e
    }
  }
}
