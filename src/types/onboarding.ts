import type { Component } from 'vue';
import type { UserProfile } from './user';

export enum OnboardingStep {
  Signup = 'signup',
  ProfileDetails = 'profile',
  AddFamily = 'family',
}

export type OnboardingUserProfileForm = Partial<UserProfile>;

export interface OnboardingStepConfig {
  order: number;
  name: OnboardingStep;
  description: string;
  blobComponent: Component;
}
