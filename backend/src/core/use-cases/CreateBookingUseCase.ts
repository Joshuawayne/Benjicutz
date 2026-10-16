import { Booking, type BookingProps } from "../entities/Booking.ts";
import type { IBookingRepository } from "../interfaces/IBookingRepository.ts";
import type { IWhatsAppService } from "../interfaces/IWhatsAppService.ts";

export interface CreateBookingDTO extends Omit<BookingProps, "id" | "createdAt" | "status"> {}

export class CreateBookingUseCase {
  constructor(
    private readonly bookingRepo: IBookingRepository,
    private readonly whatsappService: IWhatsAppService,
  ) {}

  public async execute(dto: CreateBookingDTO): Promise<{ booking: Booking; whatsappSent: boolean }> {
    const transportFee = Booking.calculateZoneTransportFee(dto.zone);
    const totalPrice = dto.priceAmount + transportFee;

    const booking = await this.bookingRepo.create({
      ...dto,
      priceAmount: totalPrice,
    });

    const whatsappSent = await this.whatsappService.sendBookingConfirmation({
      recipientPhone: booking.props.clientPhone,
      clientName: booking.props.clientName,
      serviceName: booking.props.serviceName,
      scheduledAt: booking.props.scheduledAt,
      zone: booking.props.zone,
    });

    return { booking, whatsappSent };
  }
}
