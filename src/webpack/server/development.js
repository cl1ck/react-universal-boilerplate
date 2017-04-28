import path from 'path'
import webpack from 'webpack'
import paths from 'config/paths'
import base from './base'

export default {
  ...base,
  cache: true,
  entry: [...base.entry, path.join(paths.src, 'dev/dev.js')],
  output: {
    ...base.output,
    path: paths.temp,
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  plugins: [
    ...base.plugins,
    new webpack.DefinePlugin({
      __DEV__: 'true'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  node: {
    __dirname: true,
    __filename: true
  }
}
