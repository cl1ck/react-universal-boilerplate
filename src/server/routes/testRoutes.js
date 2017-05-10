export default router =>
  router.get('/test', ctx => {
    ctx.body = 'yay'
    ctx.status = 200
  })
