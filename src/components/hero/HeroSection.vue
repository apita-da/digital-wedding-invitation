<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { weddingConfig } from '@/config/wedding'
import { formatWeddingDate, getLocalizedText } from '@/i18n/localized'

const { locale, t } = useI18n()
</script>

<template>
  <section
    class="invitation-section invitation-section--dark hero-section"
    aria-labelledby="hero-title"
  >
    <div class="section-inner hero-section__inner">
      <p class="section-kicker">
        {{ t('hero.eyebrow') }}
      </p>
      <div
        class="hero-section__illustration"
        aria-hidden="true"
      >
        <span />
      </div>
      <h1
        id="hero-title"
        class="hero-section__title"
      >
        {{ weddingConfig.couple.person1 }}
        <span>&</span>
        {{ weddingConfig.couple.person2 }}
      </h1>
      <span
        class="flourish"
        aria-hidden="true"
      />
      <p class="hero-section__date">
        {{ formatWeddingDate(weddingConfig.date, locale) }}
      </p>
      <p class="hero-section__intro">
        {{ getLocalizedText(weddingConfig.intro, locale) }}
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero-section__inner {
  display: grid;
  justify-items: center;
  gap: 1.5rem;
  text-align: center;
}

.hero-section__illustration {
  display: grid;
  width: min(62vw, 17rem);
  aspect-ratio: 1;
  place-items: center;
  border: 1px solid rgb(255 250 246 / 0.34);
  border-radius: 50%;
  opacity: 0.9;
}

.hero-section__illustration span {
  width: 54%;
  aspect-ratio: 0.62;
  border: 1.5px solid currentColor;
  border-radius: 50% 50% 46% 46%;
  opacity: 0.62;
}

.hero-section__title {
  display: grid;
  gap: 0.3rem;
  font-family: var(--font-hand);
  font-size: 4.6rem;
  font-weight: 500;
}

@media (min-width: 760px) {
  .hero-section__title {
    font-size: 6.4rem;
  }
}

.hero-section__title span {
  font-size: 0.36em;
}

.hero-section__date {
  display: inline-grid;
  margin: 0;
  padding: 0.7rem 1rem;
  border-block: 1px solid rgb(255 250 246 / 0.36);
  font-family: var(--font-display);
  font-size: 1.4rem;
}

.hero-section__intro {
  max-width: 28rem;
  margin: 0;
  color: rgb(255 250 246 / 0.82);
}
</style>
