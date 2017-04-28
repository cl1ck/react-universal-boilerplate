import formatter from 'eslint-friendly-formatter'
import paths from 'config/paths'

export default {
  test: /\.jsx?$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  exclude: /node_modules/,
  options: {
    fix: false,
    failOnError: true,
    failOnWarning: true,
    formatter,
    configFile: `${paths.root}/.eslintrc`
  }
}
