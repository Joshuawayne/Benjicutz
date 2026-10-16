<template>
  <div class="space-y-8">
    <!-- Top Metric Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <!-- Total Revenue Card -->
      <div class="bg-parlour-cream p-6 rounded-sm border border-parlour-dark/15 shadow-sm space-y-3 relative group hover:border-parlour-dark transition-all duration-300">
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-bold uppercase tracking-[0.2em] text-parlour-dark/60">Total Revenue</span>
          <svg class="w-4 h-4 text-parlour-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <div class="text-3xl sm:text-4xl font-serif font-black text-parlour-dark tracking-tight">
          KES {{ metrics?.totalRevenueKes.toLocaleString() || '0' }}
        </div>
        <div class="pt-2 border-t border-parlour-dark/10 flex items-center justify-between text-[11px]">
          <span class="font-bold text-emerald-800">
            KES {{ computedAvgTicket.toLocaleString() }}
          </span>
          <span class="text-parlour-dark/60 font-semibold">avg / appointment</span>
        </div>
      </div>

      <!-- Active Mobile Clients Card -->
      <div class="bg-parlour-cream p-6 rounded-sm border border-parlour-dark/15 shadow-sm space-y-3 relative group hover:border-parlour-dark transition-all duration-300">
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-bold uppercase tracking-[0.2em] text-parlour-dark/60">Active Clients</span>
          <svg class="w-4 h-4 text-parlour-dark/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
        </div>
        <div class="text-3xl sm:text-4xl font-serif font-black text-parlour-dark tracking-tight">
          {{ metrics?.activeClientsCount || 0 }}
        </div>
        <div class="pt-2 border-t border-parlour-dark/10 text-[11px] text-parlour-dark/70 font-bold flex items-center justify-between">
          <span>{{ metrics?.totalCompletedBookings || 0 }} Total Bookings</span>
          <span class="text-parlour-terracotta flex items-center gap-1">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            </svg>
            Live DB
          </span>
        </div>
      </div>

      <!-- VIP Retainer Members Card -->
      <div class="bg-parlour-cream p-6 rounded-sm border border-parlour-dark/15 shadow-sm space-y-3 relative group hover:border-parlour-dark transition-all duration-300">
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-bold uppercase tracking-[0.2em] text-parlour-dark/60">VIP Retainers</span>
          <svg class="w-4 h-4 text-parlour-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 3h12l4 6-10 12L2 9l4-6z"/>
          </svg>
        </div>
        <div class="text-3xl sm:text-4xl font-serif font-black text-parlour-dark tracking-tight">
          {{ metrics?.vipRetainerClientsCount || 0 }}
        </div>
        <div class="pt-2 border-t border-parlour-dark/10 text-[11px] text-parlour-dark/70 font-bold flex items-center justify-between">
          <span>{{ vipPercentage }}% of Client Base</span>
          <span class="text-emerald-800">VIP Tier Spend</span>
        </div>
      </div>

      <!-- 12-Day Retention Card -->
      <div class="bg-parlour-cream p-6 rounded-sm border border-parlour-dark/15 shadow-sm space-y-3 relative group hover:border-parlour-dark transition-all duration-300">
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-bold uppercase tracking-[0.2em] text-parlour-dark/60">12-Day Retention</span>
          <svg class="w-4 h-4 text-parlour-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
        </div>
        <div class="text-3xl sm:text-4xl font-serif font-black text-parlour-dark tracking-tight">
          {{ metrics?.rebookingRetentionRatePct || 0 }}%
        </div>
        <div class="pt-2 border-t border-parlour-dark/10 text-[11px] text-emerald-800 font-bold flex items-center justify-between">
          <span>Repeat Client Rate</span>
          <span>WhatsApp Engine</span>
        </div>
      </div>
    </div>

    <!-- Nairobi Zone Revenue Breakdown -->
    <div class="bg-parlour-cream p-6 sm:p-8 rounded-sm border border-parlour-dark/15 shadow-sm space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-parlour-dark/15 pb-4">
        <div>
          <span class="text-[10px] font-bold tracking-[0.25em] text-parlour-terracotta uppercase block mb-1">
            LOGISTICS & DISPATCH INTELLIGENCE
          </span>
          <h3 class="font-serif font-bold text-2xl text-parlour-dark uppercase tracking-tight">
            Nairobi Neighborhood Revenue Heatmap
          </h3>
        </div>

        <button
          @click="$emit('triggerReminders')"
          class="editorial-btn self-start sm:self-auto !py-2.5 !px-5 text-xs shadow-sm inline-flex items-center gap-1.5"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          <span>Dispatch 12-Day Reminders</span>
        </button>
      </div>

      <!-- Empty Zone State -->
      <div v-if="!metrics?.zoneBreakdown || metrics.zoneBreakdown.length === 0" class="py-8 text-center text-xs text-parlour-dark/50 font-bold uppercase font-serif border border-dashed border-parlour-dark/20 p-4 rounded-sm">
        No neighborhood booking heatmap data recorded yet.
      </div>

      <!-- Zone Cards Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="zone in metrics.zoneBreakdown"
          :key="zone.zone"
          class="bg-parlour-card p-4 rounded-sm border border-parlour-dark/15 space-y-3 hover:border-parlour-dark transition-colors"
        >
          <div class="flex items-center justify-between">
            <span class="font-serif font-bold text-sm text-parlour-dark uppercase flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-parlour-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              </svg>
              {{ zone.zone }}
            </span>
            <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-parlour-dark text-parlour-cream rounded-sm">
              {{ zone.bookingCount }} {{ zone.bookingCount === 1 ? 'Booking' : 'Bookings' }}
            </span>
          </div>

          <div class="w-full bg-parlour-cream h-2 rounded-full overflow-hidden border border-parlour-dark/20">
            <div
              class="bg-parlour-dark h-full transition-all duration-700"
              :style="{ width: `${Math.min(100, (zone.revenueAmount / (metrics?.totalRevenueKes || 1)) * 100)}%` }"
            ></div>
          </div>

          <div class="flex items-center justify-between text-xs">
            <span class="text-parlour-dark/60 font-medium">Zone Revenue:</span>
            <span class="font-serif font-bold text-parlour-dark">KES {{ zone.revenueAmount.toLocaleString() }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Navigation Shortcuts -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
      <NuxtLink
        to="/admin/services"
        class="bg-parlour-cream p-6 rounded-sm border border-parlour-dark/15 hover:border-parlour-dark shadow-sm transition-all duration-300 flex items-center gap-4 group"
      >
        <div class="w-12 h-12 rounded-sm bg-parlour-dark text-parlour-cream flex items-center justify-center group-hover:scale-105 transition-transform">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="6" cy="6" r="3" stroke-width="2"/>
            <circle cx="6" cy="18" r="3" stroke-width="2"/>
            <line x1="20" y1="4" x2="8.12" y2="15.88" stroke-width="2"/>
            <line x1="14.47" y1="14.48" x2="20" y2="20" stroke-width="2"/>
            <line x1="8.12" y1="8.12" x2="12" y2="12" stroke-width="2"/>
          </svg>
        </div>
        <div>
          <h4 class="font-serif font-bold text-base text-parlour-dark group-hover:text-parlour-terracotta transition-colors uppercase">
            Service Menu Catalog
          </h4>
          <p class="text-xs text-parlour-dark/60">Configure haircut prices, duration & descriptions</p>
        </div>
      </NuxtLink>

      <NuxtLink
        to="/admin/bookings"
        class="bg-parlour-cream p-6 rounded-sm border border-parlour-dark/15 hover:border-parlour-dark shadow-sm transition-all duration-300 flex items-center gap-4 group"
      >
        <div class="w-12 h-12 rounded-sm bg-parlour-dark text-parlour-cream flex items-center justify-center group-hover:scale-105 transition-transform">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
        </div>
        <div>
          <h4 class="font-serif font-bold text-base text-parlour-dark group-hover:text-parlour-terracotta transition-colors uppercase">
            Bookings & Dispatch
          </h4>
          <p class="text-xs text-parlour-dark/60">Manage appointments, status & zone routing</p>
        </div>
      </NuxtLink>

      <NuxtLink
        to="/admin/retainers"
        class="bg-parlour-cream p-6 rounded-sm border border-parlour-dark/15 hover:border-parlour-dark shadow-sm transition-all duration-300 flex items-center gap-4 group"
      >
        <div class="w-12 h-12 rounded-sm bg-parlour-dark text-parlour-cream flex items-center justify-center group-hover:scale-105 transition-transform">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 3h12l4 6-10 12L2 9l4-6z"/>
          </svg>
        </div>
        <div>
          <h4 class="font-serif font-bold text-base text-parlour-dark group-hover:text-parlour-terracotta transition-colors uppercase">
            VIP Retainer Plans
          </h4>
          <p class="text-xs text-parlour-dark/60">Manage monthly subscription packages & perks</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { AdminAnalyticsData } from "~/domain/models/Analytics";

const props = defineProps<{
  metrics: AdminAnalyticsData | null;
}>();

defineEmits<{
  (e: "triggerReminders"): void;
}>();

const computedAvgTicket = computed(() => {
  if (props.metrics?.avgBookingValueKes) {
    return Math.round(props.metrics.avgBookingValueKes);
  }
  const rev = props.metrics?.totalRevenueKes || 0;
  const count = props.metrics?.totalCompletedBookings || 0;
  return count > 0 ? Math.round(rev / count) : 0;
});

const vipPercentage = computed(() => {
  const active = props.metrics?.activeClientsCount || 0;
  const vip = props.metrics?.vipRetainerClientsCount || 0;
  return active > 0 ? Math.round((vip / active) * 100) : 0;
});
</script>
