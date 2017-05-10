import paths from 'config/paths'

export default aliases => node => {
  if (
    node.type === 'CallExpression' &&
    node.callee &&
    node.callee.type === 'Identifier' &&
    node.callee.name === 'require' &&
    node.arguments[0] &&
    typeof node.arguments[0].value === 'string'
  ) {
    if (node.arguments[0].value.match(aliases)) {
      return [`${paths.src}/${node.arguments[0].value}`]
    }
    return [node.arguments[0].value]
  }
  return []
}
