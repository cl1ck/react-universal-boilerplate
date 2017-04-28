import nightmare from './nightmare'
import url from 'url'
import serverConfig from 'config/server'

const host = `http://${serverConfig.host}:${serverConfig.port}`

export default (path = '') => {
  const location = url.resolve(host, path)
  return nightmare.goto(location)
}
