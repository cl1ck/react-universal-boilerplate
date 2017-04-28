const subscribers = new Map()

export const hasSubscribers = () => subscribers.size > 0
const UNSUBSCRIBE = Symbol('UNSUBSCRIBE')

export const subscribe = async (type, effect = null, subscribeOnce = false) => {
  console.log('subscribe', type)
  if (!subscribers.has(type)) {
    subscribers.set(type, new Set())
  }
  const channel = subscribers.get(type)

  // async subscription handler
  let subscriptionActive = true
  while (subscriptionActive) {
    let trigger
    const hasBeenTriggered = new Promise(resolve => {
      trigger = resolve
    })
    channel.add(trigger)
    const result = await hasBeenTriggered
    channel.delete(trigger)
    if (result === UNSUBSCRIBE || subscribeOnce) {
      subscriptionActive = false
    }
    if (result !== UNSUBSCRIBE) {
      effect(type)
    }
  }
  console.log(`has been unsubscribed ${type}`)
}

export const unsubscribe = type => {
  const channel = subscribers.get(type)
  if (channel) {
    channel.forEach(subscriber => subscriber(UNSUBSCRIBE))
  }
}

const buffer = []
let flushing
const flush = () => {
  const type = buffer.shift()

  // trigger regular subscribers
  const channel = subscribers.get(type)
  if (channel) {
    channel.forEach(subscriber => subscriber(type))
  }

  flushing = false
  if (buffer.length > 0) {
    flushing = setTimeout(flush, 0)
  }
}

export const emit = type => {
  buffer.push(type)
  if (!flushing) {
    flushing = setTimeout(flush, 0)
  }
}
