export default async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    return ctx.redirect('/icons/favicon.ico')
  }
  const res = await next()
  return res
}
