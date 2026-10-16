import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { config } from "../../../config/environment.ts";

let _client: SupabaseClient | null = null;
let _anonClient: SupabaseClient | null = null;

/**
 * Returns a singleton Supabase client using the Service Role Key.
 * Returns null if Supabase is not configured or URL is empty.
 * Does NOT call createClient when URL is empty.
 */
export function getSupabaseClient(): SupabaseClient {
  if (!config.isSupabaseConfigured() || !config.supabaseUrl) {
    return null as unknown as SupabaseClient;
  }
  if (!_client) {
    _client = createClient(config.supabaseUrl, config.supabaseServiceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }
  return _client;
}

/**
 * Returns a Supabase client using the Anon Key — used for client-facing
 * auth operations (login, signup) where RLS should apply.
 * Returns null if Supabase is not configured or URL is empty.
 * Does NOT call createClient when URL is empty.
 */
export function getSupabaseAnonClient(): SupabaseClient {
  if (!config.isSupabaseConfigured() || !config.supabaseUrl) {
    return null as unknown as SupabaseClient;
  }
  if (!_anonClient) {
    _anonClient = createClient(config.supabaseUrl, config.supabaseAnonKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }
  return _anonClient;
}


