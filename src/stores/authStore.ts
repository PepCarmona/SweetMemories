import { AuthService } from '@/services/AuthService';
import {
  AuthStatus,
  type AppUser,
  type LoginUser,
  type SignupUser,
} from '@/types/auth';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  // State
  const service = new AuthService();
  const currentUser = ref<AppUser | null>(null);
  const authStatus = ref<AuthStatus>(AuthStatus.LoggedOut);

  // Getters
  const isLoggedIn = computed(() => !!currentUser.value);

  // Actions
  async function signUp({
    email,
    name,
    password,
  }: SignupUser): Promise<AppUser> {
    let signedUpUser: AppUser;

    try {
      signedUpUser = await service.signUpNewUser(email, password, name);

      currentUser.value = signedUpUser;
      authStatus.value = AuthStatus.LoggedIn;

      return signedUpUser;
    } catch (error) {
      authStatus.value = AuthStatus.FailedToSignUp;

      return Promise.reject(error);
    }
  }

  async function logIn({ email, password }: LoginUser): Promise<AppUser> {
    let signedUpUser: AppUser;

    try {
      signedUpUser = await service.signInWithEmail(email, password);

      currentUser.value = signedUpUser;
      authStatus.value = AuthStatus.LoggedIn;

      return signedUpUser;
    } catch (error) {
      authStatus.value = AuthStatus.FailedToLogIn;

      return Promise.reject(error);
    }
  }

  async function sendPasswordRecovery(email: string): Promise<void> {
    try {
      await service.resetPassword(email);

      authStatus.value = AuthStatus.LoggedOut;
    } catch (error) {
      authStatus.value = AuthStatus.FailedToRecoverPassword;

      return Promise.reject(error);
    }
  }

  service.listenToAuthEvents((user) => {
    currentUser.value = user;
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
    sendPasswordRecovery,
  };
});
