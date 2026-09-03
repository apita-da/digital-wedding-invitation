<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { mockSongs } from '@/mocks/songs'
import { songService } from '@/services/songService'
import type { Song, SongSuggestion } from '@/types/song'

const { t } = useI18n()

const query = ref('')
const searchResults = ref<Song[]>([])
const acceptedSuggestions = ref<SongSuggestion[]>([])
const pendingSuggestions = ref<SongSuggestion[]>([])
const selectedSong = ref<Song | null>(null)
const isLoadingAccepted = ref(true)
const isSearching = ref(false)
const isSuggesting = ref(false)
const suggestionResult = ref<SongSuggestion | null>(null)
const suggestError = ref('')
const form = reactive({
  guestName: '',
})
const errors = reactive<Partial<Record<'guestName', string>>>({})
let searchTimeout: ReturnType<typeof window.setTimeout> | undefined

const hasQuery = computed(() => Boolean(query.value.trim()))
const displayedSongs = computed(() => (hasQuery.value ? searchResults.value : mockSongs))
const hasSongs = computed(() => displayedSongs.value.length > 0)
const visibleSuggestions = computed(() => [...pendingSuggestions.value, ...acceptedSuggestions.value])

const clearGuestNameError = () => {
  delete errors.guestName
  suggestError.value = ''
}

const openSuggestionModal = (song: Song) => {
  selectedSong.value = song
  suggestionResult.value = null
  form.guestName = ''
  clearGuestNameError()
}

const closeSuggestionModal = () => {
  if (isSuggesting.value) {
    return
  }

  selectedSong.value = null
  suggestionResult.value = null
  form.guestName = ''
  clearGuestNameError()
}

const submitSuggestion = async () => {
  if (!selectedSong.value) {
    return
  }

  clearGuestNameError()

  if (!form.guestName.trim()) {
    errors.guestName = t('songs.errorGuestName')
    return
  }

  isSuggesting.value = true

  try {
    const suggestion = await songService.suggest(selectedSong.value, form.guestName.trim())
    pendingSuggestions.value = [suggestion, ...pendingSuggestions.value]
    suggestionResult.value = suggestion
  } catch {
    suggestError.value = t('songs.errorSuggest')
  } finally {
    isSuggesting.value = false
  }
}

watch(query, (value) => {
  window.clearTimeout(searchTimeout)
  suggestError.value = ''

  const normalizedQuery = value.trim()

  if (!normalizedQuery) {
    searchResults.value = []
    isSearching.value = false
    return
  }

  isSearching.value = true
  searchTimeout = window.setTimeout(async () => {
    searchResults.value = await songService.search(normalizedQuery)
    isSearching.value = false
  }, 220)
})

onMounted(async () => {
  acceptedSuggestions.value = await songService.listAccepted()
  isLoadingAccepted.value = false
})

