// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'editorial-page', mode: 'out-in' },
    layoutTransition: false,
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'BenjiCutz Parlour • Luxury Mobile Barber & Grooming Craftsman Nairobi',
      titleTemplate: '%s | BenjiCutz Parlour Nairobi',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5' },
        {
          name: 'description',
          content: "Nairobi's premier executive mobile barber service and private grooming studio by Master Barber Benjamin Johnson. Precision fades, beard sculpting, micro-airblading hairline work, and VIP house calls in Westlands, Kilimani, Karen, and Muthaiga.",
        },
        {
          name: 'keywords',
          content: 'mobile barber Nairobi, best barber in Nairobi, luxury haircut Westlands, Karen barber house calls, executive grooming Nairobi, hairline restoration Kenya, beard sculpting Nairobi, BenjiCutz',
        },
        { name: 'author', content: 'Benjamin Johnson' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'theme-color', content: '#0c0d0e' },
        { name: 'google-site-verification', content: 'googlecb9cbe404b550e53' },

        // Open Graph / Facebook / LinkedIn
        { property: 'og:site_name', content: 'BenjiCutz Craftsman Parlour' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_KE' },
        { property: 'og:title', content: 'BenjiCutz Parlour • Luxury Mobile Barber & Grooming Craftsman Nairobi' },
        { property: 'og:description', content: 'Private executive mobile barbering, micro-airblading hairline restoration, and VIP house calls across Nairobi. Book online or via WhatsApp.' },
        { property: 'og:image', content: 'https://benjicutz.vercel.app/images/hero.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'BenjiCutz Craftsman Barber Parlour Nairobi' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'BenjiCutz Parlour • Luxury Mobile Barber Nairobi' },
        { name: 'twitter:description', content: 'Executive house calls, precision hairline restoration, and bespoke grooming rituals across Nairobi.' },
        { name: 'twitter:image', content: 'https://benjicutz.vercel.app/images/hero.jpg' },

        // Geo Meta for Nairobi Local Search
        { name: 'geo.region', content: 'KE-30' },
        { name: 'geo.placename', content: 'Nairobi' },
        { name: 'geo.position', content: '-1.2921;36.8219' },
        { name: 'ICBM', content: '-1.2921, 36.8219' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'canonical', href: 'https://benjicutz.vercel.app' },
      ],
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

