export interface CalendlyWebhookPayload {
  event: string;
  time: string;
  payload: {
    event_type: { name: string };
    scheduled_event: {
      start_time: string;
      location: { location: string };
    };
    invitee: {
      name: string;
      email: string;
      text_reminder_number?: string;
    };
  };
}

export class CalendlyWebhookAdapter {
  public parseWebhookPayload(data: CalendlyWebhookPayload) {
    return {
      clientName: data.payload.invitee.name,
      clientEmail: data.payload.invitee.email,
      clientPhone: data.payload.invitee.text_reminder_number || "+254700000000",
      serviceName: data.payload.event_type.name,
      scheduledAt: data.payload.scheduled_event.start_time,
      locationAddress: data.payload.scheduled_event.location.location || "Nairobi Zone",
    };
  }
}
