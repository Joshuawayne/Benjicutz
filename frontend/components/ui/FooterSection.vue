<template>
  <footer class="bg-parlour-dark text-parlour-cream pt-16 pb-12 border-t-2 border-parlour-dark mt-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <!-- Brand Info -->
        <div class="space-y-4 md:col-span-2">
          <div class="flex items-center gap-3">
            <span class="font-serif font-black text-3xl uppercase tracking-tighter text-parlour-cream">CRAFTSMAN PARLOUR</span>
          </div>
          <p class="text-parlour-cream/70 text-xs max-w-md leading-relaxed">
            Executive presence, identity restoration, and private white-glove convenience delivered to your residence or penthouse suite in Nairobi.
          </p>
          <div class="pt-2 text-[10px] text-parlour-cream/60 uppercase tracking-widest font-bold flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-parlour-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span>Mobile Service Zones: Kileleshwa • Westlands • Lavington • Kilimani • Eastlands</span>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-serif font-bold text-parlour-cream text-xs uppercase tracking-widest mb-4">CRAFT OFFERINGS</h4>
          <ul class="space-y-2.5 text-xs text-parlour-cream/70">
            <li><NuxtLink to="/about" class="hover:underline">About Us & Heritage</NuxtLink></li>
            <li><NuxtLink to="/services" class="hover:underline">Executive Signature Haircuts</NuxtLink></li>
            <li><NuxtLink to="/services" class="hover:underline">Micro-Airblading Hairline Work</NuxtLink></li>
            <li><NuxtLink to="/services" class="hover:underline">Father & Son VIP House Call</NuxtLink></li>
            <li><NuxtLink to="/academy" class="hover:underline">B2B Masterclasses & Workshops</NuxtLink></li>
          </ul>
        </div>

        <!-- Direct Contact -->
        <div>
          <h4 class="font-serif font-bold text-parlour-cream text-xs uppercase tracking-widest mb-4">DIRECT CONCIERGE</h4>
          <div class="space-y-2.5 text-xs text-parlour-cream/70">
            <p class="flex items-center gap-2">
              <svg class="w-3.5 h-3.5 text-parlour-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <span>WhatsApp: +254 751 022224</span>
            </p>
            <p class="flex items-center gap-2">
              <svg class="w-3.5 h-3.5 text-parlour-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span>Email: craftsman@barbershop.co.ke</span>
            </p>
            <p class="flex items-center gap-2">
              <svg class="w-3.5 h-3.5 text-parlour-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>Hours: 07:30 AM – 07:00 PM (Tue – Sun)</span>
            </p>
          </div>
        </div>
      </div>

      <div class="pt-8 border-t border-parlour-cream/15 text-center text-[10px] uppercase tracking-widest text-parlour-cream/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>© 2026 Craftsman Mobile Barber Studio • Nairobi, Kenya</span>
        <span>Confidence in every cut</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useHead } from "#imports";

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BarberShop",
        "name": "Craftsman Mobile Barber Studio",
        "image": "https://barbershop.co.ke/images/hero.jpg",
        "telephone": "+254751022224",
        "email": "craftsman@barbershop.co.ke",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Nairobi",
          "addressCountry": "KE",
          "addressRegion": "Nairobi County"
        },
        "priceRange": "KES 3500 - KES 8500",
        "openingHours": "Tu-Su 07:30-19:00"
      })
    }
  ]
});
</script>
