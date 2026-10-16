<template>
  <div class="space-y-16 md:space-y-24 py-6 md:py-10">
    <!-- HERO / HEADER BANNER -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-parlour-dark/20 bg-parlour-card/60">
        <span class="w-1.5 h-1.5 rounded-full bg-parlour-gold"></span>
        <span class="text-[10px] font-bold tracking-[0.25em] text-parlour-dark/70 uppercase">
          PRICE LIST • NAIROBI WHITE GLOVE CONCIERGE
        </span>
      </div>

      <div class="space-y-3 max-w-3xl mx-auto">
        <h1 class="text-4xl sm:text-6xl md:text-7xl font-serif font-black uppercase text-parlour-dark tracking-tight leading-[0.95]">
          BESPOKE CRAFT MENU <br />
          <span class="italic font-light text-parlour-dark/80">& SERVICE TARIFF</span>
        </h1>
        <p class="text-xs sm:text-sm text-parlour-dark/75 font-serif italic max-w-xl mx-auto leading-relaxed">
          "Every service includes full cranial consultation, hospital-grade sterile tools, hot-towel botanical steam, and straight razor edging in your private suite."
        </p>
      </div>

      <!-- Category Filter Tabs -->
      <div class="pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
        <button
          v-for="cat in categories"
          :key="cat.id"
          type="button"
          @click="selectedCategory = cat.id"
          :class="[
            'px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 border rounded-sm',
            selectedCategory === cat.id
              ? 'bg-parlour-dark text-parlour-cream border-parlour-dark shadow-sm'
              : 'bg-parlour-cream text-parlour-dark/70 border-parlour-dark/20 hover:border-parlour-dark hover:text-parlour-dark'
          ]"
        >
          {{ cat.name }} ({{ getCategoryCount(cat.id) }})
        </button>
      </div>
    </section>

    <!-- VISUAL SERVICE CARDS GRID -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="service in filteredServices"
          :key="service.id"
          class="bg-parlour-cream border-2 border-parlour-dark shadow-xl flex flex-col justify-between overflow-hidden group hover:border-parlour-dark transition-all duration-300"
        >
          <!-- Image Top Frame with Badges -->
          <div>
            <div class="relative h-60 sm:h-64 overflow-hidden border-b-2 border-parlour-dark bg-parlour-dark">
              <img
                :src="service.image"
                :alt="service.title"
                class="w-full h-full object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100"
              />
              <!-- Badges Overlay -->
              <div class="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                <span
                  v-if="service.popularTag"
                  class="px-2.5 py-1 bg-parlour-gold text-parlour-dark text-[9px] font-bold uppercase tracking-widest shadow-md"
                >
                  {{ service.popularTag }}
                </span>
                <span class="px-2 py-0.5 bg-parlour-dark/90 backdrop-blur-md text-parlour-cream text-[9px] font-mono font-bold uppercase tracking-wider border border-parlour-cream/20 inline-flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>{{ service.durationMinutes }} MINS</span>
                </span>
              </div>
              <div class="absolute bottom-3 right-3 bg-parlour-dark/90 backdrop-blur-md px-3 py-1 border border-parlour-gold/40 text-parlour-gold font-serif font-black text-sm uppercase">
                KES {{ service.priceKes.toLocaleString() }}
              </div>
            </div>

            <!-- Card Content Body -->
            <div class="p-6 space-y-4">
              <div class="space-y-1">
                <span class="text-[9px] font-bold tracking-widest text-parlour-dark/50 uppercase block">
                  {{ getCategoryLabel(service.category) }}
                </span>
                <h3 class="font-serif font-black text-xl uppercase text-parlour-dark tracking-tight leading-snug">
                  {{ service.title }}
                </h3>
                <p class="text-xs font-serif italic text-parlour-dark/70">
                  {{ service.subtitle }}
                </p>
              </div>

              <p class="text-xs text-parlour-dark/80 leading-relaxed">
                {{ service.description }}
              </p>

              <!-- Inclusions Checklist -->
              <div class="pt-3 border-t border-parlour-dark/15 space-y-2">
                <span class="text-[9px] font-bold uppercase tracking-widest text-parlour-dark/60 block">INCLUDED IN SESSION:</span>
                <ul class="space-y-1.5 text-[11px] text-parlour-dark/80 font-medium">
                  <li v-for="(item, idx) in service.inclusions" :key="idx" class="flex items-center gap-2">
                    <span class="text-parlour-dark font-black text-xs">✓</span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Bottom Action -->
          <div class="p-6 pt-0">
            <NuxtLink
              to="/shop/booking"
              class="w-full py-3.5 bg-parlour-dark text-parlour-cream hover:bg-transparent hover:text-parlour-dark border-2 border-parlour-dark font-serif font-bold text-xs uppercase tracking-widest text-center block transition-all shadow"
            >
              Book House Call →
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 3: CLASSIC EDITORIAL TABULAR PRICE SHEET -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-parlour-dark/10">
      <div class="text-center mb-12 space-y-2">
        <span class="text-xs font-bold tracking-[0.3em] uppercase text-parlour-dark/60">QUICK REFERENCE TARIFF</span>
        <h2 class="text-3xl sm:text-5xl font-serif font-black uppercase text-parlour-dark tracking-tight">
          PRICE MATRIX & ADD-ONS
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Col 1: Haircuts & Precision -->
        <div class="bg-parlour-cream p-6 border-2 border-parlour-dark shadow-md space-y-5">
          <h3 class="text-xs font-bold uppercase tracking-widest text-parlour-dark border-b-2 border-parlour-dark pb-2">
            01 / HAIRCUTS & SCULPTING
          </h3>
          <div class="space-y-3.5 text-xs font-semibold text-parlour-dark">
            <div class="flex items-baseline justify-between">
              <span>EXECUTIVE SIGNATURE CUT</span>
              <span class="dotted-line"></span>
              <span class="font-bold">4,500</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span>MICRO-AIRBLADING LINEUP</span>
              <span class="dotted-line"></span>
              <span class="font-bold">7,000</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span>SKIN FADE & GRADIENT EDGING</span>
              <span class="dotted-line"></span>
              <span class="font-bold">3,500</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span>HOT TOWEL STEAM & RAZOR</span>
              <span class="dotted-line"></span>
              <span class="font-bold">2,500</span>
            </div>
          </div>
        </div>

        <!-- Col 2: Beard & Botanical Therapy -->
        <div class="bg-parlour-cream p-6 border-2 border-parlour-dark shadow-md space-y-5">
          <h3 class="text-xs font-bold uppercase tracking-widest text-parlour-dark border-b-2 border-parlour-dark pb-2">
            02 / BEARD & BOTANICAL THERAPY
          </h3>
          <div class="space-y-3.5 text-xs font-semibold text-parlour-dark">
            <div class="flex items-baseline justify-between">
              <span>BEARD SCULPT & RAZOR LINEUP</span>
              <span class="dotted-line"></span>
              <span class="font-bold">2,500</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span>ORGANIC SCALP DETOX SCRUB</span>
              <span class="dotted-line"></span>
              <span class="font-bold">3,500</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span>TEA TREE FOLLICLE MASSAGE</span>
              <span class="dotted-line"></span>
              <span class="font-bold">3,000</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span>EUCALYPTUS STEAM COMPRESS</span>
              <span class="dotted-line"></span>
              <span class="font-bold">2,000</span>
            </div>
          </div>
        </div>

        <!-- Col 3: Packages & Passes -->
        <div class="bg-parlour-cream p-6 border-2 border-parlour-dark shadow-md space-y-5">
          <h3 class="text-xs font-bold uppercase tracking-widest text-parlour-dark border-b-2 border-parlour-dark pb-2">
            03 / VIP PACKAGES & PASSES
          </h3>
          <div class="space-y-3.5 text-xs font-semibold text-parlour-dark">
            <div class="flex items-baseline justify-between">
              <span>FATHER & SON HOUSE CALL</span>
              <span class="dotted-line"></span>
              <span class="font-bold">8,500</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span>TOTAL REVIVAL (CUT+BEARD+AIR)</span>
              <span class="dotted-line"></span>
              <span class="font-bold">9,500</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span>EXECUTIVE PASS (2 VISITS/MO)</span>
              <span class="dotted-line"></span>
              <span class="font-bold">9,000</span>
            </div>
            <div class="flex items-baseline justify-between">
              <span>FAMILY PASS (4 VISITS/MO)</span>
              <span class="dotted-line"></span>
              <span class="font-bold">16,000</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 4: VIP RETAINER MEMBERSHIP CALLOUT -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-parlour-dark text-parlour-cream border-y-2 border-parlour-dark">
      <div class="max-w-4xl mx-auto text-center space-y-8">
        <div class="space-y-3">
          <span class="text-xs font-bold tracking-[0.3em] uppercase text-parlour-gold block">
            RECURRING ZERO-WAIT LUXURY
          </span>
          <h2 class="text-3xl sm:text-5xl font-serif font-black uppercase text-parlour-cream tracking-tight">
            VIP MONTHLY RETAINERS
          </h2>
          <p class="text-xs sm:text-sm text-parlour-cream/80 max-w-lg mx-auto leading-relaxed">
            Lock in fixed recurring house calls every month. Enjoy complimentary priority transit across all Nairobi zones and private on-demand scheduling.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <NuxtLink
            to="/shop/booking"
            class="px-8 py-4 bg-parlour-gold text-parlour-dark hover:bg-parlour-cream font-serif font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-2xl inline-flex items-center gap-2 border border-parlour-gold"
          >
            <span>Subscribe to VIP Retainer</span>
            <span>→</span>
          </NuxtLink>
          <a
            :href="whatsappLink"
            target="_blank"
            rel="noopener noreferrer"
            class="px-8 py-4 bg-transparent text-parlour-cream hover:bg-parlour-cream hover:text-parlour-dark border border-parlour-cream/30 font-serif font-bold text-xs uppercase tracking-widest transition-all inline-flex items-center gap-2"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <span>WhatsApp Concierge: +254 751 022224</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useHead } from "#imports";

