<template>
  <div class="homepage-root">
    <!-- HERO SECTION (Ref 1 Editorial Parlour Composition) -->
    <section ref="heroSection" aria-label="Hero — Craftsman Barber Parlour" class="relative pt-4 pb-6 sm:pt-8 sm:pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden w-full max-w-full">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        <!-- Left Column: Editorial Floating Image (desktop only) -->
        <div class="hidden lg:block lg:col-span-3 min-w-0">
          <div ref="heroLeftFrame" class="hero-card-left relative group overflow-hidden rounded-sm border-2 border-parlour-dark/30 shadow-2xl will-change-transform">
            <div class="overflow-hidden h-[320px]">
              <img
                ref="heroLeftImg"
                src="/images/try.gif"
                alt="Micro-Airblading Precision Lineup"
                class="w-full h-full object-cover scale-110 will-change-transform transition-transform duration-700 ease-out group-hover:scale-115"
              />
            </div>
            <div class="absolute bottom-4 left-4 bg-parlour-dark/95 text-parlour-cream px-3 py-1 font-serif text-xs font-bold tracking-widest uppercase border border-parlour-gold/30 shadow-lg">
              GET • SHARP
            </div>
          </div>
        </div>

        <!-- Center Column: Display Serif Typography, Mobile Hero Portrait & CTA -->
        <div ref="heroCenterCol" class="order-1 lg:order-none lg:col-span-6 text-center space-y-4 sm:space-y-5 will-change-transform min-w-0">
          <!-- Subtle Lookbook Image Trail scoped ONLY to the CRAFTSMAN BARBER PARLOUR typography -->
          <ImageTrail
            :images="trailImages"
            :image-width="105"
            :image-height="135"
            :threshold="40"
            :lifespan="1000"
            :max-opacity="0.65"
            class="hero-typography-trail relative block w-full max-w-xl mx-auto"
          >
            <div class="space-y-2 py-1 sm:py-3">
              <div>
                <span ref="heroEyebrow" class="text-[11px] sm:text-xs font-bold tracking-[0.22em] sm:tracking-[0.3em] text-parlour-dark/70 uppercase inline-block">
                  EST. 2020 • NAIROBI MOBILE STUDIO
                </span>
              </div>
              
              <h1 class="text-4xl sm:text-6xl lg:text-7xl font-serif font-black text-parlour-dark tracking-tighter uppercase leading-[0.92] sm:leading-[0.95]">
                <span class="hero-line block">CRAFTSMAN</span>
                <span class="hero-line block">BARBER</span>
                <span class="hero-line block italic font-normal">PARLOUR</span>
              </h1>
            </div>
          </ImageTrail>

          <!-- Mobile Hero Portrait Card: Displayed right in the hero composition on mobile screens -->
          <div class="block lg:hidden my-3 max-w-[280px] sm:max-w-xs mx-auto">
            <div class="hero-card-right hero-card-mobile relative group overflow-hidden rounded-sm border-2 border-parlour-dark/30 shadow-2xl aspect-[4/5] w-full">
              <img
                src="/images/to.webp"
                alt="Master Craftsman Benjamin"
                class="w-full h-full object-cover object-top"
              />
              <div class="absolute bottom-3 left-3 bg-parlour-dark/95 text-parlour-cream px-2.5 py-1 font-serif text-[10px] font-bold tracking-widest uppercase border border-parlour-gold/30 shadow-lg">
                MASTER • BENJAMIN
              </div>
            </div>
          </div>

          <div ref="heroCtaWrap" class="pt-1">
            <NuxtLink
              to="/shop/booking"
              ref="heroCta"
              class="hero-magnetic-btn px-8 py-3.5 bg-parlour-dark text-parlour-cream hover:bg-transparent hover:text-parlour-dark border-2 border-parlour-dark font-serif font-bold text-xs uppercase tracking-widest transition-colors duration-300 shadow-xl inline-block relative overflow-hidden group"
              @mousemove="onCtaMouseMove"
              @mouseleave="onCtaMouseLeave"
            >
              <span class="relative z-10 inline-flex items-center gap-2">
                Book House Call
                <svg aria-hidden="true" class="w-3.5 h-3.5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </NuxtLink>
          </div>

          <!-- Mobile Quote -->
          <p class="block lg:hidden text-xs font-serif italic text-parlour-dark/80 leading-relaxed text-center max-w-sm mx-auto pt-1 px-2">
            "The executive mobile studio in Nairobi for bespoke haircutting, beard sculpting, and micro-airblading hairline restoration."
          </p>
        </div>

        <!-- Right Column: Hero Portrait & Quote (Desktop only) -->
        <div class="hidden lg:block lg:col-span-3 space-y-3 min-w-0">
          <div ref="heroRightFrame" class="hero-card-right relative group overflow-hidden rounded-sm border-2 border-parlour-dark/30 shadow-2xl will-change-transform lg:h-[420px]">
            <img
              ref="heroRightImg"
              src="/images/to.webp"
              alt="Master Craftsman Benjamin"
              class="w-full h-full object-cover object-top lg:scale-110 will-change-transform transition-transform duration-700 ease-out group-hover:scale-105 lg:group-hover:scale-115"
            />
            <div class="absolute bottom-4 left-4 bg-parlour-dark/95 text-parlour-cream px-3 py-1 font-serif text-[11px] lg:text-xs font-bold tracking-widest uppercase border border-parlour-gold/30 shadow-lg">
              MASTER • BENJAMIN
            </div>
          </div>
          <p ref="heroQuote" class="text-xs font-serif italic text-parlour-dark/80 leading-relaxed text-left max-w-sm mx-auto lg:max-w-none">
            "The executive mobile studio in Nairobi for bespoke haircutting, beard sculpting, and micro-airblading hairline restoration."
          </p>
        </div>
      </div>

      <!-- Luxurious Marquee Ticker Ribbon (Tight Spacing) -->
      <div class="mt-6 sm:mt-8 overflow-hidden w-full max-w-full" aria-hidden="true">
        <div class="relative overflow-hidden w-full max-w-full py-2.5 sm:py-3 bg-parlour-card/60 border-y border-parlour-dark/15 rounded-sm" role="marquee">
          <div class="animate-luxury-marquee flex items-center gap-6 whitespace-nowrap text-xs font-bold tracking-[0.25em] uppercase text-parlour-dark">
            <span class="text-parlour-gold">★</span>
            <span>KILELESHWA</span>
            <span class="text-parlour-dark/30">•</span>
            <span>WESTLANDS</span>
            <span class="text-parlour-dark/30">•</span>
            <span>LAVINGTON</span>
            <span class="text-parlour-dark/30">•</span>
            <span>KILIMANI</span>
            <span class="text-parlour-dark/30">•</span>
            <span>EASTLANDS</span>
            <span class="text-parlour-gold">★</span>
            <span>MASTER BENJAMIN JOHNSON</span>
            <span class="text-parlour-dark/30">•</span>
            <span>BESPOKE IN-SUITE HOUSE CALLS</span>
            <span class="text-parlour-dark/30">•</span>
            <span>MICRO-AIRBLADING LINEUPS</span>
            <span class="text-parlour-dark/30">•</span>
            <span>HOT TOWEL STEAM</span>
            <span class="text-parlour-dark/30">•</span>
            <span>ZERO-WAIT DISCRETION</span>
            <span class="text-parlour-gold">★</span>
            <!-- Duplicate loop for seamless infinite scroll -->
            <span>KILELESHWA</span>
            <span class="text-parlour-dark/30">•</span>
            <span>WESTLANDS</span>
            <span class="text-parlour-dark/30">•</span>
            <span>LAVINGTON</span>
            <span class="text-parlour-dark/30">•</span>
            <span>KILIMANI</span>
            <span class="text-parlour-dark/30">•</span>
            <span>EASTLANDS</span>
            <span class="text-parlour-gold">★</span>
            <span>MASTER BENJAMIN JOHNSON</span>
            <span class="text-parlour-dark/30">•</span>
            <span>BESPOKE IN-SUITE HOUSE CALLS</span>
            <span class="text-parlour-dark/30">•</span>
            <span>MICRO-AIRBLADING LINEUPS</span>
            <span class="text-parlour-dark/30">•</span>
            <span>HOT TOWEL STEAM</span>
            <span class="text-parlour-dark/30">•</span>
            <span>ZERO-WAIT DISCRETION</span>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 2: "ABOUT US / CRAFT MANIFESTO" (Haute-Editorial Magazine Composition with Parallax) -->
    <section ref="manifestoSection" aria-labelledby="manifesto-heading" class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 my-4 rounded-sm bg-parlour-card/35 border border-parlour-dark/10 overflow-hidden">
      <!-- Subtle Background Ambient Watermark with Parallax -->
      <div ref="manifestoWatermark" aria-hidden="true" class="absolute -right-12 -top-12 text-[140px] md:text-[220px] font-serif font-black text-parlour-dark/[0.035] select-none pointer-events-none tracking-tighter will-change-transform">
        1920
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
        <!-- Story, Typography & Stats (6 cols on desktop) -->
        <div class="lg:col-span-6 space-y-8">
          <div class="space-y-3">
            <div class="manifesto-anim inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase text-parlour-dark/70 bg-parlour-cream px-3 py-1 border border-parlour-dark/15 shadow-sm">
              <span>MANIFESTO</span>
              <span>•</span>
              <span>EST. 2020</span>
            </div>
            
            <div class="overflow-hidden">
              <h2 id="manifesto-heading" class="manifesto-title text-3xl sm:text-5xl lg:text-6xl font-serif font-black uppercase text-parlour-dark tracking-tight leading-[0.98]">
                ZERO-WAIT <br />
                <span class="italic font-light text-parlour-dark/80">IN YOUR PRIVATE SUITE</span>
              </h2>
            </div>
          </div>

          <p class="manifesto-anim text-base sm:text-lg font-serif font-medium text-parlour-dark/90 leading-snug">
            The private mobile studio for executive men delivering uncompromising precision, identity restoration, and discreet white-glove convenience.
          </p>

          <p class="manifesto-anim text-xs sm:text-sm text-parlour-dark/80 leading-relaxed">
            High-value men lose hours traveling to crowded barbershops. We bring the complete luxury studio directly to your residence or penthouse suite in Nairobi. From hot-towel straight razor lineups to non-invasive hairline micro-airblading.
          </p>

          <!-- Key Metrics Grid with Staggered Reveal -->
          <div class="manifesto-metrics grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-parlour-dark/20 text-center">
            <div class="metric-card p-3 sm:p-4 bg-parlour-cream border border-parlour-dark/15 shadow-sm hover:border-parlour-dark transition-colors duration-300">
              <span class="text-2xl sm:text-3xl font-bold font-serif text-parlour-dark block">6 Max</span>
              <span class="text-[9px] uppercase font-bold text-parlour-dark/60 tracking-wider">CLIENTS / DAY</span>
            </div>
            <div class="metric-card p-3 sm:p-4 bg-parlour-cream border border-parlour-dark/15 shadow-sm hover:border-parlour-dark transition-colors duration-300">
              <span class="text-2xl sm:text-3xl font-bold font-serif text-parlour-dark block">2,000+</span>
              <span class="text-[9px] uppercase font-bold text-parlour-dark/60 tracking-wider">EXECUTIVE CUTS</span>
            </div>
            <div class="metric-card p-3 sm:p-4 bg-parlour-cream border border-parlour-dark/15 shadow-sm hover:border-parlour-dark transition-colors duration-300">
              <span class="text-2xl sm:text-3xl font-bold font-serif text-parlour-dark block">5</span>
              <span class="text-[9px] uppercase font-bold text-parlour-dark/60 tracking-wider">NAIROBI ZONES</span>
            </div>
          </div>

          <div class="manifesto-anim pt-2">
            <NuxtLink
              to="/about"
              class="editorial-outline-btn inline-flex items-center gap-2 group"
            >
              <span>Discover Our Heritage & Story</span>
              <span class="transform transition-transform group-hover:translate-x-1">→</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Overlapping Editorial Photo Composition (Neat & Design-Led Architectural Overlap) -->
        <div class="lg:col-span-6 relative pt-4 lg:pt-0 pb-10 sm:pb-14 lg:pb-6 pl-2 sm:pl-6 lg:pl-8">
          <!-- Primary Frame: Penthouse Session with Inner Parallax -->
          <div ref="manifestoMainImg" class="group relative overflow-hidden rounded-sm border-2 border-parlour-dark shadow-[0_20px_50px_rgba(20,18,16,0.2)] bg-parlour-dark ml-auto w-full sm:w-[92%] lg:w-[90%] will-change-transform">
            <div class="overflow-hidden h-72 sm:h-[400px] lg:h-[460px]">
              <img
                ref="manifestoInnerImg"
                src="/images/session.jpeg"
                alt="Penthouse Mobile Session in Nairobi"
                class="w-full h-full object-cover object-center scale-110 will-change-transform transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100 group-hover:scale-115"
              />
            </div>
            <div class="absolute top-3 sm:top-4 right-3 sm:right-4 bg-parlour-dark/95 backdrop-blur-md border border-parlour-gold/40 px-2.5 sm:px-3 py-1 text-parlour-cream text-[9px] sm:text-[10px] font-serif font-bold uppercase tracking-widest shadow-md">
              IN-SUITE PENTHOUSE SESSION
            </div>
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-parlour-dark via-parlour-dark/85 to-transparent p-4 sm:p-5 text-parlour-cream">
              <span class="text-[8px] sm:text-[9px] uppercase tracking-widest text-parlour-gold font-bold block mb-1">WHITE GLOVE CONCIERGE</span>
              <p class="text-[11px] sm:text-xs font-serif italic text-parlour-cream/90 max-w-xs">
                Hospital-grade mobile station deployed in the comfort of your private residence.
              </p>
            </div>
          </div>

          <!-- Secondary Offset Floating Layered Card (Neat Overlap with Clean Framing) -->
          <div
            ref="manifestoFloatCard"
            class="absolute bottom-0 left-0 sm:bottom-2 sm:left-2 lg:-bottom-2 lg:left-0 w-48 sm:w-56 lg:w-60 bg-parlour-cream p-3 sm:p-3.5 border-2 border-parlour-dark shadow-[0_15px_40px_rgba(20,18,16,0.3)] space-y-2 z-20 will-change-transform rounded-sm"
          >
            <div class="group relative overflow-hidden rounded-sm border border-parlour-dark/20 h-24 sm:h-28">
              <img
                src="/images/tool.webp"
                alt="Handmade Brass Shears and Straight Razor"
                class="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div class="absolute top-1.5 left-1.5 bg-parlour-dark text-parlour-gold text-[8px] font-bold px-1.5 py-0.5 uppercase tracking-wider">
                ★ 0.1MM STEEL
              </div>
            </div>
            <div class="space-y-0.5">
              <span class="text-[8px] font-bold uppercase tracking-widest text-parlour-dark/60 block">ATELIER ARSENAL</span>
              <span class="text-[11px] sm:text-xs font-serif font-bold text-parlour-dark uppercase block leading-tight">Handcrafted Steel</span>
              <p class="text-[9px] text-parlour-dark/70 leading-snug">
                Calibrated micro-edges for smooth skin contact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 3: "PRICES AND SERVICES" (Ref 2 Clean Tabular Style with Tailor's Stitch Reveal) -->
    <section ref="pricingSection" aria-labelledby="pricing-heading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-parlour-dark/10">
      <div class="text-center mb-16 space-y-2">
        <span class="pricing-anim text-xs font-bold tracking-[0.3em] uppercase text-parlour-dark/60 block">PRICE LIST & CRAFT MENU</span>
        <div class="overflow-hidden">
          <h2 id="pricing-heading" class="pricing-title text-4xl sm:text-6xl font-serif font-black uppercase text-parlour-dark tracking-tight">
            PRICES AND SERVICES
          </h2>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <!-- Left Price Column: HAIRCUTS & BEARD -->
        <div class="lg:col-span-4 space-y-8">
          <div class="pricing-card">
            <h3 class="text-sm font-bold uppercase tracking-widest text-parlour-dark border-b-2 border-parlour-dark pb-2 mb-4">
              HAIRCUTS & PRECISION
            </h3>
            <div class="space-y-4 text-xs font-semibold text-parlour-dark">
              <div class="flex items-baseline justify-between group cursor-default">
                <span class="group-hover:text-parlour-gold transition-colors">EXECUTIVE SIGNATURE CUT</span>
                <span class="dotted-line origin-left"></span>
                <span class="font-bold">4,500</span>
              </div>
              <div class="flex items-baseline justify-between group cursor-default">
                <span class="group-hover:text-parlour-gold transition-colors">MICRO-AIRBLADING LINEUP</span>
                <span class="dotted-line origin-left"></span>
                <span class="font-bold">7,000</span>
              </div>
              <div class="flex items-baseline justify-between group cursor-default">
                <span class="group-hover:text-parlour-gold transition-colors">SKIN FADE & GRADIENT EDGING</span>
                <span class="dotted-line origin-left"></span>
                <span class="font-bold">3,500</span>
              </div>
              <div class="flex items-baseline justify-between group cursor-default">
                <span class="group-hover:text-parlour-gold transition-colors">HOT TOWEL STEAM & RAZOR</span>
                <span class="dotted-line origin-left"></span>
                <span class="font-bold">2,500</span>
              </div>
            </div>
          </div>

          <div class="pricing-card">
            <h3 class="text-sm font-bold uppercase tracking-widest text-parlour-dark border-b-2 border-parlour-dark pb-2 mb-4">
              BEARD SCULPTING & THERAPY
            </h3>
            <div class="space-y-4 text-xs font-semibold text-parlour-dark">
              <div class="flex items-baseline justify-between group cursor-default">
                <span class="group-hover:text-parlour-gold transition-colors">BEARD SCULPT & LINEUP</span>
                <span class="dotted-line origin-left"></span>
                <span class="font-bold">2,500</span>
              </div>
              <div class="flex items-baseline justify-between group cursor-default">
                <span class="group-hover:text-parlour-gold transition-colors">ORGANIC HERBAL DETOX WASH</span>
                <span class="dotted-line origin-left"></span>
                <span class="font-bold">3,500</span>
              </div>
              <div class="flex items-baseline justify-between group cursor-default">
                <span class="group-hover:text-parlour-gold transition-colors">SCALP FOLLICLE STIMULATION</span>
                <span class="dotted-line origin-left"></span>
                <span class="font-bold">3,000</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Center Image: Macro Hairline Showcase with Subtle Parallax Float -->
        <div ref="pricingCenterImg" class="lg:col-span-4 will-change-transform">
          <div class="border-2 border-parlour-dark shadow-2xl overflow-hidden rounded-sm grayscale contrast-125 group relative">
            <img
              src="/images/model1.webp"
              alt="Hairline Symmetry Close-Up"
              class="w-full h-[400px] object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div class="absolute bottom-3 left-3 bg-parlour-dark/90 text-parlour-cream px-3 py-1 font-serif text-[10px] uppercase font-bold tracking-widest">
              PRECISION RESTORATION
            </div>
          </div>
          <NuxtLink
            to="/shop/booking"
            class="w-full mt-4 editorial-btn text-center block"
          >
            CHOOSE MASTER / ZONE
          </NuxtLink>
        </div>

        <!-- Right Price Column: COMPLEXES & HOUSE CALLS -->
        <div class="lg:col-span-4 space-y-8">
          <div class="pricing-card">
            <h3 class="text-sm font-bold uppercase tracking-widest text-parlour-dark border-b-2 border-parlour-dark pb-2 mb-4">
              COMPLEXES & HOUSE CALLS
            </h3>
            <div class="space-y-4 text-xs font-semibold text-parlour-dark">
              <div class="flex items-baseline justify-between group cursor-default">
                <span class="group-hover:text-parlour-gold transition-colors">FATHER + SON HOUSE CALL</span>
                <span class="dotted-line origin-left"></span>
                <span class="font-bold">8,500</span>
              </div>
              <div class="flex items-baseline justify-between group cursor-default">
                <span class="group-hover:text-parlour-gold transition-colors">HAIRCUT + BEARD + AIRBLADE</span>
                <span class="dotted-line origin-left"></span>
                <span class="font-bold">9,500</span>
              </div>
              <div class="flex items-baseline justify-between group cursor-default">
                <span class="group-hover:text-parlour-gold transition-colors">THE EXECUTIVE PASS (MONTHLY)</span>
                <span class="dotted-line origin-left"></span>
                <span class="font-bold">9,000</span>
              </div>
              <div class="flex items-baseline justify-between group cursor-default">
                <span class="group-hover:text-parlour-gold transition-colors">FAMILY HERITAGE PASS (MONTHLY)</span>
                <span class="dotted-line origin-left"></span>
                <span class="font-bold">16,000</span>
              </div>
            </div>
          </div>

          <div class="pricing-card p-4 bg-parlour-card border border-parlour-dark/20 text-xs space-y-2 shadow-sm">
            <span class="font-bold uppercase block text-parlour-dark">UBER LOGISTICS DELIVERY:</span>
            <p class="text-parlour-dark/70 leading-relaxed">
              Transparent standard zone delivery: Kileleshwa, Westlands, Lavington (+KES 500) • Kilimani (+KES 600) • Eastlands (+KES 1000).
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 4: INTERACTIVE VISUAL COMPONENTS -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-parlour-dark/10">
      <!-- Lifestyle Tone Selector Component -->
      <LifestyleToneSelector />

      <!-- Macro Precision Slider Component -->
      <MacroPrecisionSlider />
    </section>

    <!-- ELASTIC DIVIDER: Interactive → VIP Retainer -->
    <div class="elastic-divider-wrap max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ElasticLine
        :height="80"
        :stroke-width="1.4"
        line-color="rgba(20, 18, 16, 0.3)"
        shadow-color="rgba(20, 18, 16, 0.06)"
        glow-color="rgba(212, 175, 55, 0.3)"
        grabbed-color="rgba(20, 18, 16, 0.5)"
        :grab-threshold="30"
        :release-threshold="120"
        :stiffness="300"
        :damping="6"
      />
    </div>


    <!-- SECTION 5: VIP MONTHLY HOUSE-CALL RETAINER (Elevated Prestige Background) -->
    <section ref="retainerSection" aria-labelledby="retainer-heading" class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 my-4 bg-gradient-to-b from-transparent via-parlour-card/50 to-transparent rounded-sm">
      <!-- Subtle Decorative Parallax Monogram -->
      <div ref="retainerWatermark" aria-hidden="true" class="absolute left-1/2 top-10 -translate-x-1/2 text-[120px] sm:text-[180px] font-serif font-black text-parlour-dark/[0.025] select-none pointer-events-none tracking-widest">
        VIP
      </div>

      <div class="text-center max-w-2xl mx-auto mb-12 space-y-2 relative z-10">
        <span class="retainer-anim text-xs font-bold tracking-[0.3em] uppercase text-parlour-dark/60 block">RECURRING LUXURY</span>
        <div class="overflow-hidden">
          <h2 id="retainer-heading" class="retainer-title text-4xl font-serif font-black uppercase text-parlour-dark tracking-tight">
            VIP MONTHLY RETAINERS
          </h2>
        </div>
        <p class="retainer-anim text-xs text-parlour-dark/70">
          2 fixed recurring visits reserved every month. Zero transport fees in prime hubs.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto relative z-10">
        <div
          v-for="tier in tiers"
          :key="tier.id"
          class="retainer-card bg-parlour-cream p-8 border-2 border-parlour-dark shadow-xl flex flex-col justify-between hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="font-serif font-bold text-2xl uppercase tracking-tight text-parlour-dark">{{ tier.name }}</span>
              <span class="text-[10px] font-bold px-2.5 py-1 bg-parlour-dark text-parlour-cream uppercase tracking-widest">
                {{ tier.visitsPerMonth }} VISITS / MO
              </span>
            </div>
            <div class="text-3xl font-serif font-black text-parlour-dark">
              KES {{ tier.monthlyKes.toLocaleString() }} <span class="text-xs font-normal text-parlour-dark/60">/ month</span>
            </div>

            <ul class="space-y-3 text-xs text-parlour-dark/80 pt-4 border-t border-parlour-dark/10">
              <li v-for="(perk, i) in tier.perks" :key="i" class="flex items-start gap-2">
                <span class="text-parlour-gold font-black">✓</span>
                <span>{{ perk }}</span>
              </li>
            </ul>
          </div>

          <NuxtLink
            to="/shop/booking"
            class="mt-8 w-full editorial-btn text-center"
          >
            SUBSCRIBE TO {{ tier.name }}
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useHead } from "#imports";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LifestyleToneSelector from "~/components/visual/LifestyleToneSelector.vue";
import MacroPrecisionSlider from "~/components/visual/MacroPrecisionSlider.vue";
import ElasticLine from "~/components/visual/ElasticLine.vue";
import ImageTrail from "~/components/visual/ImageTrail.vue";
import { useRetainer } from "~/composables/useRetainer";

