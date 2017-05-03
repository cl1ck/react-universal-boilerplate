export default function polyfill() {
  const promises = []

  // eslint-disable-next-line no-underscore-dangle
  if (!window._babelPolyfill) {
    promises.push(import('babel-polyfill'))
  }

  if (!window.fetch) {
    promises.push(import('whatwg-fetch'))
  }

  if (!window.Intl) {
    promises.push(import('intl'))
  }

  return Promise.all(promises)
}