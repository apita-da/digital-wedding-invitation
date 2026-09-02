<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { weddingConfig } from '@/config/wedding'
import { formatWeddingDate, getLocalizedText } from '@/i18n/localized'

const { locale } = useI18n()
</script>

<template>
  <footer class="footer-section">
    <div class="section-inner">
      <p>{{ weddingConfig.couple.person1 }} & {{ weddingConfig.couple.person2 }}</p>
      <p>{{ formatWeddingDate(weddingConfig.date, locale) }}</p>
      <small>{{ getLocalizedText(weddingConfig.footer.message, locale) }}</small>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer-section {
  padding: 3rem var(--space-page);
  background: var(--color-primary);
  color: var(--color-text-inverse);
  text-align: center;
}

.footer-section p {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.5rem;
}

.footer-section small {
  display: block;
  margin-top: 1rem;
  color: rgb(255 250 246 / 0.76);
}
</style>
