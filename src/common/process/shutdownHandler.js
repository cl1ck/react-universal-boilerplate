const handlers = new Map()
let handlerIndex = 0
let handlerCalled = false

const shutdownHandler = async () => {
  if (handlerCalled) {
    return
  }
  handlerCalled = true
  const p = []
  handlers.forEach(handler => {
    p.push(handler())
  })
  try {
    await Promise.all(p)
  } finally {
    process.removeListener('SIGTERM', shutdownHandler)
    process.removeListener('SIGINT', shutdownHandler)
    process.removeListener('exit', shutdownHandler)
    process.exit(0)
  }
}

const addShutdownHandler = handler => {
  handlerIndex += 1
  handlers.set(handlerIndex, handler)
  return () => {
    handlers.delete(handlerIndex)
  }
}

const clearShutdownHandlers = () => {
  handlers.clear()
  handlerIndex = 0
}

process
  .on('SIGTERM', shutdownHandler)
  .on('SIGINT', shutdownHandler)
  .on('exit', shutdownHandler)

export default addShutdownHandler

export {addShutdownHandler, clearShutdownHandlers}
