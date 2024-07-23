import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useApiStore = defineStore('api', () => {
  const isLoading = ref(true);
  const fetchedMessage = ref<string>();

  function fetchMessage(): void {
    isLoading.value = true;
    const apiUrl = `${location.protocol}//${location.host}/api`;
    fetch(`${apiUrl}/helloWorld`).then((response) =>
      response.json().then((result) => {
        fetchedMessage.value = result.message;
        isLoading.value = false;
      })
    );
  }

  return {
    isLoading,
    fetchedMessage,
    fetchMessage,
  };
});
