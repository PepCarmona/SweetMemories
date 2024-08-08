import { AuthStep } from '@/types/auth';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  // State
  const authMode = ref<AuthStep>(AuthStep.Signup);

  return { authMode };
});
