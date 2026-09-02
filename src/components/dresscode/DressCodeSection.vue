<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { weddingConfig } from '@/config/wedding'
import { getLocalizedText } from '@/i18n/localized'

const { locale, t } = useI18n()
</script>

<template>
  <section
    class="invitation-section invitation-section--dark"
    aria-labelledby="dresscode-title"
  >
    <div class="section-inner">
      <p class="section-kicker">
        {{ t('sections.dressCode') }}
      </p>
      <h2 id="dresscode-title">
        {{ getLocalizedText(weddingConfig.dressCode.title, locale) }}
      </h2>
      <p>{{ getLocalizedText(weddingConfig.dressCode.description, locale) }}</p>
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

.dresscode-list li {
  border-top: 1px solid rgb(255 250 246 / 0.24);
  padding-top: 0.8rem;
}
</style>
