<script setup lang="ts">
import FeedHeader from '@/components/feed/FeedHeader.vue';
import { useAuthStore } from '@/stores/authStore';
import { useNavigationStore } from '@/stores/navigationStore';

definePage({
  path: '/feed',
  name: 'feed',
  meta: {
    requiresAuth: true,
  },
});

const authStore = useAuthStore();
const navigationStore = useNavigationStore();

async function logOutAndRedirect(): Promise<void> {
  await authStore.logOut();

  await navigationStore.navigateToLandingPage();
}
</script>

<template>
  <template v-if="authStore.currentUser">
    <FeedHeader :user="authStore.currentUser" @log-out="logOutAndRedirect" />

    <main class="feed-page">
      <h1>Feed</h1>
      <div>
        <p v-for="property in authStore.currentUser" :key="property">
          {{ property }}
        </p>
      </div>
    </main>
  </template>
</template>

<style scoped lang="scss"></style>
