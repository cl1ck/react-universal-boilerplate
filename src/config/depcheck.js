import depcheck from 'depcheck'
import paths from 'config/paths'

const aliases = /^(server|assets|client|common|config|types|dev|test)/

export function importAliasDetector (node) {
  if (node.type === 'ImportDeclaration' && node.source && node.source.value) {
    if (node.source.value.match(aliases)) {
      return [`${paths.src}/${node.source.value}`]
    }
    return [node.source.value]
  }
  return []
}

export function requireAliasDetector (node) {
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

export default {
  ignoreBinPackage: true,
  ignoreDirs: ['temp', 'dist', '.c9'],
  parsers: {
    '*.js': depcheck.parser.es7,
    '*.jsx': depcheck.parser.jsx
  },
  detectors: [importAliasDetector, requireAliasDetector],
  specials: [
    depcheck.special.eslint,
    depcheck.special.webpack,
    depcheck.special.babel
  ],
  ignoreMatches: [
    'babel-loader',
    'eslint-loader',
    'style-loader',
    'file-loader',
    'image-webpack-loader',
    'url-loader',
    'css-loader',
    'postcss-loader',
    'eslint-import-resolver-babel-module',
    'enzyme-to-json',
    'eventemitter2',
    'font-awesome',
    'normalize.css',
    'react-addons-test-utils'
  ]
}
