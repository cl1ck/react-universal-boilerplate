import depcheck from 'depcheck'
import paths from 'config/paths'
import requireAliasDetector from 'dev/depcheck/requireAliasDetector'
import importAliasDetector from 'dev/depcheck/importAliasDetector'
import webpack2Special from 'dev/depcheck/webpack2Special'

const aliases = /^(assets|client|common|config|dev|server|test|webpack)/

export default {
  ignoreBinPackage: true,
  ignoreDirs: ['temp', 'dist', '.c9'],
  parsers: {
    '*.js': depcheck.parser.es7,
    '*.jsx': depcheck.parser.jsx
  },
  detectors: [
    importAliasDetector(aliases),
    requireAliasDetector(aliases)
  ],
  specials: [
    depcheck.special.eslint,
    webpack2Special,
    depcheck.special.babel,
    depcheck.special.mocha
  ],
  ignoreMatches: [
  ]
}
