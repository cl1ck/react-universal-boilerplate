import winston from 'winston'
import formatter from 'common/log/formatter'
import logConfig from 'config/log'

const createLogger = (context, colorizer) =>
  new winston.Logger({
    transports: [
      new winston.transports.Console({
        level: process.env.NODE_ENV === 'production'
          ? logConfig.productionLogLevel
          : logConfig.developmentLogLevel,
        formatter: formatter(context, colorizer)
      })
    ]
  })

export default createLogger
