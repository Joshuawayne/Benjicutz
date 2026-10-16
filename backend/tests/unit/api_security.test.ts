import { assertEquals } from "@std/assert";
import { BookingController } from "../../src/presentation/controllers/BookingController.ts";
import { CreateBookingUseCase } from "../../src/core/use-cases/CreateBookingUseCase.ts";
import { TriggerRebookingReminderUseCase } from "../../src/core/use-cases/TriggerRebookingReminderUseCase.ts";
import { InMemoryBookingRepository } from "../../src/infrastructure/database/InMemoryBookingRepository.ts";
import { Service } from "../../src/core/entities/Service.ts";
import type { IServiceRepository } from "../../src/core/interfaces/IServiceRepository.ts";
import type { IWhatsAppService, WhatsAppTemplatePayload } from "../../src/core/interfaces/IWhatsAppService.ts";
import { SAFE_SETTINGS_KEYS } from "../../src/presentation/routes/settingsRoutes.ts";
import { AppError } from "../../src/shared/errors/AppError.ts";
import { AuthService } from "../../src/infrastructure/auth/AuthService.ts";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Context } from "@oak/oak";

class MockWhatsAppService implements IWhatsAppService {
  public async sendBookingConfirmation(_p: WhatsAppTemplatePayload): Promise<boolean> {
    return true;
  }
  public async send12DayRebookingReminder(_p: WhatsAppTemplatePayload): Promise<boolean> {
    return true;
  }
}

class MockServiceRepository implements IServiceRepository {
  private services: Service[] = [
    new Service({
      id: "srv-active-001",
      title: "The Signature Craftsman Cut",
      subtitle: "Precision Cut",
      description: "Mobile haircut service",
      durationMinutes: 45,
      priceKes: 3500,
      category: "SIGNATURE_CUTS",
      targetAudience: "EXECUTIVE",
      iconName: "Scissors",
      sortOrder: 1,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }),
    new Service({
      id: "srv-inactive-002",
      title: "Archived Vintage Treatment",
      subtitle: "Inactive",
      description: "No longer offered",
      durationMinutes: 60,
      priceKes: 5000,
      category: "ORGANIC_TREATMENTS",
      targetAudience: "ALL",
      iconName: "Crown",
      sortOrder: 2,
      isActive: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }),
  ];

  async findAll(): Promise<Service[]> {
    return this.services;
  }
  async findActive(): Promise<Service[]> {
    return this.services.filter((s) => s.props.isActive);
  }
  async findById(id: string): Promise<Service | null> {
    return this.services.find((s) => s.props.id === id) || null;
  }
  async findByCategory(category: string): Promise<Service[]> {
    return this.services.filter((s) => s.props.category === category && s.props.isActive);
  }
  async create(_props: any): Promise<Service> {
    throw new Error("Not implemented");
  }
  async update(_id: string, _props: any): Promise<Service | null> {
    return null;
  }
  async delete(_id: string): Promise<boolean> {
    return true;
  }
}

function createMockOakContext(bodyJson: Record<string, unknown>, authHeader?: string): Context {
  return {
    request: {
      body: {
        json: async () => bodyJson,
      },
      headers: new Headers(authHeader ? { Authorization: authHeader } : {}),
    },
    response: {
      status: 200,
      body: undefined,
      headers: new Headers(),
    },
    state: {},
  } as unknown as Context;
}

// ─── 1. Public Catalog Reads ──────────────────────────────────────────────────

Deno.test("Catalog - findActive filters out inactive services", async () => {
  const repo = new MockServiceRepository();
  const allServices = await repo.findAll();
  const activeServices = await repo.findActive();

  assertEquals(allServices.length, 2);
  assertEquals(activeServices.length, 1);
  assertEquals(activeServices[0].props.id, "srv-active-001");
  assertEquals(activeServices[0].props.isActive, true);
});

// ─── 2. Safe Settings Filtering ──────────────────────────────────────────────

