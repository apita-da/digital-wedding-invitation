<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import TimelineItem from '@/components/timeline/TimelineItem.vue'
import { weddingConfig } from '@/config/wedding'

const { t } = useI18n()
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
      <span
        class="flourish"
        aria-hidden="true"
      />
      <div class="timeline-list">
        <TimelineItem
          v-for="item in weddingConfig.timeline"
          :key="item.id"
          :item="item"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.timeline-list {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.15rem 0.9rem;
  margin-top: 2rem;
}

.timeline-list::before {
  position: absolute;
  top: -1rem;
  left: 50%;
  width: 1px;
  height: calc(100% + 2rem);
  background: linear-gradient(transparent, rgb(255 250 246 / 0.28), transparent);
  content: '';
}

@media (max-width: 340px) {
  .timeline-list {
    grid-template-columns: 1fr;
  }

  .timeline-list::before {
    display: none;
  }
}
</style>
