import test from './test'
import coverage from './coverage'
import acceptance from './acceptance'

const config = {
  test,
  coverage,
  acceptance
}

if (!(process.env.NODE_ENV in config)) {
  throw new Error(
    `Test configuration for ENV ${process.env.NODE_ENV} does not exist!`
  )
}

export default config[process.env.NODE_ENV]
