/* globals __DEV__ */
import {StaticRouter} from 'react-router'
import {Provider} from 'react-redux'
import {renderToString} from 'react-dom/server'
import {reactServer as log} from 'common/log'
import cheerio from 'cheerio'
import fs from 'mz/fs'
import immutable from 'immutable'
import configureStore from 'client/store'
import App from 'client/App'
import paths from 'config/paths'
import path from 'path'
import serialize from 'serialize-javascript'
import transit from 'transit-immutable-js'
import getMessages from 'common/i18n/messages'
import { locales, DEFAULT_LOCALE } from 'config/i18n'
import { IntlProvider } from 'react-intl'

async function getIndex (rootComponent, store) {
  const dir = __DEV__ ? paths.dist : __dirname
  const indexFilename = path.join(dir, 'static/index.html')
  const indexHTML = await fs.readFile(indexFilename, {encoding: 'utf8'})
  const $ = cheerio.load(indexHTML)
  const injectState = `
<script type='text/javascript' charset='utf-8'>
window.__PRELOADED_STATE__ = ${serialize(transit.toJSON(store.getState()), {
  isJSON: true
})}
</script>`

  $('#root').append(rootComponent)
  $('body').prepend(injectState)

  return $.html()
}

const serverSideRenderer = async ctx => {
  const context = {}
  const initialState = immutable.fromJS({})
  const store = configureStore(initialState)
  const language = ctx.acceptsLanguages(locales) || DEFAULT_LOCALE
  const messages = getMessages(language)

  const rootComponent = renderToString(
    <Provider store={store} key='provider'>
      <IntlProvider locale={language} messages={messages}>
        <StaticRouter location={ctx.url} context={context}>
          <App />
        </StaticRouter>
      </IntlProvider>
    </Provider>
  )

  if (context.url) {
    log.debug('Redirect', context.url)
    ctx.redirect(context.url)
    return
  }

  if (context.status === 404) {
    log.debug(`No matching route found in React router for ${ctx.url}`)
    ctx.status = 404
  }
  ctx.body = await getIndex(rootComponent, store)
}

export default serverSideRenderer
