import './style.css'

const STORAGE_KEY = 'site-lang'
const DEFAULT_LANG = 'en'
const SUPPORTED_LANGS = ['en', 'es']

const translations = {
  en: {
    'meta.title': 'Felipe Mariño — Senior Software Engineer',
    'meta.description':
      'Senior software engineer with 10+ years building and scaling software solutions, connecting product engineering with modern technologies and AI.',
    'meta.og_locale': 'en_US',
    'brand.name': 'Geduma',
    'lang.toggle.label': 'Language',
    'lang.toggle.en': 'EN',
    'lang.toggle.es': 'ES',
    'hero.name_role': 'Felipe Mariño — Senior Software Engineer',
    'hero.bio':
      '10+ years building and scaling software solutions. Today I specialize in connecting product engineering with modern technologies and Artificial Intelligence to accelerate business ideas and innovative models.',
    'hero.cta_primary': "Let's talk",
    'profile.nav_label': 'Profiles',
    'profile.linkedin': 'LinkedIn',
    'profile.github': 'GitHub',
    'a11y.new_tab': 'Opens in a new tab',
    'apps.section.title': 'Projects & Experiments',
    'apps.section.intro': 'Things I build and explore.',
    'apps.status.active': 'Active',
    'apps.snippet.name': 'Snippet Vault',
    'apps.snippet.desc':
      'A curated space to store, organize, and reuse code snippets when you need them.',
    'apps.snippet.cta': 'Open Snippet Vault',
    'apps.editor.name': 'Online Code Editor',
    'apps.editor.desc':
      'A lightweight browser editor to write, run, and experiment with code without leaving the tab.',
    'apps.editor.cta': 'Open Online Code Editor',
    'apps.vertida.name': 'Vertida',
    'apps.vertida.desc':
      'Brew specialty coffee at home with guided recipes and a phase-by-phase timer, fully offline.',
    'apps.vertida.cta': 'Open Vertida',
    'apps.gnotes.name': 'GNotes',
    'apps.gnotes.desc':
      'Minimalist, fast, self-hosted notes with a WYSIWYG editor, search across titles, bodies, and tags, offline-first storage, and optional OAuth sync.',
    'apps.gnotes.cta': 'Open GNotes',
    'consulting.section.title': 'Consulting',
    'consulting.context':
      "If you have a business idea, are building a startup, or want a technical perspective on integrating Artificial Intelligence into your workflows, let's talk. I enjoy collaborating selectively with curious minds and founders who want to build with strong technical judgment.",
    'consulting.cta.contact': 'Email me',
    'consulting.status': 'Coming soon',
    'consulting.antispam':
      "Prefer to write directly? Send me an email with a brief description of your idea or project and I'll get back to you as soon as possible.",
    'consulting.identity_filter':
      'You can also reach out via LinkedIn for identity verification.',
    'footer.byline': '@geduma'
  },
  es: {
    'meta.title': 'Felipe Mariño — Senior Software Engineer',
    'meta.description':
      'Ingeniero de software senior con más de 10 años creando y escalando soluciones, conectando ingeniería de producto con tecnologías modernas e IA.',
    'meta.og_locale': 'es_ES',
    'brand.name': 'Geduma',
    'lang.toggle.label': 'Idioma',
    'lang.toggle.en': 'EN',
    'lang.toggle.es': 'ES',
    'hero.name_role': 'Felipe Mariño — Senior Software Engineer',
    'hero.bio':
      'Más de 10 años creando y escalando soluciones de software. Hoy me especializo en conectar la ingeniería de producto con tecnologías modernas e Inteligencia Artificial para acelerar ideas de negocio y modelos innovadores.',
    'hero.cta_primary': 'Hablemos',
    'profile.nav_label': 'Perfiles',
    'profile.linkedin': 'LinkedIn',
    'profile.github': 'GitHub',
    'a11y.new_tab': 'Se abre en una pestaña nueva',
    'apps.section.title': 'Proyectos y Experimentos',
    'apps.section.intro': 'Cosas que construyo y exploro.',
    'apps.status.active': 'Activo',
    'apps.snippet.name': 'Snippet Vault',
    'apps.snippet.desc':
      'Un espacio curado para guardar, organizar y reutilizar fragmentos de código cuando los necesites.',
    'apps.snippet.cta': 'Abrir Snippet Vault',
    'apps.editor.name': 'Editor de código',
    'apps.editor.desc':
      'Un editor ligero en el navegador para escribir, ejecutar y experimentar con código sin salir de la pestaña.',
    'apps.editor.cta': 'Abrir editor de código',
    'apps.vertida.name': 'Vertida',
    'apps.vertida.desc':
      'Prepara café de especialidad en casa con recetas guiadas y un temporizador por fases, totalmente offline.',
    'apps.vertida.cta': 'Abrir Vertida',
    'apps.gnotes.name': 'GNotes',
    'apps.gnotes.desc':
      'Notas minimalistas, rápidas y autoalojadas con editor WYSIWYG, búsqueda en títulos, contenido y etiquetas, almacenamiento offline-first y sincronización OAuth opcional.',
    'apps.gnotes.cta': 'Abrir GNotes',
    'consulting.section.title': 'Asesoría y Consultoría',
    'consulting.context':
      'Si tienes una idea de negocio, estás estructurando una startup o buscas una perspectiva técnica sobre cómo integrar Inteligencia Artificial en tus flujos de trabajo, hablemos. Disfruto colaborar puntualmente con mentes curiosas y fundadores que buscan construir con criterio técnico.',
    'consulting.cta.contact': 'Envíame un correo',
    'consulting.status': 'Próximamente',
    'consulting.antispam':
      '¿Prefieres escribir directo? Envíame un correo con una breve descripción de tu idea o proyecto y te responderé lo antes posible.',
    'consulting.identity_filter':
      'También puedes contactarme por LinkedIn como filtro de identidad.',
    'footer.byline': '@geduma'
  }
}

const getTranslation = (lang, key) => {
  const dictionary = translations[lang] ?? translations[DEFAULT_LANG]
  return dictionary[key] ?? translations[DEFAULT_LANG][key] ?? key
}

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

const readStoredLanguage = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return SUPPORTED_LANGS.includes(stored) ? stored : DEFAULT_LANG
  } catch {
    return DEFAULT_LANG
  }
}

const storeLanguage = (lang) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang)
    return true
  } catch {
    return false
  }
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

const init = () => {
  applyLanguage(readStoredLanguage())
  setupLanguageToggle()
}

init()
