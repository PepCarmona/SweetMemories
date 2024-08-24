import BlobOne from '@/components/ui/blobs/BlobOne.vue';
import BlobThree from '@/components/ui/blobs/BlobThree.vue';
import BlobTwo from '@/components/ui/blobs/BlobTwo.vue';
import { OnboardingStep, type OnboardingStepNode } from '@/types/onboarding';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useOnboardingStore = defineStore('OnboardingStore', () => {
  // State
  const familyStepNode: OnboardingStepNode = {
    order: 3,
    name: OnboardingStep.AddFamily,
    description: 'Añade una familia',
    blobComponent: BlobThree,
    next: null,
  };
  const profileStepNode: OnboardingStepNode = {
    order: 2,
    name: OnboardingStep.ProfileDetails,
    description: 'Completa tu perfil',
    blobComponent: BlobTwo,
    next: familyStepNode,
  };
  const signupStepNode: OnboardingStepNode = {
    order: 1,
    name: OnboardingStep.Signup,
    description: 'Crea tu cuenta',
    blobComponent: BlobOne,
    next: profileStepNode,
  };

  const stepNodes: OnboardingStepNode[] = [
    signupStepNode,
    profileStepNode,
    familyStepNode,
  ];

  const currentStepNode = ref<OnboardingStepNode>(signupStepNode);

  // Getters
  const currentStep = computed<OnboardingStep>(
    () => currentStepNode.value.name
  );

  // Actions
  function isActiveStep(stepConfig: OnboardingStepNode): boolean {
    return stepConfig.order <= currentStepNode.value.order;
  }

  function isSelectedStep(stepConfig: OnboardingStepNode): boolean {
    return stepConfig.name === currentStepNode.value.name;
  }

  function nextStep(): void {
    if (currentStepNode.value.next !== null) {
      currentStepNode.value = currentStepNode.value.next;
    }
  }

  return {
    // State
    stepConfigs: stepNodes,

    // Getters
    currentStep,

    // Actions
    isActiveStep,
    isSelectedStep,
    nextStep,
  };
});
