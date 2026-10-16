import type { BusinessSettings, BusinessSettingsMap } from "../entities/BusinessSettings.ts";

export interface ISettingsRepository {
  getAll(): Promise<BusinessSettings>;
  get(key: keyof BusinessSettingsMap): Promise<unknown>;
  set(key: keyof BusinessSettingsMap, value: unknown): Promise<void>;
  setMany(settings: Partial<BusinessSettingsMap>): Promise<void>;
}
