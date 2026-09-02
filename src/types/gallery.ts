export interface GuestPhoto {
  id: string
  imageUrl: string
  uploadedBy: string
  message?: string
  status: 'pending' | 'approved' | 'rejected'
}

export interface GuestPhotoUpload {
  file: File
  uploadedBy: string
  message?: string
}
