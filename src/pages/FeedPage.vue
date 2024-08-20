<script setup lang="ts">
import FeedHeader from '@/components/feed/FeedHeader.vue';
import WelcomeSection from '@/components/feed/WelcomeSection.vue';
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
    <FeedHeader
      :user-name="authStore.currentUser.name"
      @log-out="logOutAndRedirect"
    />

    <main class="feed-page">
      <WelcomeSection />
    </main>
  </template>
</template>

<style scoped lang="scss">
.feed-page {
  padding: var(--space-md);
}
</style>
