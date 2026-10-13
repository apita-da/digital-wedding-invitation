<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { weddingConfig } from '@/config/wedding'
import countdownFrameWideUrl from '@/assets/illustrations/countdown_frame_wide_white.svg'
import catEnUrl from '@/assets/illustrations/dont_miss_it_cat_en.png'
import catEsUrl from '@/assets/illustrations/dont_miss_it_cat_es.png'

const { locale, t } = useI18n()
const closingArtworkUrl = computed(() => (locale.value === 'en' ? catEnUrl : catEsUrl))

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
        <img
          class="countdown-grid__frame"
          :src="countdownFrameWideUrl"
          alt=""
          aria-hidden="true"
        >
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
      </div>
      <img
        class="countdown-section__artwork"
        :src="closingArtworkUrl"
        alt=""
        aria-hidden="true"
      >
    </div>
  </section>
</template>

<style scoped lang="scss">
.countdown-section {
  background: var(--color-background-alt);
}

.countdown-section :deep(.section-inner > h2) {
  max-width: 23rem;
  margin-inline: auto;
  color: var(--color-text-inverse);
  font-family: var(--font-display);
  font-size: 2.05rem;
  font-weight: 800;
  line-height: 1.25;
}

.countdown-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 0.5rem;
  align-content: center;
  align-items: center;
  justify-content: center;
  width: min(100%, 32rem);
  min-height: 6.4rem;
  margin: 2.4rem auto 0;
  padding: 1.2rem 2.6rem;
  border: 0;
}

.countdown-grid__frame {
  position: absolute;
  top: 0;
  left: 50%;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: fill;
  pointer-events: none;
  transform: translateX(-50%);
}

.countdown-grid div {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: auto auto;
  gap: 0.25rem;
  align-self: center;
  justify-items: center;
  align-items: baseline;
  color: var(--color-text-inverse);
  white-space: nowrap;
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

.countdown-section__artwork {
  display: block;
  width: min(84vw, 20.5rem);
  margin: 2.85rem auto 0;
  border-radius: var(--radius-sm);
}

@media (max-width: 760px) {
  .countdown-grid {
    grid-template-columns: repeat(4, auto);
    gap: 0.4rem;
    width: min(100%, 27rem);
    min-height: 5.9rem;
    padding: 1.35rem 1.85rem;
  }

  .countdown-grid strong {
    font-size: 1.08rem;
  }

  .countdown-grid span {
    font-size: 0.88rem;
  }
}

@media (max-width: 23rem) {
  .countdown-grid {
    gap: 0.22rem;
    width: min(100%, 19.25rem);
    min-height: 5.35rem;
    padding-inline: 0.9rem;
  }

  .countdown-grid strong {
    font-size: 0.86rem;
  }

  .countdown-grid span {
    font-size: 0.68rem;
  }
}
</style>
