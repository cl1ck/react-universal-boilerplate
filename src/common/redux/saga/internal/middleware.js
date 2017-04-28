import {runEffect, isEffect} from './effectRegistry'
import {emit} from './event'

// the main middleware
export default store => next => action => {
  if (isEffect(action)) {
    return runEffect(action, store)
  }

  const result = next(action)
  emit(action.type)
  emit('*')
  return result
}
