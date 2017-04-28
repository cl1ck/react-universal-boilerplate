import options from '../misc/babelOptions'

export default {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options
}
