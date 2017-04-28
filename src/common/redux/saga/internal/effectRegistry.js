import {sync} from './threads'

export const IO = Symbol('IO')

// create effect of given type
const createEffect = (type, effectRunner) => {
  const createAction = (...payload) => ({
    type,
    payload,
    meta: {
      [IO]: true
    }
  })

  const dispatch = (...payload) => {
    if (Zone.current.get('store') === undefined) {
      throw new Error(
        `Unable to dispatch effect ${type}: ` +
          `Effects are only available within sagas, ` +
          `but current zone is ${Zone.current.name}`
      )
    }
    sync()
    const action = createAction(...payload)
    // const task = createTask(false, Zone.current.get('store').dispatch, action)
    // return spawn(getUniqueId('effect'), {}, Zone.current, task)
    return Zone.current.get('store').dispatch(action)
  }

  dispatch.create = createAction
  dispatch.run = effectRunner
  return dispatch
}

// register effect and returns effect dispatcher
const registeredEffects = new Map()
export const registerEffect = (type, effectRunner) => {
  if (registeredEffects.has(type)) {
    throw new Error(`Effect ${type} already registered`)
  }
  const effect = createEffect(type, effectRunner)
  registeredEffects.set(type, effect)
  return effect
}

export const runEffect = (action, store) => {
  console.log(`running ${action.type}`)
  if (!registeredEffects.has(action.type)) {
    throw new Error(`Effect ${action.type} not registered`)
  }

  const effect = registeredEffects.get(action.type)
  return effect.run(store, ...action.payload)
}

export const isEffect = action => action.meta && action.meta[IO]
