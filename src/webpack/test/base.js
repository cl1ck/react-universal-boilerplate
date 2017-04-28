import webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'
import resolve from 'webpack/misc/resolve'
import ejs from 'webpack/rules/ejs'
import css from 'webpack/rules/css/server'
import scss from 'webpack/rules/scss/server'
import javascript from 'webpack/rules/javascript'
import image from 'webpack/rules/image'
import webfonts from 'webpack/rules/webfonts'
import postcss from 'webpack/plugins/postcss'
import paths from 'config/paths'
import path from 'path'
import stats from 'webpack/misc/stats'

export default {
  resolve,
  entry: [
    'babel-regenerator-runtime',
    path.join(paths.src, 'test', 'setup.js'),
  ],
  output: {
    publicPath: '/',
    libraryTarget: 'commonjs2',
    path: paths.temp
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      javascript,
      image,
      ejs,
      css,
      scss,
      ...webfonts
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __BROWSER__: 'false',
      __DEV__: 'false',
      __TEST__: 'true'
    }),
    postcss,
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({React: 'react'})
  ],
  stats,
  target: 'node',
  externals: [nodeExternals()],
  node: {
    __dirname: false,
    __filename: false
  }
}