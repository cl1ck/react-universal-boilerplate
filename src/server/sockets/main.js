import { socketio as log } from 'common/log'

export default io => {
  io.on('connection', socket => {
    log.debug('new client:', socket.id) // eslint-disable-line no-console
    socket.emit('connected', socket.id)
  })
}
