<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import type { WeddingConfig } from '@/types/wedding'
import { getLocalizedText } from '@/i18n/localized'

const props = defineProps<{
  venue: WeddingConfig['venue']
}>()

const { locale, t } = useI18n()
const isFlipped = ref(false)

const flipLabel = computed(() => (isFlipped.value ? t('venue.showFront') : t('venue.flip')))

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
              <span class="venue-card__roof" />
              <span class="venue-card__tower" />
              <span class="venue-card__door" />
              <span class="venue-card__tree venue-card__tree--left" />
              <span class="venue-card__tree venue-card__tree--right" />
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
        <div class="venue-card__body venue-card__body--back">
          <p class="venue-card__label">
            {{ t('venue.address') }}
          </p>
          <h3>{{ props.venue.name }}</h3>
          <p>{{ getLocalizedText(props.venue.description, locale) }}</p>
          <p class="venue-card__address">
            {{ props.venue.address }}
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
  margin-top: 2.75rem;
  perspective: 90rem;
}

.venue-card__inner {
  position: relative;
  min-height: 21.5rem;
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
  padding: 0.9rem;
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
  border: 2px solid color-mix(in srgb, var(--color-primary) 34%, transparent);
  background: var(--color-surface);
  box-shadow: var(--shadow-soft);
  transform: rotateY(180deg);
}

.venue-card__front-layout {
  display: grid;
  justify-items: center;
}

.venue-card__celebration {
  position: relative;
  display: grid;
  width: min(100%, 23.5rem);
  gap: 0.35rem;
  padding: 1.05rem 1rem 1.35rem;
  border: 2px solid color-mix(in srgb, var(--color-primary) 78%, transparent);
  color: var(--color-primary);
}

.venue-card__celebration::before,
.venue-card__celebration::after {
  position: absolute;
  right: 0.55rem;
  left: 0.55rem;
  height: 0.8rem;
  background:
    radial-gradient(circle at 0.36rem 50%, transparent 0.28rem, currentColor 0.3rem 0.36rem, transparent 0.38rem)
      0 0 / 1rem 100% repeat-x;
  content: '';
}

.venue-card__celebration::before {
  top: -0.48rem;
}

.venue-card__celebration::after {
  bottom: -0.48rem;
}

.venue-card__art {
  position: relative;
  display: grid;
  min-height: 11.5rem;
  place-items: center;
  overflow: hidden;
  background: transparent;
}

.venue-card__art::before {
  position: absolute;
  right: 1.1rem;
  bottom: 1.55rem;
  left: 1.1rem;
  height: 1px;
  background: currentColor;
  content: '';
  opacity: 0.35;
}

.venue-card__roof,
.venue-card__tower,
.venue-card__door {
  position: absolute;
  border: 2px solid currentColor;
  opacity: 0.64;
}

.venue-card__roof {
  width: 9.2rem;
  height: 5rem;
  border-bottom: 0;
  transform: translateY(0.65rem);
}

.venue-card__roof::before,
.venue-card__roof::after {
  position: absolute;
  top: 1.2rem;
  width: 0.72rem;
  height: 0.72rem;
  border: 1.5px solid currentColor;
  border-radius: 50%;
  content: '';
}

.venue-card__roof::before {
  left: 1.2rem;
}

.venue-card__roof::after {
  right: 1.2rem;
}

.venue-card__tower {
  width: 1.55rem;
  height: 6.3rem;
  border-bottom: 0;
  transform: translate(-3.55rem, -0.85rem);
}

.venue-card__tower::before {
  position: absolute;
  top: -1.2rem;
  left: -0.32rem;
  width: 2rem;
  height: 1.2rem;
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
  background: currentColor;
  content: '';
  opacity: 0.4;
}

.venue-card__door {
  bottom: 2.7rem;
  width: 1.5rem;
  height: 2.3rem;
  border-radius: 1rem 1rem 0 0;
}

.venue-card__tree {
  position: absolute;
  bottom: 2rem;
  width: 1.2rem;
  height: 3.7rem;
  border-left: 2px solid currentColor;
  opacity: 0.48;
}

.venue-card__tree::before {
  position: absolute;
  top: -0.6rem;
  left: -0.8rem;
  width: 1.7rem;
  aspect-ratio: 1;
  border: 2px solid currentColor;
  border-radius: 50%;
  content: '';
}

.venue-card__tree--left {
  left: 3.25rem;
}

.venue-card__tree--right {
  right: 3.25rem;
}

.venue-card__body {
  display: grid;
  gap: 0.3rem;
  justify-items: center;
}

.venue-card__body p,
.venue-card__body h3 {
  margin: 0;
}

.venue-card__body h3 {
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: 1.02rem;
  font-weight: 800;
  line-height: 1.15;
  text-transform: uppercase;
}

.venue-card__time,
.venue-card__address,
.venue-card__label {
  color: var(--color-text-muted);
}

.venue-card__label {
  color: var(--color-primary);
  font-size: 0.8rem;
  font-weight: 900;
  text-transform: uppercase;
}

.venue-card__body--back {
  gap: 0.85rem;
}

.venue-card__body--back h3 {
  font-size: 1.75rem;
}

.venue-card__body--back p:not(.venue-card__label):not(.venue-card__address) {
  max-width: 25rem;
  color: var(--color-text-muted);
  line-height: 1.45;
}

.venue-card__map-link {
  color: var(--color-primary);
  font-size: 0.88rem;
  font-weight: 800;
  text-underline-offset: 0.24em;
  text-transform: uppercase;
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

  .venue-card__art {
    min-height: 10.2rem;
  }

  .venue-card__roof {
    width: 7.8rem;
  }

  .venue-card__tower {
    transform: translate(-3rem, -0.85rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .venue-card__inner {
    transition-duration: 1ms;
  }
}
</style>
