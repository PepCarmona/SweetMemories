import { useAuthService } from '@/services/authService';
import { AuthStatus, type AuthUser } from '@/types/auth';
import type { AppUser } from '@/types/user';
import { watchOnce } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('AuthStore', () => {
  // State
  const authService = useAuthService();
  const currentUser = ref<AppUser | null>(null);
  const authStatus = ref<AuthStatus>(AuthStatus.LoggedOut);
  const hasInitiatedSession = ref<boolean>(false);

  // Getters
  const isLoggedIn = computed(() => !!currentUser.value);

  // Actions
  async function signUp({ email, password }: AuthUser): Promise<AppUser> {
    let signedUpUser: AppUser;

    try {
      signedUpUser = await authService.signUpNewUser(email, password);

      currentUser.value = signedUpUser;
      authStatus.value = AuthStatus.LoggedIn;

      return signedUpUser;
    } catch (error) {
      authStatus.value = AuthStatus.FailedToSignUp;

      return Promise.reject(error);
    }
  }

  async function logIn({ email, password }: AuthUser): Promise<AppUser> {
    let signedUpUser: AppUser;

    try {
      signedUpUser = await authService.signInWithEmail(email, password);

      currentUser.value = signedUpUser;
      authStatus.value = AuthStatus.LoggedIn;

      return signedUpUser;
    } catch (error) {
      authStatus.value = AuthStatus.FailedToLogIn;

      return Promise.reject(error);
    }
  }

  async function logOut(): Promise<void> {
    try {
      await authService.signOut();

      currentUser.value = null;
      authStatus.value = AuthStatus.LoggedOut;
    } catch (error) {
      Promise.reject(error);
    }
  }

  async function sendPasswordRecovery(email: string): Promise<void> {
    try {
      await authService.resetPassword(email);

      authStatus.value = AuthStatus.LoggedOut;
    } catch (error) {
      authStatus.value = AuthStatus.FailedToRecoverPassword;

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
    authStatus,
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
