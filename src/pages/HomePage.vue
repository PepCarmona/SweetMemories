<script setup lang="ts">
import NavBar from '@/components/home/NavBar.vue';
import HeaderHeroSection from '../components/home/HeroSection.vue';
</script>

<template>
  <main>
    <NavBar />
    <HeaderHeroSection class="header-hero-section" />
    <div class="body"></div>
  </main>
</template>

<style scoped lang="scss">
.header-hero-section {
  height: 100vh;
}

.body {
  height: 100vh;
}
</style>
