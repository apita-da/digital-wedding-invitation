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
  attending: null,
  companionName: '',
  allergies: '',
  transport: null,
  observations: '',
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

  if (form.attending === null) {
    errors.attending = t('rsvp.errorAttending')
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
    class="invitation-section invitation-section--light"
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
        class="flourish"
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

        <fieldset
          class="rsvp-field rsvp-radio-group"
          :aria-invalid="Boolean(errors.attending)"
          :aria-describedby="errors.attending ? 'rsvp-attending-error' : undefined"
        >
          <legend>{{ t('rsvp.attending') }}</legend>
          <label class="rsvp-radio">
            <input
              v-model="form.attending"
              type="radio"
              name="attending"
              :value="true"
            >
            <span>{{ t('rsvp.yes') }}</span>
          </label>
          <label class="rsvp-radio">
            <input
              v-model="form.attending"
              type="radio"
              name="attending"
              :value="false"
            >
            <span>{{ t('rsvp.no') }}</span>
          </label>
          <small
            v-if="errors.attending"
            id="rsvp-attending-error"
            class="rsvp-field__error"
          >
            {{ errors.attending }}
          </small>
        </fieldset>

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
          <span>{{ t('rsvp.allergies') }} <em>{{ t('common.optional') }}</em></span>
          <input
            v-model="form.allergies"
            type="text"
            :placeholder="t('rsvp.allergiesPlaceholder')"
          >
        </label>

        <label class="rsvp-field">
          <span>{{ t('rsvp.transport') }} <em>{{ t('common.optional') }}</em></span>
          <select
            :value="form.transport ?? ''"
            @change="setTransport"
          >
            <option value="">
              {{ t('rsvp.transportPlaceholder') }}
            </option>
            <option value="bus">
              {{ t('rsvp.transportBus') }}
            </option>
            <option value="own">
              {{ t('rsvp.transportOwn') }}
            </option>
            <option value="none">
              {{ t('rsvp.transportNone') }}
            </option>
          </select>
        </label>

        <label class="rsvp-field">
          <span>{{ t('rsvp.observations') }} <em>{{ t('common.optional') }}</em></span>
          <textarea
            v-model="form.observations"
            rows="4"
            :placeholder="t('rsvp.observationsPlaceholder')"
          />
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
  border-color: color-mix(in srgb, var(--color-line) 72%, transparent);
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

.rsvp-radio-group {
  border: 2px solid color-mix(in srgb, var(--color-line) 72%, transparent);
  border-radius: var(--radius-sm);
  padding: 0.95rem;
}

.rsvp-radio-group legend {
  padding-inline: 0.2rem;
}

.rsvp-radio {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.55rem;
  color: var(--color-text);
  font-size: 1rem;
  font-weight: 650;
  text-transform: none;
}

.rsvp-radio input {
  width: 1.1rem;
  height: 1.1rem;
  accent-color: var(--color-primary);
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
  font-weight: 800;
  padding-inline: 1.35rem;
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
}
</style>
