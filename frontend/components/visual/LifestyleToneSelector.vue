<template>
  <div class="bg-parlour-card rounded-sm p-6 md:p-8 border border-parlour-dark/20 my-8">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 border-b border-parlour-dark/15 pb-4">
      <div>
        <span class="text-[10px] font-bold tracking-[0.3em] uppercase text-parlour-dark/60">ADAPTIVE EXPERIENCE</span>
        <h3 class="text-2xl font-serif font-black uppercase text-parlour-dark">SELECT YOUR LIFESTYLE PROFILE</h3>
      </div>
      <div class="inline-flex p-1 bg-parlour-cream border border-parlour-dark/40 shadow-inner">
        <button
          v-for="mode in modes"
          :key="mode.id"
          @click="activeMode = mode.id"
          :class="[
            'px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200',
            activeMode === mode.id
              ? 'bg-parlour-dark text-parlour-cream'
              : 'text-parlour-dark/70 hover:text-parlour-dark hover:bg-parlour-card'
          ]"
        >
          {{ mode.label }}
        </button>
      </div>
    </div>

    <!-- Active Mode Dynamic Highlight Card -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
      <div class="md:col-span-2 space-y-3">
        <div class="inline-block px-2.5 py-1 text-[10px] font-bold bg-parlour-dark text-parlour-cream uppercase tracking-widest">
          {{ selectedModeDetails.tagline }}
        </div>
        <h4 class="text-2xl font-serif font-bold uppercase text-parlour-dark">
          {{ selectedModeDetails.headline }}
        </h4>
        <p class="text-parlour-dark/80 text-xs leading-relaxed">
          {{ selectedModeDetails.description }}
        </p>
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-parlour-dark pt-2">
          <li v-for="(feature, idx) in selectedModeDetails.features" :key="idx" class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-parlour-dark"></span>
            {{ feature }}
          </li>
        </ul>
      </div>

      <div class="bg-parlour-cream p-5 border border-parlour-dark/30 flex flex-col justify-between">
        <div>
          <span class="text-[10px] uppercase font-bold text-parlour-dark/60 block mb-1">RECOMMENDED SIGNATURE:</span>
          <span class="font-serif font-bold text-parlour-dark text-sm uppercase block mb-2">{{ selectedModeDetails.recommendedService }}</span>
          <span class="text-xs font-bold text-parlour-dark block">{{ selectedModeDetails.servicePrice }}</span>
        </div>
        <NuxtLink
          to="/shop/booking"
          class="mt-4 text-center editorial-btn block"
        >
          RESERVE PROFILE
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const activeMode = ref<"EXECUTIVE" | "FAMILY" | "TRENDSETTER">("EXECUTIVE");

const modes = [
  { id: "EXECUTIVE", label: "Corporate Executive" },
  { id: "FAMILY", label: "Family House Call" },
  { id: "TRENDSETTER", label: "Hairline Craft & Fades" },
];

const modeDetails = {
  EXECUTIVE: {
    tagline: "DISCRETION & TIME OPTIMIZATION",
    headline: "White-Glove Mobile Studio at Residence or Office",
    description: "Tailored for corporate leaders, founders, and public figures. Zero waiting room friction, silent high-precision razor work, and complete privacy before important board meetings.",
    features: ["Zero travel time & quiet execution", "Flexible early morning & evening slots", "Hot-towel steam & razor lineup", "Direct craftsman priority line"],
    recommendedService: "Executive Signature Cut & Beard Sculpting",
    servicePrice: "KES 4,500 + Zone Delivery",
  },
  FAMILY: {
    tagline: "HOUSEHOLD EASE & HERITAGE",
    headline: "Father & Son Back-to-Back House Call",
    description: "Relaxed grooming sessions in the comfort of your living room. No stressful traffic with kids, no noisy waiting rooms—just quality family time while keeping everyone sharp.",
    features: ["Two complete cuts in one visit", "Gentle scalp treatment for kids", "Flexible weekend family scheduling", "Zero transport fee on VIP Retainer"],
    recommendedService: "Father & Son VIP House-Call Package",
    servicePrice: "KES 8,500 (Covers Both Cuts)",
  },
  TRENDSETTER: {
    tagline: "MICRO-PRECISION & SYMMETRY",
    headline: "Hairline Airblading & Crisp Definition Fades",
    description: "For men who insist on flawless symmetry. Micro-airblading hairline restoration defines receding edges, coupled with razor-sharp gradient fades and organic beard oils.",
    features: ["Non-invasive micro-airblading pigment", "High-definition photo hairline symmetry", "Custom follicle scalp detox", "Lasts 14+ days razor-sharp"],
    recommendedService: "Micro-Airblading Hairline Restoration",
    servicePrice: "KES 7,000 (Full Restoration & Lineup)",
  },
};

const selectedModeDetails = computed(() => modeDetails[activeMode.value]);
</script>
