<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { galleryService } from '@/services/galleryService'
import type { GuestPhoto } from '@/types/gallery'

const { t } = useI18n()

const MAX_FILE_SIZE = 10 * 1024 * 1024

type GalleryErrors = Partial<Record<'file' | 'uploadedBy', string>>

const photos = ref<GuestPhoto[]>([])
const selectedFile = ref<File | null>(null)
const previewUrl = ref('')
const isDragging = ref(false)
const isLoading = ref(true)
const isUploading = ref(false)
const uploadSuccess = ref('')
const uploadError = ref('')
const errors = reactive<GalleryErrors>({})
const upload = reactive({
  uploadedBy: '',
  message: '',
})

const hasPreview = computed(() => Boolean(previewUrl.value))

const clearErrors = () => {
  Object.keys(errors).forEach((key) => {
    delete errors[key as keyof GalleryErrors]
  })
  uploadError.value = ''
}

const revokePreview = () => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }

  previewUrl.value = ''
}

const setSelectedFile = (file?: File) => {
  clearErrors()
  uploadSuccess.value = ''

  if (!file) {
    selectedFile.value = null
    revokePreview()
    return
  }

  if (!file.type.startsWith('image/')) {
    errors.file = t('gallery.errorFileType')
    selectedFile.value = null
    revokePreview()
    return
  }

  if (file.size > MAX_FILE_SIZE) {
    errors.file = t('gallery.errorFileSize')
    selectedFile.value = null
    revokePreview()
    return
  }

  selectedFile.value = file
  revokePreview()
  previewUrl.value = URL.createObjectURL(file)
}

const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  setSelectedFile(input.files?.[0])
}

const onDrop = (event: DragEvent) => {
  isDragging.value = false
  setSelectedFile(event.dataTransfer?.files[0])
}

const validateUpload = () => {
  clearErrors()

  if (!selectedFile.value) {
    errors.file = t('gallery.errorFileRequired')
  }

  if (!upload.uploadedBy.trim()) {
    errors.uploadedBy = t('gallery.errorName')
  }

  return Object.keys(errors).length === 0
}

const resetUpload = () => {
  upload.uploadedBy = ''
  upload.message = ''
  selectedFile.value = null
  revokePreview()
}

const submitPhoto = async () => {
  if (!validateUpload() || !selectedFile.value) {
    return
  }

  isUploading.value = true
  uploadSuccess.value = ''

  try {
    const newPhoto = await galleryService.upload({
      file: selectedFile.value,
      uploadedBy: upload.uploadedBy.trim(),
      message: upload.message.trim() || undefined,
    })

    photos.value = [newPhoto, ...photos.value]
    uploadSuccess.value = t('gallery.success')
    resetUpload()
  } catch {
    uploadError.value = t('gallery.errorUpload')
  } finally {
    isUploading.value = false
  }
}

onMounted(async () => {
  photos.value = await galleryService.listApproved()
  isLoading.value = false
})

onBeforeUnmount(() => {
  revokePreview()
})
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
      <span
        class="flourish"
        aria-hidden="true"
      />

      <p class="gallery-section__intro">
        {{ t('gallery.intro') }}
      </p>

      <form
        class="gallery-form"
        novalidate
        @submit.prevent="submitPhoto"
      >
        <label
          class="gallery-dropzone"
          :class="{
            'gallery-dropzone--active': isDragging,
            'gallery-dropzone--ready': hasPreview,
            'gallery-dropzone--error': errors.file,
          }"
          @dragenter.prevent="isDragging = true"
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop.prevent="onDrop"
        >
          <input
            type="file"
            accept="image/*"
            :aria-invalid="Boolean(errors.file)"
            :aria-describedby="errors.file ? 'gallery-file-error' : undefined"
            @change="onFileChange"
          >
          <span
            class="gallery-dropzone__preview"
            aria-hidden="true"
          >
            <img
              v-if="previewUrl"
              :src="previewUrl"
              alt=""
            >
            <span v-else>CAM</span>
          </span>
          <span class="gallery-dropzone__copy">
            <strong>{{ hasPreview ? t('gallery.fileReady') : t('gallery.dropTitle') }}</strong>
            <span>{{ t('gallery.dropHint') }}</span>
          </span>
          <small
            v-if="errors.file"
            id="gallery-file-error"
            class="gallery-field__error"
          >
            {{ errors.file }}
          </small>
        </label>

        <label class="gallery-field">
          <span>{{ t('gallery.name') }}</span>
          <input
            v-model="upload.uploadedBy"
            type="text"
            autocomplete="name"
            :placeholder="t('gallery.namePlaceholder')"
            :aria-invalid="Boolean(errors.uploadedBy)"
            :aria-describedby="errors.uploadedBy ? 'gallery-name-error' : undefined"
          >
          <small
            v-if="errors.uploadedBy"
            id="gallery-name-error"
            class="gallery-field__error"
          >
            {{ errors.uploadedBy }}
          </small>
        </label>

        <label class="gallery-field">
          <span>{{ t('gallery.message') }} <em>{{ t('common.optional') }}</em></span>
          <textarea
            v-model="upload.message"
            rows="4"
            maxlength="120"
            :placeholder="t('gallery.messagePlaceholder')"
          />
        </label>

        <p
          v-if="uploadSuccess"
          class="gallery-form__status gallery-form__status--success"
          role="status"
        >
          {{ uploadSuccess }}
        </p>
        <p
          v-if="uploadError"
          class="gallery-form__status gallery-form__status--error"
          role="alert"
        >
          {{ uploadError }}
        </p>

        <button
          class="gallery-form__submit"
          type="submit"
          :disabled="isUploading"
        >
          {{ isUploading ? t('gallery.uploading') : t('gallery.uploadButton') }}
        </button>
      </form>

      <div class="photo-grid">
        <p
          v-if="isLoading"
          class="photo-grid__empty"
        >
          {{ t('gallery.loading') }}
        </p>
        <article
          v-for="photo in photos"
          :key="photo.id"
          :class="{ 'photo-grid__item--pending': photo.status === 'pending' }"
        >
          <img
            :src="photo.imageUrl"
            :alt="t('gallery.photoAlt', { name: photo.uploadedBy })"
            loading="lazy"
          >
          <div>
            <p>{{ photo.uploadedBy }}</p>
            <small v-if="photo.status === 'pending'">
              {{ t('gallery.pending') }}
            </small>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.gallery-section__intro {
  color: var(--color-text-muted);
}

