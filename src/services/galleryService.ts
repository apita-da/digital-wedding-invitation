import { mockGuestPhotos } from '@/mocks/gallery'
import type { GuestPhoto, GuestPhotoUpload } from '@/types/gallery'

const MOCK_DELAY = 600

export const galleryService = {
  async listApproved(): Promise<GuestPhoto[]> {
    await new Promise((resolve) => window.setTimeout(resolve, MOCK_DELAY))

    return mockGuestPhotos.filter((photo) => photo.status === 'approved')
  },

  async upload(upload: GuestPhotoUpload): Promise<GuestPhoto> {
    await new Promise((resolve) => window.setTimeout(resolve, MOCK_DELAY))

    return {
      id: crypto.randomUUID(),
      imageUrl: URL.createObjectURL(upload.file),
      uploadedBy: upload.uploadedBy,
      message: upload.message,
      status: 'pending',
    }
  },
}
