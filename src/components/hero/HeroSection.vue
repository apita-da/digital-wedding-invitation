<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import LanguageSwitcher from '@/components/shared/LanguageSwitcher.vue'
import { weddingConfig } from '@/config/wedding'
import { formatWeddingDate, getLocalizedText } from '@/i18n/localized'

const { locale, t } = useI18n()
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
  gap: 1.65rem;
  min-height: calc(100dvh - (var(--section-y) * 2));
  align-content: center;
  text-align: center;
}

.hero-section__illustration {
  position: relative;
  display: grid;
  width: min(86vw, 28rem);
  min-height: 11rem;
  place-items: center;
  border: 0;
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
  width: 64%;
  transform: rotate(-5deg) translate(-0.4rem, -1.25rem);
}

.hero-section__illustration::after {
  width: 42%;
  transform: rotate(4deg) translate(1rem, 2rem);
}

.hero-section__moon {
  position: absolute;
  top: 1.7rem;
  right: 4.4rem;
  width: 2.1rem;
  aspect-ratio: 1;
  border: 1.5px solid currentColor;
  border-left-color: transparent;
  border-radius: 50%;
  opacity: 0.7;
}

.hero-section__car {
  position: relative;
  width: min(58%, 15rem);
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
  gap: 0.15rem;
  font-family: var(--font-hand);
  font-size: 4rem;
  font-weight: 400;
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
  position: relative;
  display: inline-grid;
  min-width: min(100%, 18.5rem);
  min-height: 4.85rem;
  place-items: center;
  margin: 0;
  padding: 0.9rem 1.5rem;
  border-inline: 2px solid rgb(255 250 246 / 0.82);
  border-radius: 1rem;
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 800;
  text-transform: uppercase;
}

.hero-section__date::before,
.hero-section__date::after {
  position: absolute;
  right: 1rem;
  left: 1rem;
  height: 0.8rem;
  background:
    radial-gradient(circle at 0.42rem 50%, transparent 0.28rem, currentColor 0.3rem 0.36rem, transparent 0.38rem)
      0 0 / 1.05rem 100% repeat-x;
  color: rgb(255 250 246 / 0.82);
  content: '';
}

.hero-section__date::before {
  top: -0.42rem;
}

.hero-section__date::after {
  bottom: -0.42rem;
}

.hero-section__intro {
  max-width: 28rem;
  margin: 0;
  color: rgb(255 250 246 / 0.82);
  font-size: 0.92rem;
  font-weight: 900;
  line-height: 1.55;
  text-wrap: balance;
  text-transform: uppercase;
}

@media (max-width: 23rem) {
  .hero-section__inner {
    gap: 1rem;
  }

  .hero-section__illustration {
    width: min(82vw, 18rem);
    min-height: 9.5rem;
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
