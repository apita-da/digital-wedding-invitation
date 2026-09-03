<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import LanguageSwitcher from '@/components/shared/LanguageSwitcher.vue'
import { weddingConfig } from '@/config/wedding'

const { t } = useI18n()
const emit = defineEmits<{
  open: []
}>()

const isOpening = ref(false)

const openEnvelope = () => {
  if (isOpening.value) {
    return
  }

  isOpening.value = true

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.setTimeout(
    () => {
      emit('open')
    },
    prefersReducedMotion ? 80 : 1120,
  )
}
</script>

<template>
  <section
    class="envelope-intro"
    aria-labelledby="envelope-title"
  >
    <div class="envelope-intro__language">
      <LanguageSwitcher />
    </div>

    <button
      class="envelope-intro__button"
      :class="{ 'envelope-intro__button--opening': isOpening }"
      type="button"
      :aria-label="t('common.openInvitation')"
      :disabled="isOpening"
      @click="openEnvelope"
    >
      <span
        class="envelope-intro__back"
        aria-hidden="true"
      />
      <span
        class="envelope-intro__flap"
        aria-hidden="true"
      />
      <span class="envelope-intro__paper">
        <span
          id="envelope-title"
          class="envelope-intro__names"
        >
          {{ weddingConfig.couple.person1 }} & {{ weddingConfig.couple.person2 }}
        </span>
        <span
          class="envelope-intro__line"
          aria-hidden="true"
        />
        <span class="envelope-intro__hint">
          {{ isOpening ? t('envelope.opening') : t('envelope.tapHint') }}
        </span>
      </span>
      <span
        class="envelope-intro__front"
        aria-hidden="true"
      />
    </button>
  </section>
</template>

<style scoped lang="scss">
.envelope-intro {
  position: relative;
  display: grid;
  min-height: 100svh;
  place-items: center;
  overflow: hidden;
  padding: 5rem var(--space-page);
  background:
    radial-gradient(circle at 20% 20%, rgb(255 250 246 / 0.14), transparent 26rem),
    var(--color-background-alt);
  color: var(--color-text-inverse);
}

.envelope-intro::before,
.envelope-intro::after {
  position: absolute;
  width: 12rem;
  height: 12rem;
  border: 1px solid rgb(255 250 246 / 0.2);
  border-radius: 50%;
  content: '';
}

.envelope-intro::before {
  top: 7rem;
  left: -5rem;
}

.envelope-intro::after {
  right: -4rem;
  bottom: 6rem;
}

.envelope-intro__language {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.envelope-intro__button {
  position: relative;
  display: grid;
  width: min(82vw, 22rem);
  min-height: 16rem;
  place-items: center;
  border: 1px solid rgb(255 250 246 / 0.46);
  border-radius: var(--radius-sm);
  background:
    linear-gradient(135deg, transparent 49%, rgb(255 250 246 / 0.22) 50%, transparent 51%),
    color-mix(in srgb, var(--color-primary) 82%, black);
  color: inherit;
  box-shadow: 0 2rem 4rem rgb(0 0 0 / 0.18);
  perspective: 80rem;
  transition:
    opacity 360ms ease,
    transform 360ms ease;
}

.envelope-intro__button:disabled {
  cursor: default;
}

.envelope-intro__button--opening {
  transform: translateY(0.5rem) scale(0.98);
}

.envelope-intro__back,
.envelope-intro__front {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
}

.envelope-intro__back {
  background:
    linear-gradient(45deg, transparent 49%, rgb(255 250 246 / 0.16) 50%, transparent 51%),
    color-mix(in srgb, var(--color-primary) 88%, black);
}

.envelope-intro__front {
  clip-path: polygon(0 45%, 50% 78%, 100% 45%, 100% 100%, 0 100%);
  background: color-mix(in srgb, var(--color-primary) 88%, black);
  box-shadow: inset 0 1px 0 rgb(255 250 246 / 0.12);
}

.envelope-intro__flap {
  position: absolute;
  inset: 0;
  clip-path: polygon(0 0, 50% 48%, 100% 0);
  background: color-mix(in srgb, var(--color-primary-soft) 42%, var(--color-surface));
  opacity: 0.9;
  transform-origin: 50% 0;
  transition:
    opacity 520ms ease,
    transform 760ms cubic-bezier(0.2, 0.7, 0.2, 1);
  z-index: 3;
}

.envelope-intro__button--opening .envelope-intro__flap {
  opacity: 0.78;
  transform: rotateX(178deg);
}

.envelope-intro__paper {
  position: relative;
  display: grid;
  width: 78%;
  gap: 1rem;
  padding: 2rem 1.25rem;
  border: 1px solid rgb(116 28 50 / 0.18);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-primary);
  text-align: center;
  transform: translateY(-0.5rem);
  transition:
    opacity 640ms ease,
    transform 820ms cubic-bezier(0.2, 0.7, 0.2, 1);
  z-index: 2;
}

.envelope-intro__button--opening .envelope-intro__paper {
  opacity: 0;
  transform: translateY(-6.5rem) scale(1.04);
}

.envelope-intro__names {
  font-family: var(--font-hand);
  font-size: 2.7rem;
  line-height: 0.95;
}

@media (min-width: 760px) {
  .envelope-intro__names {
    font-size: 3.5rem;
  }
}

.envelope-intro__line {
  width: 70%;
  height: 1px;
  margin-inline: auto;
  background: color-mix(in srgb, var(--color-primary) 42%, transparent);
}

.envelope-intro__hint {
  color: var(--color-text-muted);
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0;
  text-transform: uppercase;
}

@media (prefers-reduced-motion: reduce) {
  .envelope-intro__button,
  .envelope-intro__flap,
  .envelope-intro__paper {
    transition-duration: 1ms;
  }

  .envelope-intro__button--opening,
  .envelope-intro__button--opening .envelope-intro__paper,
  .envelope-intro__button--opening .envelope-intro__flap {
    transform: none;
  }

  .envelope-intro__button--opening .envelope-intro__paper {
    opacity: 0;
  }
}
</style>
