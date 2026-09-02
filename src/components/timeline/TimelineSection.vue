<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { weddingConfig } from '@/config/wedding'
import { getLocalizedText } from '@/i18n/localized'

const { locale, t } = useI18n()
</script>

<template>
  <section
    class="invitation-section invitation-section--dark"
    aria-labelledby="timeline-title"
  >
    <div class="section-inner">
      <p class="section-kicker">
        {{ t('sections.timeline') }}
      </p>
      <h2 id="timeline-title">
        {{ t('timeline.title') }}
      </h2>
      <div class="timeline-list">
        <article
          v-for="item in weddingConfig.timeline"
          :key="item.id"
          class="timeline-item"
        >
          <span
            class="timeline-item__icon"
            aria-hidden="true"
          >{{ item.time }}</span>
          <h3>{{ getLocalizedText(item.title, locale) }}</h3>
          <p>{{ getLocalizedText(item.description, locale) }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.timeline-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.timeline-item {
  display: grid;
  gap: 0.55rem;
  padding: 1rem;
  border: 1px solid rgb(255 250 246 / 0.26);
}

.timeline-item__icon {
  font-family: var(--font-display);
  font-size: 1.4rem;
}

.timeline-item h3,
.timeline-item p {
  margin: 0;
}

.timeline-item p {
  color: rgb(255 250 246 / 0.76);
  font-size: 0.92rem;
}

@media (max-width: 340px) {
  .timeline-list {
    grid-template-columns: 1fr;
  }
}
</style>
