import { registerEffect } from './effectRegistry'
import {
  fork as forkThread,
  call as callThread,
  cancel as cancelThread,
  hasThread
} from './threads'
import { subscribe } from './event'

const asyncSaga = 'AsyncSaga'

// dispatch action
export const PUT = `${asyncSaga}/PUT`
const runPut = (store, action) => Zone.current.get('store').dispatch(action)
export const put = registerEffect(PUT, runPut)

// returns promise for an action actionType
export const TAKE = `${asyncSaga}/TAKE`
const runTake = (store, actionType) => subscribe(actionType)
export const take = registerEffect(TAKE, runTake)

// Run task everytime an action matching the given actionType is dispatched
export const TAKE_EVERY = `${asyncSaga}/TAKE_EVERY`
const runTakeEvery = (store, actionType, task) => subscribe(actionType, task)
export const takeEvery = registerEffect(TAKE_EVERY, runTakeEvery)

// Run task everytime an action matching the given actionType is dispatched.
// If still running, cancel the previous task on a new match.
export const TAKE_LATEST = `${asyncSaga}/TAKE_LATEST`
const runTakeLatest = async (store, actionType, effect, ...args) => {
  let lastTask
  while (true) {
    await take(actionType)
    if (lastTask) {
      cancel(lastTask)
    }
    lastTask = forkThread({}, effect, ...args)
  }
}
export const takeLatest = registerEffect(TAKE_LATEST, runTakeLatest)

// async call tasks
export const CALL = `${asyncSaga}/CALL`
const runCall = (store, fn, ...args) => callThread({}, fn, ...args)
export const call = registerEffect(CALL, runCall)

// fork tasks
export const FORK = `${asyncSaga}/FORK`
const runFork = (store, fn, ...args) => forkThread({}, fn, ...args)
export const fork = registerEffect(FORK, runFork)

// cancel tasks
export const CANCEL = `${asyncSaga}/CANCEL`
const runCancel = (store, taskId) => cancelThread(taskId)
export const cancel = registerEffect(CANCEL, runCancel)
export const CANCELLED = `${asyncSaga}/CANCELLED`
const runCancelled = (store, taskId) => hasThread(taskId)
export const cancelled = registerEffect(CANCELLED, runCancelled)

// get state
export const SELECT = `${asyncSaga}/SELECT`
const runSelect = (store, selector, ...args) =>
  selector(store.getState(), ...args)
export const select = registerEffect(SELECT, runSelect)
