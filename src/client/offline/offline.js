const GO_ONLINE = '@offline/GO_ONLINE'
const GO_OFFLINE = '@offline/GO_OFFLINE'
const OFFLINE_READY = '@offline/OFFLINE_READY'
export const ONLINE = 'ONLINE'
export const OFFLINE = 'OFFLINE'

// Reducer
let initialStatus
if (__BROWSER__) {
  initialStatus = navigator.onLine ? ONLINE : OFFLINE
} else {
  initialStatus = ONLINE
}

const initialState = Immutable.Map({
  status: initialStatus,
  offlineReady: false
})

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case GO_ONLINE:
      return state.set('status', ONLINE)
    case GO_OFFLINE:
      return state.set('status', OFFLINE)
    case OFFLINE_READY:
      return state.set('offlineReady', true)
    default:
      return state
  }
}

// Action Creators
export function goOffline () {
  return { type: GO_OFFLINE }
}

export function goOnline () {
  return { type: GO_ONLINE }
}

export function offlineReady () {
  return { type: OFFLINE_READY }
}

export const offlineSelector = state => state.get('offline').toJS()
