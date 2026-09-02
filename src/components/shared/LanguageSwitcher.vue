<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { availableLocales, setAppLocale, type AppLocale } from '@/i18n'

const { locale, t } = useI18n()

const activeLocale = computed(() => locale.value as AppLocale)

const labels: Record<AppLocale, string> = {
  es: 'ES',
  en: 'EN',
}

const getLanguageTitle = (availableLocale: AppLocale) =>
  availableLocale === 'es' ? t('language.spanish') : t('language.english')
</script>

<template>
  <div
    class="language-switcher"
    role="group"
    :aria-label="t('language.ariaLabel')"
  >
    <button
      v-for="availableLocale in availableLocales"
      :key="availableLocale"
      class="language-switcher__option"
      :class="{ 'language-switcher__option--active': activeLocale === availableLocale }"
      type="button"
      :aria-pressed="activeLocale === availableLocale"
      :title="getLanguageTitle(availableLocale)"
      @click="setAppLocale(availableLocale)"
    >
      {{ labels[availableLocale] }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.language-switcher {
  display: inline-flex;
  gap: 0.2rem;
  padding: 0.22rem;
  border: 1px solid color-mix(in srgb, var(--color-primary) 22%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-surface) 88%, transparent);
  box-shadow: 0 10px 28px rgb(66 45 50 / 0.08);
}

.language-switcher__option {
  min-width: 2.55rem;
  min-height: 2.35rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--color-text-muted);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1;
  transition:
    background-color 180ms ease,
    color 180ms ease,
    transform 180ms ease;
}

.language-switcher__option:hover {
  color: var(--color-primary);
}

.language-switcher__option--active {
  background: var(--color-primary);
  color: var(--color-text-inverse);
}

.language-switcher__option--active:hover {
  color: var(--color-text-inverse);
}

.language-switcher__option:active {
  transform: scale(0.96);
}
</style>
