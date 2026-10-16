export interface AdminAnalyticsData {
  totalRevenueKes: number;
  activeClientsCount: number;
  vipRetainerClientsCount: number;
  rebookingRetentionRatePct: number;
  totalCompletedBookings: number;
  avgBookingValueKes?: number;
  zoneBreakdown: Array<{
    zone: string;
    bookingCount: number;
    revenueAmount: number;
  }>;
  generatedAt: string;
}