Deno.test("Settings - only allowlisted safe keys are exposed to public", () => {
  const sampleDatabaseSettings: Record<string, unknown> = {
    business_name: "Mobile Barber Craftsman",
    tagline: "Nairobi Bespoke Grooming",
    operating_hours: { monday_friday: "07:00 - 20:00" },
    contact_info: { phone: "+254700000000" },
    service_zones: ["Kilimani", "Westlands"],
    location_city: "Nairobi",
    established_year: "2024",
    // Private / internal settings that must NOT be exposed publicly
    supabase_service_role_secret: "secret-key-123",
    mpesa_consumer_secret: "pay-secret-456",
    internal_admin_emails: ["admin@craftsman.ke"],
  };

  const filtered: Record<string, unknown> = {};
  for (const key of SAFE_SETTINGS_KEYS) {
    if (key in sampleDatabaseSettings) {
      filtered[key] = sampleDatabaseSettings[key];
    }
  }

  assertEquals(Object.keys(filtered).length, 7);
  assertEquals("business_name" in filtered, true);
  assertEquals("operating_hours" in filtered, true);
  assertEquals("supabase_service_role_secret" in filtered, false);
  assertEquals("mpesa_consumer_secret" in filtered, false);
  assertEquals("internal_admin_emails" in filtered, false);
});

// ─── 3. Profile Ownership & Field Restrictions ────────────────────────────────

Deno.test("Profile - updateProfile updates only full_name and phone", async () => {
  let capturedUpdate: Record<string, unknown> | null = null;
  const mockDb = {
    auth: {
      getUser: async () => ({
        data: { user: { id: "user-456", email: "user@test.ke" } },
        error: null,
      }),
    },
    from: (_table: string) => ({
      update: (payload: Record<string, unknown>) => {
        capturedUpdate = payload;
        return {
          eq: () => ({
            select: () => ({
              single: async () => ({
                data: {
                  id: "user-456",
                  email: "user@test.ke",
                  full_name: payload.full_name,
                  phone: payload.phone,
                  role: "CLIENT",
                },
                error: null,
              }),
            }),
          }),
        };
      },
    }),
  } as unknown as SupabaseClient;

  const authService = new AuthService(mockDb);
  const result = await authService.updateProfile("valid-token", {
    fullName: "Kamau Njoroge",
    phone: "+254722000111",
  });

  assertEquals(result.success, true);
  assertEquals(result.profile?.name, "Kamau Njoroge");
  assertEquals(result.profile?.phone, "+254722000111");
  const updatePayload = capturedUpdate as Record<string, unknown> | null;
  assertEquals(updatePayload?.full_name, "Kamau Njoroge");
  assertEquals(updatePayload?.phone, "+254722000111");
  // Ensure no role or id was included in the update payload
  assertEquals("role" in (updatePayload ?? {}), false);
  assertEquals("id" in (updatePayload ?? {}), false);
});

// ─── 4. Server-Side Booking Validation & Price Authority ──────────────────────

Deno.test("Booking - server enforces authoritative database price, ignoring client price tampering", async () => {
  const bookingRepo = new InMemoryBookingRepository();
  const serviceRepo = new MockServiceRepository();
  const mockWhatsApp = new MockWhatsAppService();
  const createBookingUseCase = new CreateBookingUseCase(bookingRepo, mockWhatsApp);
  const triggerReminderUseCase = new TriggerRebookingReminderUseCase(bookingRepo, mockWhatsApp);

  const controller = new BookingController(
    createBookingUseCase,
    triggerReminderUseCase,
    bookingRepo,
    serviceRepo,
  );

  // Client attempts to tamper with price by sending priceAmount = 100 instead of 3500
  const ctx = createMockOakContext({
    clientName: "Executive Client",
    clientPhone: "+254799123456",
    serviceId: "srv-active-001",
    serviceName: "Tampered Name",
    priceAmount: 100, // Client tampered price!
    zone: "KILELESHWA", // 500 transport fee
    scheduledAt: new Date(Date.now() + 86400000).toISOString(),
  });

  await controller.createBooking(ctx);

  assertEquals(ctx.response.status, 201);
  const body = ctx.response.body as { booking: { priceAmount: number; serviceName: string } };
  // Authoritative price: 3500 (db service price) + 500 (Kileleshwa transport) = 4000
  assertEquals(body.booking.priceAmount, 4000);
  assertEquals(body.booking.serviceName, "The Signature Craftsman Cut");
});

