import client from 'webpack/client'
import stats from 'webpack/misc/stats'

const publicPath = client.output.publicPath

export default {
  contentBase: publicPath,
  hot: true,
  historyApiFallback: true,
  compress: true,
  quiet: true,
  noInfo: true,
  lazy: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  publicPath,
  stats
}
