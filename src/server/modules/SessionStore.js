import {Store} from 'koa-session2'

export default class RedisStore extends Store {
  constructor (rethinkdb) {
    super()
    this.r = rethinkdb
  }

  async get (sid) {
    const session = await this.r
      .table('sessions')
      .filter(this.r.row('sid').eq(sid))
      .run()
    return session.data
  }

  async set (session, opts) {
    if (!opts.sid) {
      opts.sid = this.getID(24)
    }

    await this.r.table('sessions').insert({
      sid: opts.sid,
      data: session
    })

    return opts.sid
  }

  async destroy (sid) {
    await this.r
      .table('sessions')
      .filter(this.r.row('sid').eq(sid))
      .delete()
      .run()
  }
}
