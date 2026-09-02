import { createI18n } from 'vue-i18n'

import en from './locales/en'
import es from './locales/es'

export const availableLocales = ['es', 'en'] as const
export type AppLocale = (typeof availableLocales)[number]

export const languageStorageKey = 'wedding-language'

const defaultLocale: AppLocale = 'es'

const isAppLocale = (locale: string | null): locale is AppLocale =>
  availableLocales.includes(locale as AppLocale)

const getInitialLocale = (): AppLocale => {
  if (typeof window === 'undefined') {
    return defaultLocale
  }

  const storedLocale = window.localStorage.getItem(languageStorageKey)

  return isAppLocale(storedLocale) ? storedLocale : defaultLocale
}

export const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: defaultLocale,
  messages: {
    es,
    en,
  },
})

export const setAppLocale = (locale: AppLocale) => {
  i18n.global.locale.value = locale

  if (typeof document !== 'undefined') {
    document.documentElement.lang = locale
  }

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(languageStorageKey, locale)
  }
}

setAppLocale(i18n.global.locale.value as AppLocale)
