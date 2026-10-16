import { Router, type Context } from "@oak/oak";
import { SupabaseSettingsRepository } from "../../infrastructure/database/repositories/SupabaseSettingsRepository.ts";
import { getSupabaseClient } from "../../infrastructure/database/supabaseClient.ts";
import { requireRole } from "../middlewares/authMiddleware.ts";
import type { BusinessSettingsMap } from "../../core/entities/BusinessSettings.ts";

export const SAFE_SETTINGS_KEYS = [
  "operating_hours",
  "contact_info",
  "service_zones",
  "business_name",
  "tagline",
  "location_city",
  "established_year",
] as const;

export function createSettingsRouter(): Router {
  const router = new Router();
  const repo = new SupabaseSettingsRepository(getSupabaseClient());

  // GET /api/v1/settings — public, returns only safe allowlisted business settings
  router.get("/api/v1/settings", async (ctx: Context) => {
    const all = await repo.getAll();
    const filtered: Record<string, unknown> = {};
    for (const key of SAFE_SETTINGS_KEYS) {
      if (key in all.settings) {
        filtered[key] = (all.settings as Record<string, unknown>)[key];
      }
    }
    ctx.response.status = 200;
    ctx.response.body = filtered;
  });

  // GET /api/v1/settings/:key — public, returns a single setting ONLY if in safe allowlist
  router.get("/api/v1/settings/:key", async (ctx) => {
    const key = ctx.params?.key;
    if (!key || !SAFE_SETTINGS_KEYS.includes(key as any)) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Setting key not found or not publicly accessible" };
      return;
    }

    const value = await repo.get(key as keyof BusinessSettingsMap);
    ctx.response.status = 200;
    ctx.response.body = { key, value };
  });

  // GET /api/v1/admin/settings — admin, returns all business settings
  router.get("/api/v1/admin/settings", requireRole(["ADMIN"]), async (ctx: Context) => {
    const settings = await repo.getAll();
    ctx.response.status = 200;
    ctx.response.body = settings.settings;
  });

  // PUT /api/v1/admin/settings — admin, update multiple settings at once
  router.put("/api/v1/admin/settings", requireRole(["ADMIN"]), async (ctx: Context) => {
    const body = await ctx.request.body.json();
    await repo.setMany(body);
    ctx.response.body = { message: "Settings updated successfully" };
  });

  // PUT /api/v1/admin/settings/:key — admin, update a single setting
  router.put("/api/v1/admin/settings/:key", requireRole(["ADMIN"]), async (ctx) => {
    const key = ctx.params?.key as keyof BusinessSettingsMap;
    if (!key) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Setting key is required" };
      return;
    }

    const body = await ctx.request.body.json();
    await repo.set(key, body.value);
    ctx.response.body = { message: `Setting "${key}" updated` };
  });

  return router;
}

