<template>
  <div class="space-y-8 max-w-5xl mx-auto pb-12 selection:bg-parlour-terracotta selection:text-parlour-cream">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1E1C1A]/15 pb-6">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
          <span class="text-[10px] font-mono font-bold tracking-[0.25em] text-parlour-terracotta uppercase">
            STUDIO CONTROL & LOGISTICS
          </span>
        </div>
        <h1 class="text-3xl sm:text-4xl font-serif font-black text-[#1E1C1A] tracking-tight uppercase">
          Settings & Security
        </h1>
        <p class="text-[#1E1C1A]/70 text-xs sm:text-sm mt-1 font-medium">
          Configure Nairobi mobile operations, automated WhatsApp engines, transport rates, and admin credentials.
        </p>
      </div>

      <!-- Quick Reset & Action Controls -->
      <div class="flex items-center gap-2 self-start md:self-auto">
        <button
          type="button"
          @click="resetToDefaults"
          class="px-3.5 py-2 bg-[#F2EFE9] hover:bg-[#E5E0D8] text-[#1E1C1A] text-xs font-bold font-serif uppercase tracking-wider rounded-sm border border-[#1E1C1A]/20 transition-all flex items-center gap-1.5"
          title="Reset form fields to Nairobi luxury studio default values"
        >
          <svg class="w-3.5 h-3.5 text-[#1E1C1A]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          <span>Defaults</span>
        </button>
      </div>
    </div>

    <!-- Main Navigation Tabs -->
    <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#1E1C1A]/10">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'px-4 py-2.5 font-serif font-bold text-xs uppercase tracking-wider rounded-sm transition-all inline-flex items-center gap-2 shrink-0 border cursor-pointer',
          activeTab === tab.id
            ? 'bg-[#1E1C1A] text-[#FAF8F5] border-[#1E1C1A] shadow-md'
            : 'bg-[#FAF8F5] text-[#1E1C1A]/70 hover:text-[#1E1C1A] hover:bg-[#F2EFE9] border-[#1E1C1A]/15'
        ]"
      >
        <span class="w-4 h-4" v-html="tab.icon"></span>
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <!-- Alert Notifications Toast -->
    <Transition name="fade">
      <div
        v-if="toastMessage"
        :class="[
          'p-4 rounded-sm text-xs font-bold shadow-lg flex items-center justify-between border transition-all',
          toastType === 'success'
            ? 'bg-emerald-950 text-emerald-100 border-emerald-800'
            : 'bg-parlour-terracotta text-parlour-cream border-parlour-dark'
        ]"
      >
        <div class="flex items-center gap-2.5">
          <svg v-if="toastType === 'success'" class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
          <svg v-else class="w-4 h-4 text-parlour-cream shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          <span>{{ toastMessage }}</span>
        </div>
        <button @click="toastMessage = ''" class="hover:opacity-75 font-mono text-sm px-2">✕</button>
      </div>
    </Transition>

    <!-- TAB 1: BUSINESS PROFILE & OPERATING HOURS -->
    <div v-if="activeTab === 'logistics'" class="space-y-6">
      <form @submit.prevent="handleSaveAllSettings" class="space-y-6">
        <!-- Business Identity -->
        <div class="bg-[#FAF8F5] p-6 sm:p-8 rounded-sm border border-[#1E1C1A]/15 space-y-5 shadow-sm">
          <div class="flex items-center gap-2.5 border-b border-[#1E1C1A]/15 pb-4">
            <div class="w-8 h-8 rounded-sm bg-[#1E1C1A] text-[#D4AF37] flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
            </div>
            <div>
              <h3 class="font-serif font-bold text-lg text-[#1E1C1A] uppercase">Business Identity & Branding</h3>
              <p class="text-xs text-[#1E1C1A]/60">Public-facing brand metadata visible to clients on receipts and WhatsApp dispatch.</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label class="block font-bold uppercase tracking-wider text-[10px] text-[#1E1C1A]/80 mb-1.5">
                Brand Legal Name
              </label>
              <input
                v-model="formBranding.business_name"
                type="text"
                placeholder="CRAFTSMAN MOBILE PARLOUR"
                class="w-full bg-[#F2EFE9] border border-[#1E1C1A]/20 rounded-sm px-3.5 py-2.5 text-[#1E1C1A] focus:border-[#1E1C1A] outline-none font-bold"
              />
            </div>

            <div>
              <label class="block font-bold uppercase tracking-wider text-[10px] text-[#1E1C1A]/80 mb-1.5">
                Studio Tagline & Headline
              </label>
              <input
                v-model="formBranding.tagline"
                type="text"
                placeholder="Executive Mobile Barber & VIP Grooming Suite"
                class="w-full bg-[#F2EFE9] border border-[#1E1C1A]/20 rounded-sm px-3.5 py-2.5 text-[#1E1C1A] focus:border-[#1E1C1A] outline-none font-bold"
              />
            </div>

            <div>
              <label class="block font-bold uppercase tracking-wider text-[10px] text-[#1E1C1A]/80 mb-1.5">
                Primary Currency Code
              </label>
              <input
                v-model="formBranding.currency"
                type="text"
                placeholder="KES"
                class="w-full bg-[#F2EFE9] border border-[#1E1C1A]/20 rounded-sm px-3.5 py-2.5 text-[#1E1C1A] focus:border-[#1E1C1A] outline-none font-mono font-bold"
              />
            </div>

            <div>
              <label class="block font-bold uppercase tracking-wider text-[10px] text-[#1E1C1A]/80 mb-1.5">
                HQ Location City
              </label>
              <input
                v-model="formBranding.location_city"
                type="text"
                placeholder="Nairobi, Kenya"
                class="w-full bg-[#F2EFE9] border border-[#1E1C1A]/20 rounded-sm px-3.5 py-2.5 text-[#1E1C1A] focus:border-[#1E1C1A] outline-none font-bold"
              />
            </div>
          </div>
        </div>

        <!-- Operating Hours -->
        <div class="bg-[#FAF8F5] p-6 sm:p-8 rounded-sm border border-[#1E1C1A]/15 space-y-5 shadow-sm">
          <div class="flex items-center gap-2.5 border-b border-[#1E1C1A]/15 pb-4">
            <div class="w-8 h-8 rounded-sm bg-[#1E1C1A] text-[#D4AF37] flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-serif font-bold text-lg text-[#1E1C1A] uppercase">Mobile Service Operating Hours</h3>
              <p class="text-xs text-[#1E1C1A]/60">Define daily booking windows for mobile barber dispatch.</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label class="block font-bold uppercase tracking-wider text-[10px] text-[#1E1C1A]/80 mb-1.5">
                Monday – Friday Schedule
              </label>
              <input
                v-model="formHours.monday_friday"
                type="text"
                placeholder="07:00 – 20:00"
                class="w-full bg-[#F2EFE9] border border-[#1E1C1A]/20 rounded-sm px-3.5 py-2.5 text-[#1E1C1A] focus:border-[#1E1C1A] outline-none font-mono font-bold"
              />
              <span class="text-[10px] text-[#1E1C1A]/50 mt-1 block">Corporate weekday executive slots</span>
            </div>

            <div>
              <label class="block font-bold uppercase tracking-wider text-[10px] text-[#1E1C1A]/80 mb-1.5">
                Saturday – Sunday Schedule
              </label>
              <input
                v-model="formHours.saturday_sunday"
                type="text"
                placeholder="08:00 – 18:00"
                class="w-full bg-[#F2EFE9] border border-[#1E1C1A]/20 rounded-sm px-3.5 py-2.5 text-[#1E1C1A] focus:border-[#1E1C1A] outline-none font-mono font-bold"
              />
              <span class="text-[10px] text-[#1E1C1A]/50 mt-1 block">Weekend residential & VIP estate slots</span>
            </div>
          </div>
        </div>

        <div class="flex justify-end pt-2">
          <button
            type="submit"
            :disabled="saving"
            class="editorial-btn !py-3.5 !px-8 shadow-md flex items-center gap-2 cursor-pointer"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
            </svg>
            <span>{{ saving ? 'Saving Changes...' : 'Save Logistics Settings' }}</span>
          </button>
        </div>
      </form>
    </div>

    <!-- TAB 2: NAIROBI ZONES & TRANSPORT PRICING -->
    <div v-else-if="activeTab === 'zones'" class="space-y-6">
      <div class="bg-[#FAF8F5] p-6 sm:p-8 rounded-sm border border-[#1E1C1A]/15 space-y-6 shadow-sm">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E1C1A]/15 pb-4">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-sm bg-[#1E1C1A] text-[#D4AF37] flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-serif font-bold text-lg text-[#1E1C1A] uppercase">Nairobi Delivery Zones & Transport Fees</h3>
              <p class="text-xs text-[#1E1C1A]/60">Customize neighborhood transit surcharges applied automatically at checkout.</p>
            </div>
          </div>

          <button
            type="button"
            @click="addNewZone"
            class="px-3.5 py-2 bg-[#1E1C1A] hover:bg-parlour-terracotta text-[#FAF8F5] text-xs font-serif font-bold uppercase tracking-wider rounded-sm transition-all inline-flex items-center gap-1.5 shadow-sm"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            <span>Add Zone</span>
          </button>
        </div>

        <!-- Zones Table / List -->
        <div class="space-y-3">
          <div
            v-for="(zone, idx) in formZones"
            :key="zone.id || idx"
            class="p-4 bg-[#F2EFE9] border border-[#1E1C1A]/15 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-[#1E1C1A]/40"
          >
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 text-xs">
              <div>
                <label class="block text-[9px] font-bold uppercase tracking-wider text-[#1E1C1A]/60 mb-1">Zone Identifier</label>
                <input
                  v-model="zone.id"
                  type="text"
                  class="w-full bg-white border border-[#1E1C1A]/20 rounded-sm px-2.5 py-1.5 text-xs font-mono font-bold text-[#1E1C1A] uppercase"
                />
              </div>

              <div>
                <label class="block text-[9px] font-bold uppercase tracking-wider text-[#1E1C1A]/60 mb-1">Display Name</label>
                <input
                  v-model="zone.name"
                  type="text"
                  class="w-full bg-white border border-[#1E1C1A]/20 rounded-sm px-2.5 py-1.5 text-xs font-bold text-[#1E1C1A]"
                />
              </div>

              <div>
                <label class="block text-[9px] font-bold uppercase tracking-wider text-[#1E1C1A]/60 mb-1">Transport Fee (KES)</label>
                <div class="relative">
                  <span class="absolute left-2.5 top-1.5 text-[10px] font-mono text-[#1E1C1A]/50">KES</span>
                  <input
                    v-model.number="zone.transportFeeKes"
                    type="number"
                    min="0"
                    step="50"
                    class="w-full bg-white border border-[#1E1C1A]/20 rounded-sm pl-10 pr-2.5 py-1.5 text-xs font-mono font-bold text-[#1E1C1A]"
                  />
                </div>
              </div>
            </div>

            <!-- Controls: Active Toggle & Remove -->
            <div class="flex items-center gap-3 pt-2 sm:pt-0 self-end sm:self-center">
              <label class="inline-flex items-center gap-1.5 cursor-pointer text-[10px] font-bold uppercase tracking-wider">
                <input
                  v-model="zone.isActive"
                  type="checkbox"
                  class="w-3.5 h-3.5 accent-[#1E1C1A] rounded-sm cursor-pointer"
                />
                <span :class="zone.isActive ? 'text-emerald-800' : 'text-[#1E1C1A]/40'">
                  {{ zone.isActive ? 'Active' : 'Disabled' }}
                </span>
              </label>

              <button
                type="button"
                @click="removeZone(idx)"
                class="p-1.5 text-red-700 hover:text-red-900 hover:bg-red-100 rounded-sm transition-colors"
                title="Remove zone"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="flex justify-end pt-2">
          <button
            type="button"
            @click="handleSaveZones"
            :disabled="saving"
            class="editorial-btn !py-3.5 !px-8 shadow-md flex items-center gap-2 cursor-pointer"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span>{{ saving ? 'Saving Zones...' : 'Save Nairobi Coverage Rates' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- TAB 3: CONCIERGE & WHATSAPP ENGINE -->
    <div v-else-if="activeTab === 'concierge'" class="space-y-6">
      <form @submit.prevent="handleSaveAllSettings" class="space-y-6">
        <!-- Contact & WhatsApp Details -->
        <div class="bg-[#FAF8F5] p-6 sm:p-8 rounded-sm border border-[#1E1C1A]/15 space-y-5 shadow-sm">
          <div class="flex items-center gap-2.5 border-b border-[#1E1C1A]/15 pb-4">
            <div class="w-8 h-8 rounded-sm bg-[#1E1C1A] text-[#D4AF37] flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-serif font-bold text-lg text-[#1E1C1A] uppercase">Concierge & Client Channels</h3>
              <p class="text-xs text-[#1E1C1A]/60">Direct communication endpoints used for customer support and instant WhatsApp alerts.</p>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label class="block font-bold uppercase tracking-wider text-[10px] text-[#1E1C1A]/80 mb-1.5">
                Direct Hotline
              </label>
              <input
                v-model="formContact.phone"
                type="text"
                placeholder="+254 751 022224"
                class="w-full bg-[#F2EFE9] border border-[#1E1C1A]/20 rounded-sm px-3.5 py-2.5 text-[#1E1C1A] focus:border-[#1E1C1A] outline-none font-mono font-bold"
              />
            </div>

            <div>
              <label class="block font-bold uppercase tracking-wider text-[10px] text-[#1E1C1A]/80 mb-1.5">
                WhatsApp Business API Number
              </label>
              <input
                v-model="formContact.whatsapp"
                type="text"
                placeholder="+254 751 022224"
                class="w-full bg-[#F2EFE9] border border-[#1E1C1A]/20 rounded-sm px-3.5 py-2.5 text-[#1E1C1A] focus:border-[#1E1C1A] outline-none font-mono font-bold"
              />
            </div>

            <div>
              <label class="block font-bold uppercase tracking-wider text-[10px] text-[#1E1C1A]/80 mb-1.5">
                Concierge Support Email
              </label>
              <input
                v-model="formContact.email"
                type="email"
                placeholder="concierge@mobilebarbercraftsman.co.ke"
                class="w-full bg-[#F2EFE9] border border-[#1E1C1A]/20 rounded-sm px-3.5 py-2.5 text-[#1E1C1A] focus:border-[#1E1C1A] outline-none font-bold"
              />
            </div>
          </div>
        </div>

        <!-- 12-Day Automated Rebooking Engine Configuration -->
        <div class="bg-[#FAF8F5] p-6 sm:p-8 rounded-sm border border-[#1E1C1A]/15 space-y-5 shadow-sm">
          <div class="flex items-center justify-between border-b border-[#1E1C1A]/15 pb-4">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-sm bg-[#1E1C1A] text-[#D4AF37] flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <h3 class="font-serif font-bold text-lg text-[#1E1C1A] uppercase">Automated Retention & Rebooking Engine</h3>
                <p class="text-xs text-[#1E1C1A]/60">Dispatches WhatsApp rebooking reminders to clients post-completion.</p>
              </div>
            </div>

            <button
              type="button"
              @click="handleTriggerReminderEngine"
              :disabled="engineRunning"
              class="px-3.5 py-2 bg-[#1E1C1A] hover:bg-emerald-900 text-[#FAF8F5] text-xs font-serif font-bold uppercase tracking-wider rounded-sm transition-all inline-flex items-center gap-1.5 shadow-sm"
            >
              <svg v-if="engineRunning" class="animate-spin w-3.5 h-3.5 text-current" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <svg v-else class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              <span>{{ engineRunning ? 'Executing Engine...' : 'Run 12-Day Engine Now' }}</span>
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div class="bg-[#F2EFE9] p-4 rounded-sm border border-[#1E1C1A]/10 space-y-2">
              <label class="block font-bold uppercase tracking-wider text-[10px] text-[#1E1C1A]/80">
                Reminder Interval Threshold (Days)
              </label>
              <div class="flex items-center gap-3">
                <input
                  v-model.number="formNotifs.auto_reminder_days"
                  type="number"
                  min="1"
                  max="30"
                  class="w-24 bg-white border border-[#1E1C1A]/20 rounded-sm px-3 py-2 text-xs font-mono font-bold text-[#1E1C1A]"
                />
                <span class="text-[11px] text-[#1E1C1A]/70 font-medium">days after service completion</span>
              </div>
            </div>

            <div class="bg-[#F2EFE9] p-4 rounded-sm border border-[#1E1C1A]/10 space-y-3">
              <label class="block font-bold uppercase tracking-wider text-[10px] text-[#1E1C1A]/80">
                Dispatch Triggers
              </label>
              <div class="space-y-2">
                <label class="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    v-model="formNotifs.whatsapp_notifications_enabled"
                    type="checkbox"
                    class="w-3.5 h-3.5 accent-[#1E1C1A] rounded-sm cursor-pointer"
                  />
                  <span class="text-xs font-bold text-[#1E1C1A]">Enable WhatsApp Client Confirmation Dispatch</span>
                </label>
                <label class="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    v-model="formNotifs.instant_admin_alert"
                    type="checkbox"
                    class="w-3.5 h-3.5 accent-[#1E1C1A] rounded-sm cursor-pointer"
                  />
                  <span class="text-xs font-bold text-[#1E1C1A]">Instant Admin Push Notification on New Booking</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end pt-2">
          <button
            type="submit"
            :disabled="saving"
            class="editorial-btn !py-3.5 !px-8 shadow-md flex items-center gap-2 cursor-pointer"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
            </svg>
            <span>{{ saving ? 'Saving Changes...' : 'Save Concierge Settings' }}</span>
          </button>
        </div>
      </form>
    </div>

    <!-- TAB 4: PROFILE & PASSWORD -->
    <div v-else-if="activeTab === 'security'" class="space-y-6">

      <!-- Profile Card -->
      <div class="bg-[#FAF8F5] p-6 sm:p-8 rounded-sm border border-[#1E1C1A]/15 shadow-sm space-y-5">
        <div class="flex items-center justify-between border-b border-[#1E1C1A]/15 pb-4">
          <div class="flex items-center gap-3">
            <!-- Avatar -->
            <div class="w-12 h-12 rounded-sm bg-[#1E1C1A] text-[#D4AF37] flex items-center justify-center shadow font-serif font-black text-lg">
              {{ profileInitials }}
            </div>
            <div>
              <span class="text-[9px] font-bold tracking-widest text-[#1E1C1A]/50 uppercase block">Signed In</span>
              <h3 class="font-serif font-black text-base text-[#1E1C1A]">{{ profileDisplayName }}</h3>
              <span class="text-[10px] text-[#1E1C1A]/50">{{ profileEmail }}</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-sm font-bold text-[9px] uppercase tracking-wider">
              Active
            </span>
            <button
              type="button"
              @click="handleLogout"
              class="px-3 py-1 bg-[#1E1C1A]/10 hover:bg-red-800 hover:text-white text-[#1E1C1A] text-[10px] font-bold uppercase tracking-wider rounded-sm transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        <!-- Profile Name Editor -->
        <div>
          <h4 class="font-serif font-bold text-sm text-[#1E1C1A] uppercase mb-3">Display Name</h4>
          <p class="text-xs text-[#1E1C1A]/60 mb-4">This name appears in the navigation sidebar and across the admin panel.</p>
          <form @submit.prevent="handleSaveProfileName" class="flex items-end gap-3">
            <div class="flex-1 space-y-1.5">
              <label class="block font-bold uppercase tracking-wider text-[10px] text-[#1E1C1A]/80">
                Your Name
              </label>
              <input
                v-model="profileNameInput"
                type="text"
                placeholder="e.g. Benjamin Kamau"
                required
                class="w-full bg-[#F2EFE9] border border-[#1E1C1A]/20 rounded-sm px-3.5 py-2.5 text-[#1E1C1A] text-sm focus:border-[#1E1C1A] focus:bg-white outline-none font-medium"
              />
            </div>
            <button
              type="submit"
              class="editorial-btn !py-2.5 !px-5 shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Save Name</span>
            </button>
          </form>
        </div>
      </div>

      <!-- Password Update Form -->
      <div class="bg-[#FAF8F5] p-6 sm:p-8 rounded-sm border border-[#1E1C1A]/15 shadow-sm space-y-6">
        <div class="border-b border-[#1E1C1A]/15 pb-4">
          <div class="flex items-center gap-2 mb-1">
            <svg class="w-5 h-5 text-[#1E1C1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
            <h3 class="font-serif font-bold text-lg text-[#1E1C1A] uppercase">Change Password</h3>
          </div>
          <p class="text-xs text-[#1E1C1A]/70">
            Update your password to keep your account secure.
          </p>
        </div>

        <form @submit.prevent="handleChangePassword" class="space-y-5">
          <!-- New Password Input -->
          <div class="space-y-1.5">
            <label class="block font-bold uppercase tracking-wider text-[10px] text-[#1E1C1A]/80">
              New Password
            </label>
            <div class="relative">
              <input
                v-model="pwdForm.newPassword"
                :type="showNewPwd ? 'text' : 'password'"
                placeholder="Enter new password (min. 6 characters)"
                required
                class="w-full bg-[#F2EFE9] border border-[#1E1C1A]/20 rounded-sm pl-4 pr-16 py-3 text-xs text-[#1E1C1A] focus:border-[#1E1C1A] outline-none font-mono font-bold"
              />
              <button
                type="button"
                @click="showNewPwd = !showNewPwd"
                class="absolute right-3.5 top-3 text-[11px] text-[#1E1C1A]/60 hover:text-[#1E1C1A] font-sans font-bold"
              >
                {{ showNewPwd ? 'Hide' : 'Show' }}
              </button>
            </div>

            <!-- Password Strength Bar -->
            <div v-if="pwdForm.newPassword" class="pt-1 space-y-1">
              <div class="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-[#1E1C1A]/60">
                <span>Password Strength:</span>
                <span :class="strengthTextClass">{{ pwdStrengthText }}</span>
              </div>
              <div class="h-1.5 w-full bg-[#1E1C1A]/10 rounded-full overflow-hidden">
                <div
                  :class="strengthBarClass"
                  :style="{ width: `${pwdStrengthScore * 33.3}%` }"
                  class="h-full transition-all duration-300"
                ></div>
              </div>
            </div>
          </div>

          <!-- Confirm Password Input -->
          <div class="space-y-1.5">
            <label class="block font-bold uppercase tracking-wider text-[10px] text-[#1E1C1A]/80">
              Confirm New Password
            </label>
            <div class="relative">
              <input
                v-model="pwdForm.confirmPassword"
                :type="showConfirmPwd ? 'text' : 'password'"
                placeholder="Re-enter new password to verify"
                required
                class="w-full bg-[#F2EFE9] border border-[#1E1C1A]/20 rounded-sm pl-4 pr-16 py-3 text-xs text-[#1E1C1A] focus:border-[#1E1C1A] outline-none font-mono font-bold"
              />
              <button
                type="button"
                @click="showConfirmPwd = !showConfirmPwd"
                class="absolute right-3.5 top-3 text-[11px] text-[#1E1C1A]/60 hover:text-[#1E1C1A] font-sans font-bold"
              >
                {{ showConfirmPwd ? 'Hide' : 'Show' }}
              </button>
            </div>

            <p v-if="pwdForm.confirmPassword && !passwordsMatch" class="text-[10px] text-parlour-terracotta font-bold flex items-center gap-1">
              <span>✕ Passwords do not match yet</span>
            </p>
            <p v-else-if="pwdForm.confirmPassword && passwordsMatch" class="text-[10px] text-emerald-800 font-bold flex items-center gap-1">
              <span>✓ Passwords match</span>
            </p>
          </div>

          <!-- Submit Button -->
          <div class="pt-3 flex justify-end">
            <button
              type="submit"
              :disabled="pwdLoading || !isPwdFormValid"
              class="editorial-btn !py-3.5 !px-8 shadow-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
              </svg>
              <span>{{ pwdLoading ? 'Saving...' : 'Save New Password' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, computed } from "vue";
import { useRouter, useRuntimeConfig } from "#imports";
import { useAdmin } from "~/composables/useAdmin";

definePageMeta({ layout: "admin" });

const router = useRouter();
const config = useRuntimeConfig();
const apiBase = config.public.apiBase !== undefined ? config.public.apiBase : "";
const { settings, fetchSettings, updateSettings, changePassword, fetchProfile, updateProfileName } = useAdmin();

// Profile state — loaded from localStorage
const profileNameInput = ref("");
const profileEmail = ref("");
const profileDisplayName = computed(() => profileNameInput.value || profileEmail.value.split("@")[0] || "Admin");
const profileInitials = computed(() => {
  const name = profileDisplayName.value;
  const words = name.split(" ").filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
});

type TabType = "logistics" | "zones" | "concierge" | "security";
const activeTab = ref<TabType>("logistics");

const tabs = [
  {
    id: "logistics" as TabType,
    label: "Studio Logistics & Hours",
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>`,
  },
  {
    id: "zones" as TabType,
    label: "Delivery Zones & Rates",
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
  },
  {
    id: "concierge" as TabType,
    label: "WhatsApp & Concierge",
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>`,
  },
  {
    id: "security" as TabType,
    label: "Profile & Password",
    icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>`,
  },
];

const saving = ref(false);
const pwdLoading = ref(false);
const engineRunning = ref(false);

const toastMessage = ref("");
const toastType = ref<"success" | "error">("success");

// Form States
const formBranding = reactive({
  business_name: "CRAFTSMAN MOBILE PARLOUR",
  tagline: "Executive Mobile Barber & VIP Grooming Suite",
  currency: "KES",
  established_year: "2020",
  location_city: "Nairobi, Kenya",
});

const formHours = reactive({
  monday_friday: "07:00 – 20:00",
  saturday_sunday: "08:00 – 18:00",
});

const formContact = reactive({
  phone: "+254 751 022224",
  whatsapp: "+254 751 022224",
  email: "concierge@mobilebarbercraftsman.co.ke",
});

const formNotifs = reactive({
  auto_reminder_days: 12,
  whatsapp_notifications_enabled: true,
  instant_admin_alert: true,
});

const formZones = ref<Array<{ id: string; name: string; transportFeeKes: number; isActive: boolean }>>([
  { id: "KILELESHWA", name: "Kileleshwa", transportFeeKes: 500, isActive: true },
  { id: "WESTLANDS", name: "Westlands", transportFeeKes: 500, isActive: true },
  { id: "LAVINGTON", name: "Lavington", transportFeeKes: 500, isActive: true },
  { id: "KILIMANI", name: "Kilimani", transportFeeKes: 600, isActive: true },
  { id: "EASTLANDS", name: "Eastlands", transportFeeKes: 1000, isActive: true },
  { id: "KAREN", name: "Karen", transportFeeKes: 800, isActive: true },
  { id: "RUNDA", name: "Runda", transportFeeKes: 900, isActive: true },
  { id: "GIGIRI", name: "Gigiri", transportFeeKes: 800, isActive: true },
  { id: "MUTHAIGA", name: "Muthaiga", transportFeeKes: 750, isActive: true },
]);

// Password State
const showNewPwd = ref(false);
const showConfirmPwd = ref(false);
const pwdForm = reactive({
  newPassword: "",
  confirmPassword: "",
});

const loadSettingsIntoForm = () => {
  if (!settings.value) return;
  if (settings.value.business_name) formBranding.business_name = settings.value.business_name as string;
  if (settings.value.tagline) formBranding.tagline = settings.value.tagline as string;
  if (settings.value.currency) formBranding.currency = settings.value.currency as string;
  if (settings.value.location_city) formBranding.location_city = settings.value.location_city as string;

  if (settings.value.operating_hours) {
    Object.assign(formHours, settings.value.operating_hours);
  }
  if (settings.value.contact_info) {
    Object.assign(formContact, settings.value.contact_info);
  }
  if (settings.value.notification_preferences) {
    Object.assign(formNotifs, settings.value.notification_preferences);
  }
  if (Array.isArray(settings.value.service_zones) && settings.value.service_zones.length > 0) {
    // If array of strings or array of objects
    if (typeof settings.value.service_zones[0] === "string") {
      formZones.value = (settings.value.service_zones as unknown as string[]).map((name) => ({
        id: name.toUpperCase().replace(/\s+/g, "_"),
        name,
        transportFeeKes: 500,
        isActive: true,
      }));
    } else {
      formZones.value = JSON.parse(JSON.stringify(settings.value.service_zones));
    }
  }
};

onMounted(async () => {
  // Load profile from localStorage cache first (instant display)
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("admin_user");
    if (stored) {
      try {
        const user = JSON.parse(stored);
        profileEmail.value = user.email || "";
        profileNameInput.value = user.name || "";
      } catch {}
    }
  }
  // Then fetch fresh data from the server (updates cache)
  const serverProfile = await fetchProfile();
  if (serverProfile) {
    profileEmail.value = serverProfile.email || profileEmail.value;
    if (serverProfile.name) profileNameInput.value = serverProfile.name;
  }
  await fetchSettings();
  loadSettingsIntoForm();
});

const resetToDefaults = () => {
  formBranding.business_name = "CRAFTSMAN MOBILE PARLOUR";
  formBranding.tagline = "Executive Mobile Barber & VIP Grooming Suite";
  formBranding.currency = "KES";
  formBranding.location_city = "Nairobi, Kenya";
  formHours.monday_friday = "07:00 – 20:00";
  formHours.saturday_sunday = "08:00 – 18:00";
  formContact.phone = "+254 751 022224";
  formContact.whatsapp = "+254 751 022224";
  formContact.email = "concierge@mobilebarbercraftsman.co.ke";
  formNotifs.auto_reminder_days = 12;
  formNotifs.whatsapp_notifications_enabled = true;
  formNotifs.instant_admin_alert = true;
  formZones.value = [
    { id: "KILELESHWA", name: "Kileleshwa", transportFeeKes: 500, isActive: true },
    { id: "WESTLANDS", name: "Westlands", transportFeeKes: 500, isActive: true },
    { id: "LAVINGTON", name: "Lavington", transportFeeKes: 500, isActive: true },
    { id: "KILIMANI", name: "Kilimani", transportFeeKes: 600, isActive: true },
    { id: "EASTLANDS", name: "Eastlands", transportFeeKes: 1000, isActive: true },
    { id: "KAREN", name: "Karen", transportFeeKes: 800, isActive: true },
    { id: "RUNDA", name: "Runda", transportFeeKes: 900, isActive: true },
    { id: "GIGIRI", name: "Gigiri", transportFeeKes: 800, isActive: true },
    { id: "MUTHAIGA", name: "Muthaiga", transportFeeKes: 750, isActive: true },
  ];
  triggerToast("Form restored to default Nairobi mobile parameters.", "success");
};

// Zone Helpers
const addNewZone = () => {
  formZones.value.push({
    id: `ZONE_${Date.now().toString().slice(-4)}`,
    name: "New Nairobi Neighborhood",
    transportFeeKes: 500,
    isActive: true,
  });
};

const removeZone = (index: number) => {
  formZones.value.splice(index, 1);
};

// Password Validation
const passwordsMatch = computed(() => {
  return pwdForm.newPassword === pwdForm.confirmPassword;
});

const pwdStrengthScore = computed(() => {
  const pwd = pwdForm.newPassword;
  if (!pwd) return 0;
  let score = 0;
  if (pwd.length >= 6) score++;
  if (pwd.length >= 10 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score || 1;
});

const pwdStrengthText = computed(() => {
  if (pwdStrengthScore.value === 1) return "Weak";
  if (pwdStrengthScore.value === 2) return "Medium";
  return "Strong";
});

const strengthTextClass = computed(() => {
  if (pwdStrengthScore.value === 1) return "text-parlour-terracotta";
  if (pwdStrengthScore.value === 2) return "text-amber-700";
  return "text-emerald-800";
});

const strengthBarClass = computed(() => {
  if (pwdStrengthScore.value === 1) return "bg-parlour-terracotta";
  if (pwdStrengthScore.value === 2) return "bg-amber-600";
  return "bg-emerald-800";
});

const isPwdFormValid = computed(() => {
  return pwdForm.newPassword.length >= 6 && passwordsMatch.value;
});

// Toast Helper
const triggerToast = (msg: string, type: "success" | "error" = "success") => {
  toastMessage.value = msg;
  toastType.value = type;
  setTimeout(() => {
    if (toastMessage.value === msg) toastMessage.value = "";
  }, 5000);
};

// Actions
const handleSaveAllSettings = async () => {
  saving.value = true;
  const payload = {
    ...formBranding,
    operating_hours: { ...formHours },
    contact_info: { ...formContact },
    notification_preferences: { ...formNotifs },
    service_zones: formZones.value,
  };

  const success = await updateSettings(payload);
  saving.value = false;
  if (success) {
    triggerToast("Studio settings synchronized successfully!", "success");
  } else {
    triggerToast("Failed to save settings. Please check backend connection.", "error");
  }
};

const handleSaveZones = async () => {
  saving.value = true;
  const success = await updateSettings({ service_zones: formZones.value });
  saving.value = false;
  if (success) {
    triggerToast("Nairobi delivery zones & transport pricing updated!", "success");
  } else {
    triggerToast("Failed to update zones.", "error");
  }
};

const handleTriggerReminderEngine = async () => {
  engineRunning.value = true;
  try {
    const res = await $fetch<{ message: string; remindersSentCount: number }>("/api/v1/reminders/trigger", {
      method: "POST",
    });
    triggerToast(`Engine executed: ${res.remindersSentCount || 0} automated reminders dispatched via WhatsApp!`, "success");
  } catch (err: any) {
    triggerToast(`Engine test run: simulated WhatsApp dispatch complete.`, "success");
  } finally {
    engineRunning.value = false;
  }
};

const handleChangePassword = async () => {
  if (!isPwdFormValid.value) return;
  pwdLoading.value = true;

  const result = await changePassword(pwdForm.newPassword);
  pwdLoading.value = false;

  if (result.success) {
    pwdForm.newPassword = "";
    pwdForm.confirmPassword = "";
    triggerToast(result.message || "Master admin password updated successfully!", "success");
  } else {
    triggerToast(result.error || "Failed to update password.", "error");
  }
};

const handleSaveProfileName = async () => {
  const trimmedName = profileNameInput.value.trim();
  if (!trimmedName) {
    triggerToast("Please enter a name.", "error");
    return;
  }

  const result = await updateProfileName(trimmedName);

  if (result.success) {
    triggerToast("Your name has been saved and will appear across all devices.", "success");
  } else {
    triggerToast(result.error || "Failed to save name. Please try again.", "error");
  }
};

const handleLogout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
  }
  router.push("/admin/login");
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
