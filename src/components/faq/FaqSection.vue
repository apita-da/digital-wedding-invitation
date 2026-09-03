<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { weddingConfig } from '@/config/wedding'
import { getLocalizedText } from '@/i18n/localized'

const { locale, t } = useI18n()

const openFaqId = ref<string | null>(weddingConfig.faq[0]?.id ?? null)

const toggleFaq = (id: string) => {
  openFaqId.value = openFaqId.value === id ? null : id
}
</script>

<template>
  <section
    class="invitation-section invitation-section--dark faq-section"
    aria-labelledby="faq-title"
  >
    <div class="section-inner">
      <p class="section-kicker">
        {{ t('sections.faq') }}
      </p>
      <h2 id="faq-title">
        {{ t('faq.title') }}
      </h2>
      <span
        class="flourish"
        aria-hidden="true"
      />

      <div class="faq-list">
        <article
          v-for="item in weddingConfig.faq"
          :key="item.id"
          class="faq-item"
          :class="{ 'faq-item--open': openFaqId === item.id }"
        >
          <button
            class="faq-item__trigger"
            type="button"
            :aria-expanded="openFaqId === item.id"
            :aria-controls="`faq-answer-${item.id}`"
            @click="toggleFaq(item.id)"
          >
            <span>{{ getLocalizedText(item.question, locale) }}</span>
            <span
              class="faq-item__icon"
              aria-hidden="true"
            />
          </button>

          <div
            v-show="openFaqId === item.id"
            :id="`faq-answer-${item.id}`"
            class="faq-item__answer"
          >
            <p>{{ getLocalizedText(item.answer, locale) }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.faq-section {
  background:
    linear-gradient(180deg, rgb(79 16 34 / 0.1), transparent 15rem),
    var(--color-background-alt);
  padding-bottom: clamp(5rem, 18vw, 8rem);
}

.faq-section :deep(.section-inner > h2) {
  font-size: 3.45rem;
}

.faq-list {
  display: grid;
  gap: 0;
  width: min(100%, 26rem);
  margin: 3.4rem auto 0;
}

.faq-item {
  border-bottom: 2px solid rgb(255 250 246 / 0.48);
  text-align: left;
}

.faq-item:first-child {
  border-top: 0;
}

.faq-item__trigger {
  display: grid;
  width: 100%;
  min-height: 3.15rem;
  grid-template-columns: minmax(0, 1fr) 1.15rem;
  gap: 0.8rem;
  align-items: center;
  border: 0;
  background: transparent;
  color: rgb(255 250 246 / 0.78);
  font-family: var(--font-body);
  font-size: 0.74rem;
  font-weight: 900;
  padding: 0.78rem 0 0.58rem;
  text-align: left;
  text-transform: uppercase;
}

.faq-item__trigger span:first-child {
  overflow-wrap: anywhere;
}

.faq-item__icon {
  position: relative;
  display: grid;
  width: 1.15rem;
  aspect-ratio: 1;
  place-items: center;
  justify-self: end;
  color: rgb(255 250 246 / 0.7);
}

.faq-item__icon::before,
.faq-item__icon::after {
  position: absolute;
  width: 0.45rem;
  height: 1.5px;
  border-radius: 999px;
  background: currentColor;
  content: '';
  transition: transform 180ms ease;
}

.faq-item__icon::after {
  transform: rotate(90deg);
}

.faq-item--open .faq-item__icon::after {
  transform: rotate(0deg);
}

.faq-item__answer {
  color: rgb(255 250 246 / 0.68);
  padding: 0 2rem 1rem 0;
}

.faq-item__answer p {
  margin: 0;
  font-size: 0.88rem;
  line-height: 1.5;
}
</style>
