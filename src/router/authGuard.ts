import { useAuthStore } from '@/stores/authStore';
import type { Router } from 'vue-router';

export function useAuthGuard(router: Router) {
  router.beforeEach(async (to) => {
    const authStore = useAuthStore();

    await authStore.waitForSessionInitiated();

    if (!authStore.isLoggedIn && to.meta.requiresAuth) {
      return { name: 'login' };
    }

    if (authStore.isLoggedIn && to.meta.redirectLoggedUsersToFeed) {
      return { name: 'feed' };
    }
  });
}
