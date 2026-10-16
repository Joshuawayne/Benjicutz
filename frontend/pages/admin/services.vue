<template>
  <div class="space-y-8 max-w-7xl mx-auto">
    <!-- Header Actions -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-parlour-dark/15 pb-6">
      <div>
        <span class="text-[10px] font-bold tracking-[0.25em] text-parlour-terracotta uppercase block mb-1">
          CRAFT OFFERINGS & PRICING
        </span>
        <h1 class="text-3xl sm:text-4xl font-serif font-black text-parlour-dark tracking-tight uppercase">
          Service Menu Catalog
        </h1>
        <p class="text-parlour-dark/70 text-xs sm:text-sm mt-1">
          Configure bespoke haircutting, beard sculpting, and micro-airblading services with live KES pricing.
        </p>
      </div>

      <button
        @click="openModal()"
        class="editorial-btn self-start sm:self-auto !py-3 !px-6 shadow-sm flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        <span>Add Service Package</span>
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

    <!-- Services Loading / Empty States -->
    <div v-if="loading && services.length === 0" class="py-16 text-center text-parlour-dark/50 text-xs uppercase tracking-widest font-bold font-serif">
      Loading services catalog ...
    </div>

    <div v-else-if="services.length === 0" class="py-16 text-center bg-parlour-cream rounded-sm border border-parlour-dark/15 space-y-4 p-8">
      <div class="w-12 h-12 rounded-sm bg-parlour-dark text-parlour-cream flex items-center justify-center mx-auto">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="6" cy="6" r="3" stroke-width="2"/>
          <circle cx="6" cy="18" r="3" stroke-width="2"/>
          <line x1="20" y1="4" x2="8.12" y2="15.88" stroke-width="2"/>
          <line x1="14.47" y1="14.48" x2="20" y2="20" stroke-width="2"/>
          <line x1="8.12" y1="8.12" x2="12" y2="12" stroke-width="2"/>
        </svg>
      </div>
      <h3 class="text-xl font-serif font-bold text-parlour-dark uppercase">No Services Configured</h3>
      <p class="text-xs text-parlour-dark/70 max-w-md mx-auto">
        Click "Add Service Package" above to introduce your first grooming treatment into the live mobile booking engine.
      </p>
    </div>

    <!-- Services Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="service in services"
        :key="service.id"
        class="bg-parlour-cream rounded-sm border border-parlour-dark/15 p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-parlour-dark shadow-sm transition-all duration-300 relative group"
      >
        <div class="space-y-4">
          <!-- Top Row Tags -->
          <div class="flex items-center justify-between gap-2">
            <span class="text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 bg-parlour-dark text-parlour-cream rounded-sm">
              {{ service.category }}
            </span>
            <span
              :class="service.isActive ? 'bg-emerald-800 text-parlour-cream' : 'bg-parlour-dark/20 text-parlour-dark/60'"
              class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm"
            >
              {{ service.isActive ? 'Active Menu' : 'Disabled' }}
            </span>
          </div>

          <!-- Service Header & Price -->
          <div>
            <div class="flex items-baseline justify-between gap-4">
              <h3 class="font-serif font-bold text-2xl text-parlour-dark group-hover:text-parlour-terracotta transition-colors">
                {{ service.title }}
              </h3>
              <span class="font-serif font-black text-2xl text-parlour-dark shrink-0">
                KES {{ service.priceKes.toLocaleString() }}
              </span>
            </div>

            <p v-if="service.subtitle" class="text-xs font-serif italic text-parlour-terracotta font-semibold mt-0.5">
              {{ service.subtitle }}
            </p>
          </div>

          <p class="text-xs text-parlour-dark/80 leading-relaxed">
            {{ service.description }}
          </p>

          <div class="pt-2 text-[11px] text-parlour-dark/60 flex flex-wrap gap-4">
            <span class="font-medium flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>{{ service.durationMinutes }} Minutes</span>
            </span>
            <span class="font-medium flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              <span>{{ service.targetAudience }}</span>
            </span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="pt-4 border-t border-parlour-dark/15 flex items-center justify-end gap-3">
          <button
            @click="openModal(service)"
            class="editorial-outline-btn !py-2 !px-4 text-[11px]"
          >
            Edit Package
          </button>
          <button
            @click="handleDelete(service.id!)"
            class="px-3 py-2 bg-transparent hover:bg-red-900 hover:text-parlour-cream text-red-900 text-[11px] font-bold uppercase tracking-wider border border-red-900 rounded-sm transition-all duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Editorial Create / Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 bg-parlour-dark/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-parlour-cream border border-parlour-dark rounded-sm w-full max-w-lg p-6 sm:p-8 space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div class="flex items-center justify-between border-b border-parlour-dark/15 pb-4">
          <div>
            <span class="text-[10px] font-bold tracking-[0.2em] text-parlour-terracotta uppercase block">CATALOG CONFIGURATION</span>
            <h3 class="font-serif font-black text-xl text-parlour-dark uppercase tracking-tight">
              {{ form.id ? 'Edit Service Package' : 'New Service Package' }}
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
            <label class="block font-bold uppercase tracking-wider text-[10px] text-parlour-dark/80 mb-1">Service Title *</label>
            <input
              v-model="form.title"
              required
              type="text"
              placeholder="e.g. Signature Craftsman Cut"
              class="w-full bg-parlour-card border border-parlour-dark/20 rounded-sm px-3.5 py-2.5 text-parlour-dark focus:border-parlour-dark outline-none font-medium"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-bold uppercase tracking-wider text-[10px] text-parlour-dark/80 mb-1">Subtitle / Tagline</label>
              <input
                v-model="form.subtitle"
                type="text"
                placeholder="e.g. Precision Cut & Hot Towel"
                class="w-full bg-parlour-card border border-parlour-dark/20 rounded-sm px-3.5 py-2.5 text-parlour-dark focus:border-parlour-dark outline-none font-medium"
              />
            </div>

            <div>
              <label class="block font-bold uppercase tracking-wider text-[10px] text-parlour-dark/80 mb-1">Category *</label>
              <input
                v-model="form.category"
                required
                type="text"
                placeholder="e.g. Executive Haircuts"
                class="w-full bg-parlour-card border border-parlour-dark/20 rounded-sm px-3.5 py-2.5 text-parlour-dark focus:border-parlour-dark outline-none font-medium"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-bold uppercase tracking-wider text-[10px] text-parlour-dark/80 mb-1">Price (KES) *</label>
              <input
                v-model.number="form.priceKes"
                required
                type="number"
                min="0"
                step="100"
                class="w-full bg-parlour-card border border-parlour-dark/20 rounded-sm px-3.5 py-2.5 text-parlour-dark focus:border-parlour-dark outline-none font-bold"
              />
            </div>

            <div>
              <label class="block font-bold uppercase tracking-wider text-[10px] text-parlour-dark/80 mb-1">Duration (Minutes) *</label>
              <input
                v-model.number="form.durationMinutes"
                required
                type="number"
                min="15"
                step="15"
                class="w-full bg-parlour-card border border-parlour-dark/20 rounded-sm px-3.5 py-2.5 text-parlour-dark focus:border-parlour-dark outline-none font-bold"
              />
            </div>
          </div>

          <div>
            <label class="block font-bold uppercase tracking-wider text-[10px] text-parlour-dark/80 mb-1">Target Audience</label>
            <input
              v-model="form.targetAudience"
              type="text"
              placeholder="e.g. Corporate Executives & Diplomats"
              class="w-full bg-parlour-card border border-parlour-dark/20 rounded-sm px-3.5 py-2.5 text-parlour-dark focus:border-parlour-dark outline-none font-medium"
            />
          </div>

          <div>
            <label class="block font-bold uppercase tracking-wider text-[10px] text-parlour-dark/80 mb-1">Description *</label>
            <textarea
              v-model="form.description"
              required
              rows="3"
              placeholder="Comprehensive description of the craft treatment..."
              class="w-full bg-parlour-card border border-parlour-dark/20 rounded-sm px-3.5 py-2.5 text-parlour-dark focus:border-parlour-dark outline-none leading-relaxed"
            ></textarea>
          </div>

          <div class="flex items-center gap-3 pt-2">
            <input
              v-model="form.isActive"
              id="isActiveModal"
              type="checkbox"
              class="w-4 h-4 accent-parlour-dark rounded"
            />
            <label for="isActiveModal" class="font-bold text-parlour-dark text-xs cursor-pointer">
              Active & Visible on Public Booking Engine
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
              {{ saving ? 'Saving...' : 'Save Package' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import { useAdmin, type ServiceItem } from "~/composables/useAdmin";

definePageMeta({ layout: "admin" });

const { services, loading, fetchAdminServices, saveService, deleteService } = useAdmin();

const showModal = ref(false);
const saving = ref(false);
const toastMessage = ref("");

const form = reactive<ServiceItem>({
  id: undefined,
  title: "",
  subtitle: "",
  description: "",
  durationMinutes: 45,
  priceKes: 3500,
  category: "Executive Haircuts",
  popularTag: "",
  targetAudience: "Executive Men",
  iconName: "Scissors",
  sortOrder: 1,
  isActive: true,
});

onMounted(async () => {
  await fetchAdminServices();
});

const openModal = (service?: ServiceItem) => {
  if (service) {
    Object.assign(form, service);
  } else {
    Object.assign(form, {
      id: undefined,
      title: "",
      subtitle: "",
      description: "",
      durationMinutes: 45,
      priceKes: 3500,
      category: "Executive Haircuts",
      popularTag: "",
      targetAudience: "Executive Men",
      iconName: "Scissors",
      sortOrder: services.value.length + 1,
      isActive: true,
    });
  }
  showModal.value = true;
};

const handleSubmit = async () => {
  saving.value = true;
  const success = await saveService({ ...form });
  saving.value = false;
  if (success) {
    showModal.value = false;
    toastMessage.value = form.id ? "Service updated successfully!" : "New service created!";
    setTimeout(() => (toastMessage.value = ""), 4000);
  }
};

const handleDelete = async (id: string) => {
  if (!confirm("Are you sure you want to delete this service?")) return;
  const success = await deleteService(id);
  if (success) {
    toastMessage.value = "Service deleted.";
    setTimeout(() => (toastMessage.value = ""), 4000);
  }
};
</script>
