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
  dressCode: {
    title: {
      es: 'Elegante y natural',
      en: 'Elegant and natural',
    },
    description: {
      es: 'Queremos que os sintáis cómodos, guapos y preparados para un día largo de celebración.',
      en: 'We want you to feel comfortable, beautiful, and ready for a long day of celebration.',
    },
    recommendations: [
      {
        es: 'Colores vivos, cómodos y con ganas de celebración.',
        en: 'Vivid colors, comfortable fits, and a celebratory mood.',
      },
      {
        es: 'Traje o conjunto arreglado sin necesidad de etiqueta estricta.',
        en: 'A suit or polished outfit without a strict formal dress code.',
      },
      {
        es: 'Vestidos, monos o conjuntos con movimiento para bailar sin pensarlo.',
        en: 'Dresses, jumpsuits, or outfits with movement for dancing freely.',
      },
    ],
    avoid: [
      {
        es: 'Blanco total, marfil o tonos demasiado nupciales.',
        en: 'Full white, ivory, or tones that feel too bridal.',
      },
      {
        es: 'Tacones muy finos: la boda será en una finca con zonas de jardín.',
        en: 'Very thin heels: the wedding will be at an estate with garden areas.',
      },
    ],
    note: {
      es: 'La idea es venir guapos, cómodos y preparados para alargar la fiesta.',
      en: 'The idea is to arrive looking great, feeling comfortable, and ready to keep the party going.',
    },
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
    iban: 'ES00 0000 0000 0000 0000 0000',
    bizum: '+34 600 000 000',
  },
  footer: {
    message: {
      es: 'Gracias por formar parte de nuestra historia.',
      en: 'Thank you for being part of our story.',
    },
  },
}
