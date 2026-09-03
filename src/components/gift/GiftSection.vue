<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { weddingConfig } from '@/config/wedding'
import { getLocalizedText } from '@/i18n/localized'

const { locale, t } = useI18n()

type GiftCopyKey = 'iban' | 'bizum'

const copiedKey = ref<GiftCopyKey | null>(null)
let copiedTimeout: ReturnType<typeof window.setTimeout> | undefined

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
      <span
        class="flourish"
        aria-hidden="true"
      />

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
          <div>
            <dt>{{ t('gift.ibanLabel') }}</dt>
            <dd>{{ weddingConfig.gift.iban }}</dd>
            <button
              type="button"
              :aria-label="t('gift.copyAria', { label: t('gift.ibanLabel') })"
              @click="copyGiftValue('iban', weddingConfig.gift.iban)"
            >
              {{ copiedKey === 'iban' ? t('common.copied') : t('gift.copy') }}
            </button>
          </div>

          <div>
            <dt>{{ t('gift.bizumLabel') }}</dt>
            <dd>{{ weddingConfig.gift.bizum }}</dd>
            <button
              type="button"
              :aria-label="t('gift.copyAria', { label: t('gift.bizumLabel') })"
              @click="copyGiftValue('bizum', weddingConfig.gift.bizum)"
            >
              {{ copiedKey === 'bizum' ? t('common.copied') : t('gift.copy') }}
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
  background:
    linear-gradient(180deg, rgb(79 16 34 / 0.12), transparent 16rem),
    var(--color-background-alt);
}

.gift-section__message {
  color: rgb(255 250 246 / 0.82);
}

.gift-card {
  margin-top: 2rem;
  border: 1px solid rgb(255 250 246 / 0.32);
  border-radius: var(--radius-sm);
  background: rgb(255 250 246 / 0.06);
  padding: 1rem;
  text-align: left;
}

.gift-card__title {
  margin: 0 0 0.95rem;
  color: var(--color-text-inverse);
  font-family: var(--font-display);
  font-size: 1.35rem;
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
  border-top: 1px solid rgb(255 250 246 / 0.22);
  padding: 0.9rem 0;
}

.gift-data div:last-child {
  padding-bottom: 0;
}

.gift-data dt {
  grid-column: 1 / -1;
  color: rgb(255 250 246 / 0.62);
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
  border: 1px solid rgb(255 250 246 / 0.34);
  border-radius: var(--radius-pill);
  background: var(--color-text-inverse);
  color: var(--color-primary);
  font-size: 0.76rem;
  font-weight: 900;
  padding-inline: 0.95rem;
  text-transform: uppercase;
  white-space: nowrap;
}

.gift-section__note {
  color: rgb(255 250 246 / 0.64);
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
