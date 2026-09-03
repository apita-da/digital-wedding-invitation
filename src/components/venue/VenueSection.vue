<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import VenueCard from '@/components/venue/VenueCard.vue'
import { weddingConfig } from '@/config/wedding'

const { t } = useI18n()
</script>

<template>
  <section
    class="invitation-section invitation-section--light"
    aria-labelledby="venue-title"
  >
    <div class="section-inner">
      <p class="section-kicker">
        {{ t('sections.venue') }}
      </p>
      <h2 id="venue-title">
        {{ t('venue.title') }}
      </h2>
      <span
        class="flourish"
        aria-hidden="true"
      />
      <VenueCard :venue="weddingConfig.venue" />
    </div>
  </section>
</template>
