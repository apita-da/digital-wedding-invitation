<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import LanguageSwitcher from '@/components/shared/LanguageSwitcher.vue'
import { weddingConfig } from '@/config/wedding'
import { formatWeddingDate, getLocalizedText } from '@/i18n/localized'
import planeEnUrl from '@/assets/illustrations/plane_en.png'
import planeEsUrl from '@/assets/illustrations/plane_es.png'
import whiteFrameUrl from '@/assets/illustrations/white_frame_transparent.png'

const { locale, t } = useI18n()
const heroArtworkUrl = computed(() => (locale.value === 'en' ? planeEnUrl : planeEsUrl))
</script>

<template>
  <section
    class="invitation-section invitation-section--dark hero-section"
    aria-labelledby="hero-title"
  >
    <div class="hero-section__language">
      <LanguageSwitcher />
    </div>

    <div class="section-inner hero-section__inner">
      <img
        class="hero-section__artwork"
        :src="heroArtworkUrl"
        alt=""
        aria-hidden="true"
      >
      <h1
        id="hero-title"
        class="visually-hidden"
      >
        {{ t('hero.eyebrow') }}.
        {{ weddingConfig.couple.person1 }}
        <span>&</span>
        {{ weddingConfig.couple.person2 }}
      </h1>
      <p class="hero-section__date">
        <img
          class="hero-section__date-frame"
          :src="whiteFrameUrl"
          alt=""
          aria-hidden="true"
        >
        <span>{{ formatWeddingDate(weddingConfig.date, locale) }}</span>
      </p>
      <p class="hero-section__intro">
        {{ getLocalizedText(weddingConfig.intro, locale) }}
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero-section {
  background: var(--color-background-alt);
}

.hero-section__language {
  position: absolute;
  top: calc(0.85rem + env(safe-area-inset-top));
  right: max(0.85rem, env(safe-area-inset-right));
  z-index: 2;
}

.hero-section__inner {
  display: grid;
  justify-items: center;
  gap: 1.6rem;
  min-height: calc(100dvh - (var(--section-y) * 2));
  align-content: center;
  text-align: center;
}

.hero-section__artwork {
  display: block;
  width: min(112%, 43rem);
  max-width: none;
  aspect-ratio: 3 / 2;
  object-fit: contain;
  object-position: center;
  user-select: none;
  pointer-events: none;
}

.hero-section__date {
  position: relative;
  display: inline-grid;
  width: min(100%, 25.5rem);
  min-height: 5.6rem;
  place-items: center;
  margin: 0;
  padding: 1rem 2.8rem;
  border: 0;
  font-family: var(--font-display);
  color: var(--color-text-inverse);
  font-size: 1.45rem;
  font-weight: 800;
  text-transform: uppercase;
}

.hero-section__date-frame {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: fill;
  pointer-events: none;
}

.hero-section__date span {
  position: relative;
  z-index: 1;
}

.hero-section__intro {
  width: min(100%, 28rem);
  max-width: 28rem;
  margin: 0;
  color: var(--color-text-inverse);
  font-size: 0.92rem;
  font-weight: 900;
  line-height: 1.45;
  text-wrap: balance;
  text-transform: uppercase;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

@media (max-width: 23rem) {
  .hero-section__inner {
    gap: 1rem;
  }

  .hero-section__artwork {
    width: min(112%, 29rem);
  }

  .hero-section__date {
    font-size: 1.12rem;
    width: min(100%, 20.5rem);
    min-height: 4.8rem;
    padding-inline: 1.8rem;
  }
}
</style>
