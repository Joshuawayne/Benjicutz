<template>
  <div class="min-h-screen bg-parlour-bg text-parlour-dark font-sans flex flex-col lg:flex-row selection:bg-parlour-terracotta selection:text-parlour-cream">
    <!-- Desktop Sidebar -->
    <aside class="hidden lg:flex lg:w-72 bg-parlour-cream border-r border-parlour-dark/15 flex-col justify-between shrink-0 sticky top-0 h-screen z-30">
      <div>
        <!-- Brand Header -->
        <div class="p-6 border-b border-parlour-dark/15">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-parlour-dark text-parlour-cream rounded-sm flex items-center justify-center shadow">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="6" cy="6" r="3" stroke-width="2"/>
                <circle cx="6" cy="18" r="3" stroke-width="2"/>
                <line x1="20" y1="4" x2="8.12" y2="15.88" stroke-width="2"/>
                <line x1="14.47" y1="14.48" x2="20" y2="20" stroke-width="2"/>
                <line x1="8.12" y1="8.12" x2="12" y2="12" stroke-width="2"/>
              </svg>
            </div>
            <div>
              <span class="text-[10px] font-bold tracking-[0.25em] text-parlour-dark/60 uppercase block">EST. 2020 • NAIROBI</span>
              <h1 class="font-serif font-bold text-base tracking-tight text-parlour-dark uppercase">Craftsman CRM</h1>
            </div>
          </div>
        </div>

        <!-- Navigation Links -->
        <nav class="p-4 space-y-1.5">
          <div class="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-parlour-dark/50">
            Operations & BI
          </div>

          <NuxtLink
            to="/admin"
            class="flex items-center gap-3 px-3.5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all hover:bg-parlour-card text-parlour-dark/70 hover:text-parlour-dark border border-transparent"
            active-class="!bg-parlour-dark !text-parlour-cream !border-parlour-dark shadow-sm"
          >
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
            <span>Analytics BI</span>
          </NuxtLink>

          <NuxtLink
            to="/admin/bookings"
            class="flex items-center gap-3 px-3.5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all hover:bg-parlour-card text-parlour-dark/70 hover:text-parlour-dark border border-transparent"
            active-class="!bg-parlour-dark !text-parlour-cream !border-parlour-dark shadow-sm"
          >
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <span>Bookings & Dispatch</span>
          </NuxtLink>

          <NuxtLink
            to="/admin/clients"
            class="flex items-center gap-3 px-3.5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all hover:bg-parlour-card text-parlour-dark/70 hover:text-parlour-dark border border-transparent"
            active-class="!bg-parlour-dark !text-parlour-cream !border-parlour-dark shadow-sm"
          >
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
            <span>Client CRM</span>
          </NuxtLink>

          <div class="px-3 pt-5 pb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-parlour-dark/50">
            Catalog & Business
          </div>

          <NuxtLink
            to="/admin/services"
            class="flex items-center gap-3 px-3.5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all hover:bg-parlour-card text-parlour-dark/70 hover:text-parlour-dark border border-transparent"
            active-class="!bg-parlour-dark !text-parlour-cream !border-parlour-dark shadow-sm"
          >
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="6" cy="6" r="3" stroke-width="2"/>
              <circle cx="6" cy="18" r="3" stroke-width="2"/>
              <line x1="20" y1="4" x2="8.12" y2="15.88" stroke-width="2"/>
              <line x1="14.47" y1="14.48" x2="20" y2="20" stroke-width="2"/>
              <line x1="8.12" y1="8.12" x2="12" y2="12" stroke-width="2"/>
            </svg>
            <span>Service Menu</span>
          </NuxtLink>

          <NuxtLink
            to="/admin/retainers"
            class="flex items-center gap-3 px-3.5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all hover:bg-parlour-card text-parlour-dark/70 hover:text-parlour-dark border border-transparent"
            active-class="!bg-parlour-dark !text-parlour-cream !border-parlour-dark shadow-sm"
          >
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 3h12l4 6-10 12L2 9l4-6z"/>
            </svg>
            <span>VIP Retainers</span>
          </NuxtLink>

          <NuxtLink
            to="/admin/settings"
            class="flex items-center gap-3 px-3.5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all hover:bg-parlour-card text-parlour-dark/70 hover:text-parlour-dark border border-transparent"
            active-class="!bg-parlour-dark !text-parlour-cream !border-parlour-dark shadow-sm"
          >
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span>Settings</span>
          </NuxtLink>
        </nav>
      </div>

      <!-- Footer & Public Link -->
      <div class="p-4 border-t border-parlour-dark/15 space-y-2">
        <button
          type="button"
          @click="handleLogout"
          class="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold uppercase tracking-wider text-red-900 bg-red-50 hover:bg-red-900 hover:text-white rounded-sm border border-red-900/20 transition-all duration-300 cursor-pointer shadow-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          <span>Sign Out</span>
        </button>

        <NuxtLink
          to="/"
          class="flex items-center justify-center gap-2 w-full py-2 text-xs font-bold uppercase tracking-wider text-parlour-dark/70 hover:text-parlour-dark bg-transparent hover:bg-parlour-card rounded-sm border border-parlour-dark/20 transition-all duration-300"
        >
          <span>← Client Portal</span>
        </NuxtLink>
      </div>
    </aside>


    <!-- Mobile Top Navigation Bar -->
    <header class="lg:hidden bg-parlour-cream border-b border-parlour-dark/15 sticky top-0 z-40 px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <button
          @click="mobileDrawerOpen = !mobileDrawerOpen"
          class="p-2 border border-parlour-dark/20 rounded-sm hover:bg-parlour-card text-parlour-dark"
          aria-label="Toggle Menu"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        <div>
          <span class="font-serif font-bold text-sm text-parlour-dark uppercase tracking-tight block">Craftsman CRM</span>
          <span class="text-[9px] font-bold tracking-widest text-parlour-terracotta uppercase">Nairobi Executive</span>
        </div>
      </div>

      <NuxtLink
        to="/"
        class="text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 border border-parlour-dark rounded-sm text-parlour-dark hover:bg-parlour-dark hover:text-parlour-cream transition-colors"
      >
        Website
      </NuxtLink>
    </header>

    <!-- Mobile Slide-Over Drawer -->
    <div
      v-if="mobileDrawerOpen"
      class="fixed inset-0 z-50 lg:hidden flex"
    >
      <!-- Backdrop -->
      <div @click="mobileDrawerOpen = false" class="fixed inset-0 bg-parlour-dark/60 backdrop-blur-sm"></div>

      <!-- Drawer Content -->
      <div class="relative w-4/5 max-w-xs bg-parlour-cream h-full border-r border-parlour-dark/20 p-5 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
        <div class="space-y-6">
          <div class="flex items-center justify-between pb-4 border-b border-parlour-dark/15">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-parlour-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="6" cy="6" r="3" stroke-width="2"/>
                <circle cx="6" cy="18" r="3" stroke-width="2"/>
                <line x1="20" y1="4" x2="8.12" y2="15.88" stroke-width="2"/>
                <line x1="14.47" y1="14.48" x2="20" y2="20" stroke-width="2"/>
                <line x1="8.12" y1="8.12" x2="12" y2="12" stroke-width="2"/>
              </svg>
              <span class="font-serif font-bold text-base uppercase">Menu</span>
            </div>
            <button @click="mobileDrawerOpen = false" class="p-1 font-bold text-base text-parlour-dark/70 hover:text-parlour-dark">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <nav class="space-y-2">
            <NuxtLink
              @click="mobileDrawerOpen = false"
              to="/admin"
              class="flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider text-parlour-dark hover:bg-parlour-card"
              active-class="!bg-parlour-dark !text-parlour-cream"
            >
              <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
              <span>Analytics BI</span>
            </NuxtLink>
            <NuxtLink
              @click="mobileDrawerOpen = false"
              to="/admin/bookings"
              class="flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider text-parlour-dark hover:bg-parlour-card"
              active-class="!bg-parlour-dark !text-parlour-cream"
            >
              <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <span>Bookings & Dispatch</span>
            </NuxtLink>
            <NuxtLink
              @click="mobileDrawerOpen = false"
              to="/admin/clients"
              class="flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider text-parlour-dark hover:bg-parlour-card"
              active-class="!bg-parlour-dark !text-parlour-cream"
            >
              <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
              <span>Client CRM</span>
            </NuxtLink>
            <NuxtLink
              @click="mobileDrawerOpen = false"
              to="/admin/services"
              class="flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider text-parlour-dark hover:bg-parlour-card"
              active-class="!bg-parlour-dark !text-parlour-cream"
            >
              <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="6" cy="6" r="3" stroke-width="2"/>
                <circle cx="6" cy="18" r="3" stroke-width="2"/>
                <line x1="20" y1="4" x2="8.12" y2="15.88" stroke-width="2"/>
                <line x1="14.47" y1="14.48" x2="20" y2="20" stroke-width="2"/>
                <line x1="8.12" y1="8.12" x2="12" y2="12" stroke-width="2"/>
              </svg>
              <span>Service Menu</span>
            </NuxtLink>
            <NuxtLink
              @click="mobileDrawerOpen = false"
              to="/admin/retainers"
              class="flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider text-parlour-dark hover:bg-parlour-card"
              active-class="!bg-parlour-dark !text-parlour-cream"
            >
              <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 3h12l4 6-10 12L2 9l4-6z"/>
              </svg>
              <span>VIP Retainers</span>
            </NuxtLink>
            <NuxtLink
              @click="mobileDrawerOpen = false"
              to="/admin/settings"
              class="flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider text-parlour-dark hover:bg-parlour-card"
              active-class="!bg-parlour-dark !text-parlour-cream"
            >
              <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>Settings</span>
            </NuxtLink>
          </nav>
        </div>

        <div class="pt-6 border-t border-parlour-dark/15 space-y-2">
          <button
            type="button"
            @click="handleLogout"
            class="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold uppercase tracking-wider text-red-900 bg-red-100 hover:bg-red-900 hover:text-white rounded-sm border border-red-900/20"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            <span>Sign Out</span>
          </button>

          <NuxtLink
            to="/"
            class="block w-full text-center py-2 text-xs font-bold uppercase tracking-wider bg-parlour-dark text-parlour-cream rounded-sm"
          >
            ← Client Portal
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex-grow flex flex-col min-w-0 pb-16 lg:pb-0">
      <!-- Desktop Top Status Header -->
      <header class="hidden lg:flex h-16 bg-parlour-cream/80 backdrop-blur border-b border-parlour-dark/15 px-8 items-center justify-between sticky top-0 z-20">
        <div class="flex items-center gap-3">
          <span class="text-xs font-serif font-bold uppercase tracking-wider text-parlour-dark">Nairobi Master Craftsman Operating Suite</span>
        </div>

        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2.5 px-3.5 py-1.5 bg-parlour-card border border-parlour-dark/15 rounded-sm">
            <div class="w-6 h-6 rounded-sm bg-parlour-dark text-parlour-cream flex items-center justify-center font-bold text-[10px]">
              {{ adminInitials }}
            </div>
            <div class="text-left">
              <span class="text-xs font-bold text-parlour-dark block leading-none">{{ adminDisplayName }}</span>
              <span class="text-[9px] font-semibold text-parlour-terracotta block leading-tight">Administrator</span>
            </div>
          </div>

          <button
            type="button"
            @click="handleLogout"
            class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-red-900 bg-red-50 hover:bg-red-900 hover:text-white rounded-sm border border-red-900/20 transition-all duration-300 cursor-pointer shadow-sm"
            title="Sign out"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      <!-- Main Slot Content -->
      <main class="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute, useRuntimeConfig } from "#imports";

