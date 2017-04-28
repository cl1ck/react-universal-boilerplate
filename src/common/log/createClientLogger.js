import loglevel from 'loglevel'
import logConfig from 'config/log'

const level = process.env.NODE_ENV === 'production'
  ? logConfig.productionLogLevel
  : logConfig.developmentLogLevel
loglevel.setLevel(level)

const createLogger = (context, colorizer) => ({
  debug: loglevel.debug.bind(null, colorizer(`[${context}]`)),
  info: loglevel.info.bind(null, colorizer(`[${context}]`)),
  warn: loglevel.warn.bind(null, colorizer(`[${context}]`)),
  error: loglevel.error.bind(null, colorizer(`[${context}]`))
})

export default createLogger
