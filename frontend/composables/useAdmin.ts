import { ref } from "vue";
import { useRuntimeConfig } from "#imports";

export interface ServiceItem {
  id?: string;
  title: string;
  subtitle?: string;
  description: string;
  durationMinutes: number;
  priceKes: number;
  category: string;
  popularTag?: string;
  targetAudience: string;
  iconName: string;
  sortOrder: number;
  isActive: boolean;
}

export interface RetainerTierItem {
  id?: string;
  name: string;
  monthlyKes: number;
  visitsPerMonth: number;
  perks: string[];
  recommendedZone?: string;
  sortOrder: number;
  isActive: boolean;
}

export interface BookingItem {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  serviceName: string;
  priceAmount: number;
  currency: string;
  zone: string;
  locationAddress: string;
  scheduledAt: string;
  status: "CONFIRMED" | "PENDING" | "COMPLETED" | "CANCELLED";
  reminderSent: boolean;
}

export interface BusinessSettingsMap {
  business_name?: string;
  tagline?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  operating_hours?: { monday_friday: string; saturday_sunday: string };
  contact_info?: { phone: string; whatsapp: string; email: string; concierge_note?: string };
  service_zones?: Array<{ id: string; name: string; transportFeeKes: number; isActive: boolean }>;
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

export const useAdmin = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase !== undefined ? config.public.apiBase : "";

  const services = ref<ServiceItem[]>([]);
  const retainerTiers = ref<RetainerTierItem[]>([]);
  const bookings = ref<BookingItem[]>([]);
  const settings = ref<BusinessSettingsMap>({});
  const loading = ref(false);
  const error = ref<string | null>(null);

  const getAuthHeaders = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
    return {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };


  // Services CRUD
  const fetchAdminServices = async () => {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(`${apiBase}/api/v1/admin/services`, {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        services.value = await res.json();
      } else {
        // Fallback to public endpoint if admin unauthenticated or in dev mode
        const pubRes = await fetch(`${apiBase}/api/v1/services`);
        if (pubRes.ok) services.value = await pubRes.json();
      }
    } catch (e: any) {
      error.value = e.message || "Failed to fetch services";
    } finally {
      loading.value = false;
    }
  };

