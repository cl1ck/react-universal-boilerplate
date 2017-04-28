import {dev as log} from 'common/log'

if (module.hot) {
  const checkForUpdate = async () => {
    if (module.hot.status() === 'idle') {
      let updatedModules
      try {
        updatedModules = await module.hot.check(true)
      } catch (e) {
        const status = module.hot.status()
        if (['abort', 'fail'].indexOf(status) >= 0) {
          log.debug('Cannot apply update. Stopping app...')
          process.send('reload')
          return
        }
        log.debug('Update failed. Stopping app...')
        process.send('reload')
        return
      }

      if (!updatedModules) {
        log.debug('App updated.')
        return
      }

      // apply update
      const unacceptedModules = updatedModules.filter(
        moduleId => updatedModules.indexOf(moduleId) < 0
      )

      if (unacceptedModules.length > 0) {
        log.debug("The following modules couldn't be hot updated:")
        unacceptedModules.forEach(moduleId => {
          log.debug(` - ${moduleId}`)
        })
        log.debug('Restarting app...')
        process.send('reload')
        return
      }

      if (!updatedModules || updatedModules.length === 0) {
        log.debug('Nothing hot updated.')
      } else {
        log.debug('Updated modules:')
        updatedModules.forEach(moduleId => {
          log.debug(` - ${moduleId}`)
        })
      }

      checkForUpdate()
    }
  }

  process.on('message', msg => {
    if (msg === 'hotreload') {
      checkForUpdate()
    }
  })
} else {
  throw new Error('Hot reloading not enabled!')
}
