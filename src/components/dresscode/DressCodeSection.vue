<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { weddingConfig } from '@/config/wedding'
import { getLocalizedText } from '@/i18n/localized'

const { locale, t } = useI18n()
</script>

<template>
  <section
    class="invitation-section invitation-section--light dresscode-section"
    aria-labelledby="dresscode-title"
  >
    <div class="section-inner">
      <p class="section-kicker">
        {{ t('sections.dressCode') }}
      </p>
      <h2 id="dresscode-title">
        {{ getLocalizedText(weddingConfig.dressCode.title, locale) }}
      </h2>
      <span
        class="flourish"
        aria-hidden="true"
      />

      <p class="dresscode-section__intro">
        {{ getLocalizedText(weddingConfig.dressCode.description, locale) }}
      </p>

      <div class="dresscode-guide">
        <section
          class="dresscode-guide__block"
          aria-labelledby="dresscode-recommended-title"
        >
          <h3 id="dresscode-recommended-title">
            {{ t('dressCode.recommendedTitle') }}
          </h3>
          <ul>
            <li
              v-for="recommendation in weddingConfig.dressCode.recommendations"
              :key="recommendation.es"
            >
              {{ getLocalizedText(recommendation, locale) }}
            </li>
          </ul>
        </section>

        <section
          class="dresscode-guide__block"
          aria-labelledby="dresscode-avoid-title"
        >
          <h3 id="dresscode-avoid-title">
            {{ t('dressCode.avoidTitle') }}
          </h3>
          <ul>
            <li
              v-for="item in weddingConfig.dressCode.avoid"
              :key="item.es"
            >
              {{ getLocalizedText(item, locale) }}
            </li>
          </ul>
        </section>
      </div>

      <div
        class="dresscode-illustrations"
        aria-hidden="true"
      >
        <span class="dresscode-illustration dresscode-illustration--jacket">
          <span />
        </span>
        <span class="dresscode-illustration dresscode-illustration--dress">
          <span />
        </span>
        <span class="dresscode-illustration dresscode-illustration--party">
          <span />
        </span>
      </div>

      <p class="dresscode-section__note">
        {{ getLocalizedText(weddingConfig.dressCode.note, locale) }}
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.dresscode-section {
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--color-blush) 38%, transparent), transparent 18rem),
    var(--color-background);
}

.dresscode-section__intro {
  color: var(--color-text-muted);
}

.dresscode-guide {
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
  text-align: left;
}

.dresscode-guide__block {
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.dresscode-guide__block h3 {
  margin: 0;
  color: var(--color-primary);
  font-size: 1rem;
  text-transform: uppercase;
}

.dresscode-guide__block ul {
  display: grid;
  gap: 0.72rem;
  margin: 0.9rem 0 0;
  padding: 0;
  list-style: none;
}

.dresscode-guide__block li {
  color: var(--color-text-muted);
  line-height: 1.45;
}

.dresscode-illustrations {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.9rem;
  margin: 2rem auto 0;
  max-width: 21rem;
}

.dresscode-illustration {
  position: relative;
  display: grid;
  min-height: 7.25rem;
  place-items: center;
  border: 1.5px solid color-mix(in srgb, var(--color-primary) 38%, transparent);
  color: color-mix(in srgb, var(--color-primary) 72%, var(--color-primary-soft));
  transform: rotate(-2deg);
}

.dresscode-illustration:nth-child(2) {
  transform: rotate(1.5deg);
}

.dresscode-illustration:nth-child(3) {
  transform: rotate(-1deg);
}

.dresscode-illustration::before {
  position: absolute;
  inset: -0.28rem;
  border: 1px solid currentColor;
  opacity: 0.35;
  content: '';
}

.dresscode-illustration span,
.dresscode-illustration span::before,
.dresscode-illustration span::after {
  position: absolute;
  content: '';
}

.dresscode-illustration--jacket span {
  width: 2.4rem;
  height: 3.7rem;
  border: 2px solid currentColor;
  border-radius: 1rem 1rem 0.3rem 0.3rem;
}

.dresscode-illustration--jacket span::before,
.dresscode-illustration--jacket span::after {
  top: 0.55rem;
  width: 1.1rem;
  height: 2.9rem;
  border-top: 2px solid currentColor;
}

.dresscode-illustration--jacket span::before {
  left: -0.95rem;
  border-left: 2px solid currentColor;
  transform: rotate(15deg);
}

.dresscode-illustration--jacket span::after {
  right: -0.95rem;
  border-right: 2px solid currentColor;
  transform: rotate(-15deg);
}

.dresscode-illustration--dress span {
  top: 2rem;
  width: 2rem;
  height: 1.5rem;
  border: 2px solid currentColor;
  border-bottom: 0;
  border-radius: 1rem 1rem 0 0;
}

.dresscode-illustration--dress span::after {
  top: 1.28rem;
  left: -0.8rem;
  width: 3.6rem;
  height: 3.1rem;
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
  background: currentColor;
  opacity: 0.22;
}

.dresscode-illustration--party span {
  width: 2.4rem;
  height: 3.2rem;
  border: 2px solid currentColor;
  border-radius: 0.5rem 0.5rem 1.2rem 1.2rem;
}

.dresscode-illustration--party span::before,
.dresscode-illustration--party span::after {
  top: -0.65rem;
  width: 0.9rem;
  height: 2.5rem;
  border-top: 2px solid currentColor;
}

.dresscode-illustration--party span::before {
  left: -0.82rem;
  border-left: 2px solid currentColor;
  transform: rotate(35deg);
}

.dresscode-illustration--party span::after {
  right: -0.82rem;
  border-right: 2px solid currentColor;
  transform: rotate(-35deg);
}

.dresscode-section__note {
  margin-top: 2rem;
  border: 2px solid color-mix(in srgb, var(--color-primary) 28%, transparent);
  border-radius: var(--radius-sm);
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 800;
  line-height: 1.35;
  padding: 1rem;
}

@media (min-width: 42rem) {
  .dresscode-guide {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
