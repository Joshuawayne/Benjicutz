import type { SupabaseClient } from "@supabase/supabase-js";
import { Service, type ServiceProps } from "../../../core/entities/Service.ts";
import type { IServiceRepository } from "../../../core/interfaces/IServiceRepository.ts";

export class SupabaseServiceRepository implements IServiceRepository {
  constructor(private readonly db: SupabaseClient) {}

  async findAll(): Promise<Service[]> {
    const { data, error } = await this.db
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw new Error(`Failed to fetch services: ${error.message}`);
    return (data || []).map(Service.fromRow);
  }

  async findActive(): Promise<Service[]> {
    const { data, error } = await this.db
      .from("services")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });
    if (error) throw new Error(`Failed to fetch active services: ${error.message}`);
    return (data || []).map(Service.fromRow);
  }

  async findById(id: string): Promise<Service | null> {
    const { data, error } = await this.db
      .from("services")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      if (error.code === "PGRST116") return null; // not found
      throw new Error(`Failed to fetch service: ${error.message}`);
    }
    return data ? Service.fromRow(data) : null;
  }

  async findByCategory(category: string): Promise<Service[]> {
    const { data, error } = await this.db
      .from("services")
      .select("*")
      .eq("category", category)
      .eq("is_active", true)
      .order("sort_order", { ascending: true });
    if (error) throw new Error(`Failed to fetch services by category: ${error.message}`);
    return (data || []).map(Service.fromRow);
  }

  async create(props: Omit<ServiceProps, "id" | "createdAt" | "updatedAt">): Promise<Service> {
    const { data, error } = await this.db
      .from("services")
      .insert({
        title: props.title,
        subtitle: props.subtitle,
        description: props.description,
        duration_minutes: props.durationMinutes,
        price_kes: props.priceKes,
        category: props.category,
        popular_tag: props.popularTag || null,
        target_audience: props.targetAudience,
        icon_name: props.iconName,
        sort_order: props.sortOrder,
        is_active: props.isActive,
      })
      .select()
      .single();
    if (error) throw new Error(`Failed to create service: ${error.message}`);
    return Service.fromRow(data);
  }

  async update(id: string, props: Partial<ServiceProps>): Promise<Service | null> {
    const updatePayload: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (props.title !== undefined) updatePayload.title = props.title;
    if (props.subtitle !== undefined) updatePayload.subtitle = props.subtitle;
    if (props.description !== undefined) updatePayload.description = props.description;
    if (props.durationMinutes !== undefined) updatePayload.duration_minutes = props.durationMinutes;
    if (props.priceKes !== undefined) updatePayload.price_kes = props.priceKes;
    if (props.category !== undefined) updatePayload.category = props.category;
    if (props.popularTag !== undefined) updatePayload.popular_tag = props.popularTag;
    if (props.targetAudience !== undefined) updatePayload.target_audience = props.targetAudience;
    if (props.iconName !== undefined) updatePayload.icon_name = props.iconName;
    if (props.sortOrder !== undefined) updatePayload.sort_order = props.sortOrder;
    if (props.isActive !== undefined) updatePayload.is_active = props.isActive;

    const { data, error } = await this.db
      .from("services")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();
    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(`Failed to update service: ${error.message}`);
    }
    return data ? Service.fromRow(data) : null;
  }

  async delete(id: string): Promise<boolean> {
    const { error, count } = await this.db
      .from("services")
      .delete({ count: "exact" })
      .eq("id", id);
    if (error) throw new Error(`Failed to delete service: ${error.message}`);
    return (count || 0) > 0;
  }
}
