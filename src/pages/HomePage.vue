<script setup lang="ts">
import HeaderHeroSection from '../components/HeaderHeroSection.vue';
</script>

<template>
  <main>
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
