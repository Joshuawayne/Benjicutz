import { IBookingRepository } from "../../../core/interfaces/IBookingRepository.ts";
import { Booking, type BookingProps, type NairobiZone } from "../../../core/entities/Booking.ts";
import { AppError } from "../../../shared/errors/AppError.ts";

/**
 * PostgreSQL direct repository implementation for booking management.
 * Note: Supabase implementation (SupabaseBookingRepository) is active by default.
 */
export class PostgresBookingRepository implements IBookingRepository {
  async create(_bookingProps: Omit<BookingProps, "id" | "createdAt" | "status">): Promise<Booking> {
    throw new AppError("PostgresBookingRepository is not configured. Use SupabaseBookingRepository.", 501);
  }

  async findById(_id: string): Promise<Booking | null> {
    throw new AppError("PostgresBookingRepository is not configured. Use SupabaseBookingRepository.", 501);
  }

  async findAll(): Promise<Booking[]> {
    throw new AppError("PostgresBookingRepository is not configured. Use SupabaseBookingRepository.", 501);
  }

  async findByZone(_zone: NairobiZone): Promise<Booking[]> {
    throw new AppError("PostgresBookingRepository is not configured. Use SupabaseBookingRepository.", 501);
  }

  async findPendingReminders(): Promise<Booking[]> {
    throw new AppError("PostgresBookingRepository is not configured. Use SupabaseBookingRepository.", 501);
  }

  async updateStatus(_id: string, _status: BookingProps["status"]): Promise<Booking | null> {
    throw new AppError("PostgresBookingRepository is not configured. Use SupabaseBookingRepository.", 501);
  }

  async delete(_id: string): Promise<boolean> {
    throw new AppError("PostgresBookingRepository is not configured. Use SupabaseBookingRepository.", 501);
  }

  async markReminderSent(_id: string): Promise<void> {
    throw new AppError("PostgresBookingRepository is not configured. Use SupabaseBookingRepository.", 501);
  }
}
