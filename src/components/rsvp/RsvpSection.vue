<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
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
        {{ t('rsvp.submit') }}
      </h2>
      <span
        class="flourish"
        aria-hidden="true"
      />
      <form class="rsvp-skeleton">
        <label>
          <span>{{ t('rsvp.name') }}</span>
          <input type="text">
        </label>
        <fieldset>
          <legend>{{ t('rsvp.attending') }}</legend>
          <label><input
            type="radio"
            name="attending"
            value="yes"
          > {{ t('rsvp.yes') }}</label>
          <label><input
            type="radio"
            name="attending"
            value="no"
          > {{ t('rsvp.no') }}</label>
        </fieldset>
        <label>
          <span>{{ t('rsvp.companion') }}</span>
          <input type="text">
        </label>
        <label>
          <span>{{ t('rsvp.observations') }}</span>
          <textarea rows="3" />
        </label>
        <button type="button">
          {{ t('rsvp.submit') }}
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped lang="scss">
.rsvp-skeleton {
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
  text-align: left;
}

.rsvp-skeleton label,
.rsvp-skeleton fieldset {
  display: grid;
  gap: 0.45rem;
  margin: 0;
  color: var(--color-primary);
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
}

.rsvp-skeleton input:not([type='radio']),
.rsvp-skeleton textarea {
  min-height: 3rem;
  width: 100%;
  border: 2px solid color-mix(in srgb, var(--color-line) 72%, transparent);
  border-radius: var(--radius-pill);
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 1rem;
  padding: 0.75rem 0.85rem;
}

.rsvp-skeleton fieldset label {
  grid-template-columns: auto 1fr;
  align-items: center;
  color: var(--color-text);
  font-size: 1rem;
  font-weight: 600;
  text-transform: none;
}

.rsvp-skeleton input[type='radio'] {
  width: 1.1rem;
  height: 1.1rem;
  accent-color: var(--color-primary);
}

.rsvp-skeleton fieldset {
  border: 2px solid color-mix(in srgb, var(--color-line) 72%, transparent);
  border-radius: 1.25rem;
  padding: 0.9rem;
}

.rsvp-skeleton button {
  min-height: 3rem;
  border: 0;
  border-radius: var(--radius-pill);
  background: var(--color-primary);
  color: var(--color-text-inverse);
  font-weight: 700;
}
</style>
