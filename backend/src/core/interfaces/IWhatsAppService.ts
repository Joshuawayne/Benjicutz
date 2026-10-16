export interface WhatsAppTemplatePayload {
  recipientPhone: string;
  clientName: string;
  serviceName: string;
  scheduledAt: string;
  zone: string;
  confirmationUrl?: string;
}

export interface IWhatsAppService {
  sendBookingConfirmation(payload: WhatsAppTemplatePayload): Promise<boolean>;
  send12DayRebookingReminder(payload: WhatsAppTemplatePayload): Promise<boolean>;
}
