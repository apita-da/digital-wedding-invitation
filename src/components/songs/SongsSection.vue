<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { acceptedSongSuggestions, mockSongs } from '@/mocks/songs'

const { t } = useI18n()
</script>

<template>
  <section
    class="invitation-section invitation-section--dark"
    aria-labelledby="songs-title"
  >
    <div class="section-inner">
      <p class="section-kicker">
        {{ t('sections.songs') }}
      </p>
      <h2 id="songs-title">
        {{ t('songs.title') }}
      </h2>
      <span
        class="flourish"
        aria-hidden="true"
      />
      <label class="song-search">
        <span>{{ t('songs.search') }}</span>
        <input type="search">
      </label>
      <div
        class="song-grid"
        aria-label="Mock song results"
      >
        <article
          v-for="song in mockSongs.slice(0, 2)"
          :key="song.id"
          class="song-card"
        >
          <img
            :src="song.cover"
            alt=""
            loading="lazy"
          >
          <div>
            <h3>{{ song.title }}</h3>
            <p>{{ song.artist }}</p>
          </div>
        </article>
      </div>
      <h3 class="songs-subtitle">
        {{ t('songs.acceptedTitle') }}
      </h3>
      <ul class="accepted-songs">
        <li
          v-for="suggestion in acceptedSongSuggestions"
          :key="suggestion.song.id"
        >
          {{ suggestion.song.title }} · {{ suggestion.song.artist }}
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.song-search {
  display: grid;
  gap: 0.5rem;
  margin-top: 2rem;
  text-align: left;
}

.song-search input {
  min-height: 3rem;
  border: 2px solid rgb(255 250 246 / 0.32);
  border-radius: var(--radius-pill);
  background: rgb(255 250 246 / 0.08);
  color: var(--color-text-inverse);
  font-size: 1rem;
  padding: 0.75rem 0.85rem;
}

.song-grid {
  display: grid;
  gap: 0.8rem;
  margin-top: 1rem;
}

.song-card {
  display: grid;
  grid-template-columns: 4rem 1fr;
  gap: 0.85rem;
  align-items: center;
  border: 1px solid rgb(255 250 246 / 0.2);
  border-radius: var(--radius-sm);
  padding: 0.75rem;
  text-align: left;
}

.song-card img {
  aspect-ratio: 1;
  border-radius: var(--radius-sm);
  object-fit: cover;
}

.song-card h3,
.song-card p,
.songs-subtitle {
  margin: 0;
}

.songs-subtitle {
  margin-top: 2rem;
}

.accepted-songs {
  margin: 1rem 0 0;
  padding-left: 1.2rem;
}
</style>
