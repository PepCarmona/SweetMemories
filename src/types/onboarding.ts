import type { Component } from 'vue';

export enum OnboardingStep {
  Signup = 'signup',
  ProfileDetails = 'profile',
  AddFamily = 'family',
}

export interface OnboardingStepNode {
  order: number;
  name: OnboardingStep;
  description: string;
  blobComponent: Component;
  next: OnboardingStepNode | null;
}
