<script setup lang="ts">
import LoginForm from '@/components/auth/LoginForm.vue';
import PasswordRecoveryForm from '@/components/auth/PasswordRecoveryForm.vue';
import SignupForm from '@/components/auth/SignupForm.vue';
import OnboardingStepsHeader from '@/components/onboarding/OnboardingStepsHeader.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppLogo from '@/components/ui/AppLogo.vue';
import FormPageLayout from '@/layouts/FormPageLayout.vue';
import { AuthStep } from '@/types/auth';
import { OnboardingStep } from '@/types/onboarding';

definePage({
  // TODO: Look into issue on unplugin-vue-router package for params coming from definePage
  path: '/auth/:step',
  name: 'auth',
  props: true,
});

interface AuthPageProps {
  step: AuthStep;
}
const props = defineProps<AuthPageProps>();
</script>

<template>
  <FormPageLayout class="auth-page">
    <template #header>
      <AppButton variant="transparent" to="/">
        <AppLogo />
      </AppButton>

      <OnboardingStepsHeader
        v-if="props.step === AuthStep.Signup"
        :step="OnboardingStep.Signup"
      />
    </template>

    <template #form>
      <SignupForm v-if="props.step === AuthStep.Signup" />
      <LoginForm v-else-if="props.step === AuthStep.Login" />
      <PasswordRecoveryForm
        v-else-if="props.step === AuthStep.PasswordRecovery"
      />
    </template>
  </FormPageLayout>
</template>
