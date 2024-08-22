import type { AuthUser } from './auth';
import type { SafeOmit } from './utils';

export type AppUser = SafeOmit<AuthUser, 'password'> & { id: string };

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface UserProfile {
  name: string;
  gender: Gender;
}
