import socketio from 'socket.io'
import rethinkdb from 'common/database/rethinkdb'
import sockets from 'server/sockets'
import feeds from 'server/feeds'

export default async app => {
  const io = socketio(app.server)

  io.origins('*:*') // eslint-disable-line no-underscore-dangle

  // sockets
  Object.keys(sockets).forEach(key => {
    sockets[key](io)
  })

  // change feeds
  const wait = []
  feeds.forEach(subscribeToFeed => {
    wait.push(subscribeToFeed(rethinkdb, sockets))
  })
  await Promise.all(wait)
}
