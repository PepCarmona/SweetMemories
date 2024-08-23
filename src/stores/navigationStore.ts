import { AuthStep } from '@/types/auth';
import type { OnboardingStep } from '@/types/onboarding';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export const useNavigationStore = defineStore('NavigationStore', () => {
  const router = useRouter();

  async function navigateToLandingPage(): Promise<void> {
    await router.push('/');
  }

  async function navigateToAuthPage(step: AuthStep): Promise<void> {
    switch (step) {
      case AuthStep.Signup:
        await router.push('/auth/signup');
        break;

      case AuthStep.Login:
        await router.push('/auth/login');
        break;

      case AuthStep.PasswordRecovery:
        await router.push('/auth/recovery');
        break;

      default: {
        const exhaustiveCheck: never = step;
        throw new Error(`Unhandled auth step: ${exhaustiveCheck}`);
      }
    }
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
