export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
export type NairobiZone = 
  | "KILELESHWA" 
  | "WESTLANDS" 
  | "LAVINGTON" 
  | "KILIMANI" 
  | "EASTLANDS" 
  | "KAREN" 
  | "GIGIRI" 
  | "RUNDA" 
  | "MUTHAIGA" 
  | "CBD" 
  | "PARKLANDS";

export interface BookingProps {
  id: string;
  userId?: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  serviceId: string;
  serviceName: string;
  priceAmount: number;
  currency: string;
  zone: NairobiZone;
  locationAddress: string;
  scheduledAt: string;
  status: BookingStatus;
  createdAt: string;
  reminderSent?: boolean;
}

export class Booking {
  constructor(public readonly props: BookingProps) {}

  public isConfirmed(): boolean {
    return this.props.status === "CONFIRMED";
  }

  public shouldSendRebookingReminder(currentDate: Date = new Date()): boolean {
    if (this.props.reminderSent) return false;
    const scheduledDate = new Date(this.props.scheduledAt);
    const diffDays = Math.floor((currentDate.getTime() - scheduledDate.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays >= 12;
  }

  public static calculateZoneTransportFee(zone: string): number {
    const normalized = (zone || "").toUpperCase();
    switch (normalized) {
      case "KILELESHWA":
      case "LAVINGTON":
      case "WESTLANDS":
      case "PARKLANDS":
      case "CBD":
        return 500; // KES 500 flat mobile transport
      case "KILIMANI":
        return 600;
      case "KAREN":
      case "GIGIRI":
      case "RUNDA":
      case "MUTHAIGA":
      case "EASTLANDS":
        return 1000;
      default:
        return 500;
    }
  }
}
