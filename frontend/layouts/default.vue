<template>
  <div class="min-h-screen flex flex-col bg-parlour-bg text-parlour-dark font-sans">
    <NavBar />
    <main class="flex-grow">
      <slot />
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import NavBar from "~/components/ui/NavBar.vue";
import FooterSection from "~/components/ui/FooterSection.vue";
</script>