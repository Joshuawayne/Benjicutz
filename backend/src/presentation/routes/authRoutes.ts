import { Router, type Context } from "@oak/oak";
import { AuthService } from "../../infrastructure/auth/AuthService.ts";
import { getSupabaseClient } from "../../infrastructure/database/supabaseClient.ts";

export function createAuthRouter(): Router {
  const router = new Router();
  let authServiceInstance: AuthService | null = null;
  function getAuthService(): AuthService | null {
    if (!authServiceInstance) {
      const client = getSupabaseClient();
      if (client) authServiceInstance = new AuthService(client);
    }
    return authServiceInstance;
  }

  // POST /api/v1/auth/login
  router.post("/api/v1/auth/login", async (ctx: Context) => {
    const authService = getAuthService();
    if (!authService) {
      ctx.response.status = 503;
      ctx.response.body = { error: "Auth service unavailable: Supabase not configured" };
      return;
    }

    const body = await ctx.request.body.json();
    const { email, password } = body;

    if (!email || !password) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Email and password are required" };
      return;
    }

    const result = await authService.signIn(email, password);

    if (!result.success) {
      ctx.response.status = 401;
      ctx.response.body = { error: result.error || "Incorrect email or password." };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      user: result.user,
    };
  });

  // POST /api/v1/auth/signup (protected — only for initial setup)
  router.post("/api/v1/auth/signup", async (ctx: Context) => {
    const authService = getAuthService();
    if (!authService) {
      ctx.response.status = 503;
      ctx.response.body = { error: "Auth service unavailable: Supabase not configured" };
      return;
    }

    const body = await ctx.request.body.json();
    const { email, password } = body;

    if (!email || !password) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Email and password are required" };
      return;
    }

    const result = await authService.signUp(email, password);

    if (!result.success) {
      ctx.response.status = 400;
      ctx.response.body = { error: result.error || "Signup failed" };
      return;
    }

    ctx.response.status = 201;
    ctx.response.body = { message: "User created successfully", user: result.user };
  });

  // POST /api/v1/auth/refresh
  router.post("/api/v1/auth/refresh", async (ctx: Context) => {
    const authService = getAuthService();
    if (!authService) {
      ctx.response.status = 503;
      ctx.response.body = { error: "Auth service unavailable: Supabase not configured" };
      return;
    }

    const body = await ctx.request.body.json();
    const { refreshToken } = body;

    if (!refreshToken) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Refresh token is required" };
      return;
    }

    const result = await authService.refreshSession(refreshToken);

    if (!result.success) {
      ctx.response.status = 401;
      ctx.response.body = { error: result.error || "Token refresh failed" };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      user: result.user,
    };
  });

  // GET /api/v1/auth/me — verify current token and return user info
  router.get("/api/v1/auth/me", async (ctx: Context) => {
    const authService = getAuthService();
    if (!authService) {
      ctx.response.status = 503;
      ctx.response.body = { error: "Auth service unavailable: Supabase not configured" };
      return;
    }

    const authHeader = ctx.request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Unauthorized" };
      return;
    }

    const token = authHeader.replace("Bearer ", "");
    const payload = await authService.verifyToken(token);

    if (!payload) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Invalid or expired token" };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  });

  // POST /api/v1/auth/change-password — update authenticated user password
  router.post("/api/v1/auth/change-password", async (ctx: Context) => {
    const authService = getAuthService();
    if (!authService) {
      ctx.response.status = 503;
      ctx.response.body = { error: "Auth service unavailable: Supabase not configured" };
      return;
    }

    const authHeader = ctx.request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Unauthorized: Missing Authorization header" };
      return;
    }

    const token = authHeader.replace("Bearer ", "");
    const body = await ctx.request.body.json();
    const { newPassword } = body;

    if (!newPassword || newPassword.length < 6) {
      ctx.response.status = 400;
      ctx.response.body = { error: "New password must be at least 6 characters long" };
      return;
    }

    const result = await authService.updateUserPassword(token, newPassword);
    if (!result.success) {
      ctx.response.status = 400;
      ctx.response.body = { error: result.error || "Password update failed" };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = { message: "Password updated successfully" };
  });

  // POST /api/v1/auth/logout — sign out and invalidate session
  router.post("/api/v1/auth/logout", async (ctx: Context) => {
    const authService = getAuthService();
    const authHeader = ctx.request.headers.get("Authorization");
    if (authHeader && authHeader.startsWith("Bearer ") && authService) {
      const token = authHeader.replace("Bearer ", "");
      try {
        await authService.signOut(token);
      } catch {
        // Ignore errors during signout
      }
    }

    ctx.response.status = 200;
    ctx.response.body = { message: "Signed out successfully" };
  });

  // GET /api/v1/auth/profile — fetch logged-in user's profile (name, email)
  router.get("/api/v1/auth/profile", async (ctx: Context) => {
    const authService = getAuthService();
    if (!authService) {
      ctx.response.status = 503;
      ctx.response.body = { error: "Auth service unavailable: Supabase not configured" };
      return;
    }

    const authHeader = ctx.request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Unauthorized" };
      return;
    }

    const token = authHeader.replace("Bearer ", "");
    const profile = await authService.getProfile(token);

    if (!profile) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Invalid or expired session" };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = profile;
  });

  // PUT /api/v1/auth/profile — update the logged-in user's profile (only full_name and phone permitted)
  router.put("/api/v1/auth/profile", async (ctx: Context) => {
    const authService = getAuthService();
    if (!authService) {
      ctx.response.status = 503;
      ctx.response.body = { error: "Auth service unavailable: Supabase not configured" };
      return;
    }

    const authHeader = ctx.request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Unauthorized: Missing or invalid Authorization header" };
      return;
    }

    const body = await ctx.request.body.json();

    // Explicitly reject attempts to change immutable/protected fields (role, id, email, created_at)
    if (body.role !== undefined || body.id !== undefined || body.email !== undefined || body.created_at !== undefined) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Modifying id, role, email, or timestamps is strictly forbidden" };
      return;
    }

    const fullName = body.fullName || body.name || body.full_name;
    const phone = body.phone;

    if (!fullName && !phone) {
      ctx.response.status = 400;
      ctx.response.body = { error: "At least one updateable field (fullName or phone) must be provided" };
      return;
    }

    const token = authHeader.replace("Bearer ", "");
    const result = await authService.updateProfile(token, {
      fullName: typeof fullName === "string" ? fullName.trim() : undefined,
      phone: typeof phone === "string" ? phone.trim() : undefined,
    });

    if (!result.success) {
      ctx.response.status = 400;
      ctx.response.body = { error: result.error || "Failed to update profile" };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = {
      message: "Profile updated successfully",
      profile: result.profile,
    };
  });

  return router;
}
