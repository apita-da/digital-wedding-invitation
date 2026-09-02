<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <main class="app-shell">
    <section
      class="demo-intro"
      aria-labelledby="demo-title"
    >
      <p class="demo-intro__eyebrow">
        {{ t('common.demoLabel') }}
      </p>
      <h1 id="demo-title">
        {{ t('hero.couple') }}
      </h1>
      <p>{{ t('hero.intro') }}</p>
    </section>
  </main>
</template>
