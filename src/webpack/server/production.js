import path from 'path'
import paths from 'config/paths'
import webpack from 'webpack'
import base from './base'

const cache = !(process.env.WATCH && process.env.WATCH === 'true')

export default {
  ...base,
  cache,
  entry: [...base.entry, path.join(paths.src, 'server/server.js')],
  output: {
    ...base.output,
    path: paths.dist
  },
  plugins: [
    ...base.plugins,
    new webpack.DefinePlugin({
      __DEV__: 'false'
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  node: {
    __dirname: false,
    __filename: false
  }
}
