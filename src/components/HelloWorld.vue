<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ msg: string }>();

const count = ref(0);
const loading = ref(true);
const fetchedMessage = ref<string>();

function fetchMessage(): void {
  loading.value = true;
  const apiUrl = `${location.protocol}//${location.host}/api`;
  fetch(`${apiUrl}/helloWorld`).then((response) =>
    response.json().then((result) => {
      fetchedMessage.value = result.message;
      loading.value = false;
    })
  );
}

fetchMessage();
</script>

<template>
  <h1>{{ msg }}</h1>

  <h2>
    <span v-if="loading">Loading ...</span>
    <span v-else>{{ fetchedMessage }}</span>
  </h2>

  <button @click="fetchMessage">Fetch message</button>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
