export default {
  test: /.*\.(gif|png|jpe?g|svg)$/i,
  use: [
    'file-loader',
    {
      loader: 'image-webpack-loader',
      query: {
        progressive: true,
        pngquant: {
          quality: '65-90',
          speed: 4
        },
        gifsicle: {
          interlaced: false
        },
        optipng: {
          optimizationLevel: 7
        }
      }
    }
  ]
}
