<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { getLocalizedText } from '@/i18n/localized'
import type { TimelineItem } from '@/types/wedding'

const props = defineProps<{
  item: TimelineItem
}>()

const { locale } = useI18n()
</script>

<template>
  <article class="timeline-item">
    <div
      class="timeline-item__stamp"
      :class="`timeline-item__stamp--${props.item.icon}`"
      aria-hidden="true"
    >
      <span />
    </div>
    <div class="timeline-item__content">
      <p class="timeline-item__time">
        {{ props.item.time }}
      </p>
      <h3>{{ getLocalizedText(props.item.title, locale) }}</h3>
      <p>{{ getLocalizedText(props.item.description, locale) }}</p>
    </div>
  </article>
</template>

<style scoped lang="scss">
.timeline-item {
  position: relative;
  display: grid;
  gap: 0.8rem;
  min-height: 11.5rem;
  justify-items: center;
  padding: 1rem 0.75rem;
  border: 1px solid rgb(255 250 246 / 0.26);
  background: rgb(255 250 246 / 0.035);
  text-align: center;
}

.timeline-item:nth-child(2),
.timeline-item:nth-child(3) {
  transform: rotate(1deg);
}

.timeline-item:nth-child(1),
.timeline-item:nth-child(4) {
  transform: rotate(-1deg);
}

.timeline-item__stamp {
  position: relative;
  display: grid;
  width: 4.8rem;
  aspect-ratio: 0.82;
  place-items: center;
  border: 1.5px solid rgb(255 250 246 / 0.46);
  color: color-mix(in srgb, var(--color-surface) 72%, var(--color-primary-soft));
}

.timeline-item__stamp::before {
  position: absolute;
  inset: -0.28rem;
  border: 1px solid currentColor;
  opacity: 0.45;
  content: '';
}

.timeline-item__stamp span,
.timeline-item__stamp span::before,
.timeline-item__stamp span::after {
  position: absolute;
  content: '';
}

.timeline-item__stamp--rings span {
  width: 1.6rem;
  height: 1.6rem;
  border: 2px solid currentColor;
  border-radius: 50%;
  transform: translateX(-0.45rem);
}

.timeline-item__stamp--rings span::after {
  width: 1.6rem;
  height: 1.6rem;
  border: 2px solid currentColor;
  border-radius: 50%;
  transform: translateX(0.9rem);
}

.timeline-item__stamp--glass span {
  width: 1.7rem;
  height: 2.2rem;
  border: 2px solid currentColor;
  border-top: 0;
  border-radius: 0 0 1rem 1rem;
}

.timeline-item__stamp--glass span::after {
  top: 2.1rem;
  left: 0.72rem;
  width: 2px;
  height: 1.2rem;
  background: currentColor;
}

.timeline-item__stamp--plate span {
  width: 2.5rem;
  aspect-ratio: 1;
  border: 2px solid currentColor;
  border-radius: 50%;
}

.timeline-item__stamp--plate span::after {
  inset: 0.45rem;
  border: 1.5px solid currentColor;
  border-radius: 50%;
}

.timeline-item__stamp--music span {
  width: 1.4rem;
  height: 2.6rem;
  border-right: 2px solid currentColor;
  border-top: 2px solid currentColor;
}

.timeline-item__stamp--music span::before,
.timeline-item__stamp--music span::after {
  bottom: -0.2rem;
  width: 0.9rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background: currentColor;
}

.timeline-item__stamp--music span::before {
  left: -0.55rem;
}

.timeline-item__stamp--music span::after {
  right: -0.2rem;
  transform: translateY(-1.35rem);
}

.timeline-item__content {
  display: grid;
  gap: 0.4rem;
}

.timeline-item__content h3,
.timeline-item__content p {
  margin: 0;
}

.timeline-item__content h3 {
  font-size: 1.4rem;
  text-transform: uppercase;
}

.timeline-item__time {
  font-family: var(--font-display);
  font-size: 1.45rem;
}

.timeline-item__content p:last-child {
  color: rgb(255 250 246 / 0.76);
  font-size: 0.92rem;
}
</style>
