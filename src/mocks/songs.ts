import type { Song, SongSuggestion } from '@/types/song'

export const mockSongs: Song[] = [
  {
    id: 'song-1',
    title: 'Jóvenes Eternamente',
    artist: 'Pol 3.14',
  },
  {
    id: 'song-2',
    title: 'Mi accidente preferido',
    artist: 'Despistaos, Juancho, Sidecars',
  },
  {
    id: 'song-3',
    title: 'Bailamos',
    artist: 'Dani Fernández',
  },
  {
    id: 'song-4',
    title: 'El Fin del Mundo',
    artist: 'La La Love You, Axolotes Mexicanos',
  },
  {
    id: 'song-5',
    title: 'Como Si Fuera a Morir Mañana',
    artist: 'Leiva',
  },
  {
    id: 'song-6',
    title: 'Una Foto en Blanco y Negro',
    artist: 'David Otero, Taburete',
  },
  {
    id: 'song-7',
    title: 'Qué Bonito Es Querer',
    artist: 'Manuel Carrasco',
  },
  {
    id: 'song-8',
    title: 'SUPERSTRELLA',
    artist: 'Aitana',
  },
]

export const acceptedSongSuggestions: SongSuggestion[] = [
  {
    song: mockSongs[0],
    suggestedBy: 'Clara',
    status: 'accepted',
  },
  {
    song: mockSongs[1],
    suggestedBy: 'Marta',
    status: 'accepted',
  },
  {
    song: mockSongs[2],
    suggestedBy: 'Jamie',
    status: 'accepted',
  },
  {
    song: mockSongs[3],
    suggestedBy: 'Laura',
    status: 'accepted',
  },
  {
    song: mockSongs[4],
    suggestedBy: 'Lola',
    status: 'accepted',
  },
  {
    song: mockSongs[5],
    suggestedBy: 'Alba',
    status: 'accepted',
  },
  {
    song: mockSongs[6],
    suggestedBy: 'Marcos',
    status: 'accepted',
  },
]
