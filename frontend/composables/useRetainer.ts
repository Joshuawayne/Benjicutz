import { ref } from "vue";

export interface VIPRetainerTier {
  id: string;
  name: string;
  monthlyKes: number;
  visitsPerMonth: number;
  perks: string[];
  recommendedZone: string;
}

export function useRetainer() {
  const tiers = ref<VIPRetainerTier[]>([
    {
      id: "executive-pass",
      name: "The Executive Pass",
      monthlyKes: 9000,
      visitsPerMonth: 2,
      perks: [
        "2 Reserved Fixed Monthly House-Calls (e.g. 2nd & 4th Friday)",
        "Priority Emergency Event Booking Guarantee",
        "Complimentary Scalp Detox & Airblading Lineup Touch-Up",
        "Zero Transport Fee within Kileleshwa, Lavington & Westlands",
      ],
      recommendedZone: "Kileleshwa, Westlands, Lavington",
    },
    {
      id: "family-retainer",
      name: "Family Heritage Pass",
      monthlyKes: 16000,
      visitsPerMonth: 2,
      perks: [
        "2 Back-to-Back Father & Son House Calls per month",
        "Dedicated Mobile Studio Slot (Saturdays or After-Hours)",
        "Custom Organic Beard & Scalp Maintenance Kits Included",
        "Direct Priority WhatsApp Craftsman Hotline",
      ],
      recommendedZone: "Kilimani, Lavington & Westlands",
    },
  ]);

  return {
    tiers,
  };
}
