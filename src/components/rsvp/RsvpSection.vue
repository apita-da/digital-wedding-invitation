<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { weddingConfig } from '@/config/wedding'
import { formatWeddingDate } from '@/i18n/localized'
import { rsvpService } from '@/services/rsvpService'
import type { RsvpFormData, RsvpResponse, TransportValue } from '@/types/rsvp'

const { locale, t } = useI18n()

const initialFormData = (): RsvpFormData => ({
  fullName: '',
  companionName: '',
  childrenNames: '',
  transport: null,
  allergies: '',
  specialDiet: '',
})

const form = reactive<RsvpFormData>(initialFormData())
const errors = reactive<Partial<Record<keyof RsvpFormData, string>>>({})
const isSubmitting = ref(false)
const submitResult = ref<RsvpResponse | null>(null)
const submitError = ref('')

const rsvpDeadline = computed(() => formatWeddingDate(weddingConfig.rsvp.deadline, locale.value))

const clearErrors = () => {
  Object.keys(errors).forEach((key) => {
    delete errors[key as keyof RsvpFormData]
  })
  submitError.value = ''
}

const validateForm = () => {
  clearErrors()

  if (!form.fullName.trim()) {
    errors.fullName = t('rsvp.errorName')
  }

  return Object.keys(errors).length === 0
}

const submitRsvp = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  submitResult.value = null

  try {
    submitResult.value = await rsvpService.submit({ ...form })

    if (!submitResult.value.ok) {
      submitError.value = t('rsvp.errorSubmit')
    }
  } catch {
    submitError.value = t('rsvp.errorSubmit')
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  Object.assign(form, initialFormData())
  clearErrors()
  submitResult.value = null
}

const setTransport = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value
  form.transport = (value || null) as TransportValue
}
</script>

