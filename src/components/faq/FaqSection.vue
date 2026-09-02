<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { weddingConfig } from '@/config/wedding'
import { getLocalizedText } from '@/i18n/localized'

const { locale, t } = useI18n()
</script>

<template>
  <section
    class="invitation-section invitation-section--light"
    aria-labelledby="faq-title"
  >
    <div class="section-inner">
      <p class="section-kicker">
        {{ t('sections.faq') }}
      </p>
      <h2 id="faq-title">
        {{ t('sections.faq') }}
      </h2>
      <div class="faq-list">
        <details
          v-for="item in weddingConfig.faq"
          :key="item.id"
        >
          <summary>{{ getLocalizedText(item.question, locale) }}</summary>
          <p>{{ getLocalizedText(item.answer, locale) }}</p>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.faq-list {
  display: grid;
  gap: 0.8rem;
  margin-top: 2rem;
}

details {
  border-bottom: 1px solid var(--color-border);
  padding: 0.8rem 0;
}

summary {
  cursor: pointer;
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: 1.35rem;
}

details p {
  margin: 0.8rem 0 0;
  color: var(--color-text-muted);
}
</style>
