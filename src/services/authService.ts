import type { AppUser } from '@/types/user';
import {
  type AuthChangeEvent,
  type Subscription,
  type User,
} from '@supabase/supabase-js';
import type { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';
import { useSupabaseClient } from './supabase';

export function useAuthService() {
  const client: SupabaseAuthClient = useSupabaseClient().auth;

  async function signUpNewUser(
    email: string,
    password: string
  ): Promise<AppUser> {
    const { data, error } = await client.signUp({
      email,
      password,
      options: {
        emailRedirectTo: location.origin,
      },
    });

    if (error !== null) {
      return Promise.reject(error);
    }

    if (data.user === null) {
      throw new Error('Registered user not available');
    }

    return mapAppUser(data.user);
  }

  async function signInWithEmail(
    email: string,
    password: string
  ): Promise<AppUser> {
    const { data, error } = await client.signInWithPassword({
      email,
      password,
    });

    if (error !== null) {
      return Promise.reject(error);
    }

    return mapAppUser(data.user);
  }

  async function resetPassword(email: string): Promise<void> {
    const { error } = await client.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/account/update-password`,
    });

    if (error !== null) {
      Promise.reject(error);
    }
  }

  async function updatePassword(newPassword: string): Promise<AppUser> {
    const { data, error } = await client.updateUser({
      password: newPassword,
    });

    if (error !== null) {
      return Promise.reject(error);
    }

    return mapAppUser(data.user);
  }

  async function signOut(): Promise<void> {
    const { error } = await client.signOut();

    if (error !== null) {
      Promise.reject(error);
    }
  }

  function listenToAuthEvents(
    callback: (
      event: AuthChangeEvent,
      user: AppUser | null
    ) => void | Promise<void>
  ): Subscription {
    return client.onAuthStateChange((event, session) => {
      const user = session?.user || null;
      const appUser = user ? mapAppUser(user) : null;

      callback(event, appUser);
    }).data.subscription;
  }

  function mapAppUser(user: User): AppUser {
    const { email, id } = user;

    if (email === undefined) {
      throw new Error('Invalid user.');
    }

    return {
      id,
      email,
    };
  }

  return {
    signUpNewUser,
    signInWithEmail,
    resetPassword,
    updatePassword,
    signOut,
    listenToAuthEvents,
  };
}
