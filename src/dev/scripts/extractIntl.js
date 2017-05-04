import fs from 'mz/fs'
import { script as log } from 'common/log'
import paths from 'config/paths'
import { transform } from 'babel-core'
import glob from 'glob-promise'
import babelrc from 'common/babel/babelrc'
import { locales, DEFAULT_LOCALE } from 'client/i18n'
import ProgressBar from 'progress'

const SOURCE_FILES = `${paths.src}/**/!(*.spec).{js,jsx}`

const loadExistingMappings = async (locale, mappings, bar) => {
  const translationFileName = `${paths.translations}/${locale}.json`

  try {
    // parse existing files
    const content = await fs.readFile(translationFileName)
    const messages = JSON.parse(content)
    Object.keys(messages).forEach((key) => {
      mappings[key] = messages[key]
    })
  } catch (e) {
    if (e.code !== 'ENOENT') {
      bar.interrupt(
        'Error loading translation file ' +
        `${translationFileName}\n${e.message}`
      )
    }
  }
  bar.tick({
    item: locale
  })
}

const extractFromFile = async (fileName, mappings, localesToMap, bar) => {
  bar.tick({
    item: fileName.replace(paths.root, '')
  })
  try {
    const code = await fs.readFile(fileName)

    // Use babel-plugin-react-intl to extract messages
    const { metadata } = await transform(code, babelrc)
    const messages = metadata['react-intl'].messages

    messages.forEach((message) => {
      localesToMap.forEach((locale) => {
        if (mappings[locale][message.id]) {
          return
        }

        mappings[locale][message.id] = locale === DEFAULT_LOCALE
          ? message.defaultMessage
          : ''
      })
    })
  } catch (e) {
    log.error(`Error transforming file: ${fileName}\n${e.message}`)
  }
  bar.tick({
    item: fileName.replace(paths.root, '')
  })
}

const writeMessages = async (locale, mappings, bar) => {
  const translationFileName = `${paths.translations}/${locale}.json`

  // Sort JSON output
  const messages = {}
  Object.keys(mappings).sort().forEach((key) => {
    messages[key] = mappings[key]
  })

  // write output
  const json = `${JSON.stringify(messages, null, 2)}\n`
  await fs.writeFile(translationFileName, json)
  bar.tick({
    item: locale
  })
}

(async function main() {
  babelrc.plugins.push(['react-intl'])

  const localeMappings = []
  locales.forEach((locale) => {
    localeMappings[locale] = {}
  })

  const files = await glob(SOURCE_FILES)

  // load existing locales
  try {
    let bar = new ProgressBar(
      'Loading existing messages       [:bar] (:item)',
      {
        total: locales.length,
        width: 50
      }
    )
    await Promise.all(locales.map(
      locale => loadExistingMappings(locale, localeMappings[locale], bar)
    ))

    bar = new ProgressBar(
      'Extracting messages from source [:bar] (:item)',
      {
        total: files.length * 2,
        width: 50
      }
    )

    // extract source files
    await Promise.all(files.map(fileName => extractFromFile(
      fileName, localeMappings, locales, bar
    )))

    bar = new ProgressBar(
      'Writing messages                [:bar] (:item)',
      {
        total: locales.length,
        width: 50
      }
    )

    // write messages
    await Promise.all(locales.map(
      locale => writeMessages(locale, localeMappings[locale], bar)
    ))
  } catch (e) {
    throw e
  }

  // write index file
  const indexFileName = `${paths.translations}/index.js`
  const localeImports = locales.map(
    locale => `import ${locale} from './${locale}.json'`
  ).join('\n')
  const localeExports = '\nexport default {\n' +
    locales.map(locale => `  ${locale}`).join(',\n') +
    '\n}\n'
  await fs.writeFile(indexFileName, `${localeImports}\n${localeExports}`)
  process.exit()
}())
