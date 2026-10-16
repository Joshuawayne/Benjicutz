import { IAnalyticsRepository } from "../../../core/interfaces/IAnalyticsRepository.ts";
import { AnalyticsMetrics } from "../../../core/entities/Analytics.ts";
import { AppError } from "../../../shared/errors/AppError.ts";

/**
 * PostgreSQL direct repository implementation for analytics metrics.
 * Note: Supabase implementation (SupabaseAnalyticsRepository) is active by default.
 */
export class PostgresAnalyticsRepository implements IAnalyticsRepository {
  async getDashboardMetrics(): Promise<AnalyticsMetrics> {
    throw new AppError("PostgresAnalyticsRepository is not configured. Use SupabaseAnalyticsRepository.", 501);
  }
}