.gallery-form {
  display: grid;
  gap: 1.05rem;
  margin-top: 2rem;
  text-align: left;
}

.gallery-dropzone {
  display: grid;
  justify-items: center;
  gap: 0.75rem;
  border: 2px dashed color-mix(in srgb, var(--color-line) 86%, transparent);
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--color-blush) 42%, transparent);
  color: var(--color-primary);
  padding: 1.35rem 1rem;
  text-align: center;
  transition:
    background-color 180ms ease,
    border-color 180ms ease,
    transform 180ms ease;
}

.gallery-dropzone--active,
.gallery-dropzone:focus-within {
  border-color: var(--color-accent);
  background: color-mix(in srgb, var(--color-accent) 10%, var(--color-surface));
  transform: translateY(-1px);
}

.gallery-dropzone--ready {
  border-style: solid;
}

.gallery-dropzone--error {
  border-color: var(--color-accent);
}

.gallery-dropzone input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.gallery-dropzone__preview {
  display: grid;
  width: min(10rem, 52vw);
  aspect-ratio: 1.12;
  place-items: center;
  overflow: hidden;
  border: 2px solid color-mix(in srgb, var(--color-line) 65%, transparent);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: color-mix(in srgb, var(--color-primary) 70%, var(--color-text-muted));
  font-family: var(--font-display);
  font-size: 2rem;
}

.gallery-dropzone__preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-dropzone__copy {
  display: grid;
  gap: 0.25rem;
}

.gallery-dropzone__copy strong {
  font-size: 1.03rem;
}

.gallery-dropzone__copy span {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  font-weight: 700;
}

.gallery-field {
  display: grid;
  gap: 0.45rem;
  margin: 0;
  color: var(--color-primary);
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
}

.gallery-field em {
  color: var(--color-text-muted);
  font-style: normal;
  font-weight: 700;
  text-transform: none;
}

.gallery-field input,
.gallery-field textarea {
  width: 100%;
  border-color: color-mix(in srgb, var(--color-line) 72%, transparent);
  background: var(--color-surface);
  color: var(--color-text);
  padding: 0.78rem 0.95rem;
}

.gallery-field textarea {
  line-height: 1.4;
}

.gallery-field input[aria-invalid='true'] {
  border-color: var(--color-accent);
}

.gallery-field__error {
  color: var(--color-accent);
  font-size: 0.82rem;
  font-weight: 800;
  text-transform: none;
}

.gallery-form__status {
  margin: 0;
  text-align: center;
}

.gallery-form__status--success {
  color: var(--color-primary);
  font-weight: 800;
}

.gallery-form__status--error {
  color: var(--color-accent);
  font-weight: 800;
}

.gallery-form__submit {
  min-height: 3.1rem;
  border: 0;
  border-radius: var(--radius-pill);
  background: var(--color-primary);
  color: var(--color-text-inverse);
  font-weight: 800;
  padding-inline: 1.35rem;
}

.gallery-form__submit:disabled {
  cursor: wait;
  opacity: 0.68;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
  margin-top: 2rem;
}

.photo-grid__empty {
  grid-column: 1 / -1;
  margin: 0;
  color: var(--color-text-muted);
  text-align: center;
}

.photo-grid article {
  position: relative;
  display: grid;
  gap: 0.45rem;
  text-align: left;
}

.photo-grid__item--pending img {
  filter: saturate(0.72);
}

.photo-grid img {
  width: 100%;
  aspect-ratio: 0.82;
  border-radius: var(--radius-sm);
  object-fit: cover;
}

.photo-grid p {
  margin: 0;
  color: var(--color-primary);
  font-size: 0.95rem;
  font-weight: 800;
}

.photo-grid small {
  color: var(--color-text-muted);
  font-size: 0.82rem;
  font-weight: 700;
}

@media (min-width: 46rem) {
  .gallery-form {
    grid-template-columns: 1fr 1fr;
  }

  .gallery-dropzone,
  .gallery-form__status,
  .gallery-form__submit {
    grid-column: 1 / -1;
  }

  .gallery-field:has(textarea) {
    grid-column: 1 / -1;
  }

  .photo-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
