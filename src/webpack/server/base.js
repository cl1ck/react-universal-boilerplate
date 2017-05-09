import webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'
import resolve from 'webpack/misc/resolve'
import ejs from 'webpack/rules/ejs'
import css from 'webpack/rules/css/server'
import scss from 'webpack/rules/scss/server'
import sourceMapBanner from 'webpack/plugins/sourceMapBanner'
import paths from 'config/paths'
import stats from 'webpack/misc/stats'
import performance from 'webpack/misc/performance'
import devtool from 'webpack/misc/devtool'
import eslint from 'webpack/rules/eslint'
import javascript from 'webpack/rules/javascript'
import image from 'webpack/rules/image'
import webfonts from 'webpack/rules/webfonts'
import postcss from 'webpack/plugins/postcss'
import provide from 'webpack/plugins/provide'
import serverConfig from 'config/server'

process.traceDeprecation = true

export default {
  name: 'Server',
  resolve,
  devtool,
  stats,
  performance,
  context: paths.root,
  entry: ['babel-regenerator-runtime'],
  output: {
    filename: 'server.js',
    publicPath: serverConfig.publicPath,
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [eslint, javascript, image, ejs, css, scss, ...webfonts]
  },
  plugins: [
    sourceMapBanner,
    new webpack.DefinePlugin({
      __BROWSER__: 'false',
      __TEST__: 'false'
    }),
    postcss,
    new webpack.NoEmitOnErrorsPlugin(),
    provide
  ],
  target: 'node',
  externals: [nodeExternals()]
}
