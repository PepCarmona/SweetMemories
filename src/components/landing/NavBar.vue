<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import AppButton from '../ui/AppButton.vue';
import { computed } from 'vue';
import AppLogo from '../ui/AppLogo.vue';

const { width } = useWindowSize();

const isSmallWindow = computed<boolean>(() => width.value < 800);
</script>

<template>
  <nav class="nav-bar">
    <AppButton variant="transparent" to="/">
      <AppLogo />
    </AppButton>

    <AppButton
      variant="primary-outlined"
      :size="isSmallWindow ? 'small' : 'medium'"
      to="/auth/signup"
    >
      Únete ahora
    </AppButton>
  </nav>
</template>

<style scoped lang="scss">
.nav-bar {
  display: flex;
  justify-content: space-between;
  padding: var(--space-md);
}
</style>
