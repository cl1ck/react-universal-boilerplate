export default conditions => {
  let keepAliveStarted = false
  let keepAliveTimeout = null

  const keepAlive = () => {
    if (conditions()) {
      keepAliveTimeout = setTimeout(keepAlive, 1000)
    }
  }

  const start = () => {
    if (keepAliveStarted) {
      return
    }
    keepAliveStarted = true
    keepAlive()
  }

  const stop = () => {
    if (keepAliveTimeout) {
      clearTimeout(keepAliveTimeout)
    }
  }

  return {
    start,
    stop
  }
}
