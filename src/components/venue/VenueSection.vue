<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { weddingConfig } from '@/config/wedding'
import { getLocalizedText } from '@/i18n/localized'

const { locale, t } = useI18n()
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
      <article class="venue-card">
        <div
          class="venue-card__art"
          aria-hidden="true"
        />
        <div class="venue-card__body">
          <p class="venue-card__time">
            {{ weddingConfig.venue.time }}
          </p>
          <h3>{{ weddingConfig.venue.name }}</h3>
          <p>{{ getLocalizedText(weddingConfig.venue.description, locale) }}</p>
          <p class="venue-card__address">
            {{ weddingConfig.venue.address }}
          </p>
          <a :href="weddingConfig.venue.mapUrl">{{ t('venue.directions') }}</a>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
.venue-card {
  display: grid;
  gap: 1.4rem;
  margin-top: 2rem;
  padding: 1.2rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
}

.venue-card__art {
  min-height: 12rem;
  border: 1px solid color-mix(in srgb, var(--color-primary) 28%, transparent);
  background:
    linear-gradient(145deg, transparent 46%, color-mix(in srgb, var(--color-primary) 24%, transparent) 47% 50%, transparent 51%),
    var(--color-background);
}

.venue-card__body {
  display: grid;
  gap: 0.7rem;
}

.venue-card__body p,
.venue-card__body h3 {
  margin: 0;
}

.venue-card__time,
.venue-card__address {
  color: var(--color-text-muted);
}

.venue-card a {
  color: var(--color-primary);
  font-weight: 700;
}
</style>
