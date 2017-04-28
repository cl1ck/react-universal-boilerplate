import webpack from 'webpack'
import banner from 'config/banner'

export default new webpack.BannerPlugin({
  banner,
  raw: false,
  entryOnly: true
})
