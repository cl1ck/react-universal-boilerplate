import webpackClientConfig from 'webpack/client'
import webpack from 'webpack'

// todo: handle error and stats
const compiler = webpack(webpackClientConfig)

let resolveInitialBuild
const initialBuildDone = new Promise(resolve => {
  resolveInitialBuild = resolve
})

let buildOnce = false
const validateBundle = () => {
  if (buildOnce) {
    return
  }
  buildOnce = true
  resolveInitialBuild()
}

export {compiler, validateBundle, initialBuildDone}
