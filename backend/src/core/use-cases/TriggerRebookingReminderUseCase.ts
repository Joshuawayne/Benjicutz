import type { IBookingRepository } from "../interfaces/IBookingRepository.ts";
import type { IWhatsAppService } from "../interfaces/IWhatsAppService.ts";

export class TriggerRebookingReminderUseCase {
  constructor(
    private readonly bookingRepo: IBookingRepository,
    private readonly whatsappService: IWhatsAppService,
  ) {}

  public async execute(): Promise<{ remindersSentCount: number; processedBookingIds: string[] }> {
    const pendingReminders = await this.bookingRepo.findPendingReminders();
    const processedBookingIds: string[] = [];
    let remindersSentCount = 0;

    for (const booking of pendingReminders) {
      if (booking.shouldSendRebookingReminder()) {
        const sent = await this.whatsappService.send12DayRebookingReminder({
          recipientPhone: booking.props.clientPhone,
          clientName: booking.props.clientName,
          serviceName: booking.props.serviceName,
          scheduledAt: booking.props.scheduledAt,
          zone: booking.props.zone,
        });

        if (sent) {
          await this.bookingRepo.markReminderSent(booking.props.id);
          remindersSentCount++;
          processedBookingIds.push(booking.props.id);
        }
      }
    }

    return { remindersSentCount, processedBookingIds };
  }
}