useHead({
  title: "Menu & Prices • Craftsman Mobile Barber Studio Nairobi",
  meta: [
    {
      name: "description",
      content: "Explore executive haircutting, beard sculpting, micro-airblading hairline work, and VIP house-call pricing in Nairobi by Master Barber Benjamin Johnson."
    }
  ]
});

const selectedCategory = ref("ALL");

const categories = [
  { id: "ALL", name: "All Offerings" },
  { id: "SIGNATURE_CUTS", name: "Haircuts & Lineups" },
  { id: "HAIRLINE_RESTORATION", name: "Micro-Airblading" },
  { id: "HOUSE_CALL_PACKAGES", name: "VIP Packages" },
  { id: "ORGANIC_TREATMENTS", name: "Scalp & Beard" },
];

const services = [
  {
    id: "srv-exec-signature",
    title: "Executive Signature Cut & Beard Sculpt",
    subtitle: "Precision Hot-Towel Haircut & Feather Razor Lineup",
    description: "Our signature in-suite grooming service. Bespoke scissor & clipper architecture tailored to your head profile, accompanied by hot towel steam and artisanal beard oil.",
    durationMinutes: 45,
    priceKes: 4500,
    category: "SIGNATURE_CUTS",
    popularTag: "Most Popular",
    image: "/images/model.webp",
    inclusions: [
      "Full Cranial & Face Shape Consultation",
      "Hitachi 440C Scissor & Taper Fade Cut",
      "Hot Towel Eucalyptus Steam Compress",
      "Single-Use Feather Razor Lineup",
      "Cold-Pressed Kenyan Macadamia Beard Oil"
    ]
  },
  {
    id: "srv-airblade-restoration",
    title: "Micro-Airblading Hairline Restoration",
    subtitle: "Non-Invasive Semi-Permanent Follicle Definition",
    description: "Proprietary airbrush micro-pigmentation restoring receding temples, crown density, and uneven hairlines with clean organic mineral dyes.",
    durationMinutes: 60,
    priceKes: 7000,
    category: "HAIRLINE_RESTORATION",
    popularTag: "Executive Choice",
    image: "/images/hairline.jpg",
    inclusions: [
      "Temple & Hairline Symmetry Mapping",
      "Pneumatic Airbrush Micro-Pigment Application",
      "Hypoallergenic Organic Mineral Tint",
      "Precision Feather Edge Alignment",
      "Post-Care Scalp Sealant Formulation"
    ]
  },
  {
    id: "srv-father-son-vip",
    title: "Father & Son VIP House-Call Package",
    subtitle: "Back-to-Back Private Family In-Suite Session",
    description: "Two complete haircuts & beard grooming in one uninterrupted home visit. Ideal for busy parents, executive fathers, and weekend family routines.",
    durationMinutes: 90,
    priceKes: 8500,
    category: "HOUSE_CALL_PACKAGES",
    popularTag: "Best Family Value",
    image: "/images/session.jpeg",
    inclusions: [
      "2 Dedicated Full Haircuts & Styles",
      "Father's Beard Sculpting & Razor Finish",
      "Son's Custom Edge & Natural Styling",
      "Zero Salon Queue in Your Living Room",
      "Complimentary Botanical Beard Elixir"
    ]
  },
  {
    id: "srv-total-revival",
    title: "Total Executive Revival (Cut + Beard + Airblade)",
    subtitle: "The Complete Identity Transformation Session",
    description: "The ultimate 75-minute white-glove experience combining our master haircut, full beard therapy, and micro-airblading hairline enhancement.",
    durationMinutes: 75,
    priceKes: 9500,
    category: "HOUSE_CALL_PACKAGES",
    popularTag: "VIP Flagship",
    image: "/images/about_hero.jpg",
    inclusions: [
      "Master Haircut & Skin Taper Fade",
      "Full Micro-Airblading Hairline Restoration",
      "Beard Architecture & Sculpting",
      "Double Eucalyptus Hot Towel Steam",
      "High-Frequency Scalp & Beard Treatment"
    ]
  },
  {
    id: "srv-skin-fade-gradient",
    title: "Skin Fade & Gradient Razor Edging",
    subtitle: "Surgical Low, Mid, or High Taper Fade Architecture",
    description: "Seamless zero-gap gradient fading with scissor texturing and clean hairline boundary definition.",
    durationMinutes: 40,
    priceKes: 3500,
    category: "SIGNATURE_CUTS",
    popularTag: undefined,
    image: "/images/model1.webp",
    inclusions: [
      "Low/Mid/High Taper or Drop Fade",
      "Scissor-Over-Comb Crown Texturing",
      "Straight Razor Edging & Nape Clean",
      "Matte Clay or Styling Pomade Finish"
    ]
  },
  {
    id: "srv-scalp-beard-detox",
    title: "Organic Scalp Detox & Botanical Therapy",
    subtitle: "Handcrafted Herbal Scalp & Follicle Treatment",
    description: "Exfoliating tea tree & eucalyptus scalp scrub, deep conditioning beard wash, hot steam compress, and follicle stimulation.",
    durationMinutes: 40,
    priceKes: 3500,
    category: "ORGANIC_TREATMENTS",
    popularTag: undefined,
    image: "/images/tools.jpg",
    inclusions: [
      "Tea Tree & Sea Salt Scalp Scrub",
      "Deep Conditioning Botanical Beard Wash",
      "Eucalyptus Aromatherapy Hot Towel",
      "Scalp Follicle Stimulation Massage"
    ]
  }
];

const filteredServices = computed(() => {
  if (selectedCategory.value === "ALL") return services;
  return services.filter((s) => s.category === selectedCategory.value);
});

const getCategoryCount = (catId: string) => {
  if (catId === "ALL") return services.length;
  return services.filter((s) => s.category === catId).length;
};

const getCategoryLabel = (category: string) => {
  const found = categories.find((c) => c.id === category);
  return found ? found.name : "SERVICE";
};

const whatsappText = encodeURIComponent("Hello Benjamin, I would like to inquire about booking a service from the Menu & Price list.");
const whatsappLink = `https://wa.me/254751022224?text=${whatsappText}`;
</script>