<template>
  <div class="min-h-screen flex flex-col bg-parlour-bg text-parlour-dark font-sans overflow-x-hidden w-full max-w-full">
    <NavBar />
    <main class="flex-grow overflow-x-hidden w-full max-w-full">
      <slot />
    </main>
    <FooterSection />
    <WhatsAppConcierge />
  </div>
</template>

<script setup lang="ts">
import NavBar from "~/components/ui/NavBar.vue";
import FooterSection from "~/components/ui/FooterSection.vue";
import WhatsAppConcierge from "~/components/ui/WhatsAppConcierge.vue";
</script>