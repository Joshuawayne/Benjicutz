import type { SupabaseClient } from "@supabase/supabase-js";
import { Booking, type BookingProps, type NairobiZone } from "../../../core/entities/Booking.ts";
import type { IBookingRepository } from "../../../core/interfaces/IBookingRepository.ts";

export class SupabaseBookingRepository implements IBookingRepository {
  constructor(private readonly db: SupabaseClient) {}

  // Map uppercase zone keys (frontend/entity) to Postgres enum title-case values
  private mapZoneToEnum(zone: string): string {
    const zoneMap: Record<string, string> = {
      KILELESHWA: "Kileleshwa",
      WESTLANDS: "Westlands",
      LAVINGTON: "Lavington",
      KILIMANI: "Kilimani",
      EASTLANDS: "CBD",
      KAREN: "Karen",
      GIGIRI: "Gigiri",
      RUNDA: "Runda",
      MUTHAIGA: "Muthaiga",
      CBD: "CBD",
      PARKLANDS: "Parklands",
    };
    return zoneMap[zone.toUpperCase()] || zone;
  }

  // Check if a string is a valid UUID (for FK references)
  private isUUID(val: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val);
  }

  async create(bookingProps: Omit<BookingProps, "id" | "createdAt" | "status">): Promise<Booking> {
    const { data, error } = await this.db
      .from("bookings")
      .insert({
        user_id: bookingProps.userId || null,
        client_name: bookingProps.clientName,
        client_phone: bookingProps.clientPhone,
        client_email: bookingProps.clientEmail || null,
        service_id: this.isUUID(bookingProps.serviceId) ? bookingProps.serviceId : null,
        service_name: bookingProps.serviceName,
        price_amount: bookingProps.priceAmount,
        currency: bookingProps.currency || "KES",
        zone: this.mapZoneToEnum(bookingProps.zone),
        location_address: bookingProps.locationAddress,
        scheduled_at: bookingProps.scheduledAt,
        status: "CONFIRMED",
        reminder_sent: false,
      })
      .select()
      .single();
    if (error) throw new Error(`Failed to create booking: ${error.message}`);
    return this.toBooking(data);
  }

  async findById(id: string): Promise<Booking | null> {
    const { data, error } = await this.db
      .from("bookings")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(`Failed to fetch booking: ${error.message}`);
    }
    return data ? this.toBooking(data) : null;
  }

  async findAll(): Promise<Booking[]> {
    const { data, error } = await this.db
      .from("bookings")
      .select("*")
      .order("scheduled_at", { ascending: false });
    if (error) throw new Error(`Failed to fetch bookings: ${error.message}`);
    return (data || []).map(this.toBooking);
  }

  async findByZone(zone: NairobiZone): Promise<Booking[]> {
    const { data, error } = await this.db
      .from("bookings")
      .select("*")
      .eq("zone", zone)
      .order("scheduled_at", { ascending: false });
    if (error) throw new Error(`Failed to fetch bookings by zone: ${error.message}`);
    return (data || []).map(this.toBooking);
  }

  async findPendingReminders(): Promise<Booking[]> {
    // Bookings completed 12+ days ago that haven't had a reminder sent
    const cutoffDate = new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString();
    const { data, error } = await this.db
      .from("bookings")
      .select("*")
      .eq("status", "COMPLETED")
      .eq("reminder_sent", false)
      .lte("scheduled_at", cutoffDate);
    if (error) throw new Error(`Failed to fetch pending reminders: ${error.message}`);
    return (data || []).map(this.toBooking);
  }

  async updateStatus(id: string, status: BookingProps["status"]): Promise<Booking | null> {
    const { data, error } = await this.db
      .from("bookings")
      .update({ status })
      .eq("id", id)
      .select()
      .single();
    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(`Failed to update booking status: ${error.message}`);
    }
    return data ? this.toBooking(data) : null;
  }

  async delete(id: string): Promise<boolean> {
    const { error, count } = await this.db
      .from("bookings")
      .delete({ count: "exact" })
      .eq("id", id);
    if (error) throw new Error(`Failed to delete booking: ${error.message}`);
    return (count || 0) > 0;
  }

  async markReminderSent(id: string): Promise<void> {
    const { error } = await this.db
      .from("bookings")
      .update({ reminder_sent: true })
      .eq("id", id);
    if (error) throw new Error(`Failed to mark reminder sent: ${error.message}`);
  }

  private toBooking(row: Record<string, unknown>): Booking {
    return new Booking({
      id: row.id as string,
      userId: (row.user_id as string) || undefined,
      clientName: row.client_name as string,
      clientPhone: row.client_phone as string,
      clientEmail: (row.client_email as string) || undefined,
      serviceId: (row.service_id as string) || "",
      serviceName: row.service_name as string,
      priceAmount: Number(row.price_amount) || 0,
      currency: (row.currency as string) || "KES",
      zone: ((row.zone as string) || "").toUpperCase() as NairobiZone,
      locationAddress: (row.location_address as string) || "",
      scheduledAt: row.scheduled_at as string,
      status: row.status as BookingProps["status"],
      createdAt: row.created_at as string,
      reminderSent: Boolean(row.reminder_sent),
    });
  }
}
