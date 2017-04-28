import fs from 'fs'
import path from 'path'
import paths from 'config/paths'

const babelrc = fs.readFileSync(path.join(paths.root, '.babelrc'))
const options = JSON.parse(babelrc)

// disable babel transform for es6 module
options.presets = options.presets.map(
  preset => (preset === 'es2015' ? ['es2015', {module: false}] : preset)
)
options.cacheDirectory = true

export default options
