<script setup lang="ts">
const variants = ['primary'] as const;

interface AppButtonProps {
  to?: string;
  href?: string;
  variant?: (typeof variants)[number];
}
const props = defineProps<AppButtonProps>();
</script>

<template>
  <a
    v-if="props.href"
    :href="props.href"
    :class="['app-button', [props.variant]]"
  >
    <slot />
  </a>

  <RouterLink
    v-else-if="props.to"
    :to="props.to"
    :class="['app-button', [props.variant]]"
  >
    <slot />
  </RouterLink>

  <button v-else :class="['app-button', [props.variant]]">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.app-button {
  border-radius: 1000px;
  padding: var(--space-md) var(--space-xl);
  border: none;
  display: inline-block;
  cursor: pointer;

  transition: background ease 200ms;

  &.primary {
    background-color: var(--color-primary);
    font-family: var(--font-family-action);
    font-size: var(--font-size-lg);
    font-weight: 600;

    color: var(--color-light);

    &:focus {
      outline: 3px solid var(--color-tertiary);
    }

    @include on-hover {
      background-color: var(--color-tertiary);
    }
  }
}
</style>
