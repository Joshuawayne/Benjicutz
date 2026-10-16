import { Router, type Context } from "@oak/oak";
import { AdminAnalyticsController } from "../controllers/AdminAnalyticsController.ts";
import { GetAdminDashboardMetricsUseCase } from "../../core/use-cases/GetAdminDashboardMetricsUseCase.ts";
import { config } from "../../../config/environment.ts";
import { getSupabaseClient } from "../../infrastructure/database/supabaseClient.ts";
import { SupabaseAnalyticsRepository } from "../../infrastructure/database/repositories/SupabaseAnalyticsRepository.ts";
import { InMemoryAnalyticsRepository } from "../../infrastructure/database/InMemoryAnalyticsRepository.ts";
import type { IBookingRepository } from "../../core/interfaces/IBookingRepository.ts";
import { requireRole } from "../middlewares/authMiddleware.ts";

export function createAdminRouter(bookingRepo: IBookingRepository): Router {
  const router = new Router();
  const analyticsRepo = config.isSupabaseConfigured()
    ? new SupabaseAnalyticsRepository(getSupabaseClient())
    : new InMemoryAnalyticsRepository(bookingRepo);

  const getMetricsUseCase = new GetAdminDashboardMetricsUseCase(analyticsRepo);
  const controller = new AdminAnalyticsController(getMetricsUseCase);

  router.get("/api/v1/admin/analytics", requireRole(["ADMIN"]), (ctx: Context) => controller.getMetrics(ctx));

  return router;
}
