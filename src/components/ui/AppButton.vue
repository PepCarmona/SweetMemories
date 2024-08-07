<script setup lang="ts">
import { computed } from 'vue';
import type { RouteLocationRaw } from 'vue-router';

interface AppButtonProps {
  to?: RouteLocationRaw;
  href?: string;
  variant?: 'primary' | 'primary-outlined' | 'dark-outlined' | 'transparent';
  size?: 'small' | 'medium' | 'large';
}
const props = defineProps<AppButtonProps>();

const buttonClass = computed<string>(
  () => `app-button ${props.variant} ${props.size}`
);
</script>

<template>
  <a v-if="props.href" :href="props.href" :class="buttonClass">
    <slot />
  </a>

  <RouterLink v-else-if="props.to" :to="props.to" :class="buttonClass">
    <slot />
  </RouterLink>

  <button v-else :class="buttonClass">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.app-button {
  position: relative;
  border-radius: 9999px;
  border: none;
  display: inline-block;
  cursor: pointer;
  height: fit-content;
  font-family: inherit;
  color: inherit;
  text-decoration: none;
  transition: outline 0s;

  &:focus {
    outline: 3px solid var(--color-tertiary);
  }

  // Variants
  &.primary {
    background-color: var(--color-primary);
    font-family: var(--font-family-action);
    font-weight: 600;

    color: var(--color-light);

    transition: background ease 200ms;

    @include on-hover {
      background-color: var(--color-tertiary);
    }
  }

  &.primary-outlined {
    box-shadow: inset 0 0 0 2px var(--color-primary);
    background-color: var(--color-light);
    font-family: var(--font-family-action);
    font-weight: 600;

    color: var(--color-primary);

    transition: all ease 200ms;

    @include on-hover {
      box-shadow: inset 0 0 0 2px var(--color-tertiary);
      color: var(--color-tertiary);
    }
  }

  &.dark-outlined {
    box-shadow: inset 0 0 0 1px var(--color-dark);
    background-color: var(--color-light);
    font-family: var(--font-family-action);
    font-weight: 600;

    color: var(--color-dark);

    transition: background ease 200ms;

    @include on-hover {
      background-color: var(--color-mid-light);
    }
  }

  &.transparent {
    padding: 0;
    background-color: transparent;
  }

  // Sizes
  &.small {
    padding: var(--space-xs) var(--space-sm);
    font-size: var(--font-size-sm);
  }

  &.medium {
    padding: var(--space-sm) var(--space-lg);
    font-size: var(--font-size-md);
  }

  &.large {
    padding: var(--space-md) var(--space-xl);
    font-size: var(--font-size-lg);
  }
}
</style>
