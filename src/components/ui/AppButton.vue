<script setup lang="ts">
import { computed } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import AppSpinner from './AppSpinner.vue';

interface AppButtonProps {
  to?: RouteLocationRaw;
  href?: string;
  variant?: 'primary' | 'primary-outlined' | 'transparent' | 'link';
  size?: 'small' | 'medium' | 'large';
  state?: 'loading';
}
const props = defineProps<AppButtonProps>();

const buttonClass = computed<string>(
  () => `app-button ${props.variant} ${props.size}  ${props.state}`
);
</script>

<template>
  <a v-if="props.href" :href="props.href" :class="buttonClass">
    <AppSpinner v-if="props.state === 'loading'" class="spinner" />
    <slot />
  </a>

  <RouterLink v-else-if="props.to" :to="props.to" :class="buttonClass">
    <AppSpinner v-if="props.state === 'loading'" class="spinner" />
    <slot />
  </RouterLink>

  <button v-else :class="buttonClass">
    <AppSpinner v-if="props.state === 'loading'" class="spinner" />
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

  &:focus-visible {
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

  &.transparent {
    background-color: transparent;
  }

  &.link {
    background-color: transparent;
    font-family: var(--font-family-action);
    font-weight: 600;

    color: var(--color-primary);

    @include on-hover {
      color: var(--color-tertiary);
    }
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

  // State
  &.loading {
    filter: contrast(65%);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
    pointer-events: none;

    .spinner {
      height: 1em;
      width: 1em;
    }
  }
}
</style>
