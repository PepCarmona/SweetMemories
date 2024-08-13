<script setup lang="ts">
import NavBar from './NavBar.vue';
</script>

<template>
  <header class="landing-header">
    <NavBar />
  </header>
</template>

<style scoped lang="scss">
.landing-header {
  position: sticky;
  top: 0;
  background-color: var(--color-light);
  z-index: 9;
}
</style>
