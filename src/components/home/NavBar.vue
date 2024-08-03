<script setup lang="ts">
import AppButton from '../ui/AppButton.vue';
</script>

<template>
  <nav class="nav-bar">
    <AppButton class="logo-button" variant="transparent">Cudlo</AppButton>

    <AppButton variant="primary-outlined" size="small">Únete ahora</AppButton>
  </nav>
</template>

<style scoped lang="scss">
.nav-bar {
  display: flex;
  justify-content: space-between;
  padding: var(--space-md);

  .logo-button {
    font-family: var(--font-family-logo);
    font-size: var(--font-size-xxl);
    line-height: 1;

    background: url('../../assets/logo-bg.svg');
    background-clip: text;
    color: transparent;
    background-position: 4% 32%;
    filter: saturate(130%) brightness(80%);
  }
}
</style>
