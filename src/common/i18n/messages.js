import { addLocaleData } from 'react-intl'
import { localeData, DEFAULT_LOCALE } from 'config/i18n'
import translations from 'translations'

addLocaleData(localeData)

export default function getMessages (language) {
  const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0]

  return translations[languageWithoutRegionCode] ||
    translations[language] ||
    translations[DEFAULT_LOCALE]
}
