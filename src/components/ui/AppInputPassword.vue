<script setup lang="ts">
const model = defineModel();
</script>

<template>
  <input class="app-input-password" type="password" v-model="model" />
</template>

<style scoped lang="scss">
.app-input-password {
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--space-xs);
  border: 1px solid var(--color-mid-light);
  font-size: var(--font-size-md);
  width: 100%;
  color: var(--color-dark);

  &:focus {
    outline: 3px solid var(--color-tertiary);

    &::placeholder {
      visibility: hidden;
    }
  }

  &::placeholder {
    color: var(--color-mid);
  }
}
</style>
