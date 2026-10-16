<template>
  <div class="min-h-screen bg-[#121110] flex selection:bg-parlour-terracotta selection:text-parlour-cream">

    <!-- LEFT PANEL — Editorial Image -->
    <div class="hidden lg:flex lg:w-[55%] relative overflow-hidden">
      <!-- Hero Image -->
      <img
        src="/images/admin_login_hero.jpg"
        alt="Master Craftsman at work"
        class="absolute inset-0 w-full h-full object-cover object-center"
      />
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-[#121110]/80 via-[#121110]/30 to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-[#121110]/60 via-transparent to-transparent"></div>

      <!-- Brand Stamp -->
      <div class="relative z-10 flex flex-col justify-between p-10 w-full">
        <!-- Top Logo -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-[#D4AF37] rounded-sm flex items-center justify-center shadow-xl">
            <svg class="w-5 h-5 text-[#1E1C1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="6" cy="6" r="3" stroke-width="2"/>
              <circle cx="6" cy="18" r="3" stroke-width="2"/>
              <line x1="20" y1="4" x2="8.12" y2="15.88" stroke-width="2"/>
              <line x1="14.47" y1="14.48" x2="20" y2="20" stroke-width="2"/>
              <line x1="8.12" y1="8.12" x2="12" y2="12" stroke-width="2"/>
            </svg>
          </div>
          <div>
            <span class="text-[9px] font-bold tracking-[0.3em] text-[#D4AF37]/80 uppercase block">Est. 2020 • Nairobi</span>
            <span class="font-serif font-black text-sm text-white uppercase tracking-tight">Craftsman Suite</span>
          </div>
        </div>

        <!-- Bottom Quote -->
        <div class="space-y-3">
          <div class="w-8 h-0.5 bg-[#D4AF37]"></div>
          <blockquote class="font-serif text-2xl font-black text-white leading-snug max-w-xs">
            "Where every cut is a masterpiece."
          </blockquote>
          <p class="text-xs text-white/60 font-medium">Mobile Executive Barbering · Nairobi</p>
        </div>
      </div>
    </div>

    <!-- RIGHT PANEL — Login Form -->
    <div class="flex-1 flex items-center justify-center p-6 sm:p-10 bg-[#FAF8F5] relative">
      <!-- Subtle pattern -->
      <div class="absolute inset-0 bg-[radial-gradient(#1E1C1A_0.5px,transparent_0.5px)] [background-size:20px_20px] opacity-[0.04] pointer-events-none"></div>

      <div class="w-full max-w-md relative z-10 space-y-8">

        <!-- Mobile logo (visible only on small screens) -->
        <div class="lg:hidden flex items-center gap-3 mb-4">
          <div class="w-9 h-9 bg-[#1E1C1A] rounded-sm flex items-center justify-center">
            <svg class="w-4 h-4 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="6" cy="6" r="3" stroke-width="2"/>
              <circle cx="6" cy="18" r="3" stroke-width="2"/>
              <line x1="20" y1="4" x2="8.12" y2="15.88" stroke-width="2"/>
              <line x1="14.47" y1="14.48" x2="20" y2="20" stroke-width="2"/>
              <line x1="8.12" y1="8.12" x2="12" y2="12" stroke-width="2"/>
            </svg>
          </div>
          <div>
            <span class="font-serif font-bold text-sm text-[#1E1C1A] uppercase tracking-tight">Craftsman Suite</span>
            <span class="text-[9px] font-bold tracking-widest text-parlour-terracotta uppercase block">Admin Portal</span>
          </div>
        </div>

        <!-- Header -->
        <div class="space-y-1.5">
          <p class="text-[10px] font-bold tracking-[0.3em] text-parlour-terracotta uppercase">Admin Portal</p>
          <h1 class="font-serif font-black text-3xl text-[#1E1C1A] tracking-tight">Welcome back</h1>
          <p class="text-sm text-[#1E1C1A]/60 font-medium">Sign in to manage your business dashboard.</p>
        </div>

        <!-- Error Message -->
        <Transition name="fade">
          <div
            v-if="errorMessage"
            class="p-4 bg-red-50 text-red-800 border border-red-200 rounded-sm text-xs font-bold flex items-center justify-between"
          >
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
              <span>{{ errorMessage }}</span>
            </div>
            <button @click="errorMessage = ''" class="hover:text-red-900 ml-2 shrink-0">✕</button>
          </div>
        </Transition>

        <!-- Sign In Form -->
        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Email -->
          <div class="space-y-1.5">
            <label for="login-email" class="block font-bold uppercase tracking-wider text-[10px] text-[#1E1C1A]/80">
              Email Address
            </label>
            <div class="relative">
              <span class="absolute left-3.5 top-3.5 text-[#1E1C1A]/40">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </span>
              <input
                id="login-email"
                v-model="email"
                type="email"
                required
                placeholder="your@email.com"
                autocomplete="email"
                class="w-full bg-[#F2EFE9] border border-[#1E1C1A]/20 rounded-sm pl-10 pr-4 py-3 text-[#1E1C1A] text-sm focus:border-[#1E1C1A] focus:bg-white transition-all outline-none font-medium shadow-inner"
              />
            </div>
          </div>

          <!-- Password -->
          <div class="space-y-1.5">
            <label for="login-password" class="block font-bold uppercase tracking-wider text-[10px] text-[#1E1C1A]/80">
              Password
            </label>
            <div class="relative">
              <span class="absolute left-3.5 top-3.5 text-[#1E1C1A]/40">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </span>
              <input
                id="login-password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="••••••••••••"
                autocomplete="current-password"
                class="w-full bg-[#F2EFE9] border border-[#1E1C1A]/20 rounded-sm pl-10 pr-12 py-3 text-[#1E1C1A] text-sm focus:border-[#1E1C1A] focus:bg-white transition-all outline-none font-mono font-bold shadow-inner"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3.5 top-3 text-[#1E1C1A]/60 hover:text-[#1E1C1A] transition-colors p-1"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
              >
                <svg v-if="!showPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Remember me -->
          <div class="flex items-center justify-between pt-1">
            <label class="inline-flex items-center gap-2 cursor-pointer">
              <input
                v-model="rememberMe"
                type="checkbox"
                class="w-3.5 h-3.5 accent-[#1E1C1A] cursor-pointer"
              />
              <span class="text-xs font-medium text-[#1E1C1A]/70">Stay signed in</span>
            </label>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="loading"
            id="admin-login-submit"
            class="w-full bg-[#1E1C1A] hover:bg-[#D4AF37] text-[#FAF8F5] hover:text-[#1E1C1A] font-serif font-black uppercase tracking-widest text-xs py-3.5 px-6 rounded-sm transition-all duration-300 shadow-lg border border-[#1E1C1A] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            <svg v-if="loading" class="animate-spin w-4 h-4 text-current" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ loading ? 'Signing in...' : 'Sign In' }}</span>
            <svg v-if="!loading" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </button>
        </form>

        <!-- Footer -->
        <div class="pt-4 border-t border-[#1E1C1A]/15 flex items-center justify-between text-xs text-[#1E1C1A]/50">
          <NuxtLink to="/" class="font-medium text-[#1E1C1A] hover:text-parlour-terracotta transition-colors inline-flex items-center gap-1">
            <span>← Back to website</span>
          </NuxtLink>
          <span class="font-mono text-[10px]">Nairobi · 254</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter, useRoute, useRuntimeConfig } from "#imports";

definePageMeta({ layout: false });

const router = useRouter();
const route = useRoute();
const config = useRuntimeConfig();
const apiBase = config.public.apiBase !== undefined ? config.public.apiBase : "";

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const rememberMe = ref(false);
const loading = ref(false);
const errorMessage = ref("");

// Where to redirect after successful login (support ?redirect= param)
const redirectTarget = computed(() => {
  const r = route.query.redirect as string;
  return r && r.startsWith("/admin") ? r : "/admin";
});

const handleLogin = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = "Please enter your email and password.";
    return;
  }

  loading.value = true;
  errorMessage.value = "";

  try {
    const res = await fetch(`${apiBase}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    const data = await res.json();

    if (res.ok && data.accessToken) {
      if (typeof window !== "undefined") {
        localStorage.setItem("admin_token", data.accessToken);
        if (data.user) {
          localStorage.setItem("admin_user", JSON.stringify(data.user));
        }
      }
      router.push(redirectTarget.value);
    } else {
      errorMessage.value = data.error || "Incorrect email or password. Please try again.";
    }
  } catch (e: any) {
    errorMessage.value = "Unable to connect to the server. Please try again.";
  } finally {
    loading.value = false;
  }
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
