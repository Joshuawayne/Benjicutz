import { Router, type Context } from "@oak/oak";
import { SupabaseServiceRepository } from "../../infrastructure/database/repositories/SupabaseServiceRepository.ts";
import { getSupabaseClient } from "../../infrastructure/database/supabaseClient.ts";
import { requireRole } from "../middlewares/authMiddleware.ts";

export function createServiceRouter(): Router {
  const router = new Router();
  const repo = new SupabaseServiceRepository(getSupabaseClient());

  // GET /api/v1/services — public, returns only active services
  router.get("/api/v1/services", async (ctx: Context) => {
    const services = await repo.findActive();
    ctx.response.body = services.map((s) => s.props);
  });

  // GET /api/v1/service-categories — public, returns service categories
  router.get("/api/v1/service-categories", async (ctx: Context) => {
    const client = getSupabaseClient();
    if (client) {
      const { data, error } = await client
        .from("service_categories")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) {
        ctx.response.status = 500;
        ctx.response.body = { error: error.message };
        return;
      }
      ctx.response.status = 200;
      ctx.response.body = data || [];
    } else {
      ctx.response.status = 200;
      ctx.response.body = [
        { id: "11111111-1111-1111-1111-111111111111", name: "Executive Haircuts", sort_order: 1 },
        { id: "22222222-2222-2222-2222-222222222222", name: "Beard & Facial Care", sort_order: 2 },
        { id: "33333333-3333-3333-3333-333333333333", name: "VIP Packages", sort_order: 3 },
      ];
    }
  });

  // GET /api/v1/services/:id — public
  router.get("/api/v1/services/:id", async (ctx) => {
    const id = ctx.params?.id;
    if (!id) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Service ID is required" };
      return;
    }

    const service = await repo.findById(id);
    if (!service) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Service not found" };
      return;
    }

    ctx.response.body = service.props;
  });

  // GET /api/v1/admin/services — admin, returns ALL services (incl. inactive)
  router.get("/api/v1/admin/services", requireRole(["ADMIN"]), async (ctx: Context) => {
    const services = await repo.findAll();
    ctx.response.body = services.map((s) => s.props);
  });

  // POST /api/v1/admin/services — create a new service
  router.post("/api/v1/admin/services", requireRole(["ADMIN"]), async (ctx: Context) => {
    const body = await ctx.request.body.json();
    const service = await repo.create(body);
    ctx.response.status = 201;
    ctx.response.body = service.props;
  });

  // PUT /api/v1/admin/services/:id — update a service
  router.put("/api/v1/admin/services/:id", requireRole(["ADMIN"]), async (ctx) => {
    const id = ctx.params?.id;
    if (!id) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Service ID is required" };
      return;
    }

    const body = await ctx.request.body.json();
    const service = await repo.update(id, body);

    if (!service) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Service not found" };
      return;
    }

    ctx.response.body = service.props;
  });

  // DELETE /api/v1/admin/services/:id — delete a service
  router.delete("/api/v1/admin/services/:id", requireRole(["ADMIN"]), async (ctx) => {
    const id = ctx.params?.id;
    if (!id) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Service ID is required" };
      return;
    }

    const deleted = await repo.delete(id);

    if (!deleted) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Service not found" };
      return;
    }

    ctx.response.status = 204;
  });

  return router;
}

