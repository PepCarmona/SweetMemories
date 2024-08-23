import type { AuthStep } from '@/types/auth';
import type { OnboardingStep } from '@/types/onboarding';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export const useNavigationStore = defineStore('NavigationStore', () => {
  const router = useRouter();

  async function navigateToLandingPage(): Promise<void> {
    await router.push('/');
  }

  async function navigateToAuthPage(step: AuthStep): Promise<void> {
    await router.push({ name: 'auth', params: { step } });
  }

  async function navigateToFeedPage(): Promise<void> {
    await router.push('/feed');
  }

  async function navigateToOnboardingPage(step: OnboardingStep): Promise<void> {
    await router.push({ name: 'onboarding', params: { step } });
  }

  return {
    navigateToLandingPage,
    navigateToAuthPage,
    navigateToFeedPage,
    navigateToOnboardingPage,
  };
});
