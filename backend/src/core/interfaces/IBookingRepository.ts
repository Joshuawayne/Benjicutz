import { Booking, type BookingProps, type NairobiZone } from "../entities/Booking.ts";

export interface IBookingRepository {
  create(bookingProps: Omit<BookingProps, "id" | "createdAt" | "status">): Promise<Booking>;
  findById(id: string): Promise<Booking | null>;
  findAll(): Promise<Booking[]>;
  findByZone(zone: NairobiZone): Promise<Booking[]>;
  findPendingReminders(): Promise<Booking[]>;
  updateStatus(id: string, status: BookingProps["status"]): Promise<Booking | null>;
  delete(id: string): Promise<boolean>;
  markReminderSent(id: string): Promise<void>;
}
