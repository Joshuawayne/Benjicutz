import { assertEquals, assertExists } from "@std/assert";
import { Booking } from "../src/core/entities/Booking.ts";
import { CreateBookingUseCase } from "../src/core/use-cases/CreateBookingUseCase.ts";
import { TriggerRebookingReminderUseCase } from "../src/core/use-cases/TriggerRebookingReminderUseCase.ts";
import { InMemoryBookingRepository } from "../src/infrastructure/database/InMemoryBookingRepository.ts";
import { InMemoryAnalyticsRepository } from "../src/infrastructure/database/InMemoryAnalyticsRepository.ts";
import type { IWhatsAppService, WhatsAppTemplatePayload } from "../src/core/interfaces/IWhatsAppService.ts";

class MockWhatsAppService implements IWhatsAppService {
  public sentConfirmations: WhatsAppTemplatePayload[] = [];
  public sentReminders: WhatsAppTemplatePayload[] = [];

  public async sendBookingConfirmation(payload: WhatsAppTemplatePayload): Promise<boolean> {
    this.sentConfirmations.push(payload);
    return true;
  }

  public async send12DayRebookingReminder(payload: WhatsAppTemplatePayload): Promise<boolean> {
    this.sentReminders.push(payload);
    return true;
  }
}

Deno.test("Booking Entity - calculates correct Nairobi zone transport fees", () => {
  assertEquals(Booking.calculateZoneTransportFee("KILELESHWA"), 500);
  assertEquals(Booking.calculateZoneTransportFee("WESTLANDS"), 500);
  assertEquals(Booking.calculateZoneTransportFee("LAVINGTON"), 500);
  assertEquals(Booking.calculateZoneTransportFee("KILIMANI"), 600);
  assertEquals(Booking.calculateZoneTransportFee("EASTLANDS"), 1000);
});

Deno.test("CreateBookingUseCase - creates booking with zone transport fee and dispatches WhatsApp", async () => {
  const repo = new InMemoryBookingRepository();
  const mockWhatsApp = new MockWhatsAppService();
  const useCase = new CreateBookingUseCase(repo, mockWhatsApp);

  const result = await useCase.execute({
    clientName: "David Omondi",
    clientPhone: "+254712345678",
    serviceId: "srv-001",
    serviceName: "Executive Signature Cut & Beard Sculpting",
    priceAmount: 4500,
    currency: "KES",
    zone: "KILELESHWA",
    locationAddress: "Mandera Rd, Kileleshwa",
    scheduledAt: "2026-09-25 at 10:00 AM",
  });

  assertExists(result.booking.props.id);
  assertEquals(result.booking.props.priceAmount, 5000); // 4500 + 500 transport fee
  assertEquals(result.whatsappSent, true);
  assertEquals(mockWhatsApp.sentConfirmations.length, 1);
  assertEquals(mockWhatsApp.sentConfirmations[0].recipientPhone, "+254712345678");
});

Deno.test("TriggerRebookingReminderUseCase - processes 12-day rebooking reminders for completed bookings", async () => {
  const repo = new InMemoryBookingRepository();
  const mockWhatsApp = new MockWhatsAppService();
  const useCase = new TriggerRebookingReminderUseCase(repo, mockWhatsApp);

  const result = await useCase.execute();

  // InMemoryBookingRepository seeds 2 bookings older than 12 days
  assertEquals(result.remindersSentCount >= 1, true);
  assertEquals(mockWhatsApp.sentReminders.length >= 1, true);
});

Deno.test("AnalyticsRepository - computes real-time revenue and zone distribution metrics", async () => {
  const repo = new InMemoryBookingRepository();
  const analyticsRepo = new InMemoryAnalyticsRepository(repo);

  const metrics = await analyticsRepo.getDashboardMetrics();
  assertEquals(metrics.props.totalRevenueKes > 0, true);
  assertEquals(metrics.props.zoneBreakdown.length > 0, true);
  assertEquals(metrics.props.rebookingRetentionRatePct >= 0, true);
});
