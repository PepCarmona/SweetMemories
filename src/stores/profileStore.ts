import { useProfileService } from '@/services/profileService';
import type { UserProfile } from '@/types/user';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useToastStore } from './toastStore';
import { ToastVariant } from '@/types/toast';

export const useProfileStore = defineStore('ProfileStore', () => {
  const profileService = useProfileService();
  const toastStore = useToastStore();

  // State
  const profile = ref<UserProfile | null>(null);
  const isLoading = ref<boolean>(false);

  // Actions
  async function createProfile(newProfile: UserProfile): Promise<void> {
    isLoading.value = true;

    try {
      profileService.createProfile(newProfile);

      profile.value = newProfile;
    } catch (error) {
      toastStore.openToast({
        content:
          'Ha habido un problema al crear el perfil. Por favor, inténtalo de nuevo más adelante.',
        variant: ToastVariant.Error,
      });

      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    // State
    isLoading,

    // Actions
    createProfile,
  };
});
