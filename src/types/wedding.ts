export type LocaleCode = 'es' | 'en'

export type LocalizedText = Record<LocaleCode, string>

export interface TimelineItem {
  id: string
  time: string
  title: LocalizedText
  description: LocalizedText
  icon: string
}

export interface FaqItem {
  id: string
  question: LocalizedText
  answer: LocalizedText
}

export interface WeddingConfig {
  couple: {
    person1: string
    person2: string
  }
  date: string
  intro: LocalizedText
  assets: {
    envelopeVideoUrl: string
    envelopeVideoOpenDelayMs: number
  }
  venue: {
    name: string
    address: string
    time: string
    mapUrl: string
    description: LocalizedText
  }
  timeline: TimelineItem[]
  rsvp: {
    deadline: string
  }
  faq: FaqItem[]
  gift: {
    message: LocalizedText
    accounts: {
      id: string
      holder: string
      iban: string
    }[]
  }
  footer: {
    message: LocalizedText
  }
}
