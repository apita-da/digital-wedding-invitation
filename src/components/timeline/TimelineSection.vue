<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { weddingConfig } from '@/config/wedding'
import { getLocalizedText } from '@/i18n/localized'
import venueStampUrl from '@/assets/illustrations/coctal_place_1.png'
import musicNoteUrl from '@/assets/illustrations/music_note.png'
import musicSeminoteUrl from '@/assets/illustrations/music_seminote.png'
import smallWaveUrl from '@/assets/illustrations/small_wave_white.svg'

const { locale, t } = useI18n()

const stamps = [
  { id: 'music-note', src: musicNoteUrl },
  { id: 'venue', src: venueStampUrl },
  { id: 'music-seminote', src: musicSeminoteUrl },
]
</script>

<template>
  <section
    class="invitation-section invitation-section--dark"
    aria-labelledby="timeline-title"
  >
    <div class="section-inner">
      <h2 id="timeline-title">
        {{ t('timeline.title') }}
      </h2>
      <div class="timeline-list">
        <article
          v-for="item in weddingConfig.timeline"
          :key="item.id"
          class="timeline-item"
        >
          <h3>{{ getLocalizedText(item.title, locale) }}</h3>
          <img
            class="timeline-item__wave"
            :src="smallWaveUrl"
            alt=""
            aria-hidden="true"
          >
          <p>{{ item.time }}</p>
        </article>
      </div>
      <div
        class="timeline-stamps"
        aria-hidden="true"
      >
        <span
          v-for="stamp in stamps"
          :key="stamp.id"
          class="timeline-stamp"
        >
          <img
            :src="stamp.src"
            alt=""
          >
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.timeline-list,
.timeline-stamps {
  width: min(100%, 27rem);
  margin-inline: auto;
}

.timeline-list {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2.2rem 2.35rem;
  margin-top: 3.1rem;
}

.timeline-item {
  display: grid;
  gap: 0.62rem;
  justify-items: center;
  text-align: center;
}

.timeline-item h3,
.timeline-item p {
  margin: 0;
}

.timeline-item h3 {
  font-family: var(--font-display);
  font-size: 1.18rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.timeline-item__wave {
  display: block;
  width: 4.4rem;
  height: 1.05rem;
  object-fit: contain;
}

.timeline-item p {
  color: var(--color-text-inverse);
  font-family: var(--font-display);
  font-size: 1.12rem;
  font-weight: 900;
}

.timeline-stamps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.15rem;
  margin-top: 3.2rem;
}

.timeline-stamp {
  position: relative;
  display: grid;
  aspect-ratio: 0.76;
  place-items: center;
  border: 1.5px solid rgb(255 248 242 / 0.74);
  background: var(--color-background);
  box-shadow: 0 10px 20px rgb(42 14 24 / 0.12);
  transform: rotate(-3deg);
  overflow: hidden;
}

.timeline-stamp:nth-child(2) {
  transform: rotate(2deg);
}

.timeline-stamp:nth-child(3) {
  transform: rotate(5deg);
}

.timeline-stamp::before {
  position: absolute;
  inset: -0.28rem;
  border: 1px solid currentColor;
  content: '';
  opacity: 0.48;
}

.timeline-stamp img {
  width: 118%;
  height: 118%;
  object-fit: cover;
  object-position: center;
  mix-blend-mode: multiply;
}

@media (max-width: 340px) {
  .timeline-list {
    grid-template-columns: 1fr;
  }
}
</style>
