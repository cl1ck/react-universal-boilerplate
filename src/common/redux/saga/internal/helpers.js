export const callbackToPromise = (fn, ...args) => {
  let done
  const p = new Promise(resolve => {
    done = resolve
  })
  fn(...args, done)
  return p
}

export const isFunction = fn =>
  fn && {}.toString.call(fn) === '[object Function]'

export const isAsyncFunction = fn =>
  fn && {}.toString.call(fn) === '[object AsyncFunction]'

const uniqueCounters = new Map()
export const getUniqueId = (prefix = 'id') => {
  if (!uniqueCounters.has(prefix)) {
    uniqueCounters.set(prefix, 0)
  }
  uniqueCounters.set(prefix, uniqueCounters.get(prefix) + 1)
  return `${prefix} #${uniqueCounters.get(prefix)}`
}

export const asPromise = (fn, ...args) => {
  // assure main task in fork is always a promise
  let promisedFn
  if (isAsyncFunction(fn)) {
    promisedFn = () => fn(...args)
  } else if (isFunction(fn)) {
    promisedFn = () => Promise.resolve(fn(...args))
  } else {
    if (args.length > 0) {
      throw new Error(
        'Provided function arguments to asPromise(), but fn is not a function'
      )
    }
    promisedFn = () => Promise.resolve(fn)
  }
  return promisedFn
}

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const getZoneContext = () => {
  const context = [Zone.current.name]
  let parent = Zone.current.parent
  while (parent) {
    context.push(parent.name)
    parent = parent.parent
  }
  return context
}
