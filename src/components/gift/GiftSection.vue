<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { weddingConfig } from '@/config/wedding'
import { getLocalizedText } from '@/i18n/localized'

const { locale, t } = useI18n()

type GiftCopyKey = string

const copiedKey = ref<GiftCopyKey | null>(null)
let copiedTimeout: ReturnType<typeof window.setTimeout> | undefined
const giftAccounts = computed(() => weddingConfig.gift.accounts)

const copyGiftValue = async (key: GiftCopyKey, value: string) => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(value)
    }
  } catch {
    // The copied state still confirms the intended action in local/demo browsers.
  }

  copiedKey.value = key
  window.clearTimeout(copiedTimeout)
  copiedTimeout = window.setTimeout(() => {
    copiedKey.value = null
  }, 1800)
}

onBeforeUnmount(() => {
  window.clearTimeout(copiedTimeout)
})
</script>

<template>
  <section
    class="invitation-section invitation-section--dark gift-section"
    aria-labelledby="gift-title"
  >
    <div class="section-inner">
      <p class="section-kicker">
        {{ t('sections.gift') }}
      </p>
      <h2 id="gift-title">
        {{ t('gift.title') }}
      </h2>
      <p class="gift-section__message">
        {{ getLocalizedText(weddingConfig.gift.message, locale) }}
      </p>

      <div
        class="gift-card"
        aria-labelledby="gift-transfer-title"
      >
        <p
          id="gift-transfer-title"
          class="gift-card__title"
        >
          {{ t('gift.transferTitle') }}
        </p>

        <dl class="gift-data">
          <div
            v-for="account in giftAccounts"
            :key="account.id"
          >
            <dt>{{ t('gift.accountHolder', { name: account.holder }) }}</dt>
            <dd>{{ account.iban }}</dd>
            <button
              type="button"
              :aria-label="t('gift.copyAria', { label: t('gift.accountHolder', { name: account.holder }) })"
              @click="copyGiftValue(account.id, account.iban)"
            >
              {{ copiedKey === account.id ? t('common.copied') : t('gift.copy') }}
            </button>
          </div>
        </dl>
      </div>

      <p class="gift-section__note">
        {{ t('gift.demoNote') }}
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.gift-section {
  background: var(--color-background-alt);
}

.gift-section :deep(.section-inner > h2) {
  font-family: var(--font-display);
  font-size: 2.35rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.gift-section__message {
  color: rgb(255 250 246 / 0.88);
  font-family: var(--font-display);
  font-size: 1.18rem;
  font-weight: 700;
  line-height: 1.45;
}

.gift-card {
  margin-top: 2rem;
  border: 2px solid rgb(255 250 246 / 0.72);
  border-radius: var(--radius-sm);
  background: transparent;
  padding: 1.15rem;
  text-align: left;
}

.gift-card__title {
  margin: 0 0 0.95rem;
  color: var(--color-text-inverse);
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 800;
}

.gift-data {
  display: grid;
  gap: 0;
  margin: 0;
}

.gift-data div {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.5rem 0.8rem;
  align-items: center;
  border-top: 1px solid rgb(255 250 246 / 0.48);
  padding: 1rem 0;
}

.gift-data div:last-child {
  padding-bottom: 0;
}

.gift-data dt {
  grid-column: 1 / -1;
  color: rgb(255 250 246 / 0.78);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0;
  text-transform: uppercase;
}

.gift-data dd {
  min-width: 0;
  margin: 0;
  color: var(--color-text-inverse);
  font-family: var(--font-display);
  font-size: 1.18rem;
  overflow-wrap: anywhere;
}

.gift-data button {
  min-height: 2.45rem;
  border: 0;
  border-radius: var(--radius-pill);
  background: var(--color-text-inverse);
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 900;
  padding-inline: 0.95rem;
  text-transform: uppercase;
  white-space: nowrap;
}

.gift-section__note {
  color: rgb(255 250 246 / 0.72);
  font-size: 0.9rem;
}

@media (max-width: 25rem) {
  .gift-data div {
    grid-template-columns: minmax(0, 1fr);
  }

  .gift-data button {
    width: fit-content;
  }
}
</style>
