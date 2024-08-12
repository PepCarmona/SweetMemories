import type { ExistingUser, ExistingUserMetadata } from '@/types/auth';
import {
  createClient,
  type User,
  type UserMetadata,
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
  ): Promise<ExistingUser> {
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

    return this.getExistingUser(data.user);
  }

  public async signInWithEmail(
    email: string,
    password: string
  ): Promise<ExistingUser> {
    const { data, error } = await this.client.signInWithPassword({
      email,
      password,
    });

    if (error !== null) {
      return Promise.reject(error);
    }

    return this.getExistingUser(data.user);
  }

  public async resetPassword(email: string): Promise<void> {
    const { error } = await this.client.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/account/update-password`,
    });

    if (error !== null) {
      Promise.reject(error);
    }
  }

  public async updatePassword(newPassword: string): Promise<ExistingUser> {
    const { data, error } = await this.client.updateUser({
      password: newPassword,
    });

    if (error !== null) {
      return Promise.reject(error);
    }

    return this.getExistingUser(data.user);
  }

  public async signOut(): Promise<void> {
    const { error } = await this.client.signOut();

    if (error !== null) {
      Promise.reject(error);
    }
  }

  private getExistingUser(user: User): ExistingUser {
    const { email } = user;

    if (email === undefined) {
      throw new Error('Invalid user.');
    }

    const { name } = this.validateUserMetadata(user.user_metadata);

    return {
      email,
      name,
    };
  }

  private validateUserMetadata(metadata: UserMetadata): ExistingUserMetadata {
    const { name } = metadata;

    if (typeof name !== 'string') {
      throw new Error('Invalid user metadata.');
    }

    return { name };
  }
}
