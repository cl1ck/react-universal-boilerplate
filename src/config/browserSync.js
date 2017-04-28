import devConfig from 'config/dev'

export default {
  proxy: {
    target: `http://${devConfig.host}:${devConfig.port}`
  },
  host: 'dev.cl1ck0ne.net',
  port: 3030,
  ui: {
    port: 3031
  },
  logLevel: 'silent',
  cors: true,
  https: false
}
