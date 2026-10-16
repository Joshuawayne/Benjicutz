import { Router, type Context } from "@oak/oak";
import { SupabaseRetainerTierRepository } from "../../infrastructure/database/repositories/SupabaseRetainerTierRepository.ts";
import { getSupabaseClient } from "../../infrastructure/database/supabaseClient.ts";
import { requireRole } from "../middlewares/authMiddleware.ts";

export function createRetainerTierRouter(): Router {
  const router = new Router();
  const repo = new SupabaseRetainerTierRepository(getSupabaseClient());

  // GET /api/v1/retainer-tiers — public, returns active tiers
  router.get("/api/v1/retainer-tiers", async (ctx: Context) => {
    const tiers = await repo.findActive();
    ctx.response.body = tiers.map((t) => t.props);
  });

  // GET /api/v1/retainer-tiers/:id — public
  router.get("/api/v1/retainer-tiers/:id", async (ctx) => {
    const id = ctx.params?.id;
    if (!id) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Tier ID is required" };
      return;
    }

    const tier = await repo.findById(id);
    if (!tier) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Retainer tier not found" };
      return;
    }

    ctx.response.body = tier.props;
  });

  // GET /api/v1/admin/retainer-tiers — admin, returns ALL tiers
  router.get("/api/v1/admin/retainer-tiers", requireRole(["ADMIN"]), async (ctx: Context) => {
    const tiers = await repo.findAll();
    ctx.response.body = tiers.map((t) => t.props);
  });

  // POST /api/v1/admin/retainer-tiers — admin, create a new tier
  router.post("/api/v1/admin/retainer-tiers", requireRole(["ADMIN"]), async (ctx: Context) => {
    const body = await ctx.request.body.json();
    const tier = await repo.create(body);
    ctx.response.status = 201;
    ctx.response.body = tier.props;
  });

  // PUT /api/v1/admin/retainer-tiers/:id — admin, update
  router.put("/api/v1/admin/retainer-tiers/:id", requireRole(["ADMIN"]), async (ctx) => {
    const id = ctx.params?.id;
    if (!id) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Tier ID is required" };
      return;
    }

    const body = await ctx.request.body.json();
    const tier = await repo.update(id, body);

    if (!tier) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Retainer tier not found" };
      return;
    }

    ctx.response.body = tier.props;
  });

  // DELETE /api/v1/admin/retainer-tiers/:id — admin, delete
  router.delete("/api/v1/admin/retainer-tiers/:id", requireRole(["ADMIN"]), async (ctx) => {
    const id = ctx.params?.id;
    if (!id) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Tier ID is required" };
      return;
    }

    const deleted = await repo.delete(id);

    if (!deleted) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Retainer tier not found" };
      return;
    }

    ctx.response.status = 204;
  });

  return router;
}

