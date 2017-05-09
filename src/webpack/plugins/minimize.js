import webpack from 'webpack'
import ParallelUglifyPlugin from 'webpack-parallel-uglify-plugin'
import paths from 'config/paths'

export default [
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new ParallelUglifyPlugin({
    cacheDir: paths.cache,
    uglifyJS: {
      output: {
        comments: false
      },
      compress: {
        warnings: false,
        screw_ie8: true
      },
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      }
    }
  })
]
