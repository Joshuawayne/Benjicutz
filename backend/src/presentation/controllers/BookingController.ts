import type { Context } from "@oak/oak";
import { CreateBookingUseCase } from "../../core/use-cases/CreateBookingUseCase.ts";
import { TriggerRebookingReminderUseCase } from "../../core/use-cases/TriggerRebookingReminderUseCase.ts";
import type { IBookingRepository } from "../../core/interfaces/IBookingRepository.ts";
import type { IServiceRepository } from "../../core/interfaces/IServiceRepository.ts";
import type { AuthService } from "../../infrastructure/auth/AuthService.ts";
import type { NairobiZone } from "../../core/entities/Booking.ts";
import { AppError } from "../../shared/errors/AppError.ts";

export const VALID_NAIROBI_ZONES: NairobiZone[] = [
  "KILIMANI",
  "LAVINGTON",
  "WESTLANDS",
  "KAREN",
  "GIGIRI",
  "RUNDA",
  "MUTHAIGA",
  "CBD",
  "KILELESHWA",
  "PARKLANDS",
  "EASTLANDS",
];

export class BookingController {
  constructor(
    private readonly createBookingUseCase: CreateBookingUseCase,
    private readonly triggerRebookingReminderUseCase: TriggerRebookingReminderUseCase,
    private readonly bookingRepo: IBookingRepository,
    private readonly serviceRepo?: IServiceRepository,
    private readonly authService?: AuthService,
  ) {}

  public async createBooking(ctx: Context) {
    const body = ctx.request.body;
    const json = await body.json();

    if (!json.clientName || !json.clientPhone || !json.zone || !json.scheduledAt) {
      throw new AppError("Missing required booking fields (clientName, clientPhone, zone, scheduledAt)", 400);
    }

    if (typeof json.clientName !== "string" || json.clientName.trim().length < 2) {
      throw new AppError("A valid client name is required (min 2 characters)", 400);
    }

    if (typeof json.clientPhone !== "string" || json.clientPhone.trim().length < 7) {
      throw new AppError("A valid client phone number is required (min 7 digits)", 400);
    }

    const normalizedZone = (json.zone || "").toUpperCase() as NairobiZone;
    if (!VALID_NAIROBI_ZONES.includes(normalizedZone)) {
      throw new AppError(`Invalid Nairobi zone. Must be one of: ${VALID_NAIROBI_ZONES.join(", ")}`, 400);
    }

    const scheduledDate = new Date(json.scheduledAt);
    if (isNaN(scheduledDate.getTime())) {
      throw new AppError("Invalid scheduledAt timestamp. Must be a valid date format.", 400);
    }

    // Server-Side Authoritative Service & Price Resolution:
    // Never trust client-submitted priceAmount or serviceName.
    let resolvedServiceId = json.serviceId || "";
    let authoritativeServiceName = (json.serviceName || "Bespoke Mobile Grooming").trim();
    let authoritativeBasePrice = 3500;

    if (this.serviceRepo) {
      let activeService = null;
      if (resolvedServiceId) {
        activeService = await this.serviceRepo.findById(resolvedServiceId);
      }
      if (!activeService && json.serviceName) {
        const activeServices = await this.serviceRepo.findActive();
        activeService = activeServices.find(
          (s) => s.props.title.toLowerCase() === json.serviceName.toLowerCase()
        ) || null;
      }

      if (activeService) {
        if (!activeService.props.isActive) {
          throw new AppError("The requested service is currently inactive and cannot be booked", 400);
        }
        resolvedServiceId = activeService.props.id;
        authoritativeServiceName = activeService.props.title;
        authoritativeBasePrice = activeService.props.priceKes;
      } else if (resolvedServiceId && resolvedServiceId.length === 36) {
        // If a specific UUID was provided but not found among active services
        throw new AppError("The requested service was not found or is unavailable", 400);
      }
    }

    // Extract caller's optional auth context
    let userId: string | undefined;
    const authHeader = ctx.request.headers.get("Authorization");
    if (authHeader && authHeader.startsWith("Bearer ") && this.authService) {
      const token = authHeader.replace("Bearer ", "");
      try {
        const payload = await this.authService.verifyToken(token);
        if (payload?.sub) {
          userId = payload.sub;
        }
      } catch {
        // Public/unauthenticated bookings are permitted; userId remains undefined
      }
    }

    const result = await this.createBookingUseCase.execute({
      userId,
      clientName: json.clientName.trim(),
      clientPhone: json.clientPhone.trim(),
      clientEmail: json.clientEmail ? json.clientEmail.trim() : undefined,
      serviceId: resolvedServiceId || "srv-custom",
      serviceName: authoritativeServiceName,
      priceAmount: authoritativeBasePrice,
      currency: "KES",
      zone: normalizedZone,
      locationAddress: json.locationAddress ? json.locationAddress.trim() : `${json.zone}, Nairobi`,
      scheduledAt: scheduledDate.toISOString(),
    });

    ctx.response.status = 201;
    ctx.response.body = {
      message: "Mobile booking created successfully",
      booking: result.booking.props,
      whatsappSent: result.whatsappSent,
    };
  }

  public async listBookings(ctx: Context) {
    const bookings = await this.bookingRepo.findAll();
    ctx.response.status = 200;
    ctx.response.body = {
      count: bookings.length,
      bookings: bookings.map((b) => b.props),
    };
  }

  public async triggerReminders(ctx: Context) {
    const result = await this.triggerRebookingReminderUseCase.execute();
    ctx.response.status = 200;
    ctx.response.body = {
      message: "Automated 12-day rebooking reminder engine executed",
      remindersSentCount: result.remindersSentCount,
      processedBookingIds: result.processedBookingIds,
    };
  }

  public async updateStatus(ctx: Context) {
    const params = (ctx as any).params;
    const id = params?.id;
    if (!id) {
      throw new AppError("Booking ID is required", 400);
    }

    const body = await ctx.request.body.json();
    const { status } = body;

    const validStatuses = ["CONFIRMED", "PENDING", "COMPLETED", "CANCELLED"];
    if (!status || !validStatuses.includes(status)) {
      throw new AppError(`Invalid status. Must be one of: ${validStatuses.join(", ")}`, 400);
    }

    const updated = await this.bookingRepo.updateStatus(id, status);
    if (!updated) {
      throw new AppError("Booking not found", 404);
    }

    ctx.response.status = 200;
    ctx.response.body = {
      message: `Booking status updated to ${status}`,
      booking: updated.props,
    };
  }

  public async deleteBooking(ctx: Context) {
    const params = (ctx as any).params;
    const id = params?.id;
    if (!id) {
      throw new AppError("Booking ID is required", 400);
    }

    const success = await this.bookingRepo.delete(id);
    if (!success) {
      throw new AppError("Booking not found or already deleted", 404);
    }

    ctx.response.status = 200;
    ctx.response.body = {
      message: "Booking deleted successfully",
    };
  }
}
