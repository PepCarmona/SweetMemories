import { ToastVariant, type ToastConfig } from '@/types/toast';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useToastStore = defineStore('ToastStore', () => {
  // State
  const toastContent = ref<string | null>(null);
  const toastVariant = ref<ToastVariant | null>(null);

  // Getters
  const toast = computed<ToastConfig | null>(() => {
    if (toastContent.value && toastVariant.value) {
      return {
        content: toastContent.value,
        variant: toastVariant.value,
      };
    }

    return null;
  });

  // Actions
  function openToast(config: ToastConfig): void {
    toastContent.value = config.content;
    toastVariant.value = config.variant;
  }

  function closeToast(): void {
    toastContent.value = null;
    toastVariant.value = null;
  }

  return {
    // Getters
    toast,

    // Actions
    openToast,
    closeToast,
  };
});
