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
        :aria-hidden="isFlipped"
        :inert="isFlipped"
      >
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
          <p class="venue-card__time">
            {{ props.venue.time }}
          </p>
          <h3>{{ props.venue.name }}</h3>
          <p>{{ getLocalizedText(props.venue.description, locale) }}</p>
        </div>
        <button
          class="venue-card__flip-cue"
          type="button"
          :aria-label="flipLabel"
          :aria-pressed="isFlipped"
          @click="toggleFlip"
        >
          <span aria-hidden="true" />
        </button>
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
  margin-top: 2rem;
  perspective: 90rem;
}

.venue-card__inner {
  position: relative;
  min-height: 31rem;
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
  gap: 1.4rem;
  padding: 1rem;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-sm);
  backface-visibility: hidden;
  background: var(--color-surface);
  box-shadow: var(--shadow-soft);
  text-align: center;
}

.venue-card__face--back {
  transform: rotateY(180deg);
}

.venue-card__art {
  position: relative;
  display: grid;
  min-height: 13rem;
  place-items: center;
  overflow: hidden;
  border: 2px solid color-mix(in srgb, var(--color-primary) 28%, transparent);
  border-radius: var(--radius-sm);
  background:
    linear-gradient(180deg, transparent 68%, color-mix(in srgb, var(--color-primary) 11%, transparent) 69%),
    var(--color-background);
}

.venue-card__art::before {
  position: absolute;
  inset: 1.1rem;
  border: 2px solid color-mix(in srgb, var(--color-primary) 38%, transparent);
  border-radius: 48% 52% 45% 55% / 8% 12% 10% 9%;
  content: '';
}

.venue-card__roof,
.venue-card__tower,
.venue-card__door {
  position: absolute;
  border: 2px solid var(--color-primary);
  opacity: 0.66;
}

.venue-card__roof {
  width: 8rem;
  height: 4.8rem;
  border-bottom: 0;
  transform: translateY(0.2rem);
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
  width: 1.45rem;
  height: 6rem;
  border-bottom: 0;
  transform: translate(-3.2rem, -1.1rem);
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
  bottom: 3.6rem;
  width: 1.5rem;
  height: 2.3rem;
  border-radius: 1rem 1rem 0 0;
}

.venue-card__tree {
  position: absolute;
  bottom: 3.2rem;
  width: 1.2rem;
  height: 3.7rem;
  border-left: 2px solid var(--color-primary);
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
  left: 4rem;
}

.venue-card__tree--right {
  right: 4rem;
}

.venue-card__body {
  display: grid;
  gap: 0.75rem;
  justify-items: center;
}

.venue-card__body p,
.venue-card__body h3 {
  margin: 0;
}

.venue-card__body h3 {
  color: var(--color-primary);
  font-size: 2.05rem;
}

.venue-card__time,
.venue-card__address,
.venue-card__label {
  color: var(--color-text-muted);
}

.venue-card__label {
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
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
  right: 1rem;
  bottom: 1rem;
  display: grid;
  width: 2.65rem;
  aspect-ratio: 1;
  place-items: center;
  border: 1px solid color-mix(in srgb, var(--color-primary) 34%, transparent);
  border-radius: 50%;
  background: color-mix(in srgb, var(--color-surface) 74%, transparent);
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
  background: var(--color-primary);
  color: var(--color-text-inverse);
  text-decoration: none;
}

@media (prefers-reduced-motion: reduce) {
  .venue-card__inner {
    transition-duration: 1ms;
  }
}
</style>
