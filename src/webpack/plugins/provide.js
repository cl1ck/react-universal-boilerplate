import webpack from 'webpack'

export default new webpack.ProvidePlugin({
  React: 'react',
  Immutable: 'immutable'
})
