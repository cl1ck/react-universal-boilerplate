import development from 'webpack/client/development'
import production from 'webpack/client/production'

const config = {
  development,
  production
}

if (!(process.env.NODE_ENV in config)) {
  throw new Error(
    `Client configuration for ENV ${process.env.NODE_ENV} does not exist!`
  )
}

export default config[process.env.NODE_ENV]
