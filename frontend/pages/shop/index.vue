<template>
  <div class="space-y-16 md:space-y-24 py-8 md:py-14">
    <!-- SHOP HERO -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-parlour-dark/20 bg-parlour-card/60">
        <span class="w-1.5 h-1.5 rounded-full bg-parlour-gold"></span>
        <span class="text-[10px] font-bold tracking-[0.25em] text-parlour-dark/70 uppercase">
          OFFICIAL ATELIER APOTHECARY & PORTAL
        </span>
      </div>

      <div class="space-y-4 max-w-4xl mx-auto">
        <h1 class="text-4xl sm:text-6xl md:text-7xl font-serif font-black uppercase text-parlour-dark tracking-tight leading-[0.95]">
          CURATED APOTHECARY <br />
          <span class="italic font-light text-parlour-dark/80">& PRIVATE BOOKINGS</span>
        </h1>
        <p class="text-xs sm:text-base text-parlour-dark/75 font-serif italic max-w-2xl mx-auto leading-relaxed">
          "The formulations and tools tested across hundreds of executive house calls. Cold-pressed botanical elixirs, organic matte clays, and direct reservation access."
        </p>
      </div>

      <!-- Quick Dual Portal Action Banners -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto pt-6 text-left">
        <!-- Direct Mobile Booking Card -->
        <NuxtLink
          to="/shop/booking"
          class="group p-6 bg-parlour-cream border-2 border-parlour-dark shadow-lg hover:shadow-2xl transition-all duration-300 flex items-start justify-between relative overflow-hidden"
        >
          <div class="space-y-2 pr-4">
            <span class="text-[10px] font-bold tracking-widest text-parlour-gold uppercase block">HOUSE CALL PORTAL</span>
            <h3 class="font-serif font-black text-xl uppercase text-parlour-dark group-hover:text-parlour-terracotta transition-colors">
              Book Private Mobile Session
            </h3>
            <p class="text-xs text-parlour-dark/70 leading-relaxed">
              Select your zone, preferred date, and customized haircut or micro-airblading service.
            </p>
          </div>
          <div class="w-10 h-10 rounded-full border-2 border-parlour-dark flex items-center justify-center text-parlour-dark group-hover:bg-parlour-dark group-hover:text-parlour-cream transition-colors flex-shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </div>
        </NuxtLink>

        <!-- VIP Retainers Card -->
        <NuxtLink
          to="/admin/retainers"
          class="group p-6 bg-parlour-card border-2 border-parlour-dark shadow-lg hover:shadow-2xl transition-all duration-300 flex items-start justify-between relative overflow-hidden"
        >
          <div class="space-y-2 pr-4">
            <span class="text-[10px] font-bold tracking-widest text-parlour-gold uppercase block">MONTHLY MEMBERSHIPS</span>
            <h3 class="font-serif font-black text-xl uppercase text-parlour-dark group-hover:text-parlour-terracotta transition-colors">
              VIP Executive Retainers
            </h3>
            <p class="text-xs text-parlour-dark/70 leading-relaxed">
              Guaranteed priority slots, recurring monthly house calls, and complimentary botanical kits.
            </p>
          </div>
          <div class="w-10 h-10 rounded-full border-2 border-parlour-dark flex items-center justify-center text-parlour-dark group-hover:bg-parlour-dark group-hover:text-parlour-cream transition-colors flex-shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- SHOP PRODUCTS SECTION -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-parlour-dark/20">
        <div class="space-y-2">
          <span class="text-xs font-bold tracking-[0.3em] uppercase text-parlour-dark/60">APOTHECARY CATALOG</span>
          <h2 class="text-3xl sm:text-4xl font-serif font-black uppercase text-parlour-dark">
            THE GROOMING ARTIFACTS
          </h2>
        </div>

        <!-- Filter Tabs -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="cat in categories"
            :key="cat"
            type="button"
            @click="activeCategory = cat"
            :class="[
              'px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all border',
              activeCategory === cat
                ? 'bg-parlour-dark text-parlour-cream border-parlour-dark shadow-sm'
                : 'bg-parlour-cream text-parlour-dark border-parlour-dark/20 hover:border-parlour-dark'
            ]"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-10">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-parlour-cream border-2 border-parlour-dark shadow-xl flex flex-col justify-between overflow-hidden group hover:border-parlour-dark transition-all duration-300"
        >
          <div>
            <!-- Product Image -->
            <div class="relative h-64 sm:h-72 bg-parlour-dark overflow-hidden border-b-2 border-parlour-dark">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div class="absolute top-3 left-3 bg-parlour-gold text-parlour-dark px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest">
                {{ product.category }}
              </div>
              <div class="absolute bottom-3 right-3 bg-parlour-dark/90 backdrop-blur-md px-3.5 py-1 text-parlour-gold font-serif font-black text-sm uppercase border border-parlour-gold/30">
                KES {{ product.priceKes.toLocaleString() }}
              </div>
            </div>

            <!-- Product Details -->
            <div class="p-6 space-y-4">
              <div class="space-y-1">
                <span class="text-[9px] font-mono font-bold tracking-widest text-parlour-dark/50 uppercase block">
                  {{ product.volume }} • {{ product.origin }}
                </span>
                <h3 class="font-serif font-black text-xl uppercase text-parlour-dark tracking-tight leading-snug">
                  {{ product.name }}
                </h3>
              </div>

              <p class="text-xs text-parlour-dark/75 leading-relaxed font-serif">
                {{ product.description }}
              </p>

              <!-- Key Benefits -->
              <div class="pt-3 border-t border-parlour-dark/15 space-y-1.5">
                <span class="text-[9px] font-bold uppercase tracking-widest text-parlour-dark/60 block">KEY INGREDIENTS / CRAFT:</span>
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="(tag, i) in product.highlights"
                    :key="i"
                    class="text-[9px] font-mono px-2 py-0.5 bg-parlour-card text-parlour-dark border border-parlour-dark/15"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="p-6 pt-0 space-y-3">
            <div class="flex items-center gap-2">
              <button
                type="button"
                @click="orderProduct(product)"
                class="flex-1 py-3.5 bg-parlour-dark text-parlour-cream hover:bg-transparent hover:text-parlour-dark border-2 border-parlour-dark font-serif font-bold text-xs uppercase tracking-widest text-center transition-all shadow-md inline-flex items-center justify-center gap-2"
              >
                <!-- SVG WhatsApp / Message Icon -->
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                <span>Order via Concierge</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ATELIER ASSURANCE BANNER -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-parlour-dark/20">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="p-6 bg-parlour-cream border border-parlour-dark/20 flex items-start gap-4">
          <div class="w-10 h-10 bg-parlour-dark text-parlour-gold rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>
          <div class="space-y-1">
            <h4 class="font-serif font-bold text-sm text-parlour-dark uppercase">100% Organic & Hypoallergenic</h4>
            <p class="text-xs text-parlour-dark/70">Formulated with cold-pressed Kenyan botanicals with zero harsh synthetic alcohol.</p>
          </div>
        </div>

        <div class="p-6 bg-parlour-cream border border-parlour-dark/20 flex items-start gap-4">
          <div class="w-10 h-10 bg-parlour-dark text-parlour-gold rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="space-y-1">
            <h4 class="font-serif font-bold text-sm text-parlour-dark uppercase">Delivered With Your House Call</h4>
            <p class="text-xs text-parlour-dark/70">Items can be brought directly to your scheduled private appointment or dispatched via courier.</p>
          </div>
        </div>

        <div class="p-6 bg-parlour-cream border border-parlour-dark/20 flex items-start gap-4">
          <div class="w-10 h-10 bg-parlour-dark text-parlour-gold rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
            </svg>
          </div>
          <div class="space-y-1">
            <h4 class="font-serif font-bold text-sm text-parlour-dark uppercase">Direct M-Pesa & Card Payment</h4>
            <p class="text-xs text-parlour-dark/70">Seamless instant mobile payment upon delivery or during your atelier session.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface Product {
  id: string;
  name: string;
  category: "Botanicals" | "Styling" | "Tools & Accs";
  volume: string;
  origin: string;
  priceKes: number;
  image: string;
  description: string;
  highlights: string[];
}

