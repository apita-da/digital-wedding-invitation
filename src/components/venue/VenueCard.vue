<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import type { WeddingConfig } from '@/types/wedding'
import { formatWeddingDate } from '@/i18n/localized'
import { weddingConfig } from '@/config/wedding'
import venueArtworkUrl from '@/assets/illustrations/coctel_place.png'
import venueCardFrameUrl from '@/assets/illustrations/venue_card_frame.svg'

const props = defineProps<{
  venue: WeddingConfig['venue']
}>()

const { locale, t } = useI18n()
const isFlipped = ref(false)

const flipLabel = computed(() => (isFlipped.value ? t('venue.showFront') : t('venue.flip')))
const weddingDate = computed(() => formatWeddingDate(weddingConfig.date, locale.value))

const toggleFlip = () => {
  isFlipped.value = !isFlipped.value
}
</script>

<template>
  <article
    class="venue-card"
    :class="{ 'venue-card--flipped': isFlipped }"
  >
    <div class="venue-card__inner">
      <div
        class="venue-card__face venue-card__face--front"
        role="button"
        tabindex="0"
        :aria-label="flipLabel"
        :aria-hidden="isFlipped"
        :inert="isFlipped"
        @click="toggleFlip"
        @keydown.enter.prevent="toggleFlip"
        @keydown.space.prevent="toggleFlip"
      >
        <div class="venue-card__front-layout">
          <div class="venue-card__celebration">
            <div
              class="venue-card__art"
              aria-hidden="true"
            >
              <img
                :src="venueArtworkUrl"
                alt=""
              >
            </div>
            <div class="venue-card__body">
              <p class="venue-card__label">
                {{ t('venue.celebration') }}
              </p>
              <h3>{{ props.venue.name }}</h3>
              <p class="venue-card__time">
                {{ props.venue.time }}
              </p>
            </div>
          </div>
        </div>
        <span
          class="venue-card__flip-cue"
          aria-hidden="true"
        >
          <span />
        </span>
      </div>

      <div
        class="venue-card__face venue-card__face--back"
        :aria-hidden="!isFlipped"
        :inert="!isFlipped"
      >
        <div class="venue-card__back-card">
          <img
            class="venue-card__back-frame"
            :src="venueCardFrameUrl"
            alt=""
            aria-hidden="true"
          >
          <p class="venue-card__label">
            {{ t('venue.place') }}
          </p>
          <h3>{{ props.venue.name }}</h3>
          <p class="venue-card__label">
            {{ t('venue.date') }}
          </p>
          <p class="venue-card__value">
            {{ weddingDate }}
          </p>
          <p class="venue-card__label">
            {{ t('venue.time') }}
          </p>
          <p class="venue-card__value">
            {{ props.venue.time }}
          </p>
          <a
            class="venue-card__map-link"
            :href="props.venue.mapUrl"
            target="_blank"
            rel="noreferrer"
          >
            {{ t('venue.directions') }}
          </a>
        </div>
        <button
          class="venue-card__flip-cue venue-card__flip-cue--back"
          type="button"
          :aria-label="t('venue.showFront')"
          :aria-pressed="isFlipped"
          @click="toggleFlip"
        >
          <span aria-hidden="true" />
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.venue-card {
  margin-top: 3.05rem;
  perspective: 90rem;
}

.venue-card__inner {
  position: relative;
  min-height: 23.5rem;
  transform-style: preserve-3d;
  transition: transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1);
}

.venue-card--flipped .venue-card__inner {
  transform: rotateY(180deg);
}

.venue-card__face {
  position: absolute;
  inset: 0;
  display: grid;
  align-content: center;
  gap: 1.25rem;
  padding: 0;
  border: 0;
  border-radius: var(--radius-sm);
  backface-visibility: hidden;
  background: transparent;
  color: var(--color-primary);
  text-align: center;
}

.venue-card__face--front {
  cursor: pointer;
}

