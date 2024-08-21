<script setup lang="ts">
import AuthBackground from '@/components/auth/AuthBackground.vue';
</script>

<template>
  <main class="form-page-layout">
    <AuthBackground class="background" />
    <div class="form-container">
      <slot name="header" />

      <slot name="form" />
    </div>
  </main>
</template>

<style scoped lang="scss">
.form-page-layout {
  min-height: 100vh;
  min-height: 100dvh;

  .background {
    display: none;
  }

  .form-container {
    padding: var(--space-xl);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-lg);
    margin: auto;
    max-width: var(--breakpoint-xs);
    z-index: var(--layer-normal);
  }

  @include breakpoint(md) {
    display: flex;

    .background {
      display: block;
      overflow: hidden;
    }

    .form-container {
      background-color: var(--color-light);
      border-radius: var(--space-md);
      box-shadow: 0 0 32px var(--color-mid-light);
      padding: var(--space-md);
      width: var(--breakpoint-xs);
    }
  }
}
</style>
