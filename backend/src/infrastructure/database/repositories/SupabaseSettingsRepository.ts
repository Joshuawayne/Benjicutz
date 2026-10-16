import type { SupabaseClient } from "@supabase/supabase-js";
import { BusinessSettings, type BusinessSettingsMap } from "../../../core/entities/BusinessSettings.ts";
import type { ISettingsRepository } from "../../../core/interfaces/ISettingsRepository.ts";

export class SupabaseSettingsRepository implements ISettingsRepository {
  private static inMemoryStore: Map<string, unknown> = new Map();

  constructor(private readonly db: SupabaseClient | null) {
    if (SupabaseSettingsRepository.inMemoryStore.size === 0) {
      const defaults = BusinessSettings.defaults();
      for (const [k, v] of Object.entries(defaults)) {
        SupabaseSettingsRepository.inMemoryStore.set(k, v);
      }
    }
  }

  async getAll(): Promise<BusinessSettings> {
    if (!this.db) {
      const map: Record<string, unknown> = {};
      for (const [k, v] of SupabaseSettingsRepository.inMemoryStore.entries()) {
        map[k] = v;
      }
      return new BusinessSettings(map as Partial<BusinessSettingsMap>);
    }

    try {
      const { data, error } = await this.db
        .from("business_settings")
        .select("*");
      if (error) throw error;
      if (!data || data.length === 0) {
        const defaults = BusinessSettings.defaults();
        return new BusinessSettings(defaults);
      }
      const settings = BusinessSettings.fromRows(data);
      // Cache in memory
      for (const [k, v] of Object.entries(settings.settings)) {
        SupabaseSettingsRepository.inMemoryStore.set(k, v);
      }
      return settings;
    } catch (e) {
      console.warn("[Settings] Supabase fetch fallback to memory cache:", e);
      const map: Record<string, unknown> = {};
      for (const [k, v] of SupabaseSettingsRepository.inMemoryStore.entries()) {
        map[k] = v;
      }
      return new BusinessSettings(map as Partial<BusinessSettingsMap>);
    }
  }

  async get(key: keyof BusinessSettingsMap): Promise<unknown> {
    if (!this.db) {
      return SupabaseSettingsRepository.inMemoryStore.get(key as string) ?? null;
    }
    try {
      const { data, error } = await this.db
        .from("business_settings")
        .select("value")
        .eq("key", key)
        .single();
      if (error) {
        if (error.code === "PGRST116") {
          return SupabaseSettingsRepository.inMemoryStore.get(key as string) ?? null;
        }
        throw error;
      }
      let val = data?.value;
      if (typeof val === "string") {
        try { val = JSON.parse(val); } catch {}
      }
      return val ?? null;
    } catch {
      return SupabaseSettingsRepository.inMemoryStore.get(key as string) ?? null;
    }
  }

  async set(key: keyof BusinessSettingsMap, value: unknown): Promise<void> {
    SupabaseSettingsRepository.inMemoryStore.set(key as string, value);
    if (!this.db) return;
    try {
      const { error } = await this.db
        .from("business_settings")
        .upsert(
          { key, value, updated_at: new Date().toISOString() },
          { onConflict: "key" }
        );
      if (error) console.warn(`Failed to persist setting "${key}" to Supabase:`, error.message);
    } catch (err) {
      console.warn(`Supabase upsert error on setting "${key}":`, err);
    }
  }

  async setMany(settings: Partial<BusinessSettingsMap>): Promise<void> {
    for (const [k, v] of Object.entries(settings)) {
      SupabaseSettingsRepository.inMemoryStore.set(k, v);
    }
    if (!this.db) return;
    try {
      const rows = Object.entries(settings).map(([key, value]) => ({
        key,
        value,
        updated_at: new Date().toISOString(),
      }));
      const { error } = await this.db
        .from("business_settings")
        .upsert(rows, { onConflict: "key" });
      if (error) console.warn("Failed to persist settings batch to Supabase:", error.message);
    } catch (err) {
      console.warn("Supabase batch upsert error on settings:", err);
    }
  }
}
