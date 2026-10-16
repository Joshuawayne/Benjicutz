import { Application, Router, type Context } from "@oak/oak";
import { config } from "./config/environment.ts";
import { errorLoggerMiddleware } from "./src/presentation/middlewares/errorLogger.ts";
import { rateLimiterMiddleware } from "./src/presentation/middlewares/rateLimiter.ts";
import { getSupabaseClient } from "./src/infrastructure/database/supabaseClient.ts";

// Repositories — Supabase-backed (with in-memory fallback for dev)
import { SupabaseBookingRepository } from "./src/infrastructure/database/repositories/SupabaseBookingRepository.ts";
import { InMemoryBookingRepository } from "./src/infrastructure/database/InMemoryBookingRepository.ts";

// Route factories
import { createBookingRouter } from "./src/presentation/routes/bookingRoutes.ts";
import { createAdminRouter } from "./src/presentation/routes/adminRoutes.ts";
import { createB2bRouter } from "./src/presentation/routes/b2bRoutes.ts";
import { createAuthRouter } from "./src/presentation/routes/authRoutes.ts";
import { createServiceRouter } from "./src/presentation/routes/serviceRoutes.ts";
import { createSettingsRouter } from "./src/presentation/routes/settingsRoutes.ts";
import { createRetainerTierRouter } from "./src/presentation/routes/retainerTierRoutes.ts";

const app = new Application();
const router = new Router();

// Global Middlewares
app.use(errorLoggerMiddleware);
app.use(rateLimiterMiddleware);

// CORS headers for Nuxt frontend
app.use(async (ctx: Context, next: () => Promise<unknown>) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (ctx.request.method === "OPTIONS") {
    ctx.response.status = 204;
    return;
  }
  await next();
});

// Determine booking repository based on Supabase configuration
const bookingRepository = config.isSupabaseConfigured()
  ? new SupabaseBookingRepository(getSupabaseClient())
  : new InMemoryBookingRepository();

if (!config.isSupabaseConfigured()) {
  console.warn("⚠️  Supabase not configured — running with in-memory data. Set .env to enable persistence.");
}

// Root ping endpoint for easy uptime checks
router.get("/", (ctx: Context) => {
  ctx.response.status = 200;
  ctx.response.body = {
    name: "BenjiCutz Barber Craftsman API",
    status: "online",
    health: "/api/v1/health",
    version: "1.0.0",
  };
});

// Health Check Endpoint
router.get("/api/v1/health", (ctx: Context) => {
  ctx.response.status = 200;
  ctx.response.body = {
    status: "online",
    service: "Mobile Barber Craftsman & Analytics API",
    location: "Nairobi, Kenya",
    database: config.isSupabaseConfigured() ? "supabase" : "in-memory",
    timestamp: new Date().toISOString(),
  };
});

// Register Core Subsystem Routers
const bookingRouter = createBookingRouter(bookingRepository);
const adminRouter = createAdminRouter(bookingRepository);
const b2bRouter = createB2bRouter();

// New Supabase-powered routers
const authRouter = createAuthRouter();
const serviceRouter = createServiceRouter();
const settingsRouter = createSettingsRouter();
const retainerTierRouter = createRetainerTierRouter();

app.use(router.routes());
app.use(router.allowedMethods());

app.use(bookingRouter.routes());
app.use(bookingRouter.allowedMethods());

app.use(adminRouter.routes());
app.use(adminRouter.allowedMethods());

app.use(b2bRouter.routes());
app.use(b2bRouter.allowedMethods());

app.use(authRouter.routes());
app.use(authRouter.allowedMethods());

app.use(serviceRouter.routes());
app.use(serviceRouter.allowedMethods());

app.use(settingsRouter.routes());
app.use(settingsRouter.allowedMethods());

app.use(retainerTierRouter.routes());
app.use(retainerTierRouter.allowedMethods());

const PORT = config.port;
console.log(`⚡ Deno backend server running on http://localhost:${PORT}`);
if (config.isSupabaseConfigured()) {
  console.log(`🔗 Supabase connected: ${config.supabaseUrl}`);
}
await app.listen({ port: PORT, hostname: "0.0.0.0" });