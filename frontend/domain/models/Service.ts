export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  durationMinutes: number;
  priceKes: number;
  category: "SIGNATURE_CUTS" | "HAIRLINE_RESTORATION" | "HOUSE_CALL_PACKAGES" | "ORGANIC_TREATMENTS";
  popularTag?: string;
  targetAudience: "EXECUTIVE" | "FAMILY" | "TRENDSETTER" | "ALL";
  iconName: string;
}

export const NAIROBI_SERVICES: ServiceItem[] = [
  {
    id: "srv-exec-signature",
    title: "Executive Signature Cut & Beard Sculpting",
    subtitle: "Precision Hot-Towel Haircut & Razor Lineup",
    description: "Tailored precision cut matching head shape & hairline, hot-towel steam, razor finish, and organic beard oil treatment.",
    durationMinutes: 45,
    priceKes: 4500,
    category: "SIGNATURE_CUTS",
    popularTag: "Most Popular",
    targetAudience: "EXECUTIVE",
    iconName: "Scissors",
  },
  {
    id: "srv-airblade-restoration",
    title: "Micro-Airblading Hairline Restoration",
    subtitle: "Non-Invasive Micro-Pigment Definition",
    description: "Semi-permanent micro-airblading pigment touch-up for receded, thinning, or uneven hairlines. Sharp crisp finish.",
    durationMinutes: 60,
    priceKes: 7000,
    category: "HAIRLINE_RESTORATION",
    popularTag: "Gen Z & Executive Choice",
    targetAudience: "TRENDSETTER",
    iconName: "Sparkles",
  },
  {
    id: "srv-father-son-vip",
    title: "Father & Son VIP House-Call Package",
    subtitle: "Back-to-Back Family Private Studio Session",
    description: "Two complete haircuts & beard grooming in one quiet home visit. Ideal for parents & busy weekend family schedules.",
    durationMinutes: 90,
    priceKes: 8500,
    category: "HOUSE_CALL_PACKAGES",
    popularTag: "Best Family Value",
    targetAudience: "FAMILY",
    iconName: "Users",
  },
  {
    id: "srv-scalp-beard-detox",
    title: "Organic Scalp Detox & Botanical Therapy",
    subtitle: "Handcrafted Herbal Scalp & Follicle Treatment",
    description: "Exfoliating tea tree & eucalyptus scalp scrub, deep conditioning beard wash, and high-frequency scalp stimulation.",
    durationMinutes: 40,
    priceKes: 3500,
    category: "ORGANIC_TREATMENTS",
    targetAudience: "ALL",
    iconName: "Droplet",
  },
];
