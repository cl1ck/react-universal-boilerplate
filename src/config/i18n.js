import enData from 'react-intl/locale-data/en'
import deData from 'react-intl/locale-data/es'
import frData from 'react-intl/locale-data/fr'
import itData from 'react-intl/locale-data/it'

export const localeData = [...enData, ...deData, ...frData, ...itData]
export const locales = ['en', 'de', 'fr', 'it']
export const DEFAULT_LOCALE = locales[0]
