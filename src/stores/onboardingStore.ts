import BlobOne from '@/components/ui/blobs/BlobOne.vue';
import BlobThree from '@/components/ui/blobs/BlobThree.vue';
import BlobTwo from '@/components/ui/blobs/BlobTwo.vue';
import { OnboardingStep, type OnboardingStepConfig } from '@/types/onboarding';
import { defineStore } from 'pinia';

export const useOnboardingStore = defineStore('OnboardingStore', () => {
  // State
  const stepConfigs: OnboardingStepConfig[] = [
    {
      order: 1,
      name: OnboardingStep.Signup,
      description: 'Crea tu cuenta',
      blobComponent: BlobOne,
    },
    {
      order: 2,
      name: OnboardingStep.ProfileDetails,
      description: 'Completa tu perfil',
      blobComponent: BlobTwo,
    },
    {
      order: 3,
      name: OnboardingStep.AddFamily,
      description: 'Añade una familia',
      blobComponent: BlobThree,
    },
  ];

  // Actions
  function isActiveStep(
    currentStepConfig: OnboardingStepConfig,
    selectedStepName: OnboardingStep
  ): boolean {
    const selectedStepConfig = stepConfigs.find(
      (config) => config.name === selectedStepName
    );

    if (!selectedStepConfig) {
      return false;
    }

    return selectedStepConfig.order >= currentStepConfig.order;
  }

  return {
    // State
    stepConfigs,

    // Actions
    isActiveStep,
  };
});
