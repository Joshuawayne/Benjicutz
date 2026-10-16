import type { NairobiZone } from "./Booking.ts";

export interface ClientProps {
  id: string;
  name: string;
  phone: string;
  email?: string;
  preferredZone: NairobiZone;
  preferredStyleNotes?: string;
  isVipRetainer: boolean;
  retainerTier?: "EXECUTIVE_PASS" | "FAMILY_HOUSE_CALL" | "NONE";
  totalBookingsCount: number;
  lastBookingAt?: string;
  createdAt: string;
}

export class Client {
  constructor(public readonly props: ClientProps) {}

  public isEligibleForVipUpgrade(): boolean {
    return this.props.totalBookingsCount >= 4 && !this.props.isVipRetainer;
  }
}
