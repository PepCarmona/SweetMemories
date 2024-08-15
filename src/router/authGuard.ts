import { useAuthStore } from '@/stores/authStore';
import { AuthStep } from '@/types/auth';
import type { Router } from 'vue-router';

export function useAuthGuard(router: Router) {
  router.beforeEach(async (to) => {
    const authStore = useAuthStore();

    await authStore.waitForSessionInitiated();

    if (!authStore.isLoggedIn && to.meta.requiresAuth) {
      return { name: 'auth', params: { step: AuthStep.Login } };
    }

    if (authStore.isLoggedIn && to.meta.onlyForAnonymous) {
      return { name: 'feed' };
    }
  });
}
