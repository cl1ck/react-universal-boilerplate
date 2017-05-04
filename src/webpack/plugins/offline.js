import OfflinePlugin from 'offline-plugin'

export default new OfflinePlugin({
  relativePaths: false,
  publicPath: '/',
  excludes: ['.htaccess'],
  caches: {
    main: [
      'app.*.js',
      'vendor.*.js',
      'manifest.*.js'
    ],
    additional: [
      '*.woff',
      '*.woff2',
    ],
    optional: [
      ':rest:'
    ]
  },
  safeToUseOptionalCaches: true,
  AppCache: false
})
