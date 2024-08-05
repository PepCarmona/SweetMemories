<script setup lang="ts">
import HeroSection from '../components/home/HeroSection.vue';
import KeyFeaturesSection from '@/components/home/KeyFeaturesSection.vue';
import FeaturesDescriptionSection from '@/components/home/FeaturesDescriptionSection.vue';
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
</script>

<template>
  <TheHeader />

  <main class="home-page">
    <HeroSection />
    <KeyFeaturesSection />
    <FeaturesDescriptionSection />
  </main>

  <TheFooter />
</template>

<style scoped lang="scss"></style>
