import {compose} from 'redux'
import {redux as log} from 'common/log'

class DispatchBlockedException extends Error {
  constructor (message) {
    super(message)
    this.name = 'DispatchBlockedException'
  }
}

// rejects fx actions that are not currently defined by an active <FX />
const throwableFxBlockingMiddleware = throwOnError => store => next =>
action => {
  if (
    action.meta &&
    action.meta.fx &&
    !store.getState().hasIn(['fx', action.type])
  ) {
    log.debug(`blocked unavailable fx ${action.type}`)
    if (throwOnError) {
      throw new DispatchBlockedException(
        `blocked unavailable fx ${action.type}`
      )
    }
    return null
  }
  return next(action)
}

const fxBlockingMiddleware = throwableFxBlockingMiddleware(false)

// handles async actions
const fxAsyncMiddleware = store => next => async action => {
  if (!action.meta || !action.meta.async) {
    return next(action)
  }

  // immediate action
  const immediateAction = {
    type: action.type,
    payload: action.payload
  }
  let result = next(immediateAction)

  // Create new dispatch() that throws an exception,
  // when trying to dispatch a rejected action.
  // This allows to terminate async actions early.
  const dispatch = throwableFxBlockingMiddleware(true)(store)(action => {
    store.dispatch(action)
  })

  try {
    result = await action.meta.async(dispatch)
  } catch (e) {
    if (e.name !== 'DispatchBlockedException') {
      throw e
    }
  }
  return result
}

// takes actions and dispatches fx defined by <FXAdapter />
const fxMappingsMiddleware = store => next => action => {
  const state = store.getState()
  if (state.hasIn(['mappings', action.type])) {
    const targets = state.getIn(['mappings', action.type])
    targets.forEach(target => {
      if (state.hasIn(['fx', target])) {
        const targetAction = {
          ...action,
          type: target,
          meta: {
            ...(action.meta ? action.meta : {}),
            fx: true
          }
        }
        log.debug(`mapping action ${action.type} to fx ${target}`)
        store.dispatch(targetAction)
      }
    })
  }
  return next(action)
}

// silently ignores any action defined by <FXIgnore />
const fxIgnoreMiddleware = store => next => action => {
  // reject blocked actions
  const state = store.getState()
  if (state.hasIn(['ignores', action.type])) {
    log.debug(`ignoring action ${action.type}`)
    return null
  }
  return next(action)
}

// combine all fx middlewares
const combinedMiddleware = store => next => {
  const middlewares = [
    fxIgnoreMiddleware,
    fxMappingsMiddleware,
    fxBlockingMiddleware,
    fxAsyncMiddleware
  ]
  const chain = middlewares.map(middleware => middleware(store))
  return compose(...chain)(next)
}

export default combinedMiddleware
