<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import VenueCard from '@/components/venue/VenueCard.vue'
import { weddingConfig } from '@/config/wedding'

const { t } = useI18n()
</script>

<template>
  <section
    class="invitation-section invitation-section--light venue-section"
    aria-labelledby="venue-title"
  >
    <div class="section-inner">
      <h2 id="venue-title">
        {{ t('venue.title') }}
      </h2>
      <p class="venue-section__hint">
        {{ t('venue.flip') }}
      </p>
      <VenueCard :venue="weddingConfig.venue" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.venue-section :deep(.section-inner > h2) {
  margin: 0;
  color: var(--color-primary);
  font-size: 3.15rem;
}

.venue-section__hint {
  margin: 0.15rem 0 0;
  color: var(--color-text);
  font-size: 0.78rem;
  font-weight: 900;
  line-height: 1.25;
  text-transform: uppercase;
}

@media (max-width: 23rem) {
  .venue-section :deep(.section-inner > h2) {
    font-size: 2.65rem;
  }
}
</style>
