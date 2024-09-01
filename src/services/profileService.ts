import { useSupabaseClient } from './supabase';

export function useProfileService() {
  const client = useSupabaseClient();
}
