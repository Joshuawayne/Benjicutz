<template>
  <div class="bg-parlour-cream p-6 md:p-12 border-2 border-parlour-dark shadow-2xl max-w-4xl mx-auto space-y-8">
    <div class="text-center space-y-2 border-b border-parlour-dark/15 pb-6">
      <span class="text-[10px] font-bold tracking-[0.3em] uppercase text-parlour-dark/60">CONCIERGE MOBILE RESERVATION</span>
      <h2 class="text-3xl sm:text-5xl font-serif font-black uppercase text-parlour-dark">
        RESERVE MASTER HOUSE CALL
      </h2>
      <p class="text-xs text-parlour-dark/70 max-w-md mx-auto">
        Direct-to-door high-precision grooming delivered to your residence or penthouse suite across Nairobi.
      </p>
    </div>

    <!-- Step 1: Select Service -->
    <div class="space-y-4">
      <label class="block text-xs font-bold uppercase tracking-widest text-parlour-dark">1. SELECT CRAFTSMAN SERVICE</label>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="service in NAIROBI_SERVICES"
          :key="service.id"
          @click="selectedServiceId = service.id"
          :class="[
            'p-5 border transition-all cursor-pointer flex flex-col justify-between',
            selectedServiceId === service.id
              ? 'bg-parlour-dark text-parlour-cream border-parlour-dark shadow-lg'
              : 'bg-parlour-card text-parlour-dark border-parlour-dark/20 hover:border-parlour-dark'
          ]"
        >
          <div>
            <div class="flex items-center justify-between mb-1">
              <span class="font-serif font-bold text-sm uppercase">{{ service.title }}</span>
              <span
                v-if="service.popularTag"
                :class="[
                  'text-[9px] font-bold px-2 py-0.5 uppercase',
                  selectedServiceId === service.id ? 'bg-parlour-cream text-parlour-dark' : 'bg-parlour-dark text-parlour-cream'
                ]"
              >
                {{ service.popularTag }}
              </span>
            </div>
            <p :class="['text-xs leading-relaxed mb-4', selectedServiceId === service.id ? 'text-parlour-cream/80' : 'text-parlour-dark/70']">
              {{ service.description }}
            </p>
          </div>
          <div class="flex items-center justify-between border-t border-current/20 pt-3 text-xs font-bold">
            <span class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>{{ service.durationMinutes }} MINS</span>
            </span>
            <span class="font-serif text-sm">KES {{ service.priceKes.toLocaleString() }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 2: Select Neighborhood Zone -->
    <div class="pt-6 border-t border-parlour-dark/15">
      <ZoneBatchingPicker v-model="selectedZone" />
    </div>

    <!-- Step 3: Date & Time Picker -->
    <div class="pt-6 border-t border-parlour-dark/15 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label class="block text-xs font-bold uppercase tracking-widest text-parlour-dark mb-2">APPOINTMENT DATE</label>
        <input
          type="date"
          v-model="selectedDate"
          class="w-full bg-parlour-card border border-parlour-dark/40 px-4 py-3 text-xs text-parlour-dark font-bold outline-none"
        />
      </div>
      <div>
        <label class="block text-xs font-bold uppercase tracking-widest text-parlour-dark mb-2">TIME SLOT</label>
        <select
          v-model="selectedTime"
          class="w-full bg-parlour-card border border-parlour-dark/40 px-4 py-3 text-xs text-parlour-dark font-bold outline-none"
        >
          <option value="08:00">08:00 AM (Early Executive Slot)</option>
          <option value="10:00">10:00 AM</option>
          <option value="12:30">12:30 PM (Midday Session)</option>
          <option value="15:00">03:00 PM</option>
          <option value="17:30">05:30 PM (Evening House-Call)</option>
        </select>
      </div>
    </div>

    <!-- Step 4: Contact & Location Form -->
    <div class="pt-6 border-t border-parlour-dark/15 space-y-4">
      <label class="block text-xs font-bold uppercase tracking-widest text-parlour-dark">CLIENT & DELIVERY ADDRESS</label>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          v-model="formData.clientName"
          placeholder="Client Name (e.g. David Omondi)"
          class="bg-parlour-card border border-parlour-dark/40 px-4 py-3 text-xs text-parlour-dark outline-none font-semibold"
        />
        <input
          type="tel"
          v-model="formData.clientPhone"
          placeholder="WhatsApp Phone Number (+254...)"
          class="bg-parlour-card border border-parlour-dark/40 px-4 py-3 text-xs text-parlour-dark outline-none font-semibold"
        />
      </div>
      <input
        type="text"
        v-model="formData.locationAddress"
        placeholder="Specific House / Apt / Penthouse Address (e.g. Mandera Rd, Kileleshwa, Apt 4B)"
        class="w-full bg-parlour-card border border-parlour-dark/40 px-4 py-3 text-xs text-parlour-dark outline-none font-semibold"
      />
    </div>

    <!-- Price Summary & WhatsApp Action -->
    <div class="p-6 bg-parlour-card border border-parlour-dark/30 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div>
        <span class="text-[10px] font-bold uppercase tracking-widest text-parlour-dark/60 block">TOTAL INVESTMENT:</span>
        <span class="text-3xl font-serif font-black text-parlour-dark">
          KES {{ totalPrice.toLocaleString() }}
        </span>
        <span class="text-[10px] block font-semibold text-parlour-dark/70">
          (KES {{ selectedService.priceKes.toLocaleString() }} service + KES {{ selectedZoneDetail.transportFeeKes }} {{ selectedZoneDetail.name }} Uber dispatch)
        </span>
      </div>

      <button
        @click="handleBookingSubmit"
        :disabled="isSubmitting || !formData.clientName || !formData.clientPhone || !formData.locationAddress"
        class="w-full sm:w-auto editorial-btn px-8 py-4 inline-flex items-center gap-2"
      >
        <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
        <span>CONFIRM & DISPATCH VIA WHATSAPP</span>
      </button>
    </div>

    <div v-if="bookingResult" class="p-4 bg-parlour-dark text-parlour-cream text-xs space-y-2">
      <p class="font-bold flex items-center gap-2">
        <svg class="w-4 h-4 text-parlour-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <span>Booking Request Generated!</span>
      </p>
      <a
        :href="bookingResult.waUrl"
        target="_blank"
        class="inline-block underline font-bold"
      >
        Click here if WhatsApp didn't open automatically →
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { NAIROBI_SERVICES } from "~/domain/models/Service";
import { useBooking } from "~/composables/useBooking";

const {
  selectedZone,
  selectedServiceId,
  selectedDate,
  selectedTime,
  selectedService,
  selectedZoneDetail,
  totalPrice,
  isSubmitting,
  submitBooking,
} = useBooking();

const formData = reactive({
  clientName: "",
  clientPhone: "",
  clientEmail: "",
  locationAddress: "",
});

const bookingResult = ref<{ success: boolean; waUrl: string } | null>(null);

const handleBookingSubmit = async () => {
  const result = await submitBooking(formData);
  bookingResult.value = { success: result.success, waUrl: result.waUrl };
  window.open(result.waUrl, "_blank");
};
</script>
