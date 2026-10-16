export interface ZoneMetrics {
  zone: string;
  bookingCount: number;
  revenueAmount: number;
}

export interface DashboardMetricsProps {
  totalRevenueKes: number;
  activeClientsCount: number;
  vipRetainerClientsCount: number;
  rebookingRetentionRatePct: number;
  totalCompletedBookings: number;
  zoneBreakdown: ZoneMetrics[];
  generatedAt: string;
}

export class AnalyticsMetrics {
  constructor(public readonly props: DashboardMetricsProps) {}
}
