import { translations } from 'virtual:i18n-translations'

const DEFAULT_LANG = 'en'
const SUPPORTED_LANGS = ['en', 'es']

export const getTranslation = (lang, key) => {
  const dictionary = translations[lang] ?? translations.en
  return dictionary[key] ?? translations.en[key] ?? key
}

export const readInitialLanguage = () => {
  try {
    const params = new URLSearchParams(window.location.search)
    const langParam = params.get('lang')
    if (langParam && SUPPORTED_LANGS.includes(langParam)) {
      storeLanguage(langParam)
      return langParam
    }
  } catch {
    // ignore URL parsing errors
  }
  return readStoredLanguage()
}

export const readStoredLanguage = () => {
  try {
    const stored = window.localStorage.getItem('site-lang')
    return SUPPORTED_LANGS.includes(stored) ? stored : DEFAULT_LANG
  } catch {
    return DEFAULT_LANG
  }
}

export const storeLanguage = (lang) => {
  try {
    window.localStorage.setItem('site-lang', lang)
    return true
  } catch {
    return false
  }
}

export { DEFAULT_LANG, SUPPORTED_LANGS }
