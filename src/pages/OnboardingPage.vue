<script setup lang="ts">
import OnboardingStepsHeader from '@/components/onboarding/OnboardingStepsHeader.vue';
import FormPageLayout from '@/layouts/FormPageLayout.vue';
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
  <FormPageLayout class="onboarding-page">
    <template #header>
      <OnboardingStepsHeader :step="props.step" />
    </template>

    <template #form>
      {{ props.step }}
    </template>
  </FormPageLayout>
</template>

<style scoped lang="scss"></style>
