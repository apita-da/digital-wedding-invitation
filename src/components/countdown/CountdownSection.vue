<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { weddingConfig } from '@/config/wedding'

const { t } = useI18n()

const remaining = computed(() => {
  const distance = Math.max(0, new Date(weddingConfig.date).getTime() - Date.now())
  const days = Math.floor(distance / 86_400_000)
  const hours = Math.floor((distance % 86_400_000) / 3_600_000)
  const minutes = Math.floor((distance % 3_600_000) / 60_000)
  const seconds = Math.floor((distance % 60_000) / 1_000)

  return { days, hours, minutes, seconds }
})
</script>

<template>
  <section
    class="invitation-section invitation-section--light countdown-section"
    aria-labelledby="countdown-title"
  >
    <div class="section-inner">
      <p class="section-kicker">
        {{ t('sections.countdown') }}
      </p>
      <h2 id="countdown-title">
        {{ t('countdown.title') }}
      </h2>
      <div class="countdown-grid">
        <div>
          <strong>{{ remaining.days }}</strong>
          <span>{{ t('countdown.days') }}</span>
        </div>
        <div>
          <strong>{{ remaining.hours }}</strong>
          <span>{{ t('countdown.hours') }}</span>
        </div>
        <div>
          <strong>{{ remaining.minutes }}</strong>
          <span>{{ t('countdown.minutes') }}</span>
        </div>
        <div>
          <strong>{{ remaining.seconds }}</strong>
          <span>{{ t('countdown.seconds') }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.countdown-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
  margin-top: 2rem;
}

.countdown-grid div {
  display: grid;
  gap: 0.25rem;
  justify-items: center;
  border: 1px solid var(--color-border);
  padding: 1rem 0.75rem;
}

.countdown-grid strong {
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 500;
  line-height: 1;
}

.countdown-grid span {
  color: var(--color-text-muted);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>
