export type AttendanceValue = true | false | null

export type TransportValue = 'bus' | 'own' | 'none' | null

export interface RsvpFormData {
  fullName: string
  attending: AttendanceValue
  companionName: string
  allergies: string
  transport: TransportValue
  observations: string
}

export interface RsvpResponse {
  ok: boolean
  submittedAt: string
}