<template>
  <section
    class="invitation-section invitation-section--light rsvp-section"
    aria-labelledby="rsvp-title"
  >
    <div class="section-inner">
      <p class="section-kicker">
        {{ t('sections.rsvp') }}
      </p>
      <h2 id="rsvp-title">
        {{ t('rsvp.title') }}
      </h2>
      <span
        class="rsvp-section__ornament"
        aria-hidden="true"
      />
      <p class="rsvp-section__intro">
        {{ t('rsvp.deadline', { date: rsvpDeadline }) }}
      </p>

      <form
        v-if="!submitResult?.ok"
        class="rsvp-form"
        novalidate
        @submit.prevent="submitRsvp"
      >
        <label class="rsvp-field">
          <span>{{ t('rsvp.name') }}</span>
          <input
            v-model="form.fullName"
            type="text"
            autocomplete="name"
            :placeholder="t('rsvp.namePlaceholder')"
            :aria-invalid="Boolean(errors.fullName)"
            :aria-describedby="errors.fullName ? 'rsvp-name-error' : undefined"
          >
          <small
            v-if="errors.fullName"
            id="rsvp-name-error"
            class="rsvp-field__error"
          >
            {{ errors.fullName }}
          </small>
        </label>

        <label class="rsvp-field">
          <span>{{ t('rsvp.companion') }} <em>{{ t('common.optional') }}</em></span>
          <input
            v-model="form.companionName"
            type="text"
            autocomplete="name"
            :placeholder="t('rsvp.companionPlaceholder')"
          >
        </label>

        <label class="rsvp-field">
          <span>{{ t('rsvp.children') }} <em>{{ t('common.optional') }}</em></span>
          <textarea
            v-model="form.childrenNames"
            rows="3"
            :placeholder="t('rsvp.childrenPlaceholder')"
          />
        </label>

        <label class="rsvp-field">
          <span>{{ t('rsvp.transport') }}</span>
          <select
            :value="form.transport ?? ''"
            @change="setTransport"
          >
            <option value="">
              {{ t('rsvp.transportPlaceholder') }}
            </option>
            <option value="yes">
              {{ t('rsvp.transportYes') }}
            </option>
            <option value="no">
              {{ t('rsvp.transportNo') }}
            </option>
            <option value="unsure">
              {{ t('rsvp.transportUnsure') }}
            </option>
          </select>
        </label>

        <label class="rsvp-field">
          <span>{{ t('rsvp.allergies') }} <em>{{ t('common.optional') }}</em></span>
          <textarea
            v-model="form.allergies"
            rows="3"
            :placeholder="t('rsvp.allergiesPlaceholder')"
          />
        </label>

        <label class="rsvp-field">
          <span>{{ t('rsvp.specialDiet') }} <em>{{ t('common.optional') }}</em></span>
          <select v-model="form.specialDiet">
            <option value="">
              {{ t('rsvp.specialDietPlaceholder') }}
            </option>
            <option value="none">
              {{ t('rsvp.specialDietNone') }}
            </option>
            <option value="vegetarian">
              {{ t('rsvp.specialDietVegetarian') }}
            </option>
            <option value="vegan">
              {{ t('rsvp.specialDietVegan') }}
            </option>
            <option value="other">
              {{ t('rsvp.specialDietOther') }}
            </option>
          </select>
        </label>

        <p
          v-if="submitError"
          class="rsvp-form__status rsvp-form__status--error"
          role="alert"
        >
          {{ submitError }}
        </p>

        <button
          class="rsvp-form__submit"
          type="submit"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? t('rsvp.loading') : t('rsvp.submit') }}
        </button>
      </form>

      <div
        v-else
        class="rsvp-success"
        role="status"
        aria-live="polite"
      >
        <p
          class="rsvp-success__mark"
          aria-hidden="true"
        >
          OK
        </p>
        <h3>{{ t('rsvp.successTitle') }}</h3>
        <p>{{ t('rsvp.successMessage', { name: form.fullName }) }}</p>
        <button
          type="button"
          @click="resetForm"
        >
          {{ t('rsvp.editResponse') }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.rsvp-section :deep(.section-inner > h2) {
  font-family: var(--font-display);
  font-size: 2.45rem;
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.rsvp-section__ornament {
  display: block;
  width: min(100%, 28rem);
  height: 3.4rem;
  margin: 1.25rem auto 1.55rem;
  color: var(--color-primary);
  background:
    radial-gradient(ellipse 1.08rem 1.05rem at 1.2rem 50%, transparent 54%, currentColor 56% 61%, transparent 63%)
      0 50% / 3.1rem 2.8rem repeat-x,
    linear-gradient(90deg, currentColor, currentColor) center / 100% 2px no-repeat;
  mask-image: linear-gradient(90deg, transparent, black 8% 92%, transparent);
}

.rsvp-section__intro {
  color: var(--color-text-muted);
}

.rsvp-form {
  display: grid;
  gap: 1.05rem;
  margin-top: 2rem;
  text-align: left;
}

.rsvp-field {
  display: grid;
  gap: 0.45rem;
  margin: 0;
  color: var(--color-primary);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.rsvp-field em {
  color: var(--color-text-muted);
  font-style: normal;
  font-weight: 700;
  text-transform: none;
}

.rsvp-field input:not([type='radio']),
.rsvp-field textarea,
.rsvp-field select {
  width: 100%;
  border-color: var(--color-primary);
  background: var(--color-surface);
  color: var(--color-text);
  padding: 0.78rem 0.95rem;
}

.rsvp-field textarea {
  line-height: 1.4;
}

.rsvp-field input[aria-invalid='true'] {
  border-color: var(--color-accent);
}

.rsvp-field__error {
  color: var(--color-accent);
  font-size: 0.82rem;
  font-weight: 800;
  text-transform: none;
}

.rsvp-form__status {
  margin: 0;
  text-align: center;
}

.rsvp-form__status--error {
  color: var(--color-accent);
  font-weight: 800;
}

.rsvp-form__submit,
.rsvp-success button {
  min-height: 3.1rem;
  border: 0;
  border-radius: var(--radius-pill);
  background: var(--color-primary);
  color: var(--color-text-inverse);
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 900;
  letter-spacing: 0.04em;
  padding-inline: 1.35rem;
  text-transform: uppercase;
}

.rsvp-form__submit:disabled {
  cursor: wait;
  opacity: 0.68;
}

.rsvp-success {
  display: grid;
  gap: 0.85rem;
  justify-items: center;
  margin-top: 2rem;
  padding: 2rem 1.2rem;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  box-shadow: var(--shadow-soft);
}

.rsvp-success__mark {
  display: grid;
  width: 3.2rem;
  aspect-ratio: 1;
  place-items: center;
  margin: 0;
  border-radius: 50%;
  background: var(--color-primary);
  color: var(--color-text-inverse);
  font-size: 1.6rem;
  font-weight: 800;
}

.rsvp-success h3,
.rsvp-success p {
  margin: 0;
}

.rsvp-success h3 {
  color: var(--color-primary);
  font-size: 2rem;
  line-height: 1.1;
  overflow-wrap: anywhere;
}

@media (max-width: 23rem) {
  .rsvp-success h3 {
    font-size: 1.65rem;
  }
}
</style>
