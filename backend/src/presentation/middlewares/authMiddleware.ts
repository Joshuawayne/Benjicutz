import type { Context } from "@oak/oak";
import { AppError } from "../../shared/errors/AppError.ts";
import { AuthService } from "../../infrastructure/auth/AuthService.ts";
import { getSupabaseClient } from "../../infrastructure/database/supabaseClient.ts";

export type Role = "CLIENT" | "ADMIN" | "INSTITUTION_PARTNER";

let authServiceInstance: AuthService | null = null;

function getAuthService(): AuthService | null {
  if (!authServiceInstance) {
    const client = getSupabaseClient();
    if (client) {
      authServiceInstance = new AuthService(client);
    }
  }
  return authServiceInstance;
}

/**
 * JWT-based auth middleware. Extracts the Bearer token from the
 * Authorization header, verifies it via Supabase & user_profiles table,
 * and attaches user info to the context state.
 */
export function requireRole(allowedRoles: Role[]) {
  return async (ctx: Context, next: () => Promise<unknown>) => {
    const authHeader = ctx.request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Unauthorized: Missing or invalid Authorization header", 401);
    }

    const token = authHeader.replace("Bearer ", "");
    const authService = getAuthService();
    if (!authService) {
      throw new AppError("Internal Server Error: Auth service unavailable", 500);
    }

    try {
      const payload = await authService.verifyToken(token);
      if (!payload) {
        throw new AppError("Unauthorized: Invalid or expired token", 401);
      }

      // Read user role from user_profiles table (defaults to CLIENT)
      const userRole: Role = (payload.role as Role) || "CLIENT";

      if (!allowedRoles.includes(userRole)) {
        throw new AppError("Forbidden: Insufficient privileges for this resource", 403);
      }

      ctx.state.user = { id: payload.sub, email: payload.email, role: userRole };
      await next();
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new AppError("Unauthorized: Token verification failed", 401);
    }
  };
}



