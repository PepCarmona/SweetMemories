<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import AppButton from '../ui/AppButton.vue';
import { computed } from 'vue';

const { width } = useWindowSize();

const isSmallWindow = computed<boolean>(() => width.value < 800);
</script>

<template>
  <nav class="nav-bar">
    <AppButton class="logo-button" variant="transparent" to="/">
      Cudlo
    </AppButton>

    <AppButton
      variant="primary-outlined"
      :size="isSmallWindow ? 'small' : 'medium'"
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

  .logo-button {
    font-family: var(--font-family-logo);
    font-size: var(--font-size-xxl);
    line-height: 1;

    background: url('../../assets/logo-bg.svg');
    background-clip: text;
    color: transparent;
    background-position: 4% 32%;
    filter: brightness(90%);

    transition: all ease 200ms;

    @include breakpoint(md) {
      font-size: var(--font-size-xxxl);
    }

    @include on-hover {
      background-position: center 32%;
      filter: brightness(95%);
    }
  }
}
</style>
