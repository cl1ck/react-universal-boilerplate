import MockStore from './MockStore'
import { createTask, spawn } from './threads'
import { getUniqueId, isFunction, isAsyncFunction } from './helpers'

export const runSaga = async (store, name, saga) => {
  if (!(store && store.dispatch)) {
    throw new Error('runSaga() requires a redux store as 1st argument.')
  }
  if (typeof name !== 'string') {
    throw new Error("runSaga() requires the saga's name as 2nd argument.")
  }
  if (!(isFunction(saga) || isAsyncFunction(saga))) {
    throw new Error('runSaga() requires a valid saga function as 3rd argument.')
  }

  const props = {
    store
  }
  const task = createTask(false, saga)
  try {
    await spawn(name, props, Zone.current, task, () => {})
  } catch (e) {
    console.log('saga error:', e)
  }
  console.log('runSaga done')
}

export const runSagas = (store, sagas) => {
  if (store === undefined) {
    throw new Error('runSagas() requires a redux store as first argument.')
  }
  if (!(sagas instanceof Array)) {
    throw new Error('runSagas() requires an array of sagas as 2nd argument.')
  }

  const tasks = {}
  Object.keys(sagas).forEach(name => {
    tasks[name] = runSaga(store, name, sagas[name])
  })
  return tasks
}

export const testSaga = (saga, state = {}) => {
  const id = getUniqueId('SagaTest')
  const store = new MockStore(state)
  const props = {
    store
  }
  const task = createTask(false, saga)
  const thread = spawn(id, props, Zone.current, task)
  console.log('testSaga')

  return {
    cancel: thread.cancel,
    store,
    thread
  }
}
