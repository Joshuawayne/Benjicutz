<template>
  <div class="space-y-8 max-w-7xl mx-auto">
    <!-- Header -->
    <div class="border-b border-parlour-dark/15 pb-6">
      <span class="text-[10px] font-bold tracking-[0.25em] text-parlour-terracotta uppercase block mb-1">
        CRAFTSMAN HEADQUARTERS • NAIROBI
      </span>
      <h1 class="text-3xl sm:text-4xl font-serif font-black text-parlour-dark tracking-tight uppercase">
        Business Intelligence & CRM
      </h1>
      <p class="text-parlour-dark/70 text-xs sm:text-sm mt-1 max-w-2xl">
        Real-time revenue metrics, client cadence tracking, and automated 12-day retention dispatch for mobile studio operations.
      </p>
    </div>

    <!-- Analytics Overview Component -->
    <AnalyticsOverview :metrics="metrics" @trigger-reminders="handleTriggerReminders" />

    <!-- Trigger Toast Notification -->
    <div v-if="toastMessage" class="p-4 bg-parlour-dark text-parlour-cream font-serif text-xs font-bold rounded-sm shadow-xl flex items-center justify-between border border-parlour-dark">
      <div class="flex items-center gap-2">
        <svg class="w-4 h-4 text-parlour-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <span>{{ toastMessage }}</span>
      </div>
      <button @click="toastMessage = ''" class="text-parlour-terracotta font-bold">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import AnalyticsOverview from "~/components/admin/AnalyticsOverview.vue";
import { useAnalytics } from "~/composables/useAnalytics";

definePageMeta({
  layout: "admin",
});

const { metrics, fetchMetrics, triggerReminders } = useAnalytics();
const toastMessage = ref("");

onMounted(async () => {
  await fetchMetrics();
});

const handleTriggerReminders = async () => {
  const res = await triggerReminders();
  toastMessage.value = `${res.message} (${res.remindersSentCount} notifications dispatched)`;
  setTimeout(() => {
    toastMessage.value = "";
  }, 5000);
};
</script>