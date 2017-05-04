import HtmlWebpackPlugin from 'html-webpack-plugin'
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin'
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin'
import project from 'config/project'
import paths from 'config/paths'
import path from 'path'

export default [
  new HtmlWebpackPlugin({
    title: project.title,
    template: path.join(paths.assets, 'index.ejs'),
    chunksSortMode: 'dependency',
    alwaysWriteToDisk: true,
    filename: 'index.html',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }
  }),
  new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'defer',
    inline: /manifest.*\.js$/
  }),
  new HtmlWebpackHarddiskPlugin({
    outputPath: path.join(paths.dist, 'static')
  })
]
