<script setup lang="ts">
import AppButton from '../ui/AppButton.vue';
</script>

<template>
  <section class="header-hero-section">
    <div class="content">
      <h1 class="title">Comparte los momentos especiales de tu bebé</h1>

      <h2 class="subtitle">
        Un lugar seguro y privado para reunir y compartir los recuerdos más
        preciados con tu familia y amigos cercanos.
      </h2>

      <AppButton variant="primary" size="large">Únete ahora</AppButton>
    </div>
  </section>
</template>

<style scoped lang="scss">
.header-hero-section {
  .content {
    padding: var(--space-md);
    text-align: center;

    .title {
      max-width: var(--breakpoint-m);
      margin: 0 auto var(--space-lg) auto;

      font-family: var(--font-family-title);
      font-size: var(--font-size-xxxl);
      line-height: var(--line-height-title);
      font-weight: 600;

      color: var(--color-dark);
    }

    .subtitle {
      max-width: var(--breakpoint-s);
      margin: 0 auto var(--space-lg) auto;

      font-family: var(--font-family-title);
      font-size: var(--font-size-lg);

      color: var(--color-dark);
    }
  }
}
</style>