onBeforeUnmount(() => {
  window.clearTimeout(searchTimeout)
})
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

      <p class="songs-section__intro">
        {{ t('songs.intro') }}
      </p>

      <label class="song-search">
        <span>{{ t('songs.search') }}</span>
        <input
          v-model="query"
          type="search"
          :placeholder="t('songs.searchPlaceholder')"
        >
      </label>

      <div
        class="song-grid"
        :aria-label="t('songs.resultsLabel')"
      >
        <p
          v-if="isSearching"
          class="song-grid__empty"
        >
          {{ t('songs.searching') }}
        </p>
        <p
          v-else-if="hasQuery && !hasSongs"
          class="song-grid__empty"
        >
          {{ t('songs.emptyResults') }}
        </p>
        <article
          v-for="song in displayedSongs"
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
          <button
            type="button"
            :aria-label="t('songs.suggestAria', { title: song.title })"
            @click="openSuggestionModal(song)"
          >
            {{ t('songs.suggest') }}
          </button>
        </article>
      </div>

      <h3 class="songs-subtitle">
        {{ t('songs.acceptedTitle') }}
      </h3>
      <p
        v-if="isLoadingAccepted"
        class="accepted-songs__empty"
      >
        {{ t('songs.loadingAccepted') }}
      </p>
      <ul
        v-else
        class="accepted-songs"
      >
        <li
          v-for="suggestion in visibleSuggestions"
          :key="`${suggestion.song.id}-${suggestion.suggestedBy}-${suggestion.status}`"
        >
          <span>
            <strong>{{ suggestion.song.title }}</strong>
            <small>{{ suggestion.song.artist }}</small>
          </span>
          <span>
            {{ suggestion.suggestedBy }}
          </span>
          <em :class="`accepted-songs__status accepted-songs__status--${suggestion.status}`">
            {{ t(`songs.status.${suggestion.status}`) }}
          </em>
        </li>
      </ul>
    </div>

    <Teleport to="body">
      <Transition name="song-modal">
        <div
          v-if="selectedSong"
          class="song-modal"
          role="presentation"
          @click.self="closeSuggestionModal"
        >
          <section
            class="song-modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="song-modal-title"
          >
            <template v-if="!suggestionResult">
              <p class="song-modal__eyebrow">
                {{ t('songs.modalEyebrow') }}
              </p>
              <h3 id="song-modal-title">
                {{ t('songs.modalTitle') }}
              </h3>
              <article class="song-modal__song">
                <img
                  :src="selectedSong.cover"
                  alt=""
                >
                <div>
                  <strong>{{ selectedSong.title }}</strong>
                  <span>{{ selectedSong.artist }}</span>
                </div>
              </article>
              <form
                class="song-modal__form"
                novalidate
                @submit.prevent="submitSuggestion"
              >
                <label>
                  <span>{{ t('songs.guestName') }}</span>
                  <input
                    v-model="form.guestName"
                    type="text"
                    autocomplete="name"
                    :placeholder="t('songs.guestNamePlaceholder')"
                    :aria-invalid="Boolean(errors.guestName)"
                    :aria-describedby="errors.guestName ? 'song-guest-error' : undefined"
                  >
                  <small
                    v-if="errors.guestName"
                    id="song-guest-error"
                  >
                    {{ errors.guestName }}
                  </small>
                </label>
                <p
                  v-if="suggestError"
                  class="song-modal__error"
                  role="alert"
                >
                  {{ suggestError }}
                </p>
                <div class="song-modal__actions">
                  <button
                    type="button"
                    class="song-modal__button song-modal__button--ghost"
                    @click="closeSuggestionModal"
                  >
                    {{ t('common.cancel') }}
                  </button>
                  <button
                    type="submit"
                    class="song-modal__button"
                    :disabled="isSuggesting"
                  >
                    {{ isSuggesting ? t('songs.sending') : t('songs.sendSuggestion') }}
                  </button>
                </div>
              </form>
            </template>
            <template v-else>
              <p
                class="song-modal__note"
                aria-hidden="true"
              >
                NOTE
              </p>
              <h3 id="song-modal-title">
                {{ t('songs.thanksTitle', { name: suggestionResult.suggestedBy }) }}
              </h3>
              <p>
                {{ t('songs.thanksMessage', { title: suggestionResult.song.title }) }}
              </p>
              <button
                type="button"
                class="song-modal__button"
                @click="closeSuggestionModal"
              >
                {{ t('songs.perfect') }}
              </button>
            </template>
          </section>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped lang="scss">
.songs-section__intro {
  color: rgb(255 250 246 / 0.78);
}

.song-search {
  display: grid;
  gap: 0.5rem;
  margin-top: 2rem;
  text-align: left;
}

