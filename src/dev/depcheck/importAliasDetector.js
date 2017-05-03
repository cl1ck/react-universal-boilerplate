export default aliases => (node) => {
  if (node.type === 'ImportDeclaration' && node.source && node.source.value) {
    if (node.source.value.match(aliases)) {
      return [`${paths.src}/${node.source.value}`]
    }
    return [node.source.value]
  }
  return []
}
