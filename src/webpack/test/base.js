import webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'
import resolve from 'webpack/misc/resolve'
import ejs from 'webpack/rules/ejs'
import css from 'webpack/rules/css/server'
import postcss from 'webpack/rules/postcss/server'
import javascript from 'webpack/rules/javascript'
import image from 'webpack/rules/image'
import webfonts from 'webpack/rules/webfonts'
import paths from 'config/paths'
import path from 'path'
import stats from 'webpack/misc/stats'
import provide from 'webpack/plugins/provide'
import serverConfig from 'config/server'

export default {
  resolve,
  entry: [
    'babel-regenerator-runtime',
    path.join(paths.src, 'test', 'setup.js')
  ],
  output: {
    publicPath: serverConfig.publicPath,
    libraryTarget: 'commonjs2',
    path: paths.temp
  },
  devtool: 'inline-source-map',
  module: {
    rules: [javascript, image, ejs, css, postcss, ...webfonts]
  },
  plugins: [
    new webpack.DefinePlugin({
      __BROWSER__: 'false',
      __DEV__: 'false',
      __TEST__: 'true'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    provide
  ],
  stats,
  target: 'node',
  externals: [nodeExternals()],
  node: {
    __dirname: false,
    __filename: false
  }
}
