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
    class="invitation-section invitation-section--dark countdown-section"
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
.countdown-section {
  background: var(--color-background-alt);
}

.countdown-section :deep(.section-inner > h2) {
  max-width: 24rem;
  margin-inline: auto;
  color: var(--color-text-inverse);
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 800;
  line-height: 1.28;
}

.countdown-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 0.6rem;
  justify-content: center;
  width: min(100%, 23rem);
  min-height: 5rem;
  margin: 2.4rem auto 0;
  padding: 1.15rem 1.25rem;
  border-inline: 2px solid rgb(255 250 246 / 0.82);
  border-radius: var(--radius-sm);
}

.countdown-grid::before,
.countdown-grid::after {
  position: absolute;
  right: 0.9rem;
  left: 0.9rem;
  height: 0.8rem;
  background:
    radial-gradient(circle at 0.42rem 50%, transparent 0.28rem, currentColor 0.3rem 0.36rem, transparent 0.38rem)
      0 0 / 1.05rem 100% repeat-x;
  color: rgb(255 250 246 / 0.82);
  content: '';
}

.countdown-grid::before {
  top: -0.42rem;
}

.countdown-grid::after {
  bottom: -0.42rem;
}

.countdown-grid div {
  display: grid;
  grid-template-columns: auto auto;
  gap: 0.25rem;
  justify-items: center;
  align-items: baseline;
  color: var(--color-text-inverse);
}

.countdown-grid strong {
  color: var(--color-text-inverse);
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 900;
  line-height: 1;
}

.countdown-grid span {
  color: var(--color-text-inverse);
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 800;
  letter-spacing: 0;
}

@media (max-width: 23rem) {
  .countdown-grid {
    grid-template-columns: repeat(2, auto);
  }
}
</style>
