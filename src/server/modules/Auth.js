import {Strategy as LocalStrategy} from 'passport-local'

export default class Auth {
  constructor (rethinkdb) {
    this.r = rethinkdb
  }

  attach (passport) {
    passport.use(new LocalStrategy(this.authLocal))
  }

  authLocal (username, password, done) {
    const user = this.r
      .table('users')
      .filter({
        username,
        password
      })
      .run()

    if (user) {
      done(null, user)
    }
    done(null, false)
  }
}