const categories = ["All", "Botanicals", "Styling", "Tools & Accs"];
const activeCategory = ref("All");

const products: Product[] = [
  {
    id: "prod-01",
    name: "Cold-Pressed Macadamia Scalp Elixir",
    category: "Botanicals",
    volume: "50ml Pipette Bottle",
    origin: "Kenya",
    priceKes: 2800,
    image: "/images/session.jpeg",
    description: "Pure cold-pressed macadamia seed oil infused with organic tea tree and rosemary to eliminate scalp dryness and encourage healthy follicle density.",
    highlights: ["Cold-Pressed", "Tea Tree Extract", "Zero Sulfates"]
  },
  {
    id: "prod-02",
    name: "Organic Matte Clay Pomade",
    category: "Styling",
    volume: "100g Matte Tin",
    origin: "Atelier Custom",
    priceKes: 3200,
    image: "/images/tools.jpg",
    description: "Medium-high pliable hold with a zero-shine natural matte finish. Rinses out clean with water and holds shape throughout Nairobi heat.",
    highlights: ["Bentonite Clay", "Water Soluble", "Matte Finish"]
  },
  {
    id: "prod-03",
    name: "Sandalwood & Eucalyptus Beard Conditioning Butter",
    category: "Botanicals",
    volume: "60g Amber Jar",
    origin: "Kenya",
    priceKes: 2400,
    image: "/images/about2.webp",
    description: "Deep nourishing shea butter blend that softens coarse beard hair, tames strays, and relieves skin irritation under the beard.",
    highlights: ["Shea Butter", "Sandalwood", "Eucalyptus"]
  },
  {
    id: "prod-04",
    name: "Micro-Airblade Scalp & Hairline Setting Mist",
    category: "Styling",
    volume: "120ml Atomizer",
    origin: "Atelier Custom",
    priceKes: 3600,
    image: "/images/hairline.jpg",
    description: "Ultra-fine anti-humidity setting spray designed to lock in micro-airblade hairline symmetry and resist sweat during long working days.",
    highlights: ["Sweat-Resistant", "Non-Sticky", "Quick-Dry"]
  },
  {
    id: "prod-05",
    name: "Hand-Carved Sandalwood Folding Pocket Comb",
    category: "Tools & Accs",
    volume: "Pocket Size",
    origin: "Artisan Handcrafted",
    priceKes: 1800,
    image: "/images/tool.webp",
    description: "Static-free natural sandalwood teeth that glide smoothly through hair and beard without snagging or pulling follicles.",
    highlights: ["Anti-Static", "Solid Sandalwood", "Brass Pivot"]
  },
  {
    id: "prod-06",
    name: "Craftsman Heavyweight Canvas Apron & Cape Set",
    category: "Tools & Accs",
    volume: "One Size",
    origin: "Nairobi Workshop",
    priceKes: 6500,
    image: "/images/about_hero.jpg",
    description: "Water-repellent heavy waxed canvas apron with antique brass hardware and full coverage client cape used across all master sessions.",
    highlights: ["Waxed Canvas", "Brass Rivets", "Multi-Pockets"]
  }
];

const filteredProducts = computed(() => {
  if (activeCategory.value === "All") return products;
  return products.filter((p) => p.category === activeCategory.value);
});

const orderProduct = (product: Product) => {
  const text = encodeURIComponent(
    `Hello Master Benjamin, I would like to order '${product.name}' (KES ${product.priceKes.toLocaleString()}) from the Atelier Shop. Please confirm availability and delivery / session pickup.`
  );
  window.open(`https://wa.me/254751022224?text=${text}`, "_blank");
};
</script>