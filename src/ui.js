import {
  getTranslation,
  readInitialLanguage,
  storeLanguage,
  DEFAULT_LANG,
  SUPPORTED_LANGS
} from './i18n.js'

const readScrollPosition = () => ({
  windowY: window.scrollY,
  documentTop: document.scrollingElement?.scrollTop ?? 0,
  mainTop: document.querySelector('main')?.scrollTop ?? 0
})

const restoreScrollPosition = ({ windowY, documentTop, mainTop }) => {
  const root = document.documentElement
  const previousBehavior = root.style.scrollBehavior

  // Force an instant restore even when CSS smooth scrolling is enabled.
  root.style.scrollBehavior = 'auto'
  window.scrollTo(0, windowY)
  if (document.scrollingElement) {
    document.scrollingElement.scrollTop = documentTop
  }

  const main = document.querySelector('main')
  if (main) main.scrollTop = mainTop

  root.style.scrollBehavior = previousBehavior
}

const applyLanguage = (lang) => {
  const nextLang = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG
  const scrollPosition = readScrollPosition()

  document.documentElement.lang = nextLang
  document.title = getTranslation(nextLang, 'meta.title')

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n
    if (!key) return
    element.textContent = getTranslation(nextLang, key)
  })

  document.querySelectorAll('[data-i18n-content]').forEach((element) => {
    const key = element.dataset.i18nContent
    if (!key) return
    element.setAttribute('content', getTranslation(nextLang, key))
  })

  document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
    const key = element.dataset.i18nAriaLabel
    if (!key) return
    element.setAttribute('aria-label', getTranslation(nextLang, key))
  })

  document.querySelectorAll('.lang-option').forEach((button) => {
    const isActive = button.dataset.lang === nextLang
    button.setAttribute('aria-pressed', String(isActive))
  })

  restoreScrollPosition(scrollPosition)
}

const setupLanguageToggle = () => {
  document.querySelectorAll('.lang-option').forEach((button) => {
    button.addEventListener('click', () => {
      const lang = button.dataset.lang
      if (!SUPPORTED_LANGS.includes(lang)) return
      applyLanguage(lang)
      storeLanguage(lang)
    })
  })
}

export const init = () => {
  applyLanguage(readInitialLanguage())
  setupLanguageToggle()
}
