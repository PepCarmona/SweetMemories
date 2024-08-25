<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

interface AppButtonProps {
  to?: RouteLocationRaw;
  href?: string;
}
const props = defineProps<AppButtonProps>();
</script>

<template>
  <a v-if="props.href" :href="props.href" v-bind="$attrs">
    <slot />
  </a>

  <RouterLink v-else-if="props.to" :to="props.to" v-bind="$attrs">
    <slot />
  </RouterLink>

  <button v-else v-bind="$attrs">
    <slot />
  </button>
</template>
