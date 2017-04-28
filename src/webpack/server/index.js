import development from './development'
import production from './production'

const config = {
  development,
  production
}

if (!(process.env.NODE_ENV in config)) {
  throw new Error(
    `Server configuration for ENV ${process.env.NODE_ENV} does not exist!`
  )
}

export default config[process.env.NODE_ENV]
