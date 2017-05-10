import path from 'path'

const webpackConfigRegex = /webpack(\..+)?\.config\.(babel\.)?js/

function sanitizeLoader (loader) {
  const match = loader.match(/([^/?]+).*/)
  return match[1]
}

function parseRules (rules) {
  const loaders = []
  rules.forEach(rule => {
    if (typeof rule === 'string') {
      loaders.push(sanitizeLoader(rule))
    } else if (rule.loader) {
      loaders.push(sanitizeLoader(rule.loader))
    } else if (rule.use) {
      loaders.push(...parseRules(rule.use))
    } else {
      throw new Error(`Invalid rule ${JSON.stringify(rule)}`)
    }
  })
  return loaders
}

function parseWebpackConfig (configOrArray) {
  if (Array.isArray(configOrArray)) {
    const dependencies = []
    configOrArray.forEach(config => {
      const loaders = parseWebpackConfig(config)
      dependencies.push(...loaders)
    })
    return dependencies
  }

  const module = configOrArray.module || {}
  const rules = module.rules || []
  return parseRules(rules)
}

export default (content, filepath, deps) => {
  const filename = path.basename(filepath)
  if (webpackConfigRegex.test(filename)) {
    const config = require(filepath) // eslint-disable-line global-require
    return parseWebpackConfig(config)
  }
  return []
}
