import type { RsvpFormData, RsvpResponse } from '@/types/rsvp'

const MOCK_DELAY = 700

export const rsvpService = {
  async submit(data: RsvpFormData): Promise<RsvpResponse> {
    await new Promise((resolve) => window.setTimeout(resolve, MOCK_DELAY))

    return {
      ok: Boolean(data.fullName.trim()),
      submittedAt: new Date().toISOString(),
    }
  },
}