Deno.test("Booking - rejects invalid Nairobi zone", async () => {
  const bookingRepo = new InMemoryBookingRepository();
  const serviceRepo = new MockServiceRepository();
  const mockWhatsApp = new MockWhatsAppService();
  const createBookingUseCase = new CreateBookingUseCase(bookingRepo, mockWhatsApp);
  const triggerReminderUseCase = new TriggerRebookingReminderUseCase(bookingRepo, mockWhatsApp);

  const controller = new BookingController(
    createBookingUseCase,
    triggerReminderUseCase,
    bookingRepo,
    serviceRepo,
  );

  const ctx = createMockOakContext({
    clientName: "Client",
    clientPhone: "+254711223344",
    serviceId: "srv-active-001",
    zone: "MOMBASA_BEACH", // Invalid zone
    scheduledAt: new Date(Date.now() + 86400000).toISOString(),
  });

  let error: AppError | null = null;
  try {
    await controller.createBooking(ctx);
  } catch (err) {
    if (err instanceof AppError) error = err;
  }

  assertEquals(error !== null, true);
  assertEquals(error?.statusCode, 400);
  assertEquals(error?.message.includes("Invalid Nairobi zone"), true);
});

Deno.test("Booking - rejects booking of inactive service", async () => {
  const bookingRepo = new InMemoryBookingRepository();
  const serviceRepo = new MockServiceRepository();
  const mockWhatsApp = new MockWhatsAppService();
  const createBookingUseCase = new CreateBookingUseCase(bookingRepo, mockWhatsApp);
  const triggerReminderUseCase = new TriggerRebookingReminderUseCase(bookingRepo, mockWhatsApp);

  const controller = new BookingController(
    createBookingUseCase,
    triggerReminderUseCase,
    bookingRepo,
    serviceRepo,
  );

  const ctx = createMockOakContext({
    clientName: "Client",
    clientPhone: "+254711223344",
    serviceId: "srv-inactive-002", // Inactive service
    zone: "WESTLANDS",
    scheduledAt: new Date(Date.now() + 86400000).toISOString(),
  });

  let error: AppError | null = null;
  try {
    await controller.createBooking(ctx);
  } catch (err) {
    if (err instanceof AppError) error = err;
  }

  assertEquals(error !== null, true);
  assertEquals(error?.statusCode, 400);
  assertEquals(error?.message.includes("inactive"), true);
});

Deno.test("Booking - rejects malformed scheduledAt date", async () => {
  const bookingRepo = new InMemoryBookingRepository();
  const serviceRepo = new MockServiceRepository();
  const mockWhatsApp = new MockWhatsAppService();
  const createBookingUseCase = new CreateBookingUseCase(bookingRepo, mockWhatsApp);
  const triggerReminderUseCase = new TriggerRebookingReminderUseCase(bookingRepo, mockWhatsApp);

  const controller = new BookingController(
    createBookingUseCase,
    triggerReminderUseCase,
    bookingRepo,
    serviceRepo,
  );

  const ctx = createMockOakContext({
    clientName: "Client",
    clientPhone: "+254711223344",
    serviceId: "srv-active-001",
    zone: "WESTLANDS",
    scheduledAt: "not-a-valid-date",
  });

  let error: AppError | null = null;
  try {
    await controller.createBooking(ctx);
  } catch (err) {
    if (err instanceof AppError) error = err;
  }

  assertEquals(error !== null, true);
  assertEquals(error?.statusCode, 400);
});
