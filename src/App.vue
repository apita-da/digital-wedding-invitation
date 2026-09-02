<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import LanguageSwitcher from '@/components/shared/LanguageSwitcher.vue'
import { weddingConfig } from '@/config/wedding'
import { formatWeddingDate, getLocalizedText } from '@/i18n/localized'

const { locale, t } = useI18n()
</script>

<template>
  <main class="app-shell">
    <header class="app-header">
      <LanguageSwitcher />
    </header>

    <section
      class="demo-intro"
      aria-labelledby="demo-title"
    >
      <p class="demo-intro__eyebrow">
        {{ t('common.demoLabel') }}
      </p>
      <h1 id="demo-title">
        {{ weddingConfig.couple.person1 }} & {{ weddingConfig.couple.person2 }}
      </h1>
      <p class="demo-intro__date">
        {{ formatWeddingDate(weddingConfig.date, locale) }}
      </p>
      <p>{{ getLocalizedText(weddingConfig.intro, locale) }}</p>
    </section>
  </main>
</template>
