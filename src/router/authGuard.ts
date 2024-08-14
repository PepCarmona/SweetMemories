import { useAuthStore } from '@/stores/authStore';
import { AuthStep } from '@/types/auth';
import type { Router } from 'vue-router';

export function useAuthGuard(router: Router) {
  router.beforeEach((to) => {
    const { isLoggedIn } = useAuthStore();
    if (!isLoggedIn && to.meta.requiresAuth) {
      return { name: 'auth', params: { step: AuthStep.Login } };
    }
  });
}
