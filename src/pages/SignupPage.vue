<script setup lang="ts">
import SignupForm from '@/components/auth/SignupForm.vue';
import OnboardingStepsHeader from '@/components/auth/OnboardingStepsHeader.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppLogo from '@/components/ui/AppLogo.vue';
import FormPageLayout from '@/layouts/FormPageLayout.vue';
import { OnboardingStep } from '@/types/onboarding';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { useAuthStore } from '@/stores/authStore';
import { type AuthUser } from '@/types/auth';
import { ref } from 'vue';
import CompleteProfileForm from '@/components/onboarding/CompleteProfileForm.vue';
import type { UserProfile } from '@/types/user';

definePage({
  path: '/auth/signup',
  name: 'sugnup',
  meta: {
    redirectLoggedUsersToFeed: true,
  },
});

const authStore = useAuthStore();
const onboardingStore = useOnboardingStore();

const isSubmittingSignupForm = ref<boolean>(false);
const isSubmittingProfileForm = ref<boolean>(false);

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

async function handleProfileFormSubmit({
  name,
  gender,
}: UserProfile): Promise<void> {
  isSubmittingProfileForm.value = true;

  console.log({ name, gender });

  isSubmittingProfileForm.value = false;

  onboardingStore.nextStep();
}
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
        :is-submitting="isSubmittingSignupForm"
        @submit="handleSignupFormSubmit"
      />
      <CompleteProfileForm
        v-else-if="
          onboardingStore.currentStep === OnboardingStep.ProfileDetails
        "
        :is-submitting="isSubmittingProfileForm"
        @submit="handleProfileFormSubmit"
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
