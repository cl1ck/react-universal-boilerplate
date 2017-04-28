import 'client/vendor.css'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createBrowserHistory} from 'history'
import {AppContainer} from 'react-hot-loader'
import configureStore from 'client/store'
import {ConnectedRouter} from 'connected-react-router/immutable'
import transit from 'transit-immutable-js'
import App from './App'

let preloadedState
if (__BROWSER__ && window.__PRELOADED_STATE__) {
  // eslint-disable-line no-underscore-dangle
  preloadedState = transit.fromJSON(window.__PRELOADED_STATE__) // eslint-disable-line no-underscore-dangle
  delete window.__PRELOADED_STATE__ // eslint-disable-line no-underscore-dangle
}

const history = createBrowserHistory()
const store = configureStore(preloadedState, history)
const $root = document.getElementById('root')

if (!__TEST__) {
  if (__DEV__) {
    window.React = React
    window.store = store
    render(
      <AppContainer>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </Provider>
      </AppContainer>,
      $root
    )
  } else {
    render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
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
            <ConnectedRouter history={history}>
              <NextApp />
            </ConnectedRouter>
          </Provider>
        </AppContainer>,
        $root
      )
    })
  }
}
