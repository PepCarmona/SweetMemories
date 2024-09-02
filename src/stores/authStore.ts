import { useAuthService } from '@/services/authService';
import { type AuthUser } from '@/types/auth';
import type { AppUser } from '@/types/user';
import { watchOnce } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useToastStore } from './toastStore';
import { ToastVariant } from '@/types/toast';

export const useAuthStore = defineStore('AuthStore', () => {
  const authService = useAuthService();
  const toastStore = useToastStore();

  // State
  const currentUser = ref<AppUser | null>(null);
  const hasInitiatedSession = ref<boolean>(false);
  const isLoading = ref<boolean>(false);

  // Getters
  const isLoggedIn = computed(() => !!currentUser.value);

  // Actions
  async function signUp({ email, password }: AuthUser): Promise<AppUser> {
    isLoading.value = true;

    let signedUpUser: AppUser;

    try {
      signedUpUser = await authService.signUpNewUser(email, password);

      currentUser.value = signedUpUser;

      return signedUpUser;
    } catch (error) {
      toastStore.openToast({
        content:
          'Ha habido un problema al intentar registrarte. Por favor, inténtalo de nuevo más adelante.',
        variant: ToastVariant.Error,
      });

      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  async function logIn({ email, password }: AuthUser): Promise<AppUser> {
    isLoading.value = true;

    let signedUpUser: AppUser;

    try {
      signedUpUser = await authService.signInWithEmail(email, password);

      currentUser.value = signedUpUser;

      return signedUpUser;
    } catch (error) {
      toastStore.openToast({
        content:
          'Ha habido un problema al intentar iniciar sesión. Por favor, inténtalo de nuevo más adelante.',
        variant: ToastVariant.Error,
      });

      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  async function logOut(): Promise<void> {
    isLoading.value = true;

    try {
      await authService.signOut();

      currentUser.value = null;
    } catch (error) {
      Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  async function sendPasswordRecovery(email: string): Promise<void> {
    isLoading.value = true;

    try {
      await authService.resetPassword(email);
    } catch (error) {
      toastStore.openToast({
        content:
          'Ha habido un problema al intentar enviar el email de recuperación de contraseña. Por favor, inténtalo de nuevo más adelante.',
        variant: ToastVariant.Error,
      });

      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  async function waitForSessionInitiated(): Promise<void> {
    return new Promise((resolve) => {
      if (hasInitiatedSession.value) {
        resolve();
      } else {
        watchOnce(hasInitiatedSession, () => resolve());
      }
    });
  }

  authService.listenToAuthEvents((event, user) => {
    currentUser.value = user;

    if (event === 'INITIAL_SESSION') {
      hasInitiatedSession.value = true;
    }
  });

  return {
    // State
    currentUser,
    isLoading,

    // Getters
    isLoggedIn,

    // Actions
    signUp,
    logIn,
    logOut,
    sendPasswordRecovery,
    waitForSessionInitiated,
  };
});
