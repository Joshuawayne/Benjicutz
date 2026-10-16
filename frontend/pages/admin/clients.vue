<template>
  <div class="space-y-6 sm:space-y-8 max-w-7xl mx-auto">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-parlour-dark/15 pb-6">
      <div>
        <span class="text-[10px] font-bold tracking-[0.25em] text-parlour-terracotta uppercase block mb-1">
          MOBILE CONCIERGE & CADENCE CRM
        </span>
        <h1 class="text-2xl sm:text-4xl font-serif font-black text-parlour-dark tracking-tight uppercase">
          Client Directory & Rebooking CRM
        </h1>
        <p class="text-parlour-dark/70 text-xs sm:text-sm mt-1">
          Real-time customer lifetime value (LTV), haircut cadences, and 1-tap WhatsApp concierge dispatch.
        </p>
      </div>

      <!-- Quick Action Buttons -->
      <div class="flex items-center gap-2 self-start sm:self-auto">
        <button
          @click="refreshData"
          :disabled="loading"
          class="editorial-btn !py-2.5 !px-5 text-xs shadow-sm flex items-center gap-1.5"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          <span>{{ loading ? 'Syncing...' : 'Sync Live DB' }}</span>
        </button>
      </div>
    </div>

    <!-- Mobile-First KPI Summary Bar -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      <div class="bg-parlour-cream p-4 rounded-sm border border-parlour-dark/15 shadow-sm">
        <span class="text-[10px] font-bold uppercase tracking-wider text-parlour-dark/60 block mb-1">Total Clients</span>
        <span class="font-serif font-black text-2xl text-parlour-dark">{{ aggregatedClients.length }}</span>
      </div>

      <div class="bg-parlour-cream p-4 rounded-sm border border-parlour-dark/15 shadow-sm">
        <span class="text-[10px] font-bold uppercase tracking-wider text-parlour-dark/60 block mb-1">Combined LTV</span>
        <span class="font-serif font-black text-xl text-parlour-dark">KES {{ totalCombinedLtv.toLocaleString() }}</span>
      </div>

      <div class="bg-parlour-cream p-4 rounded-sm border border-parlour-dark/15 shadow-sm">
        <span class="text-[10px] font-bold uppercase tracking-wider text-parlour-terracotta block mb-1">Reminders Due</span>
        <span class="font-serif font-black text-2xl text-parlour-terracotta">{{ remindersDueCount }}</span>
      </div>

      <div class="bg-parlour-cream p-4 rounded-sm border border-parlour-dark/15 shadow-sm">
        <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">VIP Members</span>
        <span class="font-serif font-black text-2xl text-emerald-900">{{ vipClientsCount }}</span>
      </div>
    </div>

    <!-- Search & Filter Controls -->
    <div class="bg-parlour-cream p-4 sm:p-5 rounded-sm border border-parlour-dark/15 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-between shadow-sm">
      <div class="w-full sm:w-72 relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search client name or phone..."
          class="w-full bg-parlour-card border border-parlour-dark/20 rounded-sm pl-9 pr-4 py-2.5 text-xs text-parlour-dark focus:border-parlour-dark outline-none placeholder:text-parlour-dark/40 font-medium"
        />
        <svg class="w-3.5 h-3.5 absolute left-3 top-3 text-parlour-dark/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </div>

      <div class="flex flex-wrap items-center gap-2.5 w-full sm:w-auto text-xs">
        <select
          v-model="filterZone"
          class="bg-parlour-card border border-parlour-dark/20 text-parlour-dark rounded-sm px-3 py-2 focus:border-parlour-dark outline-none font-bold uppercase tracking-wider text-[11px]"
        >
          <option value="ALL">All Neighborhood Zones</option>
          <option value="KILELESHWA">Kileleshwa</option>
          <option value="WESTLANDS">Westlands</option>
          <option value="LAVINGTON">Lavington</option>
          <option value="KILIMANI">Kilimani</option>
          <option value="KAREN">Karen</option>
          <option value="GIGIRI">Gigiri</option>
          <option value="RUNDA">Runda</option>
          <option value="MUTHAIGA">Muthaiga</option>
          <option value="CBD">CBD</option>
          <option value="PARKLANDS">Parklands</option>
        </select>

        <select
          v-model="filterCadence"
          class="bg-parlour-card border border-parlour-dark/20 text-parlour-dark rounded-sm px-3 py-2 focus:border-parlour-dark outline-none font-bold uppercase tracking-wider text-[11px]"
        >
          <option value="ALL">All Cadences</option>
          <option value="DUE">12-Day Rebooking Due</option>
          <option value="VIP">VIP Retainers Only</option>
        </select>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading && aggregatedClients.length === 0" class="py-12 text-center text-parlour-dark/50 text-xs font-bold uppercase tracking-widest font-serif">
      Connecting to Supabase Database...
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredClients.length === 0" class="py-16 text-center bg-parlour-cream rounded-sm border border-parlour-dark/15 space-y-3 p-8">
      <div class="w-12 h-12 rounded-sm bg-parlour-dark text-parlour-cream flex items-center justify-center mx-auto">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
      </div>
      <h3 class="text-xl font-serif font-bold text-parlour-dark uppercase">
        {{ aggregatedClients.length === 0 ? 'No Client Profiles Yet' : 'No Matching Clients Found' }}
      </h3>
      <p class="text-xs text-parlour-dark/70 max-w-md mx-auto">
        {{ aggregatedClients.length === 0
          ? 'Client profiles, customer lifetime spend (LTV), and haircut cadences will automatically aggregate here as appointments are placed and completed.'
          : 'Try clearing your search query or neighborhood filters.' }}
      </p>
    </div>

    <!-- Responsive View 1: Mobile Cards (Default for Phones) -->
    <div v-else class="block lg:hidden space-y-4">
      <div
        v-for="client in paginatedClients"
        :key="client.phone"
        class="bg-parlour-cream p-5 rounded-sm border border-parlour-dark/15 space-y-4 shadow-sm relative"
      >
        <!-- Client Header -->
        <div class="flex items-start justify-between gap-3">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="font-serif font-bold text-lg text-parlour-dark">{{ client.name }}</span>
              <span v-if="client.isVip" class="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-parlour-dark text-parlour-cream rounded-sm">
                VIP Member
              </span>
            </div>
            <a :href="`tel:${client.phone}`" class="text-xs text-parlour-terracotta font-mono font-bold hover:underline flex items-center gap-1">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <span>{{ client.phone }}</span>
            </a>
          </div>

          <!-- Status Badge -->
          <span
            :class="client.reminderDue ? 'bg-parlour-terracotta text-parlour-cream' : 'bg-emerald-800 text-parlour-cream'"
            class="px-2.5 py-1 rounded-sm font-bold text-[9px] uppercase tracking-wider shrink-0 flex items-center gap-1"
          >
            <svg v-if="client.reminderDue" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span>{{ client.reminderDue ? '12-Day Due' : 'Fresh Cut' }}</span>
          </span>
        </div>

        <!-- Key Metrics Row -->
        <div class="grid grid-cols-2 gap-2 bg-parlour-card p-3 rounded-sm border border-parlour-dark/10 text-xs">
          <div>
            <span class="text-[10px] text-parlour-dark/50 uppercase font-bold block">Primary Zone:</span>
            <span class="font-bold text-parlour-dark flex items-center gap-1">
              <svg class="w-3 h-3 text-parlour-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              </svg>
              {{ client.zone }}
            </span>
          </div>

          <div>
            <span class="text-[10px] text-parlour-dark/50 uppercase font-bold block">Total LTV Spend:</span>
            <span class="font-serif font-bold text-parlour-dark">KES {{ client.totalSpentKes.toLocaleString() }}</span>
          </div>

          <div>
            <span class="text-[10px] text-parlour-dark/50 uppercase font-bold block">Last Haircut:</span>
            <span class="font-bold text-parlour-dark">{{ client.daysAgoText }}</span>
          </div>

          <div>
            <span class="text-[10px] text-parlour-dark/50 uppercase font-bold block">Favorite Service:</span>
            <span class="font-semibold text-parlour-dark truncate block">{{ client.favoriteService }}</span>
          </div>
        </div>

        <!-- Mobile 1-Tap Quick Action Buttons -->
        <div class="grid grid-cols-2 gap-2 pt-1">
          <a
            :href="`tel:${client.phone}`"
            class="w-full py-2.5 bg-parlour-card hover:bg-parlour-dark hover:text-parlour-cream border border-parlour-dark text-parlour-dark font-serif font-bold text-xs uppercase tracking-wider rounded-sm text-center flex items-center justify-center gap-1.5 transition-colors"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <span>Direct Call</span>
          </a>

          <button
            @click="sendWhatsApp(client)"
            class="w-full py-2.5 bg-parlour-dark text-parlour-cream hover:bg-parlour-terracotta border border-parlour-dark font-serif font-bold text-xs uppercase tracking-wider rounded-sm text-center flex items-center justify-center gap-1.5 transition-colors"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Responsive View 2: Desktop Table (Hidden on Mobile) -->
    <div v-if="filteredClients.length > 0" class="hidden lg:block bg-parlour-cream rounded-sm border border-parlour-dark/15 overflow-hidden shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-parlour-dark">
          <thead class="bg-parlour-card text-parlour-dark font-serif font-bold uppercase border-b border-parlour-dark/15">
            <tr>
              <th class="py-3.5 px-4">Client Name & Phone</th>
              <th class="py-3.5 px-4">Nairobi Zone</th>
              <th class="py-3.5 px-4">Haircut Cadence</th>
              <th class="py-3.5 px-4">Favorite Service</th>
              <th class="py-3.5 px-4">Lifetime Value (LTV)</th>
              <th class="py-3.5 px-4">Retention Status</th>
              <th class="py-3.5 px-4 text-right">Mobile Concierge</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-parlour-dark/10">
            <tr v-for="client in paginatedClients" :key="client.phone" class="hover:bg-parlour-card/60 transition-colors">
              <td class="py-4 px-4">
                <div class="font-serif font-bold text-sm text-parlour-dark flex items-center gap-2">
                  <span>{{ client.name }}</span>
                  <span v-if="client.isVip" class="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-parlour-dark text-parlour-cream rounded-sm">
                    VIP
                  </span>
                </div>
                <a :href="`tel:${client.phone}`" class="text-[11px] text-parlour-terracotta font-mono font-bold hover:underline">
                  {{ client.phone }}
                </a>
              </td>

              <td class="py-4 px-4 font-semibold text-parlour-dark">
                {{ client.zone }}
              </td>

              <td class="py-4 px-4 font-medium text-parlour-dark">
                {{ client.daysAgoText }}
              </td>

              <td class="py-4 px-4 font-semibold text-parlour-dark/80">
                {{ client.favoriteService }}
              </td>

              <td class="py-4 px-4 font-serif font-black text-sm text-parlour-dark">
                KES {{ client.totalSpentKes.toLocaleString() }}
              </td>

              <td class="py-4 px-4">
                <span
                  :class="client.reminderDue ? 'bg-parlour-terracotta text-parlour-cream' : 'bg-emerald-800 text-parlour-cream'"
                  class="px-2.5 py-1 rounded-sm font-bold text-[10px] uppercase tracking-wider inline-flex items-center gap-1"
                >
                  <svg v-if="client.reminderDue" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>{{ client.reminderDue ? '12-Day Due' : 'Fresh Cut' }}</span>
                </span>
              </td>

              <td class="py-4 px-4 text-right space-x-2">
                <a
                  :href="`tel:${client.phone}`"
                  class="editorial-outline-btn !py-1.5 !px-3 text-[10px] inline-flex items-center gap-1"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <span>Call</span>
                </a>
                <button
                  @click="sendWhatsApp(client)"
                  class="editorial-btn !py-1.5 !px-3 text-[10px] inline-flex items-center gap-1"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                  <span>WhatsApp</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Editorial Pagination Bar -->
    <div
      v-if="filteredClients.length > 0"
      class="bg-parlour-cream p-4 rounded-sm border border-parlour-dark/15 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm text-xs"
    >
      <div class="flex flex-wrap items-center gap-2 text-parlour-dark/70 font-medium">
        <span>
          Showing <strong class="text-parlour-dark">{{ paginationStart }}</strong> to <strong class="text-parlour-dark">{{ paginationEnd }}</strong> of <strong class="text-parlour-dark">{{ filteredClients.length }}</strong> client profiles
        </span>
        <span class="text-parlour-dark/30 hidden sm:inline">•</span>
        <div class="flex items-center gap-1.5">
          <label class="text-[10px] font-bold uppercase tracking-wider text-parlour-dark/60">Per Page:</label>
          <select
            v-model.number="pageSize"
            @change="currentPage = 1"
            class="bg-parlour-card border border-parlour-dark/20 text-parlour-dark rounded-sm px-2 py-1 font-bold text-[11px] outline-none"
          >
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="25">25</option>
          </select>
        </div>
      </div>

      <div class="flex items-center gap-1.5">
        <button
          @click="currentPage--"
          :disabled="currentPage <= 1"
          class="px-3 py-1.5 bg-parlour-card border border-parlour-dark/20 text-parlour-dark rounded-sm font-bold text-xs uppercase disabled:opacity-40 disabled:cursor-not-allowed hover:bg-parlour-dark hover:text-parlour-cream transition-colors"
        >
          ← Prev
        </button>

        <div class="flex items-center gap-1">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            :class="[
              'w-8 h-8 rounded-sm font-bold text-xs font-serif transition-colors',
              currentPage === page
                ? 'bg-parlour-dark text-parlour-cream shadow-sm'
                : 'bg-parlour-card text-parlour-dark hover:bg-parlour-cream border border-parlour-dark/15'
            ]"
          >
            {{ page }}
          </button>
        </div>

        <button
          @click="currentPage++"
          :disabled="currentPage >= totalPages"
          class="px-3 py-1.5 bg-parlour-card border border-parlour-dark/20 text-parlour-dark rounded-sm font-bold text-xs uppercase disabled:opacity-40 disabled:cursor-not-allowed hover:bg-parlour-dark hover:text-parlour-cream transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from "vue";
