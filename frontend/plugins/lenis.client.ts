import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) return

  // Register GSAP ScrollTrigger plugin and configure mobile viewport stability
  gsap.registerPlugin(ScrollTrigger)
  ScrollTrigger.config({
    ignoreMobileResize: true,
  })

  // Initialize Lenis smooth scroll instance
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.0,
    infinite: false,
  })

  // Synchronize Lenis with GSAP ScrollTrigger via GSAP Ticker
  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  // Immediate ScrollTrigger calculation refresh
  ScrollTrigger.refresh()

  // Expose global access for components and window debugging
  if (typeof window !== 'undefined') {
    (window as any).__lenis = lenis
    ;(window as any).__gsap = gsap
    ;(window as any).__ScrollTrigger = ScrollTrigger
  }

  // Handle route transitions
  nuxtApp.hook('page:finish', () => {
    window.scrollTo(0, 0)
    lenis.scrollTo(0, { immediate: true })
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 120)
  })

  nuxtApp.hook('page:transition:finish', () => {
    lenis.scrollTo(0, { immediate: true })
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 120)
  })

  return {
    provide: {
      lenis,
      gsap,
      ScrollTrigger,
    },
  }
})
