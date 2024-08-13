<script setup lang="ts">
// TODO: move into root component and create toastSore
import AppButton from './AppButton.vue';
import AppTransitionSlideDown from './AppTransitionSlideDown.vue';
import CloseIcon from './icons/CloseIcon.vue';

interface AppToastProps {
  shouldShow?: boolean;
  variant: 'error';
  timeToAutoclose?: number;
}
const props = defineProps<AppToastProps>();

interface AppToastEmits {
  (eventName: 'close'): void;
}
const emit = defineEmits<AppToastEmits>();
</script>

<template>
  <AppTransitionSlideDown>
    <div
      :class="{
        'app-toast': true,
        [props.variant]: true,
        autoclose: props.timeToAutoclose,
      }"
      v-if="props.shouldShow"
    >
      <slot />
      <AppButton class="close-button" @click.prevent="emit('close')">
        <CloseIcon class="close-icon" />
      </AppButton>
    </div>
  </AppTransitionSlideDown>
</template>

<style scoped lang="scss">
.app-toast {
  position: fixed;
  top: var(--space-sm);
  left: var(--space-sm);
  right: var(--space-sm);
  max-width: var(--breakpoint-s);
  margin: auto;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-xs);
  text-align: start;

  border-radius: var(--space-md);
  box-shadow: 0 0 32px var(--color-mid-light);
  padding: var(--space-sm);

  &.error {
    color: var(--color-error);
    background-color: var(--color-error-light);
  }

  .close-button {
    background-color: var(--color-light);
    height: 1.25em;
    width: 1.25em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    .close-icon {
      height: 80%;
      width: 80%;
    }
  }
}
</style>
