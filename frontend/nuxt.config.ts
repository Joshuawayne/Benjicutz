// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'editorial-page', mode: 'out-in' },
    layoutTransition: false,
    head: {
      htmlAttrs: { lang: 'en' },
    },
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    denoBackendUrl: process.env.DENO_BACKEND_URL || 'http://localhost:8000',
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || ''
    }
  }
})

