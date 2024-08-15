<script setup lang="ts">
import FeedHeader from '@/components/feed/FeedHeader.vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

definePage({
  path: '/feed',
  name: 'feed',
  meta: {
    requiresAuth: true,
  },
});

const router = useRouter();
const authStore = useAuthStore();

async function logOutAndRedirect(): Promise<void> {
  await authStore.logOut();

  await router.push('/');
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
