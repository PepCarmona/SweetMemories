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

  // Getters
  const isLoggedIn = computed(() => !!currentUser.value);

  // Actions
  async function signUp({ email, password }: AuthUser): Promise<AppUser> {
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
    }
  }

  async function logIn({ email, password }: AuthUser): Promise<AppUser> {
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
    }
  }

  async function logOut(): Promise<void> {
    try {
      await authService.signOut();

      currentUser.value = null;
    } catch (error) {
      Promise.reject(error);
    }
  }

  async function sendPasswordRecovery(email: string): Promise<void> {
    try {
      await authService.resetPassword(email);
    } catch (error) {
      toastStore.openToast({
        content:
          'Ha habido un problema al intentar enviar el email de recuperación de contraseña. Por favor, inténtalo de nuevo más adelante.',
        variant: ToastVariant.Error,
      });

      return Promise.reject(error);
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
