import paths from 'config/paths'
import project from 'config/project'
import FaviconPlugin from 'favicons-webpack-plugin'

export default new FaviconPlugin({
  logo: `${paths.assets}/favicon.png`,
  prefix: 'icons/',
  emitStats: false,
  statsFilename: 'iconstats.json',
  persistentCache: true,
  background: '#fff',
  title: project.title,
  inject: true,
  icons: {
    android: true,
    appleIcon: false,
    appleStartup: false,
    favicons: true,
    firefox: false,
    windows: false
  }
})
