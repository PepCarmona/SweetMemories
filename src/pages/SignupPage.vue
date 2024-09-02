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
import CompleteProfileForm from '@/components/onboarding/CompleteProfileForm.vue';
import type { UserProfile } from '@/types/user';
import { useProfileStore } from '@/stores/profileStore';

definePage({
  path: '/auth/signup',
  name: 'sugnup',
  meta: {
    redirectLoggedUsersToFeed: true,
  },
});

const authStore = useAuthStore();
const profileStore = useProfileStore();
const onboardingStore = useOnboardingStore();

async function handleSignupFormSubmit(authUser: AuthUser): Promise<void> {
  // TODO: handle specific error codes text in signup, login and passwordRecovery (user_already_exists)
  await authStore.signUp(authUser);

  onboardingStore.nextStep();
}

async function handleProfileFormSubmit(
  userProfile: UserProfile
): Promise<void> {
  await profileStore.createProfile(userProfile);

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
        :is-submitting="authStore.isLoading"
        @submit="handleSignupFormSubmit"
      />
      <CompleteProfileForm
        v-else-if="
          onboardingStore.currentStep === OnboardingStep.ProfileDetails
        "
        :is-submitting="profileStore.isLoading"
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
