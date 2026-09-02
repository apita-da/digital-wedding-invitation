<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { weddingConfig } from '@/config/wedding'
import { getLocalizedText } from '@/i18n/localized'

const { locale, t } = useI18n()
</script>

<template>
  <section
    class="invitation-section invitation-section--dark"
    aria-labelledby="gift-title"
  >
    <div class="section-inner">
      <p class="section-kicker">
        {{ t('sections.gift') }}
      </p>
      <h2 id="gift-title">
        {{ t('gift.title') }}
      </h2>
      <span
        class="flourish"
        aria-hidden="true"
      />
      <p>{{ getLocalizedText(weddingConfig.gift.message, locale) }}</p>
      <dl class="gift-data">
        <div>
          <dt>IBAN</dt>
          <dd>{{ weddingConfig.gift.iban }}</dd>
        </div>
        <div>
          <dt>Bizum</dt>
          <dd>{{ weddingConfig.gift.bizum }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped lang="scss">
.gift-data {
  display: grid;
  gap: 0.9rem;
  margin: 2rem 0 0;
}

.gift-data div {
  border-top: 1px solid rgb(255 250 246 / 0.24);
  padding-top: 0.9rem;
}

.gift-data dt {
  color: rgb(255 250 246 / 0.7);
  font-size: 0.78rem;
  letter-spacing: 0;
  text-transform: uppercase;
}

.gift-data dd {
  margin: 0.25rem 0 0;
  font-family: var(--font-display);
  font-size: 1.45rem;
}
</style>
