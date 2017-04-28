import io from 'socket.io-client/dist/socket.io'
import serverConfig from 'config/server'

export default () =>
  io.connect(
    `//${serverConfig.host}:${serverConfig.port}${serverConfig.apiEndpoint}`
  )
