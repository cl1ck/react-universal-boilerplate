import path from 'path'

const root = process.cwd()
const src = path.join(root, 'src')

export default {
  root,
  src,
  dev: path.join(root, 'dev'),
  babelCache: path.join(root, '.babel-cache'),
  dist: path.join(root, 'dist'),
  temp: path.join(root, 'temp'),
  client: path.join(src, 'client'),
  server: path.join(src, 'server'),
  common: path.join(src, 'common'),
  config: path.join(src, 'config'),
  assets: path.join(src, 'assets'),
  translations: path.join(src, 'translations')
}
