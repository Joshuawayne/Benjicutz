import type { IWhatsAppService, WhatsAppTemplatePayload } from "../../core/interfaces/IWhatsAppService.ts";

export class WhatsAppBusinessAdapter implements IWhatsAppService {
  private apiToken: string;
  private phoneNumberId: string;

  constructor() {
    this.apiToken = Deno.env.get("WHATSAPP_API_TOKEN") || "mock_token";
    this.phoneNumberId = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID") || "mock_phone_id";
  }

  public async sendBookingConfirmation(payload: WhatsAppTemplatePayload): Promise<boolean> {
    console.log(`[WhatsApp Adapter] 📱 Sending Booking Confirmation to ${payload.recipientPhone}:`);
    console.log(`   "Hello ${payload.clientName}, your mobile grooming appointment for '${payload.serviceName}' in ${payload.zone} on ${payload.scheduledAt} has been confirmed. Master Craftsman on transit."`);

    if (this.apiToken === "mock_token") {
      return true; // Simulate successful dispatch
    }

    try {
      const response = await fetch(`https://graph.facebook.com/v18.0/${this.phoneNumberId}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: payload.recipientPhone,
          type: "template",
          template: {
            name: "booking_confirmation_v1",
            language: { code: "en" },
            components: [
              {
                type: "body",
                parameters: [
                  { type: "text", text: payload.clientName },
                  { type: "text", text: payload.serviceName },
                  { type: "text", text: payload.zone },
                  { type: "text", text: payload.scheduledAt },
                ],
              },
            ],
          },
        }),
      });

      return response.ok;
    } catch (err) {
      console.error("[WhatsApp Adapter Error]", err);
      return false;
    }
  }

  public async send12DayRebookingReminder(payload: WhatsAppTemplatePayload): Promise<boolean> {
    console.log(`[WhatsApp Adapter] ⏳ Sending 12-Day Rebooking Reminder to ${payload.recipientPhone}:`);
    console.log(`   "Your lineup stays sharp for 14 days, ${payload.clientName}. Tap here to lock in your preferred time for this Friday in ${payload.zone}."`);
    return true;
  }
}
