import type { GuestPhoto } from '@/types/gallery'

export const mockGuestPhotos: GuestPhoto[] = [
  {
    id: 'photo-1',
    imageUrl: 'https://placehold.co/600x760/f7f1ed/741c32?text=Maria+%26+Calum',
    uploadedBy: 'Lucia',
    message: 'Una tarde preciosa para recordar.',
    status: 'approved',
  },
  {
    id: 'photo-2',
    imageUrl: 'https://placehold.co/600x600/741c32/fffaf6?text=Celebration',
    uploadedBy: 'Ewan',
    message: 'Ready for the dance floor.',
    status: 'approved',
  },
  {
    id: 'photo-3',
    imageUrl: 'https://placehold.co/600x720/fffaf6/422d32?text=Friends',
    uploadedBy: 'Marta',
    status: 'approved',
  },
]
