import type { ComposerTranslation } from 'vue-i18n'

import type { AppLocale } from '@/i18n'
import type { LocalizedText } from '@/types/wedding'

export const getLocalizedText = (text: LocalizedText, locale: string): string =>
  text[(locale as AppLocale) || 'es'] ?? text.es

export const formatWeddingDate = (date: string, locale: string): string => {
  const dateLocale = locale === 'en' ? 'en-GB' : locale
  const dateFormatter = new Intl.DateTimeFormat(dateLocale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return dateFormatter.format(new Date(date))
}

export const translateOptional = (t: ComposerTranslation): string => `(${t('common.optional')})`
