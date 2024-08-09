<script setup lang="ts">
interface AppInputMailProps {
  invalid?: boolean;
}
const props = defineProps<AppInputMailProps>();

const model = defineModel();
</script>

<template>
  <input
    :class="{ 'app-input-mail': true, invalid: props.invalid }"
    type="email"
    v-model="model"
  />
</template>

<style scoped lang="scss">
.app-input-mail {
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

  &.invalid {
    border-color: var(--color-error);
  }
}
</style>
