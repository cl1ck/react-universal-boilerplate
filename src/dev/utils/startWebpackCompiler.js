import webpack from 'webpack'
import { fork } from 'child_process'
import statsOptions from 'webpack/misc/stats'
import {
  addShutdownHandler,
  clearShutdownHandlers
} from 'common/process/shutdownHandler'

const restartDelayOnError = 5000
const restartDelayOnExit = 2000
const restartDelay = 1000

export default async (name, config, debugPort, log, onSuccess) =>
  new Promise(resolve => {
    const compiler = webpack(config)
    const compilerOptions = {
      aggregateTimeout: 300,
      poll: true
    }

    let child
    let initialBuild = true
    let restart
    const startChild = async () => {
      let stopChild

      // do not start twice
      if (child !== undefined) {
        log.info(`Bundle ${name} already running`)
        return
      }

      // restart on exit
      const closeHandler = () => {
        log.warn(
          `Bundle ${name} stopped unexpectedly. Restarting in ` +
            `${restartDelayOnExit} seconds.`
        )
        stopChild(true, restartDelayOnExit)
      }

      // restart on error
      const errorHandler = error => {
        log.warn(
          `Error in bundle ${name}: ${error}. Restarting in ` +
            `${restartDelayOnError} seconds.`
        )
        stopChild(true, restartDelayOnError)
      }

      // handle 'started' and 'reload' events
      const messageHandler = async msg => {
        if (msg === 'started' && initialBuild === true) {
          initialBuild = false
          log.info(`Initial build of bundle ${name} successfully completed.`)
          resolve()
          return
        }
        if (msg === 'reload') {
          stopChild(true, restartDelay)
        }
      }

      // stop child process
      stopChild = (restartWhenStopped = false, restartDelay = 1000) => {
        if (restart !== undefined) {
          clearTimeout(restart)
          restart = undefined
        }
        if (child !== undefined) {
          log.info(`Stopping bundle ${name}...`)
          child.removeListener('close', closeHandler)
          child.removeListener('error', errorHandler)
          child.removeListener('message', messageHandler)
          if (restartWhenStopped) {
            let initRestart = () => {
              restart = setTimeout(startChild, restartDelay)
              child.removeListener('close', initRestart)
              log.info(`Bundle ${name} stopped.`)
              child = undefined
            }
            child.addListener('close', initRestart)
          }
          child.kill()
        } else if (restartWhenStopped) {
          startChild()
        }
      }

      // start child
      log.info(`Starting bundle ${name}...`)
      const path = `${compiler.outputPath}/${config.output.filename}`
      try {
        child = fork(path, ['--color'], {
          execArgv: [`--debug=${debugPort}`], // todo: '--inspect'
          env: process.env,
          stdio: ['inherit', 'inherit', 'inherit', 'ipc']
        })
      } catch (e) {
        return errorHandler(e)
      }

      // event listeners
      child.on('message', messageHandler)
      child.on('error', errorHandler)
      child.on('close', closeHandler)

      // shutdown handler
      clearShutdownHandlers()
      addShutdownHandler(stopChild)
    }

    // run compiler in watch mode
    log.info(`Building bundle ${name}...`)
    compiler.watch(compilerOptions, async (err, stats) => {
      if (err) {
        log.error(`Error in bundle ${name}:\n${err}`)
        return
      }
      if (stats.hasErrors()) {
        log.error(
          `Error in bundle ${name}: \n` + `${stats.toString(statsOptions)}`
        )
        return
      }
      if (stats.hasWarnings()) {
        log.warn(
          `Warnings in bundle ${name}: \n` + `${stats.toString(statsOptions)}`
        )
        return
      }

      if (onSuccess) {
        await onSuccess()
      }

      // don't start server twice
      if (child !== undefined) {
        log.info(`Bundle ${name} updated.`)
        child.send('hotreload')
        return
      }
      startChild()
    })
  })
