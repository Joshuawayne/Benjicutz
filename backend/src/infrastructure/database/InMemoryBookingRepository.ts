import { Booking, type BookingProps, type NairobiZone } from "../../core/entities/Booking.ts";
import type { IBookingRepository } from "../../core/interfaces/IBookingRepository.ts";

export class InMemoryBookingRepository implements IBookingRepository {
  private bookings: Map<string, Booking> = new Map();

  constructor() {
    // Seed initial mock bookings for demonstration and BI analytics
    const mockBookings: BookingProps[] = [
      {
        id: "book-001",
        clientName: "David Omondi",
        clientPhone: "+254712345678",
        clientEmail: "david.omondi@corp.co.ke",
        serviceId: "srv-001",
        serviceName: "Executive Signature Cut & Beard Sculpting",
        priceAmount: 4500,
        currency: "KES",
        zone: "KILELESHWA",
        locationAddress: "Mandera Road, Kileleshwa, Apt 4B",
        scheduledAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
        status: "COMPLETED",
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        reminderSent: false,
      },
      {
        id: "book-002",
        clientName: "Anthony Ndirangu",
        clientPhone: "+254722987654",
        clientEmail: "anthony@westlands.co.ke",
        serviceId: "srv-002",
        serviceName: "Micro-Airblading Hairline Restoration & Lineup",
        priceAmount: 7000,
        currency: "KES",
        zone: "WESTLANDS",
        locationAddress: "Parklands Road, Westlands, Villa 12",
        scheduledAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
        status: "COMPLETED",
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        reminderSent: false,
      },
      {
        id: "book-003",
        clientName: "Dr. Hassan Kamau",
        clientPhone: "+254733112233",
        clientEmail: "hassan@lavington.org",
        serviceId: "srv-003",
        serviceName: "Father & Son VIP House-Call Grooming Session",
        priceAmount: 8500,
        currency: "KES",
        zone: "LAVINGTON",
        locationAddress: "James Gichuru Rd, Lavington",
        scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: "CONFIRMED",
        createdAt: new Date().toISOString(),
        reminderSent: false,
      }
    ];

    for (const item of mockBookings) {
      this.bookings.set(item.id, new Booking(item));
    }
  }

  public async create(bookingProps: Omit<BookingProps, "id" | "createdAt" | "status">): Promise<Booking> {
    const id = `book-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const fullProps: BookingProps = {
      ...bookingProps,
      id,
      status: "CONFIRMED",
      createdAt: new Date().toISOString(),
      reminderSent: false,
    };

    const booking = new Booking(fullProps);
    this.bookings.set(id, booking);
    return booking;
  }

  public async findById(id: string): Promise<Booking | null> {
    return this.bookings.get(id) || null;
  }

  public async findAll(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  public async findByZone(zone: NairobiZone): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter((b) => b.props.zone === zone);
  }

  public async findPendingReminders(): Promise<Booking[]> {
    const now = new Date();
    return Array.from(this.bookings.values()).filter((b) => b.shouldSendRebookingReminder(now));
  }

  public async updateStatus(id: string, status: BookingProps["status"]): Promise<Booking | null> {
    const existing = this.bookings.get(id);
    if (!existing) return null;

    const updated = new Booking({
      ...existing.props,
      status,
    });
    this.bookings.set(id, updated);
    return updated;
  }

  public async delete(id: string): Promise<boolean> {
    return this.bookings.delete(id);
  }

  public async markReminderSent(id: string): Promise<void> {
    const existing = this.bookings.get(id);
    if (existing) {
      this.bookings.set(
        id,
        new Booking({
          ...existing.props,
          reminderSent: true,
        })
      );
    }
  }
}
