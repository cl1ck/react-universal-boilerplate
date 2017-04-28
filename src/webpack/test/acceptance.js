import base from './base'
import WebpackShellPlugin from 'webpack-shell-plugin'
import paths from 'config/paths'
import path from 'path'

const mocha = 'node_modules/mocha/bin/mocha ' +
  path.join(paths.temp, 'acceptance-test.js')

export default {
  ...base,
  entry: [
    ...base.entry,
    path.join(paths.src, 'test', 'acceptanceTests.js')
  ],
  output: {
    ...base.output,
    filename: 'acceptance-test.js',
  },
  plugins: [
    ...base.plugins,
    new WebpackShellPlugin({
      onBuildExit: mocha,
      swallowError: true
    })
  ]
}
