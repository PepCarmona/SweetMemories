import type { AppUser } from '@/types/auth';
import {
  createClient,
  type Subscription,
  type User,
} from '@supabase/supabase-js';
import type { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';

export class AuthService {
  private client: SupabaseAuthClient = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  ).auth;

  public async signUpNewUser(
    email: string,
    password: string,
    name: string
  ): Promise<AppUser> {
    const { data, error } = await this.client.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
        emailRedirectTo: location.origin,
      },
    });

    if (error !== null) {
      return Promise.reject(error);
    }

    if (data.user === null) {
      throw new Error('Registered user not available');
    }

    return this.mapAppUser(data.user);
  }

  public async signInWithEmail(
    email: string,
    password: string
  ): Promise<AppUser> {
    const { data, error } = await this.client.signInWithPassword({
      email,
      password,
    });

    if (error !== null) {
      return Promise.reject(error);
    }

    return this.mapAppUser(data.user);
  }

  public async resetPassword(email: string): Promise<void> {
    const { error } = await this.client.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/account/update-password`,
    });

    if (error !== null) {
      Promise.reject(error);
    }
  }

  public async updatePassword(newPassword: string): Promise<AppUser> {
    const { data, error } = await this.client.updateUser({
      password: newPassword,
    });

    if (error !== null) {
      return Promise.reject(error);
    }

    return this.mapAppUser(data.user);
  }

  public async signOut(): Promise<void> {
    const { error } = await this.client.signOut();

    if (error !== null) {
      Promise.reject(error);
    }
  }

  public listenToAuthEvents(
    callback: (user: AppUser | null) => void | Promise<void>
  ): Subscription {
    return this.client.onAuthStateChange((_, session) => {
      const user = session?.user || null;
      const appUser = user ? this.mapAppUser(user) : null;

      callback(appUser);
    }).data.subscription;
  }

  private mapAppUser(user: User): AppUser {
    const { email } = user;
    const { name } = user.user_metadata;

    if (email === undefined || typeof name !== 'string') {
      throw new Error('Invalid user.');
    }

    return {
      email,
      name,
    };
  }
}
