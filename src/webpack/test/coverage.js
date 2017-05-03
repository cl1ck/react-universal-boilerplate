import base from './base'
import istanbul from 'webpack/rules/istanbul'
import WebpackShellPlugin from 'webpack-shell-plugin'
import paths from 'config/paths'
import path from 'path'

const mocha = 'node_modules/mocha/bin/mocha ' +
  path.join(paths.temp, 'coverage-test.js')
const NO_FAIL = process.env.NO_FAIL === 'true'

export default {
  ...base,
  entry: [
    ...base.entry,
    path.join(paths.src, 'test', 'unitTests.js'),
    path.join(paths.src, 'test', 'coverageFiles.js')
  ],
  output: {
    ...base.output,
    filename: 'coverage-test.js',
  },
  module: {
    rules: [
      istanbul,
      ...base.module.rules
    ]
  },
  plugins: [
    ...base.plugins,
    new WebpackShellPlugin({
      onBuildExit: mocha,
      swallowError: NO_FAIL
    })
  ]
}
