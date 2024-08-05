<script setup lang="ts">
import AppButton from '../ui/AppButton.vue';
</script>

<template>
  <AppButton class="logo-button" variant="transparent" to="/">
    Cudlo
  </AppButton>
</template>

<style scoped lang="scss">
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
</style>
