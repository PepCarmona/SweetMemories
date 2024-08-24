<script setup lang="ts">
import SignupForm from '@/components/auth/SignupForm.vue';
import OnboardingStepsHeader from '@/components/auth/OnboardingStepsHeader.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppLogo from '@/components/ui/AppLogo.vue';
import FormPageLayout from '@/layouts/FormPageLayout.vue';
import { OnboardingStep } from '@/types/onboarding';
import { useOnboardingStore } from '@/stores/onboardingStore';

definePage({
  path: '/auth/signup',
  name: 'sugnup',
});

const onboardingStore = useOnboardingStore();
</script>

<template>
  <FormPageLayout class="signup-page">
    <template #header>
      <AppButton variant="transparent" to="/">
        <AppLogo />
      </AppButton>

      <OnboardingStepsHeader :step="OnboardingStep.Signup" class="steps" />
    </template>

    <template #form>
      <SignupForm
        v-if="onboardingStore.currentStep === OnboardingStep.Signup"
      />
    </template>
  </FormPageLayout>
</template>

<style scoped lang="scss">
.signup-page {
  .steps {
    margin: var(--space-xs) auto;
  }
}
</style>
