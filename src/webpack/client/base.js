/* eslint-disable no-underscore-dangle */
import path from 'path'
import webpack from 'webpack'
import paths from 'config/paths'
import resolve from 'webpack/misc/resolve'
import stats from 'webpack/misc/stats'
import performance from 'webpack/misc/performance'
import devtool from 'webpack/misc/devtool'
import eslint from 'webpack/rules/eslint'
import javascript from 'webpack/rules/javascript'
import image from 'webpack/rules/image'
import webfonts from 'webpack/rules/webfonts'
import postcss from 'webpack/plugins/postcss'
import stylelint from 'webpack/plugins/stylelint'
import indexHTML from 'webpack/plugins/indexHTML'
import provide from 'webpack/plugins/provide'
import serverConfig from 'config/server'

process.traceDeprecation = true

export default {
  name: 'Client',
  context: paths.root,
  resolve,
  devtool,
  stats,
  performance,
  entry: {
    app: [
      'babel-regenerator-runtime',
      path.join(paths.src, 'client/index.jsx')
    ]
  },
  output: {
    publicPath: serverConfig.publicPath,
    chunkFilename: '[name].[chunkhash].js',
    path: path.join(paths.dist, 'static'),
    crossOriginLoading: 'anonymous'
  },
  module: {
    rules: [eslint, javascript, image, ...webfonts]
  },
  plugins: [
    stylelint,
    postcss,
    ...indexHTML,
    new webpack.NoEmitOnErrorsPlugin(),
    provide,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
      __BROWSER__: 'true',
      __TEST__: 'false'
    })
  ]
}
