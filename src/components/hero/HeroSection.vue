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
        <span class="hero-section__moon" />
        <span class="hero-section__car" />
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
      <a
        class="hero-section__cue"
        href="#venue-title"
      >
        {{ t('hero.scrollCue') }}
      </a>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero-section__inner {
  display: grid;
  justify-items: center;
  gap: 1.35rem;
  min-height: calc(100dvh - (var(--section-y) * 2));
  align-content: center;
  text-align: center;
}

.hero-section__illustration {
  position: relative;
  display: grid;
  width: min(62vw, 17rem);
  aspect-ratio: 1;
  place-items: center;
  border: 1px solid rgb(255 250 246 / 0.28);
  border-radius: 50%;
  opacity: 0.9;
}

.hero-section__illustration::before,
.hero-section__illustration::after {
  position: absolute;
  height: 1px;
  background: currentColor;
  content: '';
  opacity: 0.45;
}

.hero-section__illustration::before {
  width: 70%;
  transform: rotate(-8deg) translateY(-1.7rem);
}

.hero-section__illustration::after {
  width: 48%;
  transform: rotate(6deg) translateY(2rem);
}

.hero-section__moon {
  position: absolute;
  top: 1.7rem;
  right: 3.2rem;
  width: 2.1rem;
  aspect-ratio: 1;
  border: 1.5px solid currentColor;
  border-left-color: transparent;
  border-radius: 50%;
  opacity: 0.7;
}

.hero-section__car {
  position: relative;
  width: 50%;
  height: 2.6rem;
  border: 1.5px solid currentColor;
  border-top: 0;
  opacity: 0.68;
}

.hero-section__car::before,
.hero-section__car::after {
  position: absolute;
  bottom: -0.55rem;
  width: 1rem;
  aspect-ratio: 1;
  border: 1.5px solid currentColor;
  border-radius: 50%;
  background: var(--color-background-alt);
  content: '';
}

.hero-section__car::before {
  left: 0.8rem;
}

.hero-section__car::after {
  right: 0.8rem;
}

.hero-section__title {
  display: grid;
  gap: 0.3rem;
  font-family: var(--font-hand);
  font-size: 3.9rem;
  font-weight: 500;
  line-height: 0.9;
  overflow-wrap: anywhere;
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
  padding: 0.85rem 1.4rem;
  border: 1px solid rgb(255 250 246 / 0.36);
  border-radius: 46% 54% 48% 52% / 18% 22% 16% 20%;
  font-family: var(--font-display);
  font-size: 1.4rem;
}

.hero-section__intro {
  max-width: 28rem;
  margin: 0;
  color: rgb(255 250 246 / 0.82);
  text-wrap: balance;
}

.hero-section__cue {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
  justify-content: center;
  margin-top: 0.4rem;
  border-bottom: 1px solid currentColor;
  color: rgb(255 250 246 / 0.82);
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
}

@media (max-width: 23rem) {
  .hero-section__inner {
    gap: 1rem;
  }

  .hero-section__illustration {
    width: min(58vw, 13rem);
  }

  .hero-section__title {
    font-size: 3.25rem;
  }

  .hero-section__date {
    font-size: 1.12rem;
    padding-inline: 1rem;
  }
}
</style>