  const saveService = async (service: ServiceItem) => {
    loading.value = true;
    try {
      const isEdit = !!service.id;
      const url = isEdit ? `${apiBase}/api/v1/admin/services/${service.id}` : `${apiBase}/api/v1/admin/services`;
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(service),
      });
      if (!res.ok) throw new Error("Failed to save service");
      await fetchAdminServices();
      return true;
    } catch (e: any) {
      error.value = e.message;
      return false;
    } finally {
      loading.value = false;
    }
  };

  const deleteService = async (id: string) => {
    loading.value = true;
    try {
      const res = await fetch(`${apiBase}/api/v1/admin/services/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Failed to delete service");
      await fetchAdminServices();
      return true;
    } catch (e: any) {
      error.value = e.message;
      return false;
    } finally {
      loading.value = false;
    }
  };

  // Retainer Tiers CRUD
  const fetchAdminRetainers = async () => {
    loading.value = true;
    try {
      const res = await fetch(`${apiBase}/api/v1/admin/retainer-tiers`, {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        retainerTiers.value = await res.json();
      } else {
        const pubRes = await fetch(`${apiBase}/api/v1/retainer-tiers`);
        if (pubRes.ok) retainerTiers.value = await pubRes.json();
      }
    } catch (e: any) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };

  const saveRetainerTier = async (tier: RetainerTierItem) => {
    loading.value = true;
    try {
      const isEdit = !!tier.id;
      const url = isEdit ? `${apiBase}/api/v1/admin/retainer-tiers/${tier.id}` : `${apiBase}/api/v1/admin/retainer-tiers`;
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(tier),
      });
      if (!res.ok) throw new Error("Failed to save retainer tier");
      await fetchAdminRetainers();
      return true;
    } catch (e: any) {
      error.value = e.message;
      return false;
    } finally {
      loading.value = false;
    }
  };

  const deleteRetainerTier = async (id: string) => {
    loading.value = true;
    try {
      const res = await fetch(`${apiBase}/api/v1/admin/retainer-tiers/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Failed to delete retainer tier");
      await fetchAdminRetainers();
      return true;
    } catch (e: any) {
      error.value = e.message;
      return false;
    } finally {
      loading.value = false;
    }
  };

  // Bookings Management
  const fetchBookings = async () => {
    loading.value = true;
    try {
      const res = await fetch(`${apiBase}/api/v1/bookings`, { headers: getAuthHeaders() });
      if (res.ok) {
        const data = await res.json();
        bookings.value = Array.isArray(data) ? data : data.bookings || [];
      }
    } catch (e: any) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };

  const updateBookingStatus = async (id: string, status: BookingItem["status"]): Promise<boolean> => {
    loading.value = true;
    try {
      const res = await fetch(`${apiBase}/api/v1/admin/bookings/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update booking status");
      await fetchBookings();
      return true;
    } catch (e: any) {
      error.value = e.message;
      return false;
    } finally {
      loading.value = false;
    }
  };

  const deleteBooking = async (id: string): Promise<boolean> => {
    loading.value = true;
    try {
      const res = await fetch(`${apiBase}/api/v1/admin/bookings/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Failed to delete booking");
      await fetchBookings();
      return true;
    } catch (e: any) {
      error.value = e.message;
      return false;
    } finally {
      loading.value = false;
    }
  };

  const createAdminBooking = async (payload: {
    clientName: string;
    clientPhone: string;
    clientEmail?: string;
    serviceId?: string;
    serviceName: string;
    priceAmount: number;
    zone: string;
    locationAddress?: string;
    scheduledAt: string;
  }): Promise<boolean> => {
    loading.value = true;
    try {
      const res = await fetch(`${apiBase}/api/v1/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create booking");
      await fetchBookings();
      return true;
    } catch (e: any) {
      error.value = e.message;
      return false;
    } finally {
      loading.value = false;
    }
  };

  // Business Settings
  const fetchSettings = async () => {
    loading.value = true;
    try {
      const authHeaders = getAuthHeaders();
      let res = await fetch(`${apiBase}/api/v1/admin/settings`, { headers: authHeaders });
      if (!res.ok) {
        res = await fetch(`${apiBase}/api/v1/settings`);
      }
      if (res.ok) {
        settings.value = await res.json();
      }
    } catch (e: any) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };

  const updateSettings = async (payload: Partial<BusinessSettingsMap>) => {
    loading.value = true;
    try {
      const res = await fetch(`${apiBase}/api/v1/admin/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to update settings");
      await fetchSettings();
      return true;
    } catch (e: any) {
      error.value = e.message;
      return false;
    } finally {
      loading.value = false;
    }
  };

  const changePassword = async (newPassword: string): Promise<{ success: boolean; message?: string; error?: string }> => {
    loading.value = true;
    try {
      const res = await fetch(`${apiBase}/api/v1/auth/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update password");
      }
      return { success: true, message: data.message || "Password updated successfully" };
    } catch (e: any) {
      return { success: false, error: e.message || "An unexpected error occurred" };
    } finally {
      loading.value = false;
    }
  };

  // ─── Profile (display name — persisted to Supabase) ─────────────────────────

  /**
   * Fetch the logged-in admin's profile from the server.
   * Updates localStorage as a cache for instant reads on the next load.
   */
  const fetchProfile = async (): Promise<{ id: string; email: string; name: string; role: string } | null> => {
    try {
      const res = await fetch(`${apiBase}/api/v1/auth/profile`, {
        headers: getAuthHeaders(),
      });
      if (!res.ok) return null;
      const profile = await res.json();

      // Sync to localStorage cache
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("admin_user");
        let user: Record<string, unknown> = {};
        if (stored) { try { user = JSON.parse(stored); } catch {} }
        user.name = profile.name || user.name || "";
        user.email = profile.email || user.email || "";
        localStorage.setItem("admin_user", JSON.stringify(user));
      }

      return profile;
    } catch {
      return null;
    }
  };

  /**
   * Save a new display name to Supabase and update localStorage cache.
   */
  const updateProfileName = async (name: string): Promise<{ success: boolean; error?: string }> => {
    loading.value = true;
    try {
      const res = await fetch(`${apiBase}/api/v1/auth/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || "Failed to save name" };
      }

      // Update localStorage cache immediately
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("admin_user");
        let user: Record<string, unknown> = {};
        if (stored) { try { user = JSON.parse(stored); } catch {} }
        user.name = data.name || name;
        localStorage.setItem("admin_user", JSON.stringify(user));
      }

      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || "Network error" };
    } finally {
      loading.value = false;
    }
  };

  return {
    services,
    retainerTiers,
    bookings,
    settings,
    loading,
    error,
    fetchAdminServices,
    saveService,
    deleteService,
    fetchAdminRetainers,
    saveRetainerTier,
    deleteRetainerTier,
    fetchBookings,
    updateBookingStatus,
    deleteBooking,
    createAdminBooking,
    fetchSettings,
    updateSettings,
    changePassword,
    fetchProfile,
    updateProfileName,
  };
};
