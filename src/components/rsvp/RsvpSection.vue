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
}

.rsvp-skeleton label,
.rsvp-skeleton fieldset {
  display: grid;
  gap: 0.45rem;
  margin: 0;
}

.rsvp-skeleton input,
.rsvp-skeleton textarea {
  min-height: 3rem;
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 1rem;
  padding: 0.75rem 0.85rem;
}

.rsvp-skeleton fieldset {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.9rem;
}

.rsvp-skeleton button {
  min-height: 3rem;
  border: 0;
  border-radius: var(--radius-sm);
  background: var(--color-primary);
  color: var(--color-text-inverse);
  font-weight: 700;
}
</style>
