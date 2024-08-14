import { createRouter, createWebHistory } from 'vue-router';
import { routes } from 'vue-router/auto-routes';
import { useAuthGuard } from './authGuard';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

useAuthGuard(router);

export default router;
