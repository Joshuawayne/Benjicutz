export type NairobiZone = "KILELESHWA" | "WESTLANDS" | "LAVINGTON" | "KILIMANI" | "EASTLANDS";

export interface ZoneDetail {
  id: NairobiZone;
  name: string;
  batchDays: string;
  transportFeeKes: number;
  popularLocations: string;
}

export const NAIROBI_ZONES: ZoneDetail[] = [
  {
    id: "KILELESHWA",
    name: "Kileleshwa Hub",
    batchDays: "Tuesdays & Thursdays",
    transportFeeKes: 500,
    popularLocations: "Mandera Rd, Oloitokitok Rd, Dennis Pritt",
  },
  {
    id: "WESTLANDS",
    name: "Westlands Hub",
    batchDays: "Tuesdays & Thursdays",
    transportFeeKes: 500,
    popularLocations: "Parklands, Mpaka Rd, Rhapta Rd",
  },
  {
    id: "LAVINGTON",
    name: "Lavington Hub",
    batchDays: "Tuesdays & Thursdays",
    transportFeeKes: 500,
    popularLocations: "James Gichuru, Isaac Gathanju Rd",
  },
  {
    id: "KILIMANI",
    name: "Kilimani Hub",
    batchDays: "Wednesdays & Saturdays",
    transportFeeKes: 600,
    popularLocations: "Argwings Kodhek, Yaya, Ngong Rd",
  },
  {
    id: "EASTLANDS",
    name: "Eastlands Hub",
    batchDays: "Wednesdays & Saturdays",
    transportFeeKes: 1000,
    popularLocations: "Donholm, Buruburu, Jacaranda",
  },
];

export interface CreateBookingPayload {
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  serviceId: string;
  serviceName: string;
  priceAmount: number;
  zone: NairobiZone;
  locationAddress: string;
  scheduledAt: string;
}
