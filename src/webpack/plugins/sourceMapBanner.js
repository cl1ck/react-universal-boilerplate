import { BannerPlugin } from 'webpack'

export default new BannerPlugin({
  banner: "require('source-map-support').install()\n",
  raw: true,
  entryOnly: false
})
