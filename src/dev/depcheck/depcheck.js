import depcheck from 'depcheck'
import paths from 'config/paths'
import depcheckConfig from 'config/depcheck'

global.__BROWSER__ = false
const { depcheck: log } = require('common/log')

export function isEmpty (obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

export function logObject (obj) {
  return Object.keys(obj).reduce(
    (output, pkg) =>
      `${output}
'${pkg}'
in
${obj[pkg].join('\n')}
`,
    ''
  )
}

export function logArray (arr) {
  return arr.reduce((output, val) => `${output}\n'${val}'`, '')
}

log.info(`Checking dependencies in ${paths.root}`)

depcheck(paths.root, depcheckConfig, unused => {
  if (unused.dependencies.length !== 0) {
    const remove =
      '\nTo remove run:\nyarn remove ' + unused.dependencies.join(' ')
    log.info('Unused dependencies:', logArray(unused.dependencies), remove)
  }
  if (unused.devDependencies.length !== 0) {
    const remove =
      '\nTo remove run:\nyarn remove ' + unused.devDependencies.join(' ')
    log.info(
      'Unused devDependencies:\n',
      logArray(unused.devDependencies),
      remove
    )
  }
  if (!isEmpty(unused.missing)) {
    log.info('Missing packages:\n', logObject(unused.missing))
  }
  log.info('Done.')
})
