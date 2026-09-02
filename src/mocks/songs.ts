import type { Song, SongSuggestion } from '@/types/song'

export const mockSongs: Song[] = [
  {
    id: 'song-1',
    title: 'You Make My Dreams',
    artist: 'Daryl Hall & John Oates',
    cover: 'https://placehold.co/160x160/741c32/fffaf6?text=YM',
  },
  {
    id: 'song-2',
    title: 'Signed, Sealed, Delivered',
    artist: 'Stevie Wonder',
    cover: 'https://placehold.co/160x160/a55a6d/fffaf6?text=SW',
  },
  {
    id: 'song-3',
    title: 'September',
    artist: 'Earth, Wind & Fire',
    cover: 'https://placehold.co/160x160/422d32/fffaf6?text=EW',
  },
  {
    id: 'song-4',
    title: 'This Will Be',
    artist: 'Natalie Cole',
    cover: 'https://placehold.co/160x160/8d334a/fffaf6?text=NC',
  },
]

export const acceptedSongSuggestions: SongSuggestion[] = [
  {
    song: mockSongs[0],
    suggestedBy: 'Clara',
    status: 'accepted',
  },
  {
    song: mockSongs[2],
    suggestedBy: 'Jamie',
    status: 'accepted',
  },
]
