<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <label class="block text-xs font-bold uppercase tracking-widest text-parlour-dark">2. SELECT NAIROBI NEIGHBORHOOD ZONE</label>
      <span class="text-[10px] font-bold text-parlour-dark/60 uppercase">UBER LOGISTICS BATCHING</span>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div
        v-for="zone in NAIROBI_ZONES"
        :key="zone.id"
        @click="$emit('update:modelValue', zone.id)"
        :class="[
          'p-4 border transition-all cursor-pointer text-left relative flex flex-col justify-between',
          modelValue === zone.id
            ? 'bg-parlour-dark text-parlour-cream border-parlour-dark shadow-md'
            : 'bg-parlour-card text-parlour-dark border-parlour-dark/30 hover:border-parlour-dark'
        ]"
      >
        <div>
          <div class="flex items-center justify-between mb-1">
            <span class="font-serif font-bold text-sm uppercase">{{ zone.name }}</span>
            <span
              :class="[
                'text-[10px] font-bold px-2 py-0.5 uppercase',
                modelValue === zone.id ? 'bg-parlour-cream text-parlour-dark' : 'bg-parlour-dark text-parlour-cream'
              ]"
            >
              +KES {{ zone.transportFeeKes }}
            </span>
          </div>
          <span
            :class="[
              'text-xs flex items-center gap-1.5 mb-1',
              modelValue === zone.id ? 'text-parlour-cream/80' : 'text-parlour-dark/70'
            ]"
          >
            <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <span>Batched: {{ zone.batchDays }}</span>
          </span>
        </div>

        <span
          :class="[
            'text-[10px] block italic',
            modelValue === zone.id ? 'text-parlour-cream/60' : 'text-parlour-dark/50'
          ]"
        >
          {{ zone.popularLocations }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NAIROBI_ZONES, type NairobiZone } from "~/domain/models/Booking";

defineProps<{
  modelValue: NairobiZone;
}>();

defineEmits<{
  (e: "update:modelValue", value: NairobiZone): void;
}>();
</script>
