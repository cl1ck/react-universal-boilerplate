import path from 'path'

const root = process.cwd()
const src = path.join(root, 'src')

export default {
  root,
  src,
  dev: path.join(root, 'dev'),
  cache: path.join(root, '.cache'),
  dist: path.join(root, 'dist'),
  temp: path.join(root, 'temp'),
  logs: path.join(root, 'logs'),
  client: path.join(src, 'client'),
  server: path.join(src, 'server'),
  common: path.join(src, 'common'),
  config: path.join(src, 'config'),
  assets: path.join(src, 'assets'),
  translations: path.join(src, 'translations')
}
