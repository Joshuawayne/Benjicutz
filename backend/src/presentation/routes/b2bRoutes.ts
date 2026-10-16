import { Router, type Context } from "@oak/oak";

export function createB2bRouter(): Router {
  const router = new Router();

  router.get("/api/v1/b2b/workshops", (ctx: Context) => {
    ctx.response.status = 200;
    ctx.response.body = {
      workshops: [
        {
          id: "wshop-01",
          title: "Masterclass: Micro-Airblading Hairline Restoration",
          durationHours: 6,
          targetAudience: "Professional Barbers & Beauty School Students",
          location: "Westlands Studio & On-Demand Institutional Visits",
          priceKes: 25000,
        },
        {
          id: "wshop-02",
          title: "Executive Mobile Studio Operations & Client Retention",
          durationHours: 4,
          targetAudience: "Beauty School Administrators & Craft Entrepreneurs",
          location: "Kileleshwa Craftsman Hub",
          priceKes: 18000,
        },
      ],
    };
  });

  return router;
}
