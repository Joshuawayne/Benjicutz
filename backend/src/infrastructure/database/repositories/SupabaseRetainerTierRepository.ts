import type { SupabaseClient } from "@supabase/supabase-js";
import { RetainerTier, type RetainerTierProps } from "../../../core/entities/RetainerTier.ts";
import type { IRetainerTierRepository } from "../../../core/interfaces/IRetainerTierRepository.ts";

export class SupabaseRetainerTierRepository implements IRetainerTierRepository {
  constructor(private readonly db: SupabaseClient) {}

  async findAll(): Promise<RetainerTier[]> {
    const { data, error } = await this.db
      .from("retainer_tiers")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw new Error(`Failed to fetch retainer tiers: ${error.message}`);
    return (data || []).map(RetainerTier.fromRow);
  }

  async findActive(): Promise<RetainerTier[]> {
    const { data, error } = await this.db
      .from("retainer_tiers")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });
    if (error) throw new Error(`Failed to fetch active retainer tiers: ${error.message}`);
    return (data || []).map(RetainerTier.fromRow);
  }

  async findById(id: string): Promise<RetainerTier | null> {
    const { data, error } = await this.db
      .from("retainer_tiers")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(`Failed to fetch retainer tier: ${error.message}`);
    }
    return data ? RetainerTier.fromRow(data) : null;
  }

  async create(props: Omit<RetainerTierProps, "id" | "createdAt" | "updatedAt">): Promise<RetainerTier> {
    const { data, error } = await this.db
      .from("retainer_tiers")
      .insert({
        name: props.name,
        monthly_kes: props.monthlyKes,
        visits_per_month: props.visitsPerMonth,
        perks: props.perks,
        recommended_zone: props.recommendedZone,
        sort_order: props.sortOrder,
        is_active: props.isActive,
      })
      .select()
      .single();
    if (error) throw new Error(`Failed to create retainer tier: ${error.message}`);
    return RetainerTier.fromRow(data);
  }

  async update(id: string, props: Partial<RetainerTierProps>): Promise<RetainerTier | null> {
    const updatePayload: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (props.name !== undefined) updatePayload.name = props.name;
    if (props.monthlyKes !== undefined) updatePayload.monthly_kes = props.monthlyKes;
    if (props.visitsPerMonth !== undefined) updatePayload.visits_per_month = props.visitsPerMonth;
    if (props.perks !== undefined) updatePayload.perks = props.perks;
    if (props.recommendedZone !== undefined) updatePayload.recommended_zone = props.recommendedZone;
    if (props.sortOrder !== undefined) updatePayload.sort_order = props.sortOrder;
    if (props.isActive !== undefined) updatePayload.is_active = props.isActive;

    const { data, error } = await this.db
      .from("retainer_tiers")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();
    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(`Failed to update retainer tier: ${error.message}`);
    }
    return data ? RetainerTier.fromRow(data) : null;
  }

  async delete(id: string): Promise<boolean> {
    const { error, count } = await this.db
      .from("retainer_tiers")
      .delete({ count: "exact" })
      .eq("id", id);
    if (error) throw new Error(`Failed to delete retainer tier: ${error.message}`);
    return (count || 0) > 0;
  }
}
