<script setup lang="ts">
interface AppInputTextProps {
  invalid?: boolean;
}
const props = defineProps<AppInputTextProps>();

const model = defineModel();
</script>

<template>
  <input
    :class="{ 'app-input-text': true, invalid: props.invalid }"
    type="text"
    v-model="model"
  />
</template>

<style scoped lang="scss">
.app-input-text {
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