import { useAdmin, type BookingItem } from "~/composables/useAdmin";

definePageMeta({
  layout: "admin",
});

const { bookings, loading, fetchBookings } = useAdmin();

const searchQuery = ref("");
const filterZone = ref("ALL");
const filterCadence = ref("ALL");

// Pagination State
const currentPage = ref(1);
const pageSize = ref(10);

onMounted(async () => {
  await fetchBookings();
});

const refreshData = async () => {
  await fetchBookings();
};

// Aggregate live bookings into structured Client Profiles — NO hardcoded fallback
const aggregatedClients = computed(() => {
  if (bookings.value.length === 0) {
    return [];
  }

  const clientMap = new Map<string, any>();

  for (const b of bookings.value) {
    const key = b.clientPhone || b.clientName;
    const existing = clientMap.get(key) || {
      name: b.clientName,
      phone: b.clientPhone,
      email: b.clientEmail || "",
      zone: b.zone,
      favoriteService: b.serviceName,
      totalSpentKes: 0,
      totalCuts: 0,
      lastCutDate: b.scheduledAt,
      serviceCounts: {} as Record<string, number>,
    };

    existing.totalSpentKes += b.priceAmount || 0;
    existing.totalCuts += 1;
    existing.serviceCounts[b.serviceName] = (existing.serviceCounts[b.serviceName] || 0) + 1;

    // Track latest cut date
    if (new Date(b.scheduledAt).getTime() > new Date(existing.lastCutDate).getTime()) {
      existing.lastCutDate = b.scheduledAt;
      existing.zone = b.zone;
    }

    clientMap.set(key, existing);
  }

  return Array.from(clientMap.values()).map((c) => {
    const diffDays = Math.floor((Date.now() - new Date(c.lastCutDate).getTime()) / (1000 * 60 * 60 * 24));
    
    // Determine favorite service
    let favoriteService = c.favoriteService;
    let maxCount = 0;
    for (const [svc, count] of Object.entries(c.serviceCounts as Record<string, number>)) {
      if (count > maxCount) {
        maxCount = count;
        favoriteService = svc;
      }
    }

    return {
      name: c.name,
      phone: c.phone,
      email: c.email,
      zone: c.zone,
      favoriteService,
      totalSpentKes: c.totalSpentKes,
      totalCuts: c.totalCuts,
      lastCutDate: c.lastCutDate,
      daysAgoText: diffDays <= 0 ? "Today" : `${diffDays} Days Ago`,
      reminderDue: diffDays >= 12,
      isVip: c.totalCuts >= 3 || c.totalSpentKes >= 10000,
    };
  });
});

