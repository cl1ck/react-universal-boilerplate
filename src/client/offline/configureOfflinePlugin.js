import * as OfflinePlugin from 'offline-plugin/runtime'
import { goOnline, goOffline, offlineReady } from 'client/offline/offline'

export default (store) => {
  if (__DEV__) {
    return
  }

  window.addEventListener('online', () => {
    store.dispatch(goOnline())
  })

  window.addEventListener('offline', () => {
    store.dispatch(goOffline())
  })

  OfflinePlugin.install({
    onInstalled: () => {
      store.dispatch(offlineReady())
    },

    onUpdating: () => {
      console.log('updating')
    },

    onUpdateReady: () => {
      console.log('update ready')
      OfflinePlugin.applyUpdate()
    },

    onUpdated: () => {
      console.log('updated')
      window.location.reload()
    }
  })
}
