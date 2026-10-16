import type { Context } from "@oak/oak";
import { CalendlyWebhookAdapter } from "../../infrastructure/calendly/CalendlyWebhookAdapter.ts";
import { CreateBookingUseCase } from "../../core/use-cases/CreateBookingUseCase.ts";

export class WebhookController {
  constructor(
    private readonly calendlyAdapter: CalendlyWebhookAdapter,
    private readonly createBookingUseCase: CreateBookingUseCase
  ) {}

  public async handleCalendlyWebhook(ctx: Context) {
    const body = ctx.request.body;
    const json = await body.json();

    const bookingData = this.calendlyAdapter.parseWebhookPayload(json);

    const result = await this.createBookingUseCase.execute({
      clientName: bookingData.clientName,
      clientPhone: bookingData.clientPhone,
      clientEmail: bookingData.clientEmail,
      serviceId: "srv-calendly",
      serviceName: bookingData.serviceName,
      priceAmount: 5000,
      currency: "KES",
      zone: "KILELESHWA",
      locationAddress: bookingData.locationAddress,
      scheduledAt: bookingData.scheduledAt,
    });

    ctx.response.status = 200;
    ctx.response.body = {
      status: "received",
      bookingId: result.booking.props.id,
    };
  }
}