const filteredClients = computed(() => {
  return aggregatedClients.value.filter((c) => {
    const matchesSearch =
      !searchQuery.value ||
      c.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      c.phone.includes(searchQuery.value);

    const matchesZone =
      filterZone.value === "ALL" || c.zone.toUpperCase() === filterZone.value.toUpperCase();

    const matchesCadence =
      filterCadence.value === "ALL" ||
      (filterCadence.value === "DUE" && c.reminderDue) ||
      (filterCadence.value === "VIP" && c.isVip);

    return matchesSearch && matchesZone && matchesCadence;
  });
});

// Reset pagination on filter change
watch([searchQuery, filterZone, filterCadence], () => {
  currentPage.value = 1;
});

// Paginated clients computation
const totalPages = computed(() => {
  return Math.ceil(filteredClients.value.length / pageSize.value) || 1;
});

const paginatedClients = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredClients.value.slice(start, start + pageSize.value);
});

const paginationStart = computed(() => {
  if (filteredClients.value.length === 0) return 0;
  return (currentPage.value - 1) * pageSize.value + 1;
});

const paginationEnd = computed(() => {
  return Math.min(currentPage.value * pageSize.value, filteredClients.value.length);
});

const totalCombinedLtv = computed(() => {
  return aggregatedClients.value.reduce((acc, c) => acc + c.totalSpentKes, 0);
});

const remindersDueCount = computed(() => {
  return aggregatedClients.value.filter((c) => c.reminderDue).length;
});

const vipClientsCount = computed(() => {
  return aggregatedClients.value.filter((c) => c.isVip).length;
});

const sendWhatsApp = (client: any) => {
  const text = encodeURIComponent(
    `Hello ${client.name}, it's Benjamin from Craftsman Mobile Barber Parlour in Nairobi. Your last haircut in ${client.zone} was ${client.daysAgoText}. Tap here to lock in your preferred mobile studio time for this week: http://localhost:3000/shop/booking`
  );
  const cleanPhone = client.phone.replace(/[^0-9]/g, "");
  window.open(`https://wa.me/${cleanPhone}?text=${text}`, "_blank");
};
</script>