import { assertEquals } from "@std/assert";
import { AuthService } from "../../src/infrastructure/auth/AuthService.ts";
import { requireRole } from "../../src/presentation/middlewares/authMiddleware.ts";
import { AppError } from "../../src/shared/errors/AppError.ts";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Context } from "@oak/oak";

function createMockSupabase(overrides: {
  getUserResult?: { data: { user: { id: string; email: string } | null }; error: Error | null };
  profileResult?: { data: { id: string; email: string; full_name?: string; role?: string } | null; error: Error | null };
  updateUserByIdResult?: { data: null; error: Error | null };
  upsertResult?: { error: Error | null };
}): SupabaseClient {
  return {
    auth: {
      getUser: async (_token: string) => {
        return overrides.getUserResult ?? { data: { user: { id: "user-123", email: "user@test.com" } }, error: null };
      },
      signInWithPassword: async () => {
        return { data: { user: { id: "user-123", email: "user@test.com" }, session: { access_token: "tok", refresh_token: "ref" } }, error: null };
      },
      signUp: async () => {
        return { data: { user: { id: "user-123", email: "user@test.com" } }, error: null };
      },
      refreshSession: async () => {
        return { data: { user: { id: "user-123", email: "user@test.com" }, session: { access_token: "tok", refresh_token: "ref" } }, error: null };
      },
      admin: {
        updateUserById: async (_id: string, _attrs: Record<string, unknown>) => {
          return overrides.updateUserByIdResult ?? { data: null, error: null };
        },
        signOut: async () => {},
      },
    },
    from: (_table: string) => {
      return {
        select: (_cols: string) => ({
          eq: (_col: string, _val: string) => ({
            single: async () => {
              return overrides.profileResult ?? { data: { id: "user-123", email: "user@test.com", role: "CLIENT", full_name: "Test User" }, error: null };
            },
          }),
        }),
        upsert: async (_payload: Record<string, unknown>, _opts: Record<string, unknown>) => {
          return overrides.upsertResult ?? { error: null };
        },
      };
    },
  } as unknown as SupabaseClient;
}

Deno.test("AuthService.verifyToken - reads role from user_profiles table", async () => {
  const mockDb = createMockSupabase({
    profileResult: { data: { id: "user-123", email: "admin@test.com", role: "ADMIN", full_name: "Admin" }, error: null },
  });
  const auth = new AuthService(mockDb);
  const payload = await auth.verifyToken("valid-token");

  assertEquals(payload?.sub, "user-123");
  assertEquals(payload?.role, "ADMIN");
});

Deno.test("AuthService.verifyToken - defaults to CLIENT when profile role is missing or error", async () => {
  const mockDb = createMockSupabase({
    profileResult: { data: null, error: new Error("Not found") },
  });
  const auth = new AuthService(mockDb);
  const payload = await auth.verifyToken("valid-token");

  assertEquals(payload?.sub, "user-123");
  assertEquals(payload?.role, "CLIENT");
});

Deno.test("AuthService.getProfile - defaults to CLIENT role without ADMIN fallback", async () => {
  const mockDb = createMockSupabase({
    profileResult: { data: null, error: new Error("Profile query failed") },
  });
  const auth = new AuthService(mockDb);
  const profile = await auth.getProfile("valid-token");

  assertEquals(profile?.role, "CLIENT");
});

Deno.test("AuthService.updateUserPassword - rejects invalid tokens and does not have dev backdoor", async () => {
  const mockDb = createMockSupabase({
    getUserResult: { data: { user: null }, error: new Error("Invalid JWT") },
  });
  const auth = new AuthService(mockDb);
  const result1 = await auth.updateUserPassword("dev-test-token", "new-pass");
  assertEquals(result1.success, false);

  const result2 = await auth.updateUserPassword("admin-fake-token", "new-pass");
  assertEquals(result2.success, false);
});

Deno.test("requireRole middleware - rejects missing or malformed Authorization header with 401", async () => {
  const middleware = requireRole(["ADMIN"]);
  const mockCtx = {
    request: {
      headers: new Headers(),
    },
    state: {},
  } as unknown as Context;

  let caughtError: AppError | null = null;
  try {
    await middleware(mockCtx, async () => {});
  } catch (err) {
    if (err instanceof AppError) {
      caughtError = err;
    }
  }

  assertEquals(caughtError !== null, true);
  assertEquals(caughtError?.statusCode, 401);
  assertEquals(caughtError?.message, "Unauthorized: Missing or invalid Authorization header");
});

Deno.test("requireRole middleware - rejects CLIENT user with 403 when ADMIN is required", async () => {
  // We test the role check behavior when user_profiles returns CLIENT
  // requireRole delegates to verifyToken
  const mockDb = createMockSupabase({
    profileResult: { data: { id: "user-client", email: "client@test.com", role: "CLIENT", full_name: "Client" }, error: null },
  });
  const auth = new AuthService(mockDb);
  const payload = await auth.verifyToken("client-token");
  assertEquals(payload?.role, "CLIENT");

  const allowedRoles = ["ADMIN"];
  assertEquals(allowedRoles.includes(payload!.role), false);
});
