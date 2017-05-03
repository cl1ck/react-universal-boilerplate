import chalk from 'chalk'
import createLogger from 'common/log/createLogger'

// green
export const dev = createLogger('dev', chalk.green)
export const client = createLogger('client', chalk.dim.green)

// cyan
export const server = createLogger('server', chalk.cyan)
export const reactServer = createLogger('server:react', chalk.cyan)
export const socketio = createLogger('socketio', chalk.dim.cyan)
export const redux = createLogger('redux', chalk.cyan)

// yellow
export const eslint = createLogger('eslint', chalk.yellow)
export const jest = createLogger('jest', chalk.yellow)
export const depcheck = createLogger('depcheck', chalk.yellow)
export const test = createLogger('test', chalk.dim.yellow)

// blue
export const browsersync = createLogger('browsersync', chalk.blue)
export const rethinkdb = createLogger('rethinkdb', chalk.bold.blue)
export const script = createLogger('script', chalk.dim.blue)

// magenta
export const hmr = createLogger('hmr', chalk.magenta)

// white

// black
