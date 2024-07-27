<script setup lang="ts">
import { RouterView } from 'vue-router';
import PageLoader from './components/PageLoader.vue';
import { useAuth0 } from '@auth0/auth0-vue';

const { isLoading } = useAuth0();
</script>

<template>
  <PageLoader v-if="isLoading" />

  <RouterView v-else />
</template>
