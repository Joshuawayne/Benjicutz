export type ServiceCategory =
  | "SIGNATURE_CUTS"
  | "HAIRLINE_RESTORATION"
  | "HOUSE_CALL_PACKAGES"
  | "ORGANIC_TREATMENTS";

export type TargetAudience = "EXECUTIVE" | "FAMILY" | "TRENDSETTER" | "ALL";

export interface ServiceProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  durationMinutes: number;
  priceKes: number;
  category: ServiceCategory;
  popularTag?: string | null;
  targetAudience: TargetAudience;
  iconName: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export class Service {
  constructor(public readonly props: ServiceProps) {}

  public static fromRow(row: Record<string, unknown>): Service {
    return new Service({
      id: row.id as string,
      title: row.title as string,
      subtitle: (row.subtitle as string) || "",
      description: (row.description as string) || "",
      durationMinutes: row.duration_minutes as number,
      priceKes: row.price_kes as number,
      category: row.category as ServiceCategory,
      popularTag: row.popular_tag as string | null,
      targetAudience: row.target_audience as TargetAudience,
      iconName: (row.icon_name as string) || "Scissors",
      sortOrder: (row.sort_order as number) || 0,
      isActive: row.is_active as boolean,
      createdAt: row.created_at as string,
      updatedAt: row.updated_at as string,
    });
  }
}
