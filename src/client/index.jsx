import 'client/vendor.css'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createBrowserHistory} from 'history'
import {AppContainer} from 'react-hot-loader'
import configureStore from 'client/store'
import {ConnectedRouter} from 'connected-react-router/immutable'
import transit from 'transit-immutable-js'
import polyfill from 'client/utils/polyfill'
import { IntlProvider } from 'react-intl'
import getMessages from 'common/i18n/messages'
import getClientLanguage from 'common/i18n/clientLanguage'
import App from './App'

polyfill()

let preloadedState
// eslint-disable-next-line no-underscore-dangle
if (__BROWSER__ && window.__PRELOADED_STATE__) {
  // eslint-disable-next-line no-underscore-dangle
  preloadedState = transit.fromJSON(window.__PRELOADED_STATE__)
  // eslint-disable-next-line no-underscore-dangle
  delete window.__PRELOADED_STATE__
}

const history = createBrowserHistory()
const store = configureStore(preloadedState, history)
const $root = document.getElementById('root')
const language = getClientLanguage()
const messages = getMessages(language)

if (!__TEST__) {
  if (__DEV__) {
    window.React = React
    window.store = store
    render(
      <AppContainer>
        <Provider store={store}>
          <IntlProvider locale={language} messages={messages}>
            <ConnectedRouter history={history}>
              <App />
            </ConnectedRouter>
          </IntlProvider>
        </Provider>
      </AppContainer>,
      $root
    )
  } else {
    render(
      <Provider store={store}>
        <IntlProvider locale={language} messages={messages}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
      $root
    )
  }

  if (module.hot) {
    module.hot.accept('./App', () => {
      const NextApp = require('./App').default // eslint-disable-line global-require
      render(
        <AppContainer>
          <Provider store={store}>
            <IntlProvider locale={language} messages={messages}>
              <ConnectedRouter history={history}>
                <NextApp />
              </ConnectedRouter>
            </IntlProvider>
          </Provider>
        </AppContainer>,
        $root
      )
    })
  }
}