// SEO & AEO (Answer Engine Optimization) Structured Data
useHead({
  title: "Craftsman Mobile Barber Parlour Nairobi • Master Cuts & House Calls",
  meta: [
    {
      name: "description",
      content: "Experience Nairobi's finest luxury mobile haircutting and beard grooming. Master Barber Benjamin Johnson delivers in-suite precision fades, hairline micro-airblading, and scheduled executive retainer house calls across Westlands, Kilimani, Karen, and Muthaiga."
    }
  ],
  script: [
    // 1. LocalBusiness / BarberShop Schema for Local SEO & Search Engine Knowledge Panels
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BarberShop",
        "@id": "https://benjicutz.vercel.app/#barbershop",
        "name": "BenjiCutz Craftsman Barber Parlour",
        "alternateName": "BenjiCutz Nairobi",
        "image": "https://benjicutz.vercel.app/images/hero.jpg",
        "url": "https://benjicutz.vercel.app",
        "telephone": "+254792843862",
        "priceRange": "KES 1500 - KES 15000",
        "currenciesAccepted": "KES",
        "paymentAccepted": "M-Pesa, Cash, Credit Card",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Nairobi Metropolis",
          "addressLocality": "Nairobi",
          "addressRegion": "Nairobi County",
          "postalCode": "00100",
          "addressCountry": "KE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -1.2921,
          "longitude": 36.8219
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Westlands" },
          { "@type": "AdministrativeArea", "name": "Kilimani" },
          { "@type": "AdministrativeArea", "name": "Karen" },
          { "@type": "AdministrativeArea", "name": "Lavington" },
          { "@type": "AdministrativeArea", "name": "Runda" },
          { "@type": "AdministrativeArea", "name": "Muthaiga" },
          { "@type": "AdministrativeArea", "name": "Gigiri" },
          { "@type": "AdministrativeArea", "name": "Kileleshwa" },
          { "@type": "AdministrativeArea", "name": "Nairobi CBD" }
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "07:00",
            "closes": "21:00"
          }
        ],
        "founder": {
          "@type": "Person",
          "name": "Benjamin Johnson",
          "jobTitle": "Master Barber & Grooming Craftsman"
        }
      })
    },
    // 2. FAQPage Schema for AI Answer Engines (Perplexity, ChatGPT, Claude, Google Gemini / SGE)
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What mobile barber services does BenjiCutz provide in Nairobi?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "BenjiCutz provides master executive haircuts, precision beard sculpting, micro-airblading hairline restoration, organic hot towel scalp treatments, and VIP in-suite house calls across Nairobi."
            }
          },
          {
            "@type": "Question",
            "name": "Which areas in Nairobi does the BenjiCutz mobile barber travel to?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "BenjiCutz provides house-call and office mobile barbering services throughout Westlands, Kilimani, Karen, Lavington, Runda, Muthaiga, Gigiri, Kileleshwa, Riverside, and Nairobi CBD."
            }
          },
          {
            "@type": "Question",
            "name": "How do BenjiCutz executive retainer tiers work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Retainer tiers are monthly grooming memberships that include scheduled bi-weekly or weekly house calls with guaranteed priority calendar reservation, complimentary scalp treatments, and zero travel surcharges."
            }
          },
          {
            "@type": "Question",
            "name": "How do I book an appointment with Master Barber Benjamin Johnson?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can book an appointment online at benjicutz.vercel.app/bookings or initiate an immediate booking conversation through the official WhatsApp Concierge (+254 792 843 862)."
            }
          },
          {
            "@type": "Question",
            "name": "What payment methods are accepted by BenjiCutz?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "BenjiCutz accepts Safaricom M-Pesa, Cash in Kenya Shillings (KES), and all major international and local Credit and Debit Cards."
            }
          }
        ]
      })
    },
    // 3. WebSite Schema
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://benjicutz.vercel.app/#website",
        "url": "https://benjicutz.vercel.app",
        "name": "BenjiCutz Craftsman Barber Parlour",
        "description": "Nairobi's luxury mobile barbering and executive grooming service.",
        "publisher": {
          "@id": "https://benjicutz.vercel.app/#barbershop"
        }
      })
    }
  ]
});

