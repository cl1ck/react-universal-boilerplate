export default (milliseconds, chance) => async () => {
  let finished
  const p = new Promise(resolve => {
    finished = resolve
  })
  setTimeout(finished, milliseconds)
  await p
  if (Math.random() > 1 - chance) {
    throw new Error('Async test error')
  }
}