.venue-card__face--back {
  background: var(--color-surface);
  box-shadow: none;
  transform: rotateY(180deg);
}

.venue-card__front-layout {
  display: grid;
  justify-items: center;
}

.venue-card__celebration {
  position: relative;
  display: grid;
  width: min(100%, 26.5rem);
  gap: 0.75rem;
  padding: 0;
  color: var(--color-primary);
}

.venue-card__art {
  display: block;
  overflow: hidden;
}

.venue-card__art img {
  display: block;
  width: 100%;
  height: auto;
}

.venue-card__body {
  display: grid;
  gap: 0.35rem;
  justify-items: center;
}

.venue-card__body p,
.venue-card__body h3 {
  margin: 0;
}

.venue-card__body h3 {
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: 1.08rem;
  font-weight: 900;
  line-height: 1.15;
  text-transform: uppercase;
}

.venue-card__time,
.venue-card__address,
.venue-card__label {
  color: var(--color-primary-deep);
}

.venue-card__label {
  color: var(--color-primary);
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0;
  text-transform: uppercase;
}

.venue-card__back-card {
  position: relative;
  display: grid;
  width: min(100%, 26.5rem);
  min-height: 19.15rem;
  align-content: center;
  justify-items: center;
  margin-inline: auto;
  padding: 3rem 2.5rem 2.35rem;
  color: var(--color-text);
}

.venue-card__back-frame {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
  pointer-events: none;
}

.venue-card__back-card > :not(.venue-card__back-frame) {
  position: relative;
  z-index: 1;
}

.venue-card__back-card p,
.venue-card__back-card h3 {
  margin: 0;
}

.venue-card__back-card h3,
.venue-card__value {
  color: var(--color-text);
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.15;
  text-align: center;
}

.venue-card__back-card h3 {
  margin: 0.22rem 0 1.05rem;
  text-transform: uppercase;
}

.venue-card__value {
  margin: 0.22rem 0 1.05rem;
  text-transform: uppercase;
}

.venue-card__map-link {
  display: inline-grid;
  min-width: 10.25rem;
  min-height: 2.85rem;
  place-items: center;
  margin-top: 0.3rem;
  border-radius: var(--radius-pill);
  background: var(--color-primary-deep);
  color: var(--color-text-inverse);
  font-family: var(--font-body);
  font-size: 0.88rem;
  font-weight: 900;
  padding-inline: 1.3rem;
  text-decoration: none;
  text-underline-offset: 0.24em;
}

.venue-card__flip-cue {
  position: absolute;
  right: 0.6rem;
  bottom: 0.6rem;
  display: grid;
  width: 2rem;
  aspect-ratio: 1;
  place-items: center;
  border: 0;
  background: transparent;
  color: var(--color-primary);
}

.venue-card__flip-cue span {
  width: 0.72rem;
  aspect-ratio: 1;
  border-top: 2px solid currentColor;
  border-right: 2px solid currentColor;
  transform: rotate(45deg) translate(-0.08rem, 0.08rem);
}

.venue-card__flip-cue--back {
  right: auto;
  left: 1rem;
}

.venue-card__flip-cue--back span {
  transform: rotate(225deg) translate(-0.08rem, 0.08rem);
}

.venue-card__flip-cue:hover,
.venue-card__flip-cue:focus-visible {
  color: var(--color-primary-deep);
  text-decoration: none;
}

@media (max-width: 23rem) {
  .venue-card {
    margin-top: 2.25rem;
  }

  .venue-card__inner {
    min-height: 20rem;
  }

  .venue-card__celebration {
    padding-inline: 0.65rem;
  }

  .venue-card__back-card {
    min-height: 17.75rem;
    padding: 2.5rem 2rem 2.15rem;
  }

  .venue-card__back-card h3,
  .venue-card__value {
    font-size: 0.92rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .venue-card__inner {
    transition-duration: 1ms;
  }
}
</style>
