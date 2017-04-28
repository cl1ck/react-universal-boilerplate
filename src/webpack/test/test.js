import base from './base'
import WebpackShellPlugin from 'webpack-shell-plugin'
import paths from 'config/paths'
import path from 'path'

const mocha = 'node_modules/mocha/bin/mocha ' +
  path.join(paths.temp, 'unit-test.js')

export default {
  ...base,
  entry: [
    ...base.entry,
    path.join(paths.src, 'test', 'unitTests.js')
  ],
  output: {
    ...base.output,
    filename: 'unit-test.js',
  },
  plugins: [
    ...base.plugins,
    new WebpackShellPlugin({
      onBuildExit: mocha,
      swallowError: true
    })
  ]
}
