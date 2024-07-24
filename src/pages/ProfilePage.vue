<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';

const { user } = useAuth0();
</script>

<template>
  <div>
    <h1>Profile page</h1>
    <template v-if="user">
      <h3>User</h3>
      <ul>
        <li v-for="key in Object.keys(user)" :key="key">
          {{ key }}: {{ user[key] }}
        </li>
      </ul>
    </template>
  </div>
</template>