.song-search span {
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
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

.song-search input::placeholder {
  color: rgb(255 250 246 / 0.62);
}

.song-grid {
  display: grid;
  gap: 0.8rem;
  margin-top: 1rem;
}

.song-grid__empty,
.accepted-songs__empty {
  margin: 0;
  color: rgb(255 250 246 / 0.72);
}

.song-card {
  display: grid;
  grid-template-columns: 4rem minmax(0, 1fr);
  gap: 0.85rem;
  align-items: center;
  border: 1px solid rgb(255 250 246 / 0.2);
  border-radius: var(--radius-sm);
  padding: 0.75rem;
  text-align: left;
}

.song-card > div {
  min-width: 0;
}

.song-card img {
  width: 100%;
  aspect-ratio: 1;
  border-radius: var(--radius-sm);
  object-fit: cover;
}

.song-card button {
  grid-column: 1 / -1;
  min-height: 2.65rem;
  border: 1px solid rgb(255 250 246 / 0.32);
  border-radius: var(--radius-pill);
  background: var(--color-text-inverse);
  color: var(--color-primary);
  font-size: 0.86rem;
  font-weight: 800;
}

.song-card h3,
.song-card p,
.songs-subtitle {
  margin: 0;
}

.song-card h3 {
  overflow-wrap: anywhere;
  font-size: 1.03rem;
}

.song-card p {
  color: rgb(255 250 246 / 0.74);
}

.songs-subtitle {
  margin-top: 2rem;
}

.accepted-songs {
  display: grid;
  gap: 0;
  margin: 1rem 0 0;
  padding: 0;
  border: 1px solid rgb(255 250 246 / 0.24);
  border-radius: var(--radius-sm);
  list-style: none;
  overflow: hidden;
}

.accepted-songs li {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 0.35rem;
  padding: 0.85rem;
  border-bottom: 1px solid rgb(255 250 246 / 0.16);
}

.accepted-songs li:last-child {
  border-bottom: 0;
}

.accepted-songs span {
  display: grid;
  gap: 0.1rem;
}

.accepted-songs strong {
  overflow-wrap: anywhere;
}

.accepted-songs small,
.accepted-songs li > span:nth-child(2) {
  color: rgb(255 250 246 / 0.7);
  font-size: 0.86rem;
}

.accepted-songs__status {
  width: fit-content;
  border: 1px solid rgb(255 250 246 / 0.24);
  border-radius: var(--radius-pill);
  color: rgb(255 250 246 / 0.78);
  font-size: 0.72rem;
  font-style: normal;
  font-weight: 800;
  padding: 0.22rem 0.55rem;
  text-transform: uppercase;
}

.accepted-songs__status--pending {
  background: rgb(255 250 246 / 0.12);
}

.song-modal {
  position: fixed;
  inset: 0;
  z-index: 20;
  display: grid;
  place-items: center;
  background: rgb(18 12 14 / 0.62);
  padding: var(--space-page);
}

.song-modal__dialog {
  width: min(100%, 27rem);
  border: 1px solid color-mix(in srgb, var(--color-border) 70%, transparent);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  box-shadow: 0 24px 90px rgb(18 12 14 / 0.32);
  color: var(--color-text);
  padding: 1.35rem;
  text-align: center;
}

.song-modal__eyebrow {
  margin: 0;
  color: var(--color-primary);
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
}

.song-modal__dialog h3 {
  margin: 0.35rem 0 0;
  color: var(--color-primary);
  font-size: 1.7rem;
}

.song-modal__song {
  display: grid;
  grid-template-columns: 4rem minmax(0, 1fr);
  gap: 0.8rem;
  align-items: center;
  margin-top: 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.65rem;
  text-align: left;
}

.song-modal__song img {
  width: 100%;
  aspect-ratio: 1;
  border-radius: var(--radius-sm);
  object-fit: cover;
}

.song-modal__song div,
.song-modal__form label {
  display: grid;
  gap: 0.25rem;
}

.song-modal__song strong,
.song-modal__song span {
  overflow-wrap: anywhere;
}

.song-modal__song span {
  color: var(--color-text-muted);
}

.song-modal__form {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
  text-align: left;
}

.song-modal__form label > span {
  color: var(--color-primary);
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
}

.song-modal__form input {
  width: 100%;
  border-color: color-mix(in srgb, var(--color-line) 72%, transparent);
  background: var(--color-surface);
  padding: 0.78rem 0.95rem;
}

.song-modal__form input[aria-invalid='true'] {
  border-color: var(--color-accent);
}

.song-modal__form small,
.song-modal__error {
  color: var(--color-accent);
  font-size: 0.82rem;
  font-weight: 800;
}

.song-modal__error {
  margin: 0;
  text-align: center;
}

.song-modal__actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.song-modal__button {
  min-height: 2.85rem;
  border: 0;
  border-radius: var(--radius-pill);
  background: var(--color-primary);
  color: var(--color-text-inverse);
  font-weight: 800;
  padding-inline: 1rem;
}

.song-modal__button--ghost {
  border: 1px solid var(--color-line);
  background: transparent;
  color: var(--color-primary);
}

.song-modal__button:disabled {
  cursor: wait;
  opacity: 0.68;
}

.song-modal__note {
  display: grid;
  width: 3.5rem;
  aspect-ratio: 1;
  place-items: center;
  margin: 0 auto 0.9rem;
  border-radius: 50%;
  background: var(--color-primary);
  color: var(--color-text-inverse);
  font-size: 0.85rem;
  font-weight: 800;
}

.song-modal__dialog > p:last-of-type {
  color: var(--color-text-muted);
}

.song-modal-enter-active,
.song-modal-leave-active {
  transition: opacity 200ms ease;
}

.song-modal-enter-active .song-modal__dialog,
.song-modal-leave-active .song-modal__dialog {
  transition: transform 200ms ease;
}

.song-modal-enter-from,
.song-modal-leave-to {
  opacity: 0;
}

.song-modal-enter-from .song-modal__dialog,
.song-modal-leave-to .song-modal__dialog {
  transform: translateY(0.5rem) scale(0.98);
}

@media (min-width: 42rem) {
  .song-card {
    grid-template-columns: 4.25rem minmax(0, 1fr) auto;
  }

  .song-card button {
    grid-column: auto;
    min-width: 9rem;
    padding-inline: 1rem;
  }

  .accepted-songs li {
    grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.8fr) auto;
    align-items: center;
  }
}
</style>
