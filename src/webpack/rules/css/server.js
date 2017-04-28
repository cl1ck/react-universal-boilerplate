export default {
  test: /\.css$/,
  use: {
    loader: 'css-loader',
    options: {
      modules: false,
      localIdentName: '[path]_[name]_[local]_[hash:base64:5]'
    }
  }
}
