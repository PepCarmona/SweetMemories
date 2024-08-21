<script setup lang="ts">
import OnboardingStepsHeader from '@/components/onboarding/OnboardingStepsHeader.vue';
import type { OnboardingStep } from '@/types/onboarding';

definePage({
  // TODO: Look into issue on unplugin-vue-router package for params coming from definePage
  path: '/onboarding/:step',
  name: 'onboarding',
  props: true,
});

interface OnboardingPageProps {
  step: OnboardingStep;
}
const props = defineProps<OnboardingPageProps>();
</script>

<template>
  <OnboardingStepsHeader :step="props.step" />

  <main class="onboarding-page">
    {{ props.step }}
  </main>
</template>

<style scoped lang="scss"></style>
