import 'client/vendor.css'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { AppContainer } from 'react-hot-loader'
import configureStore from 'client/store'
import { ConnectedRouter } from 'connected-react-router/immutable'
import transit from 'transit-immutable-js'
import polyfill from 'client/polyfills'
import { IntlProvider, addLocaleData } from 'react-intl'
import App from './App'
import { localeData, DEFAULT_LOCALE } from 'client/i18n'
import translations from 'translations'
import configureOfflinePlugin from 'client/offline/configureOfflinePlugin'

let ActiveApp = App
let activeTranslations = translations
let language
let messages

// load polyfills
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

// load offline plugin
configureOfflinePlugin(store)

function getMessages (language, translations) {
  const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0]
  return (
    translations[languageWithoutRegionCode] ||
    translations[language] ||
    translations[DEFAULT_LOCALE]
  )
}

// i18n
addLocaleData(localeData)
language =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage
messages = getMessages(language, activeTranslations)
// todo: add a way to change messages on the fly

const $root = document.getElementById('root')
const renderToRoot = () => {
  const provider = (
    <Provider store={store}>
      <IntlProvider locale={language} messages={messages}>
        <ConnectedRouter history={history}>
          <ActiveApp />
        </ConnectedRouter>
      </IntlProvider>
    </Provider>
  )
  if (__DEV__) {
    render(
      <AppContainer>
        {provider}
      </AppContainer>,
      $root
    )
  } else {
    render(provider, $root)
  }
}

if (!__TEST__) {
  if (__DEV__) {
    window.React = React
    window.store = store
  }
  renderToRoot()

  if (module.hot) {
    module.hot.accept('translations', () => {
      activeTranslations = require('translations').default // eslint-disable-line global-require
      messages = getMessages(language, activeTranslations)
      renderToRoot()
    })
    module.hot.accept('./App', () => {
      ActiveApp = require('./App')
      renderToRoot()
    })
  }
}
