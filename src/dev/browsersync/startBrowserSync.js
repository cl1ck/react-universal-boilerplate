import browserSync from 'browser-sync'
import { browsersync as log } from 'common/log'
import browsersyncConfig from 'config/browserSync'

function initBrowserSync () {
  return new Promise((resolve, reject) => {
    try {
      const bs = browserSync.create()
      bs.init(browsersyncConfig, resolve)
    } catch (e) {
      reject(e)
    }
  })
}

export default (async function startBrowserSync () {
  await initBrowserSync()
  const protocol = browsersyncConfig.https ? 'https' : 'http'
  log.info(
    `BrowserSync started: ` +
      `${protocol}://${browsersyncConfig.host}:${browsersyncConfig.port} \n` +
      `BrowserSync GUI:     ` +
      `http://${browsersyncConfig.host}:${browsersyncConfig.ui.port}`
  )
})
