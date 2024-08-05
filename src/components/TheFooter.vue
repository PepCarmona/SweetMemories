<script setup lang="ts">
import AppButton from './ui/AppButton.vue';
</script>

<template>
  <footer class="the-footer">
    <span class="copyright">© Copyright 2021 Cudlo</span>
    <AppButton variant="transparent" size="medium"
      >Política de privacidad</AppButton
    >
    <AppButton variant="transparent" size="medium">Términos de Uso</AppButton>
    <AppButton variant="transparent" size="medium">Contacto</AppButton>
  </footer>
</template>

<style scoped lang="scss">
.the-footer {
  margin-top: var(--space-xxxl);
  padding: var(--space-md);
  text-align: center;
  background-color: var(--color-primary-light);
  display: flex;
  flex-direction: column;

  .copyright {
    padding: var(--space-sm) var(--space-lg);
    font-size: var(--font-size-md);
  }

  @include breakpoint(md) {
    flex-direction: row;
    justify-content: center;
  }
}
</style>
