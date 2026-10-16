import type { Context } from "@oak/oak";
import { AppError } from "../../shared/errors/AppError.ts";

const requestCounts = new Map<string, { count: number; expiresAt: number }>();

export async function rateLimiterMiddleware(ctx: Context, next: () => Promise<unknown>) {
  const ip = ctx.request.ip || "127.0.0.1";
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 60; // Max 60 requests per min

  const record = requestCounts.get(ip);
  if (!record || now > record.expiresAt) {
    requestCounts.set(ip, { count: 1, expiresAt: now + windowMs });
  } else {
    record.count++;
    if (record.count > maxRequests) {
      throw new AppError("Too Many Requests: Rate limit exceeded", 429);
    }
  }

  await next();
}
