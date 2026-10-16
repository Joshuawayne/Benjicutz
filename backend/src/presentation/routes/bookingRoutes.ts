import { Router, type Context } from "@oak/oak";
import { BookingController } from "../controllers/BookingController.ts";
import { CreateBookingUseCase } from "../../core/use-cases/CreateBookingUseCase.ts";
import { TriggerRebookingReminderUseCase } from "../../core/use-cases/TriggerRebookingReminderUseCase.ts";
import type { IBookingRepository } from "../../core/interfaces/IBookingRepository.ts";
import { WhatsAppBusinessAdapter } from "../../infrastructure/messaging/WhatsAppBusinessAdapter.ts";
import { requireRole } from "../middlewares/authMiddleware.ts";

import type { IServiceRepository } from "../../core/interfaces/IServiceRepository.ts";
import { SupabaseServiceRepository } from "../../infrastructure/database/repositories/SupabaseServiceRepository.ts";
import { AuthService } from "../../infrastructure/auth/AuthService.ts";
import { getSupabaseClient } from "../../infrastructure/database/supabaseClient.ts";
import { config } from "../../../config/environment.ts";

export function createBookingRouter(
  bookingRepo: IBookingRepository,
  serviceRepo?: IServiceRepository,
  authService?: AuthService,
): Router {
  const router = new Router();
  const whatsappService = new WhatsAppBusinessAdapter();
  const createBookingUseCase = new CreateBookingUseCase(bookingRepo, whatsappService);
  const triggerReminderUseCase = new TriggerRebookingReminderUseCase(bookingRepo, whatsappService);

  const client = getSupabaseClient();
  const resolvedServiceRepo = serviceRepo || (config.isSupabaseConfigured() && client ? new SupabaseServiceRepository(client) : undefined);
  const resolvedAuthService = authService || (config.isSupabaseConfigured() && client ? new AuthService(client) : undefined);

  const controller = new BookingController(
    createBookingUseCase,
    triggerReminderUseCase,
    bookingRepo,
    resolvedServiceRepo,
    resolvedAuthService,
  );

  const adminAuth = requireRole(["ADMIN"]);

  // Public route: client booking creation
  router.post("/api/v1/bookings", (ctx: Context) => controller.createBooking(ctx));

  // Admin routes: require ADMIN role
  router.get("/api/v1/bookings", adminAuth, (ctx: Context) => controller.listBookings(ctx));
  router.put("/api/v1/bookings/:id/status", adminAuth, (ctx: Context) => controller.updateStatus(ctx));
  router.put("/api/v1/admin/bookings/:id/status", adminAuth, (ctx: Context) => controller.updateStatus(ctx));
  router.delete("/api/v1/bookings/:id", adminAuth, (ctx: Context) => controller.deleteBooking(ctx));
  router.delete("/api/v1/admin/bookings/:id", adminAuth, (ctx: Context) => controller.deleteBooking(ctx));
  router.post("/api/v1/reminders/trigger", adminAuth, (ctx: Context) => controller.triggerReminders(ctx));

  return router;
}

