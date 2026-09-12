export type TransportValue = 'yes' | 'no' | 'unsure' | null

export interface RsvpFormData {
  fullName: string
  companionName: string
  childrenNames: string
  transport: TransportValue
  allergies: string
  specialDiet: string
}

export interface RsvpResponse {
  ok: boolean
  submittedAt: string
}