// Editorial image trail source images (barbershop lookbook)
const trailImages = [
  '/images/model.webp',
  '/images/model1.webp',
  '/images/about.webp',
  '/images/about2.webp',
  '/images/tool.webp',
  '/images/fatherson.webp',
  '/images/about3.webp',
];

const { tiers } = useRetainer();

// Section Animation Refs
const heroSection = ref<HTMLElement | null>(null);
const heroEyebrow = ref<HTMLElement | null>(null);
const heroCtaWrap = ref<HTMLElement | null>(null);
const heroLeftFrame = ref<HTMLElement | null>(null);
const heroLeftImg = ref<HTMLElement | null>(null);
const heroRightFrame = ref<HTMLElement | null>(null);
const heroRightImg = ref<HTMLElement | null>(null);
const heroCenterCol = ref<HTMLElement | null>(null);
const heroQuote = ref<HTMLElement | null>(null);

const manifestoSection = ref<HTMLElement | null>(null);
const manifestoMainImg = ref<HTMLElement | null>(null);
const manifestoInnerImg = ref<HTMLElement | null>(null);
const manifestoFloatCard = ref<HTMLElement | null>(null);
const manifestoWatermark = ref<HTMLElement | null>(null);

const pricingSection = ref<HTMLElement | null>(null);
const pricingCenterImg = ref<HTMLElement | null>(null);

