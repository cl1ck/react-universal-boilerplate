import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default new ExtractTextPlugin({
  filename: 'css/styles.[contenthash].css',
  allChunks: true
})
