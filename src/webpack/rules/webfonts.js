export default [
  {
    test: /\.woff(\?\S*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      mimetype: 'application/font-woff',
      name: 'fonts/[name].[ext]'
    }
  },
  {
    test: /\.woff2(\?\S*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      mimetype: 'application/font-woff2',
      name: 'fonts/[name].[ext]'
    }
  },
  {
    test: /\.ttf(\?\S*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      mimetype: 'application/octet-stream',
      name: 'fonts/[name].[ext]'
    }
  },
  {
    test: /\.eot(\?\S*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      mimetype: 'application/vnd.ms-fontobject',
      name: 'fonts/[name].[ext]'
    }
  }
]
