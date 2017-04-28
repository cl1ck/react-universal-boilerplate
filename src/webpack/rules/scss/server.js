export default {
  test: /\.scss$/,
  use: [
    {
      loader: 'css-loader/locals',
      options: {
        modules: true,
        importLoaders: 1,
        localIdentName: '[path]_[name]_[local]_[hash:base64:5]'
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: 'inline'
      }
    }
  ]
}
