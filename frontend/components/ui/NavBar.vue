<template>
  <header class="sticky top-0 z-50 bg-[#F4EFE6]/95 backdrop-blur-md border-b border-parlour-dark/10 transition-all">
    <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[999] focus:px-4 focus:py-2 focus:bg-parlour-dark focus:text-parlour-cream focus:font-bold focus:text-xs focus:uppercase focus:tracking-widest focus:shadow-xl focus:outline-none">Skip to main content</a>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 lg:h-24 flex items-center justify-between">
      <!-- Vintage Emblem / Brand Logo -->
      <NuxtLink to="/" class="flex items-center gap-2 sm:gap-4 group" @click="isMobileOpen = false">
        <div class="px-2.5 py-1 sm:px-3.5 sm:py-2 border-2 border-parlour-dark rounded-sm bg-parlour-cream text-parlour-dark font-serif font-black text-xs sm:text-sm tracking-tighter shadow-sm uppercase group-hover:bg-parlour-dark group-hover:text-parlour-cream transition-colors">
          BenjiCutz
        </div>
        <div>
          <span class="font-serif font-bold text-xs sm:text-base text-parlour-dark block tracking-tight leading-tight">MOBILE PARLOUR</span>
          <span class="text-[7.5px] sm:text-[9px] font-bold tracking-widest text-parlour-dark/60 uppercase block">NAIROBI • WHITE GLOVE</span>
        </div>
      </NuxtLink>

      <!-- Desktop Editorial Menu Navigation -->
      <nav aria-label="Main navigation" class="hidden md:flex items-center gap-8 lg:gap-10 text-xs font-semibold uppercase tracking-widest text-parlour-dark/80">
        <NuxtLink to="/" class="hover:text-parlour-dark hover:underline underline-offset-8 transition-all" active-class="text-parlour-dark underline font-bold">Home</NuxtLink>
        <NuxtLink to="/services" class="hover:text-parlour-dark hover:underline underline-offset-8 transition-all" active-class="text-parlour-dark underline font-bold">Menu & Prices</NuxtLink>
        <NuxtLink to="/about" class="hover:text-parlour-dark hover:underline underline-offset-8 transition-all" active-class="text-parlour-dark underline font-bold">About Us</NuxtLink>
        <NuxtLink to="/academy" class="hover:text-parlour-dark hover:underline underline-offset-8 transition-all" active-class="text-parlour-dark underline font-bold">B2B Academy</NuxtLink>
      </nav>

      <!-- Right Actions (Desktop & Mobile) -->
      <div class="flex items-center gap-2.5 sm:gap-4">
        <span aria-hidden="true" class="hidden lg:inline-block text-[11px] font-bold text-parlour-dark/70 tracking-widest uppercase border-r border-parlour-dark/20 pr-4">
          NRB ▾
        </span>
        
        <!-- Book Me CTA Button -->
        <NuxtLink
          to="/shop/booking"
          class="editorial-btn text-[11px] sm:text-xs px-4 py-2 sm:px-6 sm:py-3"
          @click="isMobileOpen = false"
        >
          <span>Book Me</span>
        </NuxtLink>

        <!-- Mobile Hamburger Toggle Button -->
        <button
          type="button"
          class="md:hidden w-10 h-10 flex items-center justify-center border border-parlour-dark/30 rounded-sm bg-parlour-cream text-parlour-dark hover:bg-parlour-dark hover:text-parlour-cream transition-colors focus:outline-none"
          :aria-expanded="isMobileOpen"
          aria-label="Toggle Navigation Menu"
          @click="isMobileOpen = !isMobileOpen"
        >
          <!-- Hamburger Icon (when closed) -->
          <svg
            v-if="!isMobileOpen"
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <!-- Close Icon (when open) -->
          <svg
            v-else
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- MOBILE MENU DRAWER -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMobileOpen"
        class="md:hidden bg-[#F4EFE6] border-b-2 border-parlour-dark shadow-2xl px-6 py-8 space-y-6 max-h-[85vh] overflow-y-auto"
      >
        <!-- Navigation Links -->
        <nav aria-label="Mobile navigation" class="flex flex-col space-y-4">
          <NuxtLink
            to="/"
            class="text-xl font-serif font-black uppercase text-parlour-dark hover:text-parlour-dark/60 transition-colors flex items-center justify-between py-2 border-b border-parlour-dark/10"
            active-class="text-parlour-dark font-black underline"
            @click="isMobileOpen = false"
          >
            <span>Home</span>
            <span class="text-xs font-sans text-parlour-dark/40">01</span>
          </NuxtLink>

          <NuxtLink
            to="/services"
            class="text-xl font-serif font-black uppercase text-parlour-dark hover:text-parlour-dark/60 transition-colors flex items-center justify-between py-2 border-b border-parlour-dark/10"
            active-class="text-parlour-dark font-black underline"
            @click="isMobileOpen = false"
          >
            <span>Menu & Prices</span>
            <span class="text-xs font-sans text-parlour-dark/40">02</span>
          </NuxtLink>

          <NuxtLink
            to="/about"
            class="text-xl font-serif font-black uppercase text-parlour-dark hover:text-parlour-dark/60 transition-colors flex items-center justify-between py-2 border-b border-parlour-dark/10"
            active-class="text-parlour-dark font-black underline"
            @click="isMobileOpen = false"
          >
            <span>About Us</span>
            <span class="text-xs font-sans text-parlour-dark/40">03</span>
          </NuxtLink>

          <NuxtLink
            to="/academy"
            class="text-xl font-serif font-black uppercase text-parlour-dark hover:text-parlour-dark/60 transition-colors flex items-center justify-between py-2 border-b border-parlour-dark/10"
            active-class="text-parlour-dark font-black underline"
            @click="isMobileOpen = false"
          >
            <span>B2B Academy</span>
            <span class="text-xs font-sans text-parlour-dark/40">04</span>
          </NuxtLink>
        </nav>

        <!-- Mobile Concierge Card -->
        <div class="p-4 bg-parlour-card border border-parlour-dark/20 space-y-3">
          <div class="text-[10px] font-bold tracking-widest uppercase text-parlour-dark/60 flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-parlour-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span>SERVICE ZONES</span>
          </div>
          <p class="text-xs font-serif text-parlour-dark/80">
            Kileleshwa • Westlands • Lavington • Kilimani • Eastlands
          </p>
          <a
            href="https://wa.me/254751022224?text=Hello%20Benjamin%2C%20I%20would%20like%20to%20inquire%20about%20booking%20a%20session."
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-xs font-bold text-parlour-dark hover:underline pt-1"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <span>Direct WhatsApp Message: +254 751 022224</span>
          </a>
        </div>

        <!-- Full-Width Mobile Booking Button -->
        <NuxtLink
          to="/shop/booking"
          class="w-full py-4 bg-parlour-dark text-parlour-cream hover:bg-transparent hover:text-parlour-dark border-2 border-parlour-dark font-serif font-bold text-xs uppercase tracking-widest text-center block transition-all shadow-md"
          @click="isMobileOpen = false"
        >
          Reserve In-Suite House Call →
        </NuxtLink>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const isMobileOpen = ref(false);
const route = useRoute();

// Automatically close mobile menu on route change
watch(
  () => route.fullPath,
  () => {
    isMobileOpen.value = false;
  }
);
</script>
