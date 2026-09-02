export interface Song {
  id: string
  title: string
  artist: string
  cover: string
  spotifyUrl?: string
}

export interface SongSuggestion {
  song: Song
  suggestedBy: string
  status: 'pending' | 'accepted' | 'rejected'
}
