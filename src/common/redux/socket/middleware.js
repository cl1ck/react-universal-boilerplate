export default (socket, channelName) => store => {
  socket.on(channelName, store.dispatch)

  return next => action => {
    if (!('meta' in action && 'remote' in action.meta)) {
      next(action)
      return
    }
    socket.emit(channelName, action)
  }
}
