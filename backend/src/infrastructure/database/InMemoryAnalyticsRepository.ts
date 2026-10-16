import { AnalyticsMetrics } from "../../core/entities/Analytics.ts";
import type { IAnalyticsRepository } from "../../core/interfaces/IAnalyticsRepository.ts";
import type { IBookingRepository } from "../../core/interfaces/IBookingRepository.ts";

export class InMemoryAnalyticsRepository implements IAnalyticsRepository {
  constructor(private readonly bookingRepo: IBookingRepository) {}

  public async getDashboardMetrics(): Promise<AnalyticsMetrics> {
    const allBookings = await this.bookingRepo.findAll();

    let totalRevenue = 0;
    const zoneMap: Record<string, { count: number; revenue: number }> = {};
    const clientStatsMap = new Map<string, { count: number; spent: number }>();

    for (const b of allBookings) {
      const price = b.props.priceAmount || 0;
      const phone = b.props.clientPhone || b.props.clientName || "Unknown";
      const z = (b.props.zone || "OTHER").toUpperCase();

      totalRevenue += price;

      if (!zoneMap[z]) zoneMap[z] = { count: 0, revenue: 0 };
      zoneMap[z].count += 1;
      zoneMap[z].revenue += price;

      const existing = clientStatsMap.get(phone) || { count: 0, spent: 0 };
      existing.count += 1;
      existing.spent += price;
      clientStatsMap.set(phone, existing);
    }

    const totalClients = clientStatsMap.size;
    let repeatClients = 0;
    let vipClients = 0;

    for (const stats of clientStatsMap.values()) {
      if (stats.count > 1) repeatClients += 1;
      if (stats.count >= 3 || stats.spent >= 10000) vipClients += 1;
    }

    const retentionPct = totalClients > 0
      ? Math.round((repeatClients / totalClients) * 1000) / 10
      : 0;

    const zoneBreakdown = Object.keys(zoneMap).map((zone) => ({
      zone,
      bookingCount: zoneMap[zone].count,
      revenueAmount: zoneMap[zone].revenue,
    }));

    return new AnalyticsMetrics({
      totalRevenueKes: totalRevenue,
      activeClientsCount: totalClients,
      vipRetainerClientsCount: vipClients,
      rebookingRetentionRatePct: retentionPct,
      totalCompletedBookings: allBookings.length,
      zoneBreakdown,
      generatedAt: new Date().toISOString(),
    });
  }
}
