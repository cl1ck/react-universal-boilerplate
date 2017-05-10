/* global __BROWSER__, __DEV__ */
import { createStore, applyMiddleware, compose } from 'redux'
import { combineReducers } from 'redux-immutable'
import { persistState } from 'redux-devtools'
import {
  connectRouter,
  routerMiddleware
} from 'connected-react-router/immutable'
import DevTools from 'client/components/DevTools'
import getSocketConnection from 'client/socket/getSocketConnection'
import * as appReducers from 'client/modules'
import socketMiddleware from 'common/redux/socket/middleware'
import offlineReducer from 'client/offline/offline'
import {
  middleware as fxMiddleware,
  reducers as fxReducers
} from 'common/redux/fx'

export default function configureStore (preloadedState, history) {
  const enhancers = []
  const middlewares = [fxMiddleware]

  // socket connection
  if (__BROWSER__) {
    middlewares.push(socketMiddleware(getSocketConnection()))
  }

  // dev tools
  if (__BROWSER__ && __DEV__) {
    // Redux dev tools
    if (
      typeof window === 'object' &&
      typeof window.devToolsExtension !== 'undefined'
    ) {
      enhancers.push(window.devToolsExtension())
    } else {
      enhancers.push(DevTools.instrument())
    }
  }

  // browser history
  if (__BROWSER__) {
    middlewares.push(routerMiddleware(history))
    enhancers.push(
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )
  }

  // compose middleware
  const rootEnhancer = compose(applyMiddleware(...middlewares), ...enhancers)
  const reducers = {
    ...appReducers,
    ...fxReducers,
    offline: offlineReducer
  }
  let rootReducer = combineReducers(reducers)
  if (__BROWSER__) {
    rootReducer = connectRouter(history)(rootReducer)
  }
  const store = createStore(rootReducer, preloadedState, rootEnhancer)

  // hot reload reducers
  if (module.hot) {
    module.hot.accept('./modules', () => {
      const { reducers: nextReducers } = require('./modules') // eslint-disable-line
      const nextCombinedReducer = combineReducers({
        ...nextReducers
      })
      const nextRootReducer = connectRouter(history)(nextCombinedReducer)
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
