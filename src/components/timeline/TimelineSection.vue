<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { weddingConfig } from '@/config/wedding'
import { getLocalizedText } from '@/i18n/localized'

const { locale, t } = useI18n()

const stamps = ['glass', 'venue', 'flowers']
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
          <h3>{{ getLocalizedText(item.title, locale) }}</h3>
          <span aria-hidden="true" />
          <p>{{ item.time }}</p>
        </article>
      </div>
      <div
        class="timeline-stamps"
        aria-hidden="true"
      >
        <span
          v-for="stamp in stamps"
          :key="stamp"
          class="timeline-stamp"
          :class="`timeline-stamp--${stamp}`"
        >
          <span />
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.timeline-list,
.timeline-stamps {
  width: min(100%, 28rem);
  margin-inline: auto;
}

.timeline-list {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2.2rem 2.35rem;
  margin-top: 2.75rem;
}

.timeline-item {
  display: grid;
  gap: 0.62rem;
  justify-items: center;
  text-align: center;
}

.timeline-item h3,
.timeline-item p {
  margin: 0;
}

.timeline-item h3 {
  font-family: var(--font-display);
  font-size: 1.12rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.timeline-item span {
  width: 4rem;
  height: 0.72rem;
  background:
    radial-gradient(circle at 0.4rem 50%, transparent 0.25rem, currentColor 0.27rem 0.33rem, transparent 0.35rem)
      0 0 / 1.05rem 100% repeat-x;
  color: rgb(255 250 246 / 0.86);
}

.timeline-item p {
  color: var(--color-text-inverse);
  font-family: var(--font-display);
  font-size: 1.12rem;
  font-weight: 900;
}

.timeline-stamps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.15rem;
  margin-top: 3.2rem;
}

.timeline-stamp {
  position: relative;
  display: grid;
  min-height: 7.2rem;
  place-items: center;
  border: 1.5px solid rgb(255 250 246 / 0.72);
  color: rgb(255 250 246 / 0.82);
  transform: rotate(-3deg);
}

.timeline-stamp:nth-child(2) {
  transform: rotate(2deg);
}

.timeline-stamp:nth-child(3) {
  transform: rotate(5deg);
}

.timeline-stamp::before {
  position: absolute;
  inset: -0.28rem;
  border: 1px solid currentColor;
  content: '';
  opacity: 0.48;
}

.timeline-stamp > span,
.timeline-stamp > span::before,
.timeline-stamp > span::after {
  position: absolute;
  content: '';
}

.timeline-stamp--glass > span {
  width: 1.55rem;
  height: 2rem;
  border: 2px solid currentColor;
  border-top: 0;
  border-radius: 0 0 1rem 1rem;
}

.timeline-stamp--glass > span::before {
  top: 1.95rem;
  left: 0.68rem;
  width: 2px;
  height: 1.2rem;
  background: currentColor;
}

.timeline-stamp--glass > span::after {
  top: 3.08rem;
  left: -0.3rem;
  width: 2.2rem;
  height: 2px;
  background: currentColor;
}

.timeline-stamp--venue > span {
  width: 3.9rem;
  height: 2.8rem;
  border: 2px solid currentColor;
  border-bottom: 0;
}

.timeline-stamp--venue > span::before {
  left: -0.75rem;
  bottom: 0;
  width: 0.9rem;
  height: 3.8rem;
  border: 2px solid currentColor;
  border-bottom: 0;
}

.timeline-stamp--venue > span::after {
  bottom: -0.05rem;
  left: 1.5rem;
  width: 0.85rem;
  height: 1.25rem;
  border: 2px solid currentColor;
  border-radius: 1rem 1rem 0 0;
}

.timeline-stamp--flowers > span {
  width: 2px;
  height: 3.2rem;
  background: currentColor;
}

.timeline-stamp--flowers > span::before,
.timeline-stamp--flowers > span::after {
  top: -0.25rem;
  width: 1.25rem;
  aspect-ratio: 1;
  border: 2px solid currentColor;
  border-radius: 50%;
}

.timeline-stamp--flowers > span::before {
  left: -1.05rem;
}

.timeline-stamp--flowers > span::after {
  right: -1.05rem;
}

@media (max-width: 340px) {
  .timeline-list {
    grid-template-columns: 1fr;
  }
}
</style>