const router = useRouter();
const route = useRoute();
const config = useRuntimeConfig();
const apiBase = config.public.apiBase !== undefined ? config.public.apiBase : "";

const mobileDrawerOpen = ref(false);
const adminUser = ref<{ name?: string; email?: string; id?: string } | null>(null);

onMounted(async () => {
  // 1. Load from localStorage cache immediately (instant display)
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("admin_user");
    if (stored) {
      try { adminUser.value = JSON.parse(stored); } catch {}
    }
  }

  // 2. Fetch fresh profile from server (syncs across devices)
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
  if (token) {
    try {
      const res = await fetch(`${apiBase}/api/v1/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const profile = await res.json();
        const updated = {
          ...(adminUser.value || {}),
          name: profile.name || adminUser.value?.name || "",
          email: profile.email || adminUser.value?.email || "",
        };
        adminUser.value = updated;
        // Update cache
        if (typeof window !== "undefined") {
          localStorage.setItem("admin_user", JSON.stringify(updated));
        }
      }
    } catch {
      // Non-critical — keep showing cached value
    }
  }
});

const adminDisplayName = computed(() => {
  if (adminUser.value?.name) return adminUser.value.name;
  if (adminUser.value?.email) {
    const parts = adminUser.value.email.split("@")[0].split(".");
    return parts.map((p: string) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
  }
  return "Admin";
});

const adminInitials = computed(() => {
  const name = adminDisplayName.value;
  const words = name.split(" ").filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
});

const handleLogout = async () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
  if (typeof window !== "undefined") {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
  }
  try {
    if (token) {
      await fetch(`${apiBase}/api/v1/auth/logout`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }).catch(() => {});
    }
  } catch {
    // Ignore network error during logout
  }
  // Redirect to login with current path as redirect target
  const currentPath = route.fullPath;
  router.push(`/admin/login${currentPath !== '/admin/login' ? '?redirect=' + encodeURIComponent(currentPath) : ''}`);
};
</script>