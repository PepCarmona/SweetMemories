import { createClient } from '@supabase/supabase-js';

export function useSupabaseClient() {
  const client = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  );

  return client;
}
