import type { SupabaseClient } from "@supabase/supabase-js";
import { AnalyticsMetrics, type ZoneMetrics } from "../../../core/entities/Analytics.ts";
import type { IAnalyticsRepository } from "../../../core/interfaces/IAnalyticsRepository.ts";

export class SupabaseAnalyticsRepository implements IAnalyticsRepository {
  constructor(private readonly db: SupabaseClient) {}

  public async getDashboardMetrics(): Promise<AnalyticsMetrics> {
    // 1. Try Supabase Stored Procedure / BI Function RPC
    try {
      const { data: rpcData, error: rpcError } = await this.db.rpc("get_dashboard_analytics");
      if (!rpcError && rpcData) {
        return new AnalyticsMetrics({
          totalRevenueKes: Number(rpcData.totalRevenueKes) || 0,
          activeClientsCount: Number(rpcData.activeClientsCount) || 0,
          vipRetainerClientsCount: Number(rpcData.vipRetainerClientsCount) || 0,
          rebookingRetentionRatePct: Number(rpcData.rebookingRetentionRatePct) || 0,
          totalCompletedBookings: Number(rpcData.totalCompletedBookings) || 0,
          zoneBreakdown: Array.isArray(rpcData.zoneBreakdown) ? rpcData.zoneBreakdown : [],
          generatedAt: rpcData.generatedAt || new Date().toISOString(),
        });
      }
    } catch {
      // RPC fallback to direct SQL query aggregation
    }

    // 2. Direct Query aggregation
    const { data: rows, error } = await this.db
      .from("bookings")
      .select("*")
      .order("scheduled_at", { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch analytics from Supabase: ${error.message}`);
    }

    const bookings = rows || [];

    let totalRevenue = 0;
    const zoneMap: Record<string, { count: number; revenue: number }> = {};
    const clientStatsMap = new Map<string, { bookingCount: number; totalSpent: number }>();

    for (const b of bookings) {
      const price = Number(b.price_amount) || 0;
      const phone = b.client_phone || b.client_name || "Unknown";
      const zone = (b.zone || "OTHER").toUpperCase();

      totalRevenue += price;

      // Zone Breakdown
      if (!zoneMap[zone]) {
        zoneMap[zone] = { count: 0, revenue: 0 };
      }
      zoneMap[zone].count += 1;
      zoneMap[zone].revenue += price;

      // Client LTV & Retention tracking
      const existing = clientStatsMap.get(phone) || { bookingCount: 0, totalSpent: 0 };
      existing.bookingCount += 1;
      existing.totalSpent += price;
      clientStatsMap.set(phone, existing);
    }

    const totalClients = clientStatsMap.size;
    let repeatClients = 0;
    let vipClients = 0;

    for (const stats of clientStatsMap.values()) {
      if (stats.bookingCount > 1) {
        repeatClients += 1;
      }
      if (stats.bookingCount >= 3 || stats.totalSpent >= 10000) {
        vipClients += 1;
      }
    }

    const rebookingRetentionRate = totalClients > 0
      ? Math.round((repeatClients / totalClients) * 1000) / 10
      : 0;

    const zoneBreakdown: ZoneMetrics[] = Object.keys(zoneMap).map((zone) => ({
      zone,
      bookingCount: zoneMap[zone].count,
      revenueAmount: zoneMap[zone].revenue,
    }));

    return new AnalyticsMetrics({
      totalRevenueKes: totalRevenue,
      activeClientsCount: totalClients,
      vipRetainerClientsCount: vipClients,
      rebookingRetentionRatePct: rebookingRetentionRate,
      totalCompletedBookings: bookings.length,
      zoneBreakdown,
      generatedAt: new Date().toISOString(),
    });
  }
}
