import "@std/dotenv/load";

export const config = {
  supabaseUrl: Deno.env.get("SUPABASE_URL") || "",
  supabaseServiceRoleKey: Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
  supabaseAnonKey: Deno.env.get("SUPABASE_ANON_KEY") || "",
  jwtSecret: Deno.env.get("JWT_SECRET") || "dev-secret-change-in-production",
  port: parseInt(Deno.env.get("PORT") || "8000"),
  env: Deno.env.get("DENO_ENV") || Deno.env.get("NODE_ENV") || "development",
  isProduction(): boolean {
    return this.env === "production";
  },
  isSupabaseConfigured(): boolean {
    return !!(this.supabaseUrl && this.supabaseServiceRoleKey);
  },
};

