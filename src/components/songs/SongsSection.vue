<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { songService } from '@/services/songService'
import type { Song, SongSuggestion } from '@/types/song'

const { t } = useI18n()

const query = ref('')
const searchResults = ref<Song[]>([])
const acceptedSuggestions = ref<SongSuggestion[]>([])
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
const acceptedSongs = computed(() => acceptedSuggestions.value.map((suggestion) => suggestion.song))
const hasAcceptedSongs = computed(() => acceptedSongs.value.length > 0)
const hasSearchResults = computed(() => searchResults.value.length > 0)

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
    suggestionResult.value = await songService.suggest(selectedSong.value, form.guestName.trim())
  } catch {
    suggestError.value = t('songs.errorSuggest')
  } finally {
    isSuggesting.value = false
  }
}

watch(query, (value) => {
  window.clearTimeout(searchTimeout)

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
    class="invitation-section invitation-section--light songs-section"
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
        class="songs-section__ornament"
        aria-hidden="true"
      />
      <p class="songs-section__intro">
        {{ t('songs.intro') }}
      </p>

      <div class="song-search-area">
        <label class="song-search">
          <span class="visually-hidden">{{ t('songs.search') }}</span>
          <input
            v-model="query"
            type="search"
            :placeholder="t('songs.searchPlaceholder')"
          >
        </label>

        <div
          v-if="hasQuery"
          class="spotify-results"
          aria-live="polite"
        >
          <p
            v-if="isSearching"
            class="spotify-results__empty"
          >
            {{ t('songs.searching') }}
          </p>
          <p
            v-else-if="!hasSearchResults"
            class="spotify-results__empty"
          >
            {{ t('songs.emptyResults') }}
          </p>
          <ul
            v-else
            class="spotify-results__list"
          >
            <li
              v-for="song in searchResults"
              :key="song.id"
            >
              <span>
                <strong>{{ song.title }}</strong>
                <small>{{ song.artist }}</small>
              </span>
              <button
                class="spotify-results__add"
                type="button"
                :aria-label="t('songs.selectAria', { title: song.title })"
                @click="openSuggestionModal(song)"
              >
                +
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div class="song-table-wrap">
        <p
          v-if="isLoadingAccepted"
          class="song-table__empty"
        >
          {{ t('songs.loadingAccepted') }}
        </p>
        <p
          v-else-if="!hasAcceptedSongs"
          class="song-table__empty"
        >
          {{ t('songs.emptyAccepted') }}
        </p>

        <table
          v-else
          class="song-table"
        >
          <thead>
            <tr>
              <th scope="col">
                {{ t('songs.tableSong') }}
              </th>
              <th scope="col">
                {{ t('songs.tableArtist') }}
              </th>
              <th scope="col">
                {{ t('songs.tableListen') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="song in acceptedSongs"
              :key="song.id"
            >
              <td>{{ song.title }}</td>
              <td>{{ song.artist }}</td>
              <td>
                <a
                  v-if="song.spotifyUrl"
                  class="song-table__icon"
                  :href="song.spotifyUrl"
                  target="_blank"
                  rel="noreferrer"
                  :aria-label="t('songs.listenAria', { title: song.title })"
                >
                  &#9835;
                </a>
                <span
                  v-else
                  class="song-table__icon"
                  aria-hidden="true"
                >
                  &#9835;
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
              <h3 id="song-modal-title">
                {{ t('songs.modalTitle') }}
              </h3>
              <p class="song-modal__selected">
                {{ selectedSong.title }} &middot; {{ selectedSong.artist }}
              </p>
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
              <h3 id="song-modal-title">
                {{ t('songs.thanksTitle', { name: suggestionResult.suggestedBy }) }}
              </h3>
              <p
                class="song-modal__note"
                aria-hidden="true"
              >
                &#9835;
              </p>
              <p class="song-modal__suggested">
                {{ t('songs.suggestedLine', { title: suggestionResult.song.title }) }}
              </p>
              <p>
                {{ t('songs.thanksMessage') }}
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
.songs-section {
  background: var(--color-blush);
}

.songs-section :deep(.section-inner > h2) {
  font-family: var(--font-display);
  font-size: 1.85rem;
  font-weight: 800;
  line-height: 1.1;
}

.songs-section__ornament {
  display: block;
  width: min(100%, 27rem);
  height: 3.2rem;
  margin: 1rem auto 1.25rem;
  color: var(--color-primary);
  background:
    radial-gradient(ellipse 1.02rem 1rem at 1.15rem 50%, transparent 54%, currentColor 56% 61%, transparent 63%)
      0 50% / 3rem 2.7rem repeat-x,
    linear-gradient(90deg, currentColor, currentColor) center / 100% 2px no-repeat;
  mask-image: linear-gradient(90deg, transparent, black 8% 92%, transparent);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

.songs-section__intro {
  color: var(--color-primary);
  font-size: 0.76rem;
  font-weight: 900;
  line-height: 1.42;
  text-transform: uppercase;
}

.song-search-area {
  position: relative;
  z-index: 2;
  width: min(100%, 24rem);
  margin-top: 1.45rem;
  margin-inline: auto;
}

.song-search {
  display: block;
}

.song-search input {
  width: 100%;
  min-height: 2.95rem;
  border-color: var(--color-primary);
  background: var(--color-background);
  color: var(--color-text);
  padding: 0.72rem 1.15rem;
}

.song-search input::placeholder {
  color: color-mix(in srgb, var(--color-text-muted) 82%, transparent);
}

.spotify-results {
  position: absolute;
  top: calc(100% + 0.45rem);
  right: 0;
  left: 0;
  max-height: 16.5rem;
  border: 1.5px solid color-mix(in srgb, var(--color-primary) 72%, transparent);
  border-radius: var(--radius-sm);
  background: var(--color-background);
  color: var(--color-text);
  box-shadow: 0 1rem 2.2rem rgb(66 45 50 / 0.16);
  overflow: auto;
  scrollbar-color: var(--color-primary) transparent;
  scrollbar-width: thin;
  text-align: left;
}

.spotify-results::-webkit-scrollbar {
  width: 0.42rem;
}

.spotify-results::-webkit-scrollbar-track {
  background: transparent;
}

.spotify-results::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-primary) 76%, transparent);
}

.spotify-results__empty {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.88rem;
  font-weight: 700;
  padding: 0.9rem 1rem;
  text-align: center;
}

.spotify-results__list {
  display: grid;
  gap: 0;
  margin: 0;
  padding: 0;
  list-style: none;
}

.spotify-results__list li {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.8rem;
  align-items: center;
  border-bottom: 1px solid var(--color-border);
  padding: 0.72rem 0.85rem;
}

.spotify-results__list li:last-child {
  border-bottom: 0;
}

.spotify-results__list span {
  display: grid;
  gap: 0.12rem;
  min-width: 0;
}

.spotify-results__list strong,
.spotify-results__list small {
  overflow-wrap: anywhere;
}

.spotify-results__list strong {
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 800;
}

.spotify-results__list small {
  color: var(--color-text-muted);
  font-size: 0.78rem;
  font-weight: 700;
}

.spotify-results__add {
  display: grid;
  min-width: 2rem;
  min-height: 2rem;
  place-items: center;
  border: 0;
  background: transparent;
  color: var(--color-primary);
  font-size: 0;
  line-height: 1;
}

.spotify-results__add::before {
  content: '+';
  display: block;
  font-size: 1.65rem;
  font-weight: 900;
  line-height: 1;
}

.song-table-wrap {
  margin-top: 1.35rem;
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-sm);
  background: var(--color-background);
  overflow: hidden;
}

.song-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  color: var(--color-text);
  font-family: var(--font-display);
}

