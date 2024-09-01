import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

export function useSupabaseClient() {
  const client = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  );

  return client;
}
