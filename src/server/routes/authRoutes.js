import passport from 'koa-passport'

export default router => {
  router.get('/logout', ctx => {
    ctx.logout()
    ctx.redirect('/')
  })

  router.post(
    '/login',
    passport.authenticate('local', {
      successRedirect: '/loginok',
      failureRedirect: '/'
    })
  )
}
