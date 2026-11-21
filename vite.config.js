import { defineConfig } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

const localesDir = path.resolve(__dirname, 'locales')
const criticalCssPath = path.resolve(__dirname, 'src', 'critical.css')
const distDir = path.resolve(__dirname, 'dist')

const injectCriticalCSS = () => {
  const cssPath = criticalCssPath
  const htmlPath = path.resolve(distDir, 'index.html')
  if (!fs.existsSync(cssPath) || !fs.existsSync(htmlPath)) {
    return
  }

  const css = fs.readFileSync(cssPath, 'utf-8')
  const html = fs.readFileSync(htmlPath, 'utf-8')

  const minifiedCritical = css
    .replace(/\s+/g, ' ')
    .replace(/;}/g, '}')
    .replace(/\s*{\s*/g, '{')
    .replace(/\s*\}\s*/g, '}')
    .replace(/@media/g, '@media')

  const htmlWithCritical = html.replace(
    '<head>',
    `<head><style>${minifiedCritical}</style>`
  )
  fs.writeFileSync(htmlPath, htmlWithCritical, 'utf-8')
  console.log('Critical CSS injected into dist/index.html')
}

export default defineConfig({
  plugins: [
    {
      name: 'i18n-injector',
      enforce: 'pre',
      resolveId(source) {
        if (source === 'virtual:i18n-translations') {
          return source
        }
        return null
      },
      load(id) {
        if (id === 'virtual:i18n-translations') {
          const translations = {}
          const localeFiles = fs
            .readdirSync(localesDir)
            .filter((f) => f.endsWith('.json'))
          for (const file of localeFiles) {
            const lang = file.replace('.json', '')
            const content = fs.readFileSync(
              path.join(localesDir, file),
              'utf-8'
            )
            translations[lang] = JSON.parse(content)
          }
          return `export const translations = ${JSON.stringify(translations, null, 2)};`
        }
        return null
      }
    },
    {
      name: 'critical-css-auto',
      enforce: 'post',
      closeBundle: injectCriticalCSS
    }
  ]
})
