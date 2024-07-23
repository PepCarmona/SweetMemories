<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';

const { loginWithRedirect } = useAuth0();

const handleLogin = () => {
  loginWithRedirect({
    appState: {
      target: '/profile',
    },
  });
};
</script>

<template>
  <button @click="handleLogin">Log in</button>
</template>
