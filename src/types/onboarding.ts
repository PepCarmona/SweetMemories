import type { UserProfile } from './user';

export enum OnboardingStep {
  Signup = 'signup',
  ProfileDetails = 'profile',
  AddFamily = 'family',
}

export type OnboardingUserProfileForm = Partial<UserProfile>;
