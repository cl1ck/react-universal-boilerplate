import OfflinePlugin from 'offline-plugin'
import serverConfig from 'config/server'

export default new OfflinePlugin({
  publicPath: serverConfig.publicPath,
  AppCache: {
    FALLBACK: { '/': '/' }
  },
  ServiceWorker: {
    events: true,
    navigateFallbackURL: serverConfig.publicPath
  },
  externals: [
    serverConfig.publicPath
  ],
  autoUpdate: 1000 * 60 * 60 * 24 // 24 hours
})
