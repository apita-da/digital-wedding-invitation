import type { WeddingConfig } from '@/types/wedding'

export const weddingConfig: WeddingConfig = {
  couple: {
    person1: 'María',
    person2: 'Calum',
  },
  date: '2027-03-20T13:00:00',
  intro: {
    es: 'Nos hace muchísima ilusión celebrar este día con vosotros. Esta invitación irá creciendo con todos los detalles importantes.',
    en: 'We are so excited to celebrate this day with you. This invitation will keep growing with every important detail.',
  },
  assets: {
    envelopeVideoUrl: '',
    envelopeVideoOpenDelayMs: 1600,
  },
  venue: {
    name: 'Lugar de celebración',
    address: 'Camino de los Olivos, 12, 28000 Madrid',
    time: '13:00',
    mapUrl: 'https://maps.google.com/?q=Camino+de+los+Olivos+12+Madrid',
    description: {
      es: 'Un espacio rodeado de jardín, luz natural y rincones tranquilos para disfrutar la ceremonia y la celebración.',
      en: 'A venue surrounded by gardens, natural light, and quiet corners for the ceremony and celebration.',
    },
  },
  timeline: [
    {
      id: 'ceremony',
      time: '13:00',
      title: {
        es: 'Ceremonia',
        en: 'Ceremony',
      },
      description: {
        es: 'Nos encontraremos para empezar el día juntos.',
        en: 'We will gather to begin the day together.',
      },
      icon: 'rings',
    },
    {
      id: 'cocktail',
      time: '14:00',
      title: {
        es: 'Cóctel',
        en: 'Cocktail',
      },
      description: {
        es: 'Un brindis, algo rico y los primeros abrazos.',
        en: 'A toast, small bites, and the first hugs.',
      },
      icon: 'glass',
    },
    {
      id: 'meal',
      time: '15:30',
      title: {
        es: 'Comida',
        en: 'Lunch',
      },
      description: {
        es: 'Mesa compartida, sobremesa y muchas ganas de celebrar.',
        en: 'A shared table, long conversations, and plenty to celebrate.',
      },
      icon: 'plate',
    },
    {
      id: 'party',
      time: '18:30',
      title: {
        es: 'Fiesta',
        en: 'Party',
      },
      description: {
        es: 'Música, baile y final abierto.',
        en: 'Music, dancing, and an open ending.',
      },
      icon: 'music',
    },
  ],
  rsvp: {
    deadline: '2027-02-01',
  },
  faq: [
    {
      id: 'bus',
      question: {
        es: '¿Habrá autobús?',
        en: 'Will there be a bus?',
      },
      answer: {
        es: 'Estamos valorando organizar transporte desde un punto centrico. Lo confirmaremos pronto.',
        en: 'We are considering transport from a central meeting point and will confirm it soon.',
      },
    },
    {
      id: 'parking',
      question: {
        es: '¿Dónde puedo aparcar?',
        en: 'Where can I park?',
      },
      answer: {
        es: 'El lugar cuenta con una zona de aparcamiento para invitados.',
        en: 'The venue has a parking area available for guests.',
      },
    },
    {
      id: 'kids',
      question: {
        es: '¿Pueden venir niños?',
        en: 'Can children come?',
      },
      answer: {
        es: 'Estamos terminando de definir la organizacion familiar y lo indicaremos aqui.',
        en: 'We are still defining the family arrangements and will share details here.',
      },
    },
    {
      id: 'deadline',
      question: {
        es: '¿Hasta cuándo puedo confirmar?',
        en: 'When should I RSVP by?',
      },
      answer: {
        es: 'La fecha provisional para confirmar asistencia es el 1 de febrero de 2027.',
        en: 'The provisional RSVP deadline is 1 February 2027.',
      },
    },
  ],
  gift: {
    message: {
      es: 'Vuestra compañía es el mejor regalo. Si aun así queréis tener un detalle, os dejamos una opción ficticia para la demo.',
      en: 'Your company is the best gift. If you would still like to give something, here is a fictional option for the demo.',
    },
    accounts: [
      {
        id: 'maria',
        holder: 'María',
        iban: 'ES00 0000 0000 0000 0000 0000',
      },
      {
        id: 'calum',
        holder: 'Calum',
        iban: 'ES11 1111 1111 1111 1111 1111',
      },
    ],
  },
  footer: {
    message: {
      es: 'Gracias por formar parte de nuestra historia.',
      en: 'Thank you for being part of our story.',
    },
  },
}
