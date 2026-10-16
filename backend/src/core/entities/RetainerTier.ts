export interface RetainerTierProps {
  id: string;
  name: string;
  monthlyKes: number;
  visitsPerMonth: number;
  perks: string[];
  recommendedZone: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export class RetainerTier {
  constructor(public readonly props: RetainerTierProps) {}

  public static fromRow(row: Record<string, unknown>): RetainerTier {
    return new RetainerTier({
      id: row.id as string,
      name: row.name as string,
      monthlyKes: row.monthly_kes as number,
      visitsPerMonth: row.visits_per_month as number,
      perks: (row.perks as string[]) || [],
      recommendedZone: (row.recommended_zone as string) || "",
      sortOrder: (row.sort_order as number) || 0,
      isActive: row.is_active as boolean,
      createdAt: row.created_at as string,
      updatedAt: row.updated_at as string,
    });
  }
}
