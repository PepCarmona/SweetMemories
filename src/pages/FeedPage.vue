<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';

definePage({
  path: '/feed',
  name: 'feed',
  meta: {
    requiresAuth: true,
  },
});

const authStore = useAuthStore();
</script>

<template>
  <main class="feed-page">
    <h1>Feed</h1>
    <div v-if="authStore.currentUser">
      <p v-for="property of authStore.currentUser" :key="property">
        {{ property }}
      </p>
    </div>
  </main>
</template>

<style scoped lang="scss"></style>
