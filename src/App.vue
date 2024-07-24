<script setup lang="ts">
import { RouterView } from 'vue-router';
import TheHeader from './components/TheHeader.vue';
import PageLoader from './components/PageLoader.vue';
import { useAuth0 } from '@auth0/auth0-vue';

const { isLoading } = useAuth0();
</script>

<template>
  <PageLoader v-if="isLoading" />

  <template v-else>
    <TheHeader />

    <RouterView />
  </template>
</template>
