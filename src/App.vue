<script setup lang="ts">
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
</script>

<template>
  <main class="app-shell">
    <EnvelopeIntro />
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
</template>
