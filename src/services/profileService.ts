import type { UserProfile } from '@/types/user';
import { useSupabaseClient } from './supabase';

export function useProfileService() {
  const client = useSupabaseClient();

  async function createProfile(profile: UserProfile): Promise<void> {
    const { error } = await client.from('profile').insert(profile);

    if (error !== null) {
      return Promise.reject(error);
    }
  }

  return {
    createProfile,
  };
}
