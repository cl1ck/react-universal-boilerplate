export default {
  test: /\.css$/,
  use: [
    {
      loader: 'style-loader',
      options: {
        sourceMap: true
      }
    },
    {
      loader: 'css-loader',
      options: {
        modules: false,
        localIdentName: '[path]_[name]_[local]_[hash:base64:5]'
      }
    }
  ]
}
