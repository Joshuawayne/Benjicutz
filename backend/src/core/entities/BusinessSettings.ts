export interface BusinessSettingsMap {
  business_name?: string;
  tagline?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  operating_hours?: {
    monday_friday: string;
    saturday_sunday: string;
  };
  contact_info?: {
    phone: string;
    whatsapp: string;
    email: string;
    concierge_note?: string;
  };
  service_zones?: Array<{
    id: string;
    name: string;
    transportFeeKes: number;
    isActive: boolean;
  }>;
  notification_preferences?: {
    auto_reminder_days: number;
    whatsapp_notifications_enabled: boolean;
    instant_admin_alert: boolean;
  };
  currency?: string;
  established_year?: string;
  location_city?: string;
  [key: string]: unknown;
}

export interface SettingRow {
  id?: string;
  key: string;
  value: unknown;
  updated_at?: string;
}

export class BusinessSettings {
  constructor(public readonly settings: Partial<BusinessSettingsMap>) {}

  public get(key: keyof BusinessSettingsMap): unknown {
    return this.settings[key];
  }

  public static fromRows(rows: Array<Record<string, unknown>>): BusinessSettings {
    const map: Partial<BusinessSettingsMap> = { ...this.defaults() };
    for (const row of rows) {
      const key = row.key as keyof BusinessSettingsMap;
      let val = row.value;
      if (typeof val === "string") {
        try {
          val = JSON.parse(val);
        } catch {
          // Keep string as is
        }
      }
      map[key] = val as never;
    }
    return new BusinessSettings(map);
  }

  public static defaults(): BusinessSettingsMap {
    return {
      business_name: "CRAFTSMAN MOBILE PARLOUR",
      tagline: "Executive Mobile Barber & VIP Grooming Suite",
      phone: "+254 751 022224",
      whatsapp: "+254 751 022224",
      email: "concierge@mobilebarbercraftsman.co.ke",
      operating_hours: {
        monday_friday: "07:00 – 20:00",
        saturday_sunday: "08:00 – 18:00",
      },
      contact_info: {
        phone: "+254 751 022224",
        whatsapp: "+254 751 022224",
        email: "concierge@mobilebarbercraftsman.co.ke",
        concierge_note: "Direct VIP concierge dispatch for Nairobi upscale residences.",
      },
      service_zones: [
        { id: "KILELESHWA", name: "Kileleshwa", transportFeeKes: 500, isActive: true },
        { id: "WESTLANDS", name: "Westlands", transportFeeKes: 500, isActive: true },
        { id: "LAVINGTON", name: "Lavington", transportFeeKes: 500, isActive: true },
        { id: "KILIMANI", name: "Kilimani", transportFeeKes: 600, isActive: true },
        { id: "EASTLANDS", name: "Eastlands", transportFeeKes: 1000, isActive: true },
        { id: "KAREN", name: "Karen", transportFeeKes: 800, isActive: true },
        { id: "RUNDA", name: "Runda", transportFeeKes: 900, isActive: true },
        { id: "GIGIRI", name: "Gigiri", transportFeeKes: 800, isActive: true },
        { id: "MUTHAIGA", name: "Muthaiga", transportFeeKes: 750, isActive: true },
      ],
      notification_preferences: {
        auto_reminder_days: 12,
        whatsapp_notifications_enabled: true,
        instant_admin_alert: true,
      },
      currency: "KES",
      established_year: "2020",
      location_city: "Nairobi",
    };
  }
}
