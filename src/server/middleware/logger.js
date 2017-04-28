import passthroughCounter from 'passthrough-counter'
import humanize from 'humanize-number'
import bytes from 'bytes'
import chalk from 'chalk'
import logConfig from 'config/log'

const colorCodes = {
  5: 'red',
  4: 'yellow',
  3: 'cyan',
  2: 'green',
  1: 'green'
}

export default function (log, logOutput = false) {
  /**
   * Humanize response time
   */
  function time (start) {
    let delta = new Date() - start
    delta = delta < 10000 ? `${delta}ms` : `${Math.round(delta / 1000)}s`
    return humanize(delta)
  }

  function logResponse (ctx, start, len, err, event) {
    const status = err ? err.status || 500 : ctx.status || 404

    // status color
    const s = (status / 100) | 0 // eslint-disable-line no-bitwise
    const color = colorCodes[s]

    // response length
    let length
    if (~[204, 205, 304].indexOf(status)) {
      // eslint-disable-line no-bitwise
      length = ''
    } else if (len === null) {
      length = '-'
    } else {
      length = bytes(len)
    }

    let upstream
    if (err) {
      upstream = chalk.red('xxx')
    } else if (event === 'close') {
      upstream = chalk.yellow('-x-')
    } else {
      upstream = chalk.gray('-->')
    }

    log.info(
      `${upstream} ${chalk.bold(ctx.method)} ${chalk.gray(ctx.originalUrl)} ` +
        `${chalk[color](status)} ${chalk.gray(time(start))} ` +
        `${chalk.gray(length)}`
    )

    if (logOutput && ctx.body) {
      const response = ctx.body.toString('utf8')
      log.debug('Response:', `>>>${response}<<<`)
    }
  }

  return async function loggerMiddleware (ctx, next) {
    if (
      ctx.query.nolog ||
      logConfig.filterRequests.some(filterMatch =>
        ctx.originalUrl.match(filterMatch)
      )
    ) {
      await next()
      return
    }

    const start = new Date()

    try {
      await next()
    } catch (err) {
      if (!ctx.forwarded) {
        log.info(
          `${chalk.gray('<--')} ${chalk.bold(ctx.method)} ` +
            `${chalk.gray(ctx.originalUrl)}`
        )
        logResponse(ctx, start, null, err)
      }
      throw err
    }

    if (ctx.forwarded) {
      return
    }

    // log request
    log.info(
      `${chalk.gray('<--')} ${chalk.bold(ctx.method)} ` +
        `${chalk.gray(ctx.originalUrl)}`
    )

    // log when the response is finished or closed:

    // calculate the length of a streaming response
    const length = ctx.response.length
    let counter
    if (length === null && ctx.body && ctx.body.readable) {
      ctx.body = ctx.body
        .pipe((counter = passthroughCounter()))
        .on('error', ctx.onerror)
    }

    let onfinish
    let onclose

    function done (event) {
      ctx.res.removeListener('finish', onfinish)
      ctx.res.removeListener('close', onclose)
      logResponse(ctx, start, counter ? counter.length : length, null, event)
    }

    onfinish = done.bind(null, 'finish')
    onclose = done.bind(null, 'close')

    ctx.res.once('finish', onfinish)
    ctx.res.once('close', onclose)
  }
}
