import paths from 'config/paths'

export default {
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  enforceExtension: false,
  modules: [paths.src, 'node_modules']
}
