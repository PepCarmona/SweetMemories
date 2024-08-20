<script setup lang="ts">
import type { ProfileIntroStep } from '@/types/profileIntro';

definePage({
  // TODO: Look into issue on unplugin-vue-router package for params coming from definePage
  path: '/intro/:step',
  name: 'profileIntro',
  props: true,
});

interface ProfileIntroPageProps {
  step: ProfileIntroStep;
}
const props = defineProps<ProfileIntroPageProps>();
</script>

<template>
  <main class="profile-intro-page">
    {{ props.step }}
  </main>
</template>

<style scoped lang="scss"></style>