.song-table th,
.song-table td {
  border-bottom: 1px solid var(--color-border);
  padding: 0.72rem 0.62rem;
  text-align: center;
  vertical-align: middle;
}

.song-table tr:last-child td {
  border-bottom: 0;
}

.song-table th {
  border-bottom: 2px solid var(--color-primary);
  color: var(--color-primary);
  font-size: 0.9rem;
  font-weight: 800;
}

.song-table th:nth-child(1),
.song-table td:nth-child(1) {
  width: 41%;
}

.song-table th:nth-child(2),
.song-table td:nth-child(2) {
  width: 37%;
}

.song-table th:nth-child(3),
.song-table td:nth-child(3) {
  width: 22%;
}

.song-table td {
  color: color-mix(in srgb, var(--color-text) 88%, transparent);
  font-size: 0.84rem;
  line-height: 1.18;
  overflow-wrap: anywhere;
}

.song-table__empty {
  margin: 0;
  color: var(--color-text-muted);
  font-weight: 700;
  padding: 1.35rem;
}

.song-table__icon {
  display: inline-grid;
  min-width: 2rem;
  aspect-ratio: 1;
  place-items: center;
  border: 0;
  background: transparent;
  color: var(--color-primary);
  font-family: var(--font-body);
  font-size: 1.55rem;
  font-weight: 900;
  line-height: 1;
  text-decoration: none;
}

.song-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  background: rgb(18 12 14 / 0.62);
  padding: var(--space-page);
}

.song-modal__dialog {
  width: min(100%, 25.5rem);
  border: 1px solid color-mix(in srgb, var(--color-primary) 20%, transparent);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  box-shadow: 0 24px 90px rgb(18 12 14 / 0.34);
  color: var(--color-text);
  padding: 1.65rem 1.35rem;
  text-align: center;
}

.song-modal__dialog h3 {
  margin: 0;
  color: var(--color-primary);
  font-size: 1.55rem;
}

.song-modal__selected {
  margin: 0.85rem 0 0;
  color: var(--color-text-muted);
  font-family: var(--font-display);
  font-weight: 700;
}

.song-modal__form {
  display: grid;
  gap: 1rem;
  margin-top: 1.35rem;
}

.song-modal__form label {
  display: grid;
  gap: 0.45rem;
  text-align: left;
}

.song-modal__form label > span {
  color: var(--color-primary);
  font-size: 0.76rem;
  font-weight: 800;
  text-transform: uppercase;
}

.song-modal__form input {
  width: 100%;
  border-color: var(--color-primary);
  background: var(--color-surface);
  padding: 0.78rem 1rem;
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
}

.song-modal__actions {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
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
  border: 2px solid color-mix(in srgb, var(--color-primary) 68%, transparent);
  background: transparent;
  color: var(--color-primary);
}

.song-modal__button:disabled {
  cursor: wait;
  opacity: 0.68;
}

.song-modal__note {
  margin: 0.95rem 0 0;
  color: var(--color-primary);
  font-size: 3.8rem;
  line-height: 1;
}

.song-modal__suggested {
  margin: 0.95rem 0 0;
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-style: italic;
  font-weight: 800;
}

.song-modal__dialog > p:last-of-type {
  margin: 0.9rem 0 1.35rem;
  color: var(--color-text-muted);
  font-family: var(--font-display);
  font-size: 0.98rem;
  line-height: 1.35;
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

@media (max-width: 25rem) {
  .song-table th,
  .song-table td {
    padding-inline: 0.36rem;
  }

  .song-table th {
    font-size: 0.72rem;
  }

  .song-table td {
    font-size: 0.72rem;
  }

  .song-modal__actions {
    grid-template-columns: 1fr;
  }
}
</style>
