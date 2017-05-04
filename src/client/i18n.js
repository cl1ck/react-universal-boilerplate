import enData from 'react-intl/locale-data/en'
import deData from 'react-intl/locale-data/de'
import frData from 'react-intl/locale-data/fr'
import itData from 'react-intl/locale-data/it'

if (!window.Intl) {
  import('intl')
  import('intl/locale-data/jsonp/en.js')
  import('intl/locale-data/jsonp/de.js')
  import('intl/locale-data/jsonp/fr.js')
  import('intl/locale-data/jsonp/it.js')
}

export const localeData = [...enData, ...deData, ...frData, ...itData]
export const locales = ['en', 'de', 'fr', 'it']
export const DEFAULT_LOCALE = locales[0]
