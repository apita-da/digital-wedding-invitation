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
  dressCode: {
    title: LocalizedText
    description: LocalizedText
    recommendations: LocalizedText[]
  }
  faq: FaqItem[]
  gift: {
    message: LocalizedText
    iban: string
    bizum: string
  }
  footer: {
    message: LocalizedText
  }
}
