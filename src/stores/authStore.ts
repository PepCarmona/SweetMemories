import { defineStore } from 'pinia';
import { ref } from 'vue';

type AuthMode = 'login' | 'signup';

export const useAuthStore = defineStore('auth', () => {
  // State
  const authMode = ref<AuthMode>('signup');

  return { authMode };
});
