<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { mockGuestPhotos } from '@/mocks/gallery'

const { t } = useI18n()
</script>

<template>
  <section
    class="invitation-section invitation-section--light"
    aria-labelledby="gallery-title"
  >
    <div class="section-inner">
      <p class="section-kicker">
        {{ t('sections.gallery') }}
      </p>
      <h2 id="gallery-title">
        {{ t('gallery.title') }}
      </h2>
      <form class="upload-skeleton">
        <label>
          <span>{{ t('gallery.upload') }}</span>
          <input
            type="file"
            accept="image/*"
          >
        </label>
        <label>
          <span>{{ t('gallery.name') }}</span>
          <input type="text">
        </label>
        <button type="button">
          {{ t('gallery.uploadButton') }}
        </button>
      </form>
      <div class="photo-grid">
        <article
          v-for="photo in mockGuestPhotos"
          :key="photo.id"
        >
          <img
            :src="photo.imageUrl"
            alt=""
            loading="lazy"
          >
          <p>{{ photo.uploadedBy }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.upload-skeleton {
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
}

.upload-skeleton label {
  display: grid;
  gap: 0.45rem;
}

.upload-skeleton input,
.upload-skeleton button {
  min-height: 3rem;
  width: 100%;
  border-radius: var(--radius-sm);
  font-size: 1rem;
}

.upload-skeleton input {
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  padding: 0.75rem;
}

.upload-skeleton button {
  border: 0;
  background: var(--color-primary);
  color: var(--color-text-inverse);
  font-weight: 700;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
  margin-top: 2rem;
}

.photo-grid article {
  display: grid;
  gap: 0.45rem;
}

.photo-grid img {
  width: 100%;
  aspect-ratio: 0.82;
  object-fit: cover;
}

.photo-grid p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.9rem;
}
</style>
