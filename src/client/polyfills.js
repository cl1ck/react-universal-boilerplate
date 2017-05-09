import 'core-js/es6/promise'

export default function polyfill () {
  const promises = []

  if (!window.fetch) {
    promises.push(import('whatwg-fetch'))
  }

  return Promise.all(promises)
}
