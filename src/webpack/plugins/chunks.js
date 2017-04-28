import webpack from 'webpack'
import WebpackMd5Hash from 'webpack-md5-hash'

export default [
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor'],
    minChunks: module =>
      module.context && module.context.indexOf('node_modules') !== -1
  }),
  // new webpack.optimize.CommonsChunkPlugin({
  //   name: 'vendor',
  //   minChunks: ({resource}) => /node_modules/.test(resource)
  // }),
  new webpack.optimize.CommonsChunkPlugin('manifest'),
  new WebpackMd5Hash()
]