const retainerSection = ref<HTMLElement | null>(null);
const retainerWatermark = ref<HTMLElement | null>(null);
let mm: gsap.MatchMedia | null = null;

// Magnetic CTA button physics (desktop only)
const onCtaMouseMove = (e: MouseEvent) => {
  if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
  const target = e.currentTarget as HTMLElement;
  if (!target) return;
  const rect = target.getBoundingClientRect();
  const relX = e.clientX - rect.left - rect.width / 2;
  const relY = e.clientY - rect.top - rect.height / 2;
  gsap.to(target, {
    x: relX * 0.25,
    y: relY * 0.25,
    duration: 0.35,
    ease: "power2.out",
  });
};

const onCtaMouseLeave = (e: MouseEvent) => {
  if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
  const target = e.currentTarget as HTMLElement;
  if (!target) return;
  gsap.to(target, {
    x: 0,
    y: 0,
    duration: 0.65,
    ease: "elastic.out(1, 0.4)",
  });
};

onMounted(async () => {
  await nextTick();

  // WCAG 2.3.3: Respect user's reduced-motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  gsap.registerPlugin(ScrollTrigger);

  mm = gsap.matchMedia();

  if (prefersReducedMotion) return;

  // DESKTOP ONLY: Rich Parallax & Multi-Layered Scrubbing (>= 1024px)
  mm.add("(min-width: 1024px)", () => {
    // Left Editorial Frame & Inner Image Parallax Scrub
    if (heroLeftFrame.value && heroSection.value) {
      gsap.to(heroLeftFrame.value, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: heroSection.value,
          start: "top top",
          end: "bottom top",
          scrub: 1.0,
        },
      });
    }

    if (heroLeftImg.value && heroSection.value) {
      gsap.to(heroLeftImg.value, {
        y: 40,
        ease: "none",
        scrollTrigger: {
          trigger: heroSection.value,
          start: "top top",
          end: "bottom top",
          scrub: 1.0,
        },
      });
    }

    // Right Portrait Frame & Inner Image Parallax Scrub
    if (heroRightFrame.value && heroSection.value) {
      gsap.to(heroRightFrame.value, {
        y: 60,
        ease: "none",
        scrollTrigger: {
          trigger: heroSection.value,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }

    if (heroRightImg.value && heroSection.value) {
      gsap.to(heroRightImg.value, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: heroSection.value,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }

    // Watermark & Floating Cards Desktop Parallax
    if (manifestoWatermark.value && manifestoSection.value) {
      gsap.to(manifestoWatermark.value, {
        x: -80,
        y: 60,
        ease: "none",
        scrollTrigger: {
          trigger: manifestoSection.value,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }

    if (manifestoMainImg.value && manifestoSection.value) {
      gsap.to(manifestoMainImg.value, {
        y: 25,
        ease: "none",
        scrollTrigger: {
          trigger: manifestoSection.value,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.0,
        },
      });
    }

    if (manifestoFloatCard.value && manifestoSection.value) {
      gsap.to(manifestoFloatCard.value, {
        y: -30,
        rotate: 1,
        ease: "none",
        scrollTrigger: {
          trigger: manifestoSection.value,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }

    if (pricingCenterImg.value && pricingSection.value) {
      gsap.to(pricingCenterImg.value, {
        y: -50,
        scale: 1.03,
        ease: "none",
        scrollTrigger: {
          trigger: pricingSection.value,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }

    if (retainerWatermark.value && retainerSection.value) {
      gsap.to(retainerWatermark.value, {
        y: 70,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: retainerSection.value,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }
  });

  // ALL SCREENS: Smooth Scroll Triggered Reveals (Headings, Cards, Stitch Lines)
  if (manifestoSection.value) {
    gsap.from(".manifesto-title", {
      yPercent: 80,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: manifestoSection.value,
        start: "top 85%",
        once: true,
      },
    });

    gsap.from(".manifesto-anim", {
      y: 16,
      opacity: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: "power3.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: manifestoSection.value,
        start: "top 85%",
        once: true,
      },
    });

    gsap.from(".metric-card", {
      y: 18,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power2.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".manifesto-metrics",
        start: "top 90%",
        once: true,
      },
    });
  }

  if (pricingSection.value) {
    gsap.from(".pricing-title", {
      yPercent: 80,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: pricingSection.value,
        start: "top 85%",
        once: true,
      },
    });

    gsap.from(".pricing-card", {
      y: 18,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: pricingSection.value,
        start: "top 85%",
        once: true,
      },
    });

    gsap.from(".dotted-line", {
      scaleX: 0,
      duration: 0.7,
      stagger: 0.03,
      ease: "power2.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: pricingSection.value,
        start: "top 80%",
        once: true,
      },
    });
  }

  if (retainerSection.value) {
    gsap.from(".retainer-title", {
      yPercent: 80,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: retainerSection.value,
        start: "top 90%",
        once: true,
      },
    });

    gsap.from(".retainer-card", {
      y: 25,
      opacity: 0,
      duration: 0.75,
      stagger: 0.12,
      ease: "power3.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: retainerSection.value,
        start: "top 92%",
        once: true,
      },
    });
  }

  // Ensure all trigger start/end offsets are accurately calculated post-render
  ScrollTrigger.refresh();
});

onUnmounted(() => {
  if (mm) mm.revert();
});
</script>
