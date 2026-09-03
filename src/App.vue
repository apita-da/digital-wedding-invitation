<script setup lang="ts">
import { nextTick, ref } from 'vue'

import CountdownSection from '@/components/countdown/CountdownSection.vue'
import DressCodeSection from '@/components/dresscode/DressCodeSection.vue'
import EnvelopeIntro from '@/components/envelope/EnvelopeIntro.vue'
import FaqSection from '@/components/faq/FaqSection.vue'
import FooterSection from '@/components/footer/FooterSection.vue'
import GallerySection from '@/components/gallery/GallerySection.vue'
import GiftSection from '@/components/gift/GiftSection.vue'
import HeroSection from '@/components/hero/HeroSection.vue'
import RsvpSection from '@/components/rsvp/RsvpSection.vue'
import SongsSection from '@/components/songs/SongsSection.vue'
import TimelineSection from '@/components/timeline/TimelineSection.vue'
import VenueSection from '@/components/venue/VenueSection.vue'

const isInvitationOpen = ref(false)
const invitationContent = ref<HTMLElement | null>(null)

const revealInvitation = async () => {
  isInvitationOpen.value = true
  await nextTick()
  invitationContent.value?.focus()
  window.scrollTo({ top: 0, behavior: 'instant' })
}
</script>

<template>
  <EnvelopeIntro
    v-if="!isInvitationOpen"
    @open="revealInvitation"
  />

  <Transition
    name="invitation-reveal"
    appear
  >
    <main
      v-if="isInvitationOpen"
      ref="invitationContent"
      class="app-shell"
      tabindex="-1"
    >
      <HeroSection />
      <VenueSection />
      <TimelineSection />
      <RsvpSection />
      <DressCodeSection />
      <FaqSection />
      <SongsSection />
      <GallerySection />
      <GiftSection />
      <CountdownSection />
      <FooterSection />
    </main>
  </Transition>
</template>
