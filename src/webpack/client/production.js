import webpack from 'webpack'
import banner from 'webpack/plugins/banner'
import extractCSS from 'webpack/plugins/extractCSS'
import chunks from 'webpack/plugins/chunks'
import minimize from 'webpack/plugins/minimize'
import devCss from 'webpack/rules/css/client'
import devScss from 'webpack/rules/scss/client'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import favicon from 'webpack/plugins/favicon'
import offline from 'webpack/plugins/offline'
import features from 'config/features'
import base from './base'

const css = devCss.use.slice(1)
const scss = devScss.use.slice(1)
const cache = !(process.env.WATCH && process.env.WATCH === 'true')

export default {
  ...base,
  cache,
  output: {
    ...base.output,
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    favicon,
    ...base.plugins,
    new webpack.DefinePlugin({
      __DEV__: 'false'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    banner,
    extractCSS,
    ...chunks,
    ...minimize,
    ...(features.offline ? [offline] : [])
  ],
  module: {
    rules: [
      ...base.module.rules,
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: scss
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: css
        })
      }
    ]
  }
}
