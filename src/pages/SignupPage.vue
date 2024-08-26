<script setup lang="ts">
import SignupForm from '@/components/auth/SignupForm.vue';
import OnboardingStepsHeader from '@/components/auth/OnboardingStepsHeader.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppLogo from '@/components/ui/AppLogo.vue';
import FormPageLayout from '@/layouts/FormPageLayout.vue';
import { OnboardingStep } from '@/types/onboarding';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { useAuthStore } from '@/stores/authStore';
import { AuthStatus, type AuthUser } from '@/types/auth';
import { useCloned } from '@vueuse/core';
import AppToast from '@/components/ui/AppToast.vue';
import { ref } from 'vue';

definePage({
  path: '/auth/signup',
  name: 'sugnup',
});

const authStore = useAuthStore();
const onboardingStore = useOnboardingStore();

const { cloned: initialAuthStatus } = useCloned(authStore.authStatus);

const isSubmittingSignupForm = ref<boolean>(false);

async function handleSignupFormSubmit({
  email,
  password,
}: AuthUser): Promise<void> {
  // TODO: handle specific error codes text in signup, login and passwordRecovery (user_already_exists)

  isSubmittingSignupForm.value = true;

  await authStore.signUp({ email, password });

  isSubmittingSignupForm.value = false;

  onboardingStore.nextStep();
}
</script>

<template>
  <!-- TODO: Move to global component with dedicated store -->
  <AppToast
    :should-show="authStore.authStatus === AuthStatus.FailedToSignUp"
    variant="error"
    @close="authStore.authStatus = initialAuthStatus"
  >
    Ha habido un problema al intentar registrarte. Por favor, inténtalo de nuevo
    más adelante.
  </AppToast>

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
        :is-submitting="isSubmittingSignupForm"
        @submit="handleSignupFormSubmit"
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
