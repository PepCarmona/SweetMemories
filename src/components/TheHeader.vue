<script setup lang="ts">
import NavBar from './home/NavBar.vue';
</script>

<template>
  <header class="the-header">
    <NavBar />
  </header>
</template>

<style scoped lang="scss">
.the-header {
  position: sticky;
  top: 0;
  background-color: var(--color-light);
}
</style>
