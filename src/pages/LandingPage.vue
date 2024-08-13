<script setup lang="ts">
import HeroSection from '../components/landing/HeroSection.vue';
import KeyFeaturesSection from '@/components/landing/KeyFeaturesSection.vue';
import FeaturesDescriptionSection from '@/components/landing/FeaturesDescriptionSection.vue';
import TheHeader from '@/components/landing/LandingHeader.vue';
import TheFooter from '@/components/landing/LandingFooter.vue';

definePage({
  path: '/',
  name: 'landing',
});
</script>

<template>
  <TheHeader />

  <main class="landing-page">
    <HeroSection />
    <KeyFeaturesSection />
    <FeaturesDescriptionSection />
  </main>

  <TheFooter />
</template>

<style scoped lang="scss"></style>
