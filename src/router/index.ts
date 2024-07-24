import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../pages/HomePage.vue';
import { authGuard } from '@auth0/auth0-vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../pages/AboutPage.vue'),
    },
    {
      path: '/callback',
      name: 'callback',
      component: () => import('../pages/CallbackPage.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../pages/ProfilePage.vue'),
      beforeEnter: authGuard,
    },
  ],
});

export default router;
