import type { SupabaseClient } from "@supabase/supabase-js";

export interface AuthResult {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  user?: { id: string; email: string; role: string; name?: string };
  error?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  role?: string;
}

export interface TokenPayload {
  sub: string;
  email: string;
  role: string;
}

/**
 * Authentication service using Supabase Auth.
 * Uses email/password authentication for admin login.
 */
export class AuthService {
  constructor(private readonly db: SupabaseClient) {}

  /**
   * Sign in with email and password.
   * Returns JWT access token and user info on success.
   */
  async signIn(email: string, password: string): Promise<AuthResult> {
    const { data, error } = await this.db.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    const userId = data.user?.id || "";

    // Fetch display name & role from user_profiles table
    let fullName: string | undefined;
    let role = "CLIENT";
    try {
      const { data: profile } = await this.db
        .from("user_profiles")
        .select("full_name, role")
        .eq("id", userId)
        .single();
      fullName = profile?.full_name || undefined;
      if (profile?.role) {
        role = profile.role;
      }
    } catch {
      // Profile fetch fallback — default role to CLIENT
      role = "CLIENT";
    }

    return {
      success: true,
      accessToken: data.session?.access_token,
      refreshToken: data.session?.refresh_token,
      user: {
        id: userId,
        email: data.user?.email || "",
        role: role,
        name: fullName,
      },
    };
  }

  /**
   * Sign up a new user (defaults role to CLIENT).
   */
  async signUp(email: string, password: string): Promise<AuthResult> {
    const { data, error } = await this.db.auth.signUp({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return {
      success: true,
      user: {
        id: data.user?.id || "",
        email: data.user?.email || "",
        role: "CLIENT",
      },
    };
  }

  /**
   * Verify a JWT token and return the user info.
   * Validates token server-side via Supabase and fetches role from user_profiles table.
   */
  async verifyToken(token: string): Promise<TokenPayload | null> {
    const { data, error } = await this.db.auth.getUser(token);

    if (error || !data.user) {
      return null;
    }

    const userId = data.user.id;
    let role = "CLIENT";
    try {
      const { data: profile } = await this.db
        .from("user_profiles")
        .select("role")
        .eq("id", userId)
        .single();
      if (profile?.role) {
        role = profile.role;
      }
    } catch {
      role = "CLIENT";
    }

    return {
      sub: userId,
      email: data.user.email || "",
      role: role,
    };
  }

  /**
   * Refresh an expired access token.
   */
  async refreshSession(refreshToken: string): Promise<AuthResult> {
    const { data, error } = await this.db.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    const userId = data.user?.id || "";
    let role = "CLIENT";
    try {
      const { data: profile } = await this.db
        .from("user_profiles")
        .select("role")
        .eq("id", userId)
        .single();
      if (profile?.role) {
        role = profile.role;
      }
    } catch {
      role = "CLIENT";
    }

    return {
      success: true,
      accessToken: data.session?.access_token,
      refreshToken: data.session?.refresh_token,
      user: {
        id: userId,
        email: data.user?.email || "",
        role: role,
      },
    };
  }

  /**
   * Update password for an authenticated user.
   */
  async updateUserPassword(token: string, newPassword: string): Promise<AuthResult> {
    const { data: userData, error: userError } = await this.db.auth.getUser(token);
    
    if (!userError && userData?.user) {
      const { error } = await this.db.auth.admin.updateUserById(userData.user.id, {
        password: newPassword,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    }

    return { success: false, error: "Unauthorized: Invalid session token" };
  }

  /**
   * Get user profile (full_name, phone, email, role) from user_profiles table.
   * Defaults role to CLIENT if not found.
   */
  async getProfile(token: string): Promise<UserProfile | null> {
    const { data: userData, error } = await this.db.auth.getUser(token);
    if (error || !userData?.user) return null;

    const userId = userData.user.id;
    try {
      const { data: profile } = await this.db
        .from("user_profiles")
        .select("id, email, full_name, phone, role")
        .eq("id", userId)
        .single();

      return {
        id: userId,
        email: userData.user.email || profile?.email || "",
        name: profile?.full_name || "",
        phone: profile?.phone || "",
        role: profile?.role || "CLIENT",
      };
    } catch {
      return {
        id: userId,
        email: userData.user.email || "",
        name: "",
        phone: "",
        role: "CLIENT",
      };
    }
  }

  /**
   * Update the user's profile in user_profiles.
   * Only permits updating full_name and phone columns.
   * Does NOT alter role, id, email, or timestamps.
   */
  async updateProfile(
    token: string,
    payload: { fullName?: string; phone?: string } | string,
  ): Promise<{ success: boolean; error?: string; profile?: UserProfile }> {
    const { data: userData, error } = await this.db.auth.getUser(token);
    if (error || !userData?.user) {
      return { success: false, error: "Unauthorized: invalid session" };
    }

    const userId = userData.user.id;
    const updatePayload: Record<string, string> = {};

    if (typeof payload === "string") {
      updatePayload.full_name = payload.trim();
    } else {
      if (payload.fullName !== undefined) updatePayload.full_name = payload.fullName.trim();
      if (payload.phone !== undefined) updatePayload.phone = payload.phone.trim();
    }

    if (Object.keys(updatePayload).length === 0) {
      return { success: false, error: "No valid profile fields provided for update" };
    }

    try {
      const { data: updated, error: updateError } = await this.db
        .from("user_profiles")
        .update(updatePayload)
        .eq("id", userId)
        .select("id, email, full_name, phone, role")
        .single();

      if (updateError) {
        return { success: false, error: updateError.message };
      }
      return {
        success: true,
        profile: {
          id: userId,
          email: updated?.email || userData.user.email || "",
          name: updated?.full_name || "",
          phone: updated?.phone || "",
          role: updated?.role || "CLIENT",
        },
      };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      return { success: false, error: msg };
    }
  }

  /**
   * Sign out — invalidates the current session.
   */
  async signOut(token: string): Promise<void> {
    await this.db.auth.admin.signOut(token);
  }
}
