/* eslint-disable no-console */
import rightpad from 'right-pad'
import moment from 'moment'
import chalk from 'chalk'
import logConfig from 'config/log'

function getDateTime () {
  return moment().format(logConfig.dateTimeFormat)
}

export default (context, formatter, padding = 12) => options => {
  const lines = options.message.split('\n')
  const lastLine = lines.pop()
  if (lastLine !== '') {
    lines.push(lastLine)
  }

  const title =
    `${chalk.dim.gray(getDateTime())} ` +
    `${formatter(rightpad(context, padding, ' '))}`

  if (lines.length > 1) {
    return `${formatter(rightpad('─', process.stdout.columns - 1, '─'))}
${title}
${lines.join('\n')}
${formatter(rightpad('─', process.stdout.columns - 1, '─'))}`
  }

  return `${title} ${lines[0]}`
}
