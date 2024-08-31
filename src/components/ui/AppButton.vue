<script setup lang="ts">
import { computed, useSlots } from 'vue';
import AppButtonBase from './AppButtonBase.vue';
import AppSpinner from './AppSpinner.vue';

export type AppButtonState = 'loading' | 'disabled' | 'default';

interface AppButtonProps {
  to?: InstanceType<typeof AppButtonBase>['to'];
  href?: InstanceType<typeof AppButtonBase>['href'];
  variant?: 'primary' | 'primary-outlined' | 'transparent' | 'link';
  size?: 'small' | 'medium' | 'large';
  state?: AppButtonState;
}
const props = defineProps<AppButtonProps>();

const buttonClass = computed<string>(
  () => `app-button ${props.variant} ${props.size}  ${props.state}`
);

const slots = useSlots();

const leftIconSlotName = 'leftIcon';
const rightIconSlotName = 'rightIcon';

const hasLeftIconSlot = computed<boolean>(() => !!slots[leftIconSlotName]);
const hasRightIconSlot = computed<boolean>(() => !!slots[rightIconSlotName]);
const hasIconSlot = computed<boolean>(
  () => hasLeftIconSlot.value || hasRightIconSlot.value
);

const loadingSpinnerPosition = computed<'left' | 'right' | 'none'>(() => {
  if (props.state !== 'loading') {
    return 'none';
  }

  if (hasRightIconSlot.value) {
    return 'right';
  }

  return 'left';
});
</script>

<template>
  <AppButtonBase :class="buttonClass" :to="props.to" :href="props.href">
    <span :class="{ content: true, 'with-icons': hasIconSlot }">
      <span v-if="hasIconSlot" class="left-icon">
        <AppSpinner v-if="loadingSpinnerPosition === 'left'" class="spinner" />
        <slot v-else :name="leftIconSlotName" />
      </span>

      <slot />

      <span v-if="hasIconSlot" class="right-icon">
        <AppSpinner v-if="loadingSpinnerPosition === 'right'" class="spinner" />
        <slot v-else :name="rightIconSlotName" />
      </span>
    </span>
  </AppButtonBase>
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

  .content {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    &.with-icons {
      justify-content: space-between;
    }

    .left-icon,
    .right-icon {
      height: 1em;
      width: 1em;

      :deep(svg) {
        height: 100%;
        width: 100%;
      }

      .spinner {
        display: block;
        height: 100%;
        width: 100%;
      }
    }
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
    font-size: var(--font-size-sm);

    &:not(.link) {
      padding: var(--space-xs) var(--space-sm);
    }
  }

  &.medium {
    font-size: var(--font-size-md);

    &:not(.link) {
      padding: var(--space-sm) var(--space-lg);
    }
  }

  &.large {
    font-size: var(--font-size-lg);

    &:not(.link) {
      padding: var(--space-md) var(--space-xl);
    }
  }

  // State
  &.loading {
    filter: contrast(65%);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
    pointer-events: none;
  }

  &.disabled {
    pointer-events: none;
    background-color: var(--color-mid-light);
  }
}
</style>
