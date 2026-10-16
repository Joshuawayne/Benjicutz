<template>
  <div class="space-y-8 max-w-7xl mx-auto">
    <!-- Header Actions -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-parlour-dark/15 pb-6">
      <div>
        <span class="text-[10px] font-bold tracking-[0.25em] text-parlour-terracotta uppercase block mb-1">
          RECURRING CORPORATE & VIP PASSES
        </span>
        <h1 class="text-3xl sm:text-4xl font-serif font-black text-parlour-dark tracking-tight uppercase">
          VIP Retainer Tiers
        </h1>
        <p class="text-parlour-dark/70 text-xs sm:text-sm mt-1">
          Manage recurring VIP memberships, corporate studio visits, monthly KES billing, and customized perks.
        </p>
      </div>

      <button
        @click="openModal()"
        class="editorial-btn self-start sm:self-auto !py-3 !px-6 shadow-sm flex items-center gap-2"
      >
        <svg class="w-4 h-4 text-parlour-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 3h12l4 6-10 12L2 9l4-6z"/>
        </svg>
        <span>Add Retainer Plan</span>
      </button>
    </div>

    <!-- Alert Toast -->
    <div v-if="toastMessage" class="p-4 bg-parlour-dark text-parlour-cream text-xs font-bold rounded-sm shadow-xl flex items-center justify-between border border-parlour-dark">
      <span>{{ toastMessage }}</span>
      <button @click="toastMessage = ''" class="text-parlour-terracotta font-bold">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Retainer Grid -->
    <div v-if="loading && retainerTiers.length === 0" class="py-16 text-center text-parlour-dark/50 text-xs uppercase tracking-widest font-bold font-serif">
      Loading retainer tiers from Supabase...
    </div>

    <div v-else-if="retainerTiers.length === 0" class="py-16 text-center bg-parlour-cream rounded-sm border border-parlour-dark/15 space-y-4 p-8">
      <div class="w-12 h-12 rounded-sm bg-parlour-dark text-parlour-gold flex items-center justify-center mx-auto">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 3h12l4 6-10 12L2 9l4-6z"/>
        </svg>
      </div>
      <h3 class="text-xl font-serif font-bold text-parlour-dark uppercase">No Retainer Plans Configured</h3>
      <p class="text-xs text-parlour-dark/70 max-w-md mx-auto">
        Click "Add Retainer Plan" above to create your first executive subscription package.
      </p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="tier in retainerTiers"
        :key="tier.id"
        class="bg-parlour-cream rounded-sm border border-parlour-dark/15 p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-parlour-dark shadow-sm transition-all duration-300 relative group"
      >
        <!-- Top Info & Pricing -->
        <div class="space-y-4">
          <div class="flex items-start justify-between gap-4">
            <div>
              <span class="text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 bg-parlour-dark text-parlour-cream rounded-sm inline-block mb-2">
                {{ tier.recommendedZone || 'Nairobi All-Zone' }}
              </span>
              <h3 class="font-serif font-bold text-2xl text-parlour-dark group-hover:text-parlour-terracotta transition-colors uppercase">
                {{ tier.name }}
              </h3>
            </div>

            <span
              :class="tier.isActive ? 'bg-emerald-800 text-parlour-cream' : 'bg-parlour-dark/20 text-parlour-dark/60'"
              class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm shrink-0"
            >
              {{ tier.isActive ? 'Active Plan' : 'Disabled' }}
            </span>
          </div>

          <div class="flex items-baseline gap-2">
            <span class="font-serif font-black text-3xl sm:text-4xl text-parlour-dark">
              KES {{ tier.monthlyKes.toLocaleString() }}
            </span>
            <span class="text-xs text-parlour-dark/60 font-serif italic">/ month</span>
          </div>

          <div class="text-xs font-serif font-bold text-parlour-terracotta flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <span>Includes {{ tier.visitsPerMonth }} Mobile Visits Per Month</span>
          </div>
        </div>

        <!-- Perks List -->
        <div class="space-y-2.5 pt-4 border-t border-parlour-dark/15">
          <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-parlour-dark/60 block">Included Privileges:</span>
          <ul class="space-y-2 text-xs text-parlour-dark/90">
            <li v-for="(perk, idx) in tier.perks" :key="idx" class="flex items-start gap-2">
              <span class="text-parlour-terracotta font-bold">✓</span>
              <span class="leading-relaxed">{{ perk }}</span>
            </li>
          </ul>
        </div>

        <!-- Actions -->
        <div class="pt-4 border-t border-parlour-dark/15 flex items-center justify-end gap-3">
          <button
            @click="openModal(tier)"
            class="editorial-outline-btn !py-2 !px-4 text-[11px]"
          >
            Edit Plan
          </button>
          <button
            @click="handleDelete(tier.id!)"
            class="px-3 py-2 bg-transparent hover:bg-red-900 hover:text-parlour-cream text-red-900 text-[11px] font-bold uppercase tracking-wider border border-red-900 rounded-sm transition-all duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Edit / Create Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 bg-parlour-dark/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-parlour-cream border border-parlour-dark rounded-sm w-full max-w-lg p-6 sm:p-8 space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div class="flex items-center justify-between border-b border-parlour-dark/15 pb-4">
          <div>
            <span class="text-[10px] font-bold tracking-[0.2em] text-parlour-terracotta uppercase block">MEMBERSHIP CONFIGURATION</span>
            <h3 class="font-serif font-black text-xl text-parlour-dark uppercase tracking-tight">
              {{ form.id ? 'Edit Retainer Plan' : 'New Retainer Plan' }}
            </h3>
          </div>
          <button @click="showModal = false" class="p-1 font-bold text-lg text-parlour-dark hover:text-parlour-terracotta">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4 text-xs">
          <div>
            <label class="block font-bold uppercase tracking-wider text-[10px] text-parlour-dark/80 mb-1">Plan Name *</label>
            <input
              v-model="form.name"
              required
              type="text"
              placeholder="e.g. Executive Weekly Retainer"
              class="w-full bg-parlour-card border border-parlour-dark/20 rounded-sm px-3.5 py-2.5 text-parlour-dark focus:border-parlour-dark outline-none font-medium"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-bold uppercase tracking-wider text-[10px] text-parlour-dark/80 mb-1">Monthly Price (KES) *</label>
              <input
                v-model.number="form.monthlyKes"
                required
                type="number"
                min="0"
                step="500"
                class="w-full bg-parlour-card border border-parlour-dark/20 rounded-sm px-3.5 py-2.5 text-parlour-dark focus:border-parlour-dark outline-none font-bold"
              />
            </div>

            <div>
              <label class="block font-bold uppercase tracking-wider text-[10px] text-parlour-dark/80 mb-1">Visits Per Month *</label>
              <input
                v-model.number="form.visitsPerMonth"
                required
                type="number"
                min="1"
                class="w-full bg-parlour-card border border-parlour-dark/20 rounded-sm px-3.5 py-2.5 text-parlour-dark focus:border-parlour-dark outline-none font-bold"
              />
            </div>
          </div>

          <div>
            <label class="block font-bold uppercase tracking-wider text-[10px] text-parlour-dark/80 mb-1">Recommended Nairobi Zone</label>
            <input
              v-model="form.recommendedZone"
              type="text"
              placeholder="e.g. Kilimani / Lavington / Westlands"
              class="w-full bg-parlour-card border border-parlour-dark/20 rounded-sm px-3.5 py-2.5 text-parlour-dark focus:border-parlour-dark outline-none font-medium"
            />
          </div>

          <div>
            <label class="block font-bold uppercase tracking-wider text-[10px] text-parlour-dark/80 mb-1">Subscription Perks (One per line) *</label>
            <textarea
              v-model="perksInput"
              required
              rows="4"
              placeholder="4 Haircuts & Beard Edging&#10;Priority Booking Slots&#10;Hot Towel Treatment&#10;Complimentary Organic Grooming Balm"
              class="w-full bg-parlour-card border border-parlour-dark/20 rounded-sm px-3.5 py-2.5 text-parlour-dark focus:border-parlour-dark outline-none leading-relaxed"
            ></textarea>
          </div>

          <div class="flex items-center gap-3 pt-2">
            <input
              v-model="form.isActive"
              id="isRetainerActiveModal"
              type="checkbox"
              class="w-4 h-4 accent-parlour-dark rounded"
            />
            <label for="isRetainerActiveModal" class="font-bold text-parlour-dark text-xs cursor-pointer">
              Active & Available for Retainer Subscriptions
            </label>
          </div>

          <div class="pt-6 flex items-center justify-end gap-3 border-t border-parlour-dark/15">
            <button
              type="button"
              @click="showModal = false"
              class="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-parlour-dark/70 hover:text-parlour-dark"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="editorial-btn !py-2.5 !px-6"
            >
              {{ saving ? 'Saving...' : 'Save Retainer Plan' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import { useAdmin, type RetainerTierItem } from "~/composables/useAdmin";

definePageMeta({ layout: "admin" });

const { retainerTiers, loading, fetchAdminRetainers, saveRetainerTier, deleteRetainerTier } = useAdmin();

const showModal = ref(false);
const saving = ref(false);
const toastMessage = ref("");
const perksInput = ref("");

const form = reactive<RetainerTierItem>({
  id: undefined,
  name: "",
  monthlyKes: 12000,
  visitsPerMonth: 4,
  perks: [],
  recommendedZone: "Kilimani / Lavington",
  sortOrder: 1,
  isActive: true,
});

onMounted(async () => {
  await fetchAdminRetainers();
});

const openModal = (tier?: RetainerTierItem) => {
  if (tier) {
    Object.assign(form, tier);
    perksInput.value = (tier.perks || []).join("\n");
  } else {
    Object.assign(form, {
      id: undefined,
      name: "",
      monthlyKes: 12000,
      visitsPerMonth: 4,
      perks: [],
      recommendedZone: "Kilimani / Lavington",
      sortOrder: retainerTiers.value.length + 1,
      isActive: true,
    });
    perksInput.value = "";
  }
  showModal.value = true;
};

const handleSubmit = async () => {
  saving.value = true;
  form.perks = perksInput.value
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);

  const success = await saveRetainerTier({ ...form });
  saving.value = false;
  if (success) {
    showModal.value = false;
    toastMessage.value = form.id ? "Retainer plan updated!" : "New retainer plan created!";
    setTimeout(() => (toastMessage.value = ""), 4000);
  }
};

const handleDelete = async (id: string) => {
  if (!confirm("Are you sure you want to delete this retainer plan?")) return;
  const success = await deleteRetainerTier(id);
  if (success) {
    toastMessage.value = "Retainer plan deleted.";
    setTimeout(() => (toastMessage.value = ""), 4000);
  }
};
</script>
