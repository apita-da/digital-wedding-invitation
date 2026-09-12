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
  padding: 0 var(--space-page) 4rem;
  background: var(--color-background-alt);
  color: var(--color-text-inverse);
  text-align: center;
}

.footer-section p {
  margin: 0;
  font-family: var(--font-hand);
  font-size: 2.75rem;
  font-weight: 400;
  line-height: 1;
}

.footer-section small {
  display: block;
  margin-top: 1rem;
  color: rgb(255 250 246 / 0.76);
}
</style>
