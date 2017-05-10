import { isEffect } from './effectRegistry'
import { spawn, createTask } from './threads'
import { getUniqueId } from './helpers'

class PromiseChain {
  chain = []

  add = async effect => {
    let r
    const p = new Promise(resolve => {
      r = resolve
    })
    this.chain.push({
      resolve: r,
      effect
    })
    return p
  }

  next = value => {
    console.log('next')
    const el = this.chain.shift()
    el.resolve(value)
    return el.effect
  }
}

export default class MockStore {
  actions = []
  effects = []
  state

  constructor (state = {}) {
    this.state = state
    this.chain = new PromiseChain()
  }

  dispatchEffect = async effect => {
    console.log(`dispatch ${effect.type}`)
    this.effects.push(effect)

    const task = createTask(false, this.chain.add, effect)
    return spawn(getUniqueId('MockEffect'), {}, Zone.current, task)
  }

  dispatch = action => {
    if (isEffect(action)) {
      return this.dispatchEffect(action)
    } else {
      this.actions.push(action)
    }
  }

  getState () {
    return this.state
  }

  reset () {
    this.actions = []
    this.effects = []
  }

  getActions () {
    return this.actions
  }

  hadAction (action) {
    return this.actions.indexOf(action) !== -1
  }

  getEffects () {
    return this.effects
  }

  hadEffect (effect) {
    return this.effects.indexOf(effect) !== -1
  }

  next (value) {
    return this.chain.next(value)
  }
}
