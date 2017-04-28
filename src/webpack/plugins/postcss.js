import {LoaderOptionsPlugin} from 'webpack'
import precss from 'precss'
import autoprefixer from 'autoprefixer'
import postcssReporter from 'postcss-reporter'
import postcssBrowserReporter from 'postcss-browser-reporter'

const postcss = [
  precss,
  autoprefixer({
    browsers: ['last 2 versions', '> 5%']
  }),
  postcssReporter
]

if (process.env.NODE_ENV !== 'production') {
  postcss.push(postcssBrowserReporter)
}

export default new LoaderOptionsPlugin({
  options: {
    postcss
  }
})
