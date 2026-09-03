<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { weddingConfig } from '@/config/wedding'
import { getLocalizedText } from '@/i18n/localized'

const { locale, t } = useI18n()
</script>

<template>
  <section
    class="invitation-section invitation-section--light"
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
      <p>{{ getLocalizedText(weddingConfig.dressCode.description, locale) }}</p>
      <div
        class="dresscode-figures"
        aria-hidden="true"
      >
        <span />
        <span />
        <span />
      </div>
      <ul class="dresscode-list">
        <li
          v-for="recommendation in weddingConfig.dressCode.recommendations"
          :key="recommendation.es"
        >
          {{ getLocalizedText(recommendation, locale) }}
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.dresscode-list {
  display: grid;
  gap: 0.8rem;
  margin: 2rem 0 0;
  padding: 0;
  list-style: none;
}

.dresscode-figures {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.9rem;
  margin: 2rem auto 0;
  max-width: 19rem;
}

.dresscode-figures span {
  min-height: 5.5rem;
  border: 2px solid color-mix(in srgb, var(--color-primary) 34%, transparent);
  border-radius: 48% 52% 38% 62% / 18% 20% 14% 16%;
  background: color-mix(in srgb, var(--color-blush, var(--color-surface)) 35%, transparent);
}

.dresscode-list li {
  border-top: 1px solid var(--color-border);
  color: var(--color-text-muted);
  padding-top: 0.8rem;
}
</style>
