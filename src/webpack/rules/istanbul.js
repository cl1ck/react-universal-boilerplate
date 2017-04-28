import paths from 'config/paths'

export default {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  include: paths.src,
  loader: 'istanbul-instrumenter-loader'
}
