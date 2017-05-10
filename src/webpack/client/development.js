import webpack from 'webpack'
import dev from 'config/dev'
import css from 'webpack/rules/css/client'
import postcss from 'webpack/rules/postcss/client'
import base from './base'

export default {
  ...base,
  cache: true,
  entry: {
    app: [
      'react-hot-loader/patch',
      `webpack-hot-socket-server/client?port=${dev.hotSocketPort}` +
        `&reload=true&reloadDelay=1000`,
      ...base.entry.app
    ]
  },
  output: {
    ...base.output,
    filename: '[name].[hash].js',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
    pathinfo: true
  },
  plugins: [
    ...base.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEV__: 'true'
    }),
    new webpack.NamedModulesPlugin()
  ],
  module: {
    rules: [css, postcss, ...base.module.rules]
  }
}
