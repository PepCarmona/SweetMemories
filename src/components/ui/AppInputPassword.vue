<script setup lang="ts">
interface AppInputPasswordProps {
  invalid?: boolean;
  shouldShowPassword?: boolean;
}
const props = defineProps<AppInputPasswordProps>();

const model = defineModel();
</script>

<template>
  <input
    :class="{ 'app-input-password': true, invalid: props.invalid }"
    :type="props.shouldShowPassword ? 'text' : 'password'"
    v-model="model"
  />
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

  &.invalid {
    border-color: var(--color-error);
  }
}
</style>
