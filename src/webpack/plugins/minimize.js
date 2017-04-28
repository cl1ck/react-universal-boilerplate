import webpack from 'webpack'

export default [
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    compress: {
      warnings: false,
      screw_ie8: true
    },
    comments: false,
    mangle: {
      screw_ie8: true,
      keep_fnames: true
    },
    sourceMap: true
  })
]
