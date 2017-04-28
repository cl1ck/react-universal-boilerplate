export default function callbackPromise () {
  let callback
  const promise = new Promise(resolve => {
    callback = resolve
  })

  return {
    promise,
    callback
  }
}
