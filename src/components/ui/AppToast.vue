<script setup lang="ts">
import { useToastStore } from '@/stores/toastStore';
import AppButton from './AppButton.vue';
import AppTransitionSlide from './AppTransitionSlide.vue';
import CloseIcon from './icons/CloseIcon.vue';

const toastStore = useToastStore();
</script>

<template>
  <AppTransitionSlide>
    <div
      :class="{
        'app-toast': true,
        [toastStore.toast.variant]: true,
      }"
      v-if="toastStore.toast"
    >
      {{ toastStore.toast.content }}
      <AppButton class="close-button" @click.prevent="toastStore.closeToast()">
        <CloseIcon class="close-icon" />
      </AppButton>
    </div>
  </AppTransitionSlide>
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

  z-index: var(--layer-forward);

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
