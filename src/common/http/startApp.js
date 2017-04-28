/* globals __DEV__ */
import http from 'http'
import eventToPromise from 'event-to-promise'

export default (async function startApp (name, app, host, port, log) {
  if (__TEST__) {
    return () => {}
  }
  // create server
  const server = http.createServer(app.callback())
  app.server = server

  // start server
  server.listen({
    host,
    port
  })

  // register open sockets
  const sockets = new Map()
  let currentSocketId = 0
  server.on('connection', socket => {
    currentSocketId += 1
    const socketId = currentSocketId
    sockets.set(socketId, socket)

    // Remove the socket when it closes
    socket.on('close', () => {
      sockets.delete(socketId)
    })
  })

  await eventToPromise(server, 'listening')
  log.info(`${name} started: http://${host}:${port}`)

  // stop function
  const stopServer = async () => {
    log.debug(`Stopping ${name}...`)
    const p = new Promise(resolve => {
      server.close(resolve)
    })
    sockets.forEach(socket => {
      socket.destroy()
    })
    await p
    log.info(`${name} stopped.`)
  }

  return stopServer
})
