import { acceptedSongSuggestions, mockSongs } from '@/mocks/songs'
import type { Song, SongSuggestion } from '@/types/song'

const MOCK_DELAY = 350

export const songService = {
  async search(query: string): Promise<Song[]> {
    await new Promise((resolve) => window.setTimeout(resolve, MOCK_DELAY))

    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return []
    }

    return mockSongs.filter((song) =>
      `${song.title} ${song.artist}`.toLowerCase().includes(normalizedQuery),
    )
  },

  async suggest(song: Song, suggestedBy: string): Promise<SongSuggestion> {
    await new Promise((resolve) => window.setTimeout(resolve, MOCK_DELAY))

    return {
      song,
      suggestedBy,
      status: 'pending',
    }
  },

  async listAccepted(): Promise<SongSuggestion[]> {
    await new Promise((resolve) => window.setTimeout(resolve, MOCK_DELAY))

    return acceptedSongSuggestions
  },
}
