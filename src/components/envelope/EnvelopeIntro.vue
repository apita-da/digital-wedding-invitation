<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import LanguageSwitcher from '@/components/shared/LanguageSwitcher.vue'
import { weddingConfig } from '@/config/wedding'

const { t } = useI18n()
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
      type="button"
      :aria-label="t('common.openInvitation')"
    >
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
        <span class="envelope-intro__hint">{{ t('envelope.tapHint') }}</span>
      </span>
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

.envelope-intro__language {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.envelope-intro__button {
  position: relative;
  display: grid;
  width: min(82vw, 22rem);
  min-height: 15rem;
  place-items: center;
  border: 1px solid rgb(255 250 246 / 0.46);
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--color-primary) 82%, black);
  color: inherit;
  box-shadow: 0 2rem 4rem rgb(0 0 0 / 0.18);
}

.envelope-intro__flap {
  position: absolute;
  inset: 0;
  clip-path: polygon(0 0, 50% 48%, 100% 0);
  background: color-mix(in srgb, var(--color-primary-soft) 42%, var(--color-surface));
  opacity: 0.9;
}

.envelope-intro__paper {
  position: relative;
  display: grid;
  width: 78%;
  gap: 1rem;
  padding: 2rem 1.25rem;
  border: 1px solid rgb(116 28 50 / 0.18);
  background: var(--color-surface);
  color: var(--color-primary);
  text-align: center;
  transform: translateY(-0.5rem);
}

.envelope-intro__names {
  font-family: var(--font-display);
  font-size: clamp(2rem, 12vw, 3.5rem);
  line-height: 0.95;
}

.envelope-intro__hint {
  color: var(--color-text-muted);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>
