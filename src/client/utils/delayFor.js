export default seconds => async () => {
  let finished
  const p = new Promise(resolve => {
    finished = resolve
  })
  setTimeout(finished, seconds)
  await p
}
