<template>
  <div>
    <!-- FULL-SCREEN CINEMATIC HERO SECTION -->
    <section class="relative min-h-[92vh] flex items-center justify-center text-parlour-cream overflow-hidden border-b-2 border-parlour-dark">
      <!-- Background Image with Scrim & Grain Overlay -->
      <div class="absolute inset-0 z-0">
        <img
          src="/images/about3.webp"
          alt="Master Barber Benjamin Johnson in Executive Mobile Suite"
          class="w-full h-full object-cover object-center scale-105 transform hover:scale-100 transition-transform duration-1000 ease-out brightness-90"
        />
        <!-- Multi-layer Gradient Scrim for Editorial Contrast -->
        <div class="absolute inset-0 bg-gradient-to-t from-parlour-dark via-parlour-dark/75 to-parlour-dark/50"></div>
        <div class="absolute inset-0 bg-radial-at-c from-transparent via-parlour-dark/30 to-parlour-dark/80"></div>
      </div>

      <!-- Hero Content Container -->
      <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center space-y-8">
        <!-- Top Badge -->
        <div class="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-parlour-gold/40 bg-parlour-dark/70 backdrop-blur-md">
          <span class="w-2 h-2 rounded-full bg-parlour-gold animate-pulse"></span>
          <span class="text-[11px] font-bold tracking-[0.25em] text-parlour-gold uppercase">
            EST. 2020 • NAIROBI EXECUTIVE CONCIERGE
          </span>
        </div>

        <!-- Grand Serif Headline -->
        <div class="space-y-4">
          <h1 class="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-black tracking-tight uppercase leading-[0.95] text-parlour-cream">
            THE ART OF <br />
            PRIVATE GROOMING <br />
            <span class="italic font-normal text-parlour-gold/90">& Identity Restoration</span>
          </h1>
          <p class="text-base sm:text-xl text-parlour-cream/80 max-w-2xl mx-auto font-serif font-light leading-relaxed pt-2">
            The private mobile studio founded by Benjamin Johnson, delivering white-glove barbering, bespoke hairline micro-airblading, and zero-wait luxury directly to Nairobi's residences and penthouses.
          </p>
        </div>

        <!-- Call to Action Buttons -->
        <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <NuxtLink
            to="/shop/booking"
            class="px-8 py-4 bg-parlour-gold text-parlour-dark hover:bg-parlour-cream font-serif font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-2xl inline-flex items-center gap-2 border border-parlour-gold"
          >
            <span>Book House Call</span>
            <span>→</span>
          </NuxtLink>
          <a
            href="#story"
            class="px-8 py-4 bg-parlour-dark/60 backdrop-blur-md text-parlour-cream hover:bg-parlour-cream hover:text-parlour-dark font-serif font-bold text-xs uppercase tracking-widest transition-all duration-300 border border-parlour-cream/30 inline-flex items-center gap-2"
          >
            <span>Read Our Manifesto</span>
            <span>↓</span>
          </a>
        </div>
      </div>

      <!-- Bottom Hero Info Ticker Bar -->
      <div class="absolute bottom-0 left-0 right-0 z-10 bg-parlour-dark/90 backdrop-blur-md border-t border-parlour-cream/15 text-[11px] uppercase tracking-widest text-parlour-cream/70 py-3.5 px-4">
        <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <div class="flex items-center gap-2">
            <span class="text-parlour-gold font-bold">CRAFTSMAN:</span>
            <span>Benjamin Johnson (Master Barber)</span>
          </div>
          <div class="hidden md:block text-parlour-cream/30">•</div>
          <div class="flex items-center gap-2">
            <span class="text-parlour-gold font-bold">DISCRETION:</span>
            <span>Strict 6 Appointments / Day Cap</span>
          </div>
          <div class="hidden md:block text-parlour-cream/30">•</div>
          <div class="flex items-center gap-2">
            <span class="text-parlour-gold font-bold">ZONES:</span>
            <span>Kileleshwa • Westlands • Lavington • Kilimani • Eastlands</span>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 1: THE FOUNDER'S LETTER & NARRATIVE (#story) -->
    <section id="story" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <!-- Master Barber Portrait & Badge -->
        <div class="lg:col-span-5 relative space-y-4">
          <div class="relative overflow-hidden rounded-sm border-2 border-parlour-dark shadow-2xl group">
            <img
              src="/images/benjamin.jpg"
              alt="Benjamin Johnson Master Craftsman"
              class="w-full h-[800px] object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-parlour-dark/90 via-transparent to-transparent"></div>
            <div class="absolute bottom-6 left-6 right-6 text-parlour-cream">
              <span class="text-[10px] tracking-widest uppercase font-bold text-parlour-gold block mb-1">FOUNDER & MASTER CRAFTSMAN</span>
              <h3 class="font-serif font-black text-2xl uppercase tracking-tight">Benjamin Johnson</h3>
              <p class="text-xs text-parlour-cream/70 font-serif italic mt-1">12+ Years Precision Scissor & Hairline Specialist</p>
            </div>
          </div>

          <!-- Vintage Seal -->
          <div class="p-4 bg-parlour-card border border-parlour-dark/20 text-xs flex items-center justify-between">
            <span class="font-bold text-parlour-dark tracking-wider uppercase text-[10px]">VERIFIED MASTER CERTIFICATE</span>
            <span class="text-[10px] font-mono text-parlour-dark/60 font-bold">NAIROBI • NO. 020-BJ</span>
          </div>
        </div>

        <!-- The Letter Content -->
        <div class="lg:col-span-7 space-y-6">
          <div class="space-y-2">
            <span class="text-[11px] font-bold tracking-[0.3em] uppercase text-parlour-dark/60 block">
              A LETTER FROM THE MASTER
            </span>
            <h2 class="text-3xl sm:text-5xl font-serif font-black uppercase text-parlour-dark tracking-tight leading-tight">
              "WE VALUE YOUR TIME AS MUCH AS YOUR SILHOUETTE."
            </h2>
          </div>

          <p class="text-base text-parlour-dark/90 leading-relaxed font-serif">
            When I began cutting hair over a decade ago, I realized that true luxury wasn't marble floors in a crowded shopping mall. True luxury is <em>time</em>, <em>peace</em>, and <em>undivided precision</em>.
          </p>

          <p class="text-sm text-parlour-dark/80 leading-relaxed">
            In Nairobi, senior executives, diplomats, and business leaders lose hours in heavy traffic just to sit in a bustling barbershop where the barber is rushing through a 20-minute cut to reach the next walk-in client.
          </p>

          <p class="text-sm text-parlour-dark/80 leading-relaxed">
            In 2020, I founded <strong>Craftsman Mobile Barber Parlour</strong> with a strict standard: we travel to you. We set up an immaculate, sterile mobile atelier in your private residence or penthouse suite. We reserve a full hour for your cut, beard sculpting, organic botanical facial steam, and micro-airblading hairline work. No queues, no rushing, no compromises.
          </p>

          <!-- Signature Block -->
          <div class="pt-6 border-t border-parlour-dark/20 flex items-center justify-between">
            <div>
              <div class="font-serif italic font-bold text-2xl text-parlour-dark tracking-tight">Benjamin Johnson</div>
              <span class="text-[10px] uppercase font-bold tracking-widest text-parlour-dark/60 block">Founder & Master Barber • Craftsman Parlour</span>
            </div>
            <div class="w-16 h-16 rounded-full border-2 border-dashed border-parlour-dark/40 flex items-center justify-center text-[9px] font-black uppercase tracking-tighter text-center text-parlour-dark">
              SEAL OF<br />CRAFT
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 2: THE 5-STAGE HOUSE CALL RITUAL (Experience Journey) -->
    <section class="bg-parlour-dark text-parlour-cream py-20 border-y-2 border-parlour-dark">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div class="text-center max-w-2xl mx-auto space-y-3">
          <span class="text-xs font-bold tracking-[0.3em] uppercase text-parlour-gold">THE HOUSE CALL JOURNEY</span>
          <h2 class="text-4xl sm:text-5xl font-serif font-black uppercase text-parlour-cream tracking-tight">
            THE 5-STAGE ATELIER RITUAL
          </h2>
          <p class="text-xs text-parlour-cream/70 leading-relaxed">
            How we transform your home or office into a world-class private grooming parlour in under 5 minutes.
          </p>
        </div>

        <!-- 5-Step Timeline Grid -->
        <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div
            v-for="(step, i) in ritualSteps"
            :key="i"
            class="bg-parlour-dark/80 border border-parlour-cream/20 p-6 flex flex-col justify-between space-y-6 relative hover:border-parlour-gold transition-colors duration-300"
          >
            <div class="space-y-4">
              <span class="text-2xl font-serif font-bold text-parlour-gold block">{{ step.number }}</span>
              <h3 class="font-serif font-bold text-base text-parlour-cream uppercase tracking-wider">{{ step.title }}</h3>
              <p class="text-xs text-parlour-cream/70 leading-relaxed">
                {{ step.description }}
              </p>
            </div>
            <div class="pt-4 border-t border-parlour-cream/10 text-[10px] font-mono text-parlour-gold uppercase flex items-center gap-1">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>{{ step.duration }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 3: THE CRAFTSMAN DIFFERENCE (Comparative Advantage Matrix) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span class="text-xs font-bold tracking-[0.3em] uppercase text-parlour-dark/60">WHY EXECUTIVES CHOOSE US</span>
        <h2 class="text-4xl sm:text-5xl font-serif font-black uppercase text-parlour-dark tracking-tight">
          THE STANDARD OF DISTINCTION
        </h2>
        <p class="text-xs text-parlour-dark/70">
          Comparing the Craftsman VIP concierge model against conventional commercial salons.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <!-- Conventional Salons Card -->
        <div class="bg-parlour-card/60 p-8 border border-parlour-dark/20 space-y-6">
          <div class="flex items-center justify-between border-b border-parlour-dark/20 pb-4">
            <h3 class="font-serif font-bold text-xl uppercase text-parlour-dark/70">Commercial Barbershops</h3>
            <span class="text-xs font-bold px-2.5 py-1 bg-parlour-dark/10 text-parlour-dark/60 uppercase">The Standard Market</span>
          </div>

          <ul class="space-y-4 text-xs text-parlour-dark/80">
            <li class="flex items-start gap-3">
              <span class="text-red-700 font-bold text-sm">✕</span>
              <span><strong>2+ Hours Travel & Waiting:</strong> Battling Nairobi traffic and sitting in public reception areas.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-red-700 font-bold text-sm">✕</span>
              <span><strong>Shared & Rushed Equipment:</strong> Rapid tool turnover between walk-in clients with minimal sterilization.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-red-700 font-bold text-sm">✕</span>
              <span><strong>Distracted Attention:</strong> High volume incentives mean 20-minute haircuts with frequent interruptions.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-red-700 font-bold text-sm">✕</span>
              <span><strong>Zero Privacy:</strong> Open salon floor with public visibility and noisy surroundings.</span>
            </li>
          </ul>
        </div>

        <!-- Craftsman Mobile Studio Card -->
        <div class="bg-parlour-cream p-8 border-2 border-parlour-dark shadow-2xl space-y-6 relative overflow-hidden">
          <div class="absolute top-0 right-0 bg-parlour-dark text-parlour-gold text-[10px] font-bold uppercase tracking-widest px-4 py-1">
            EXECUTIVE STANDARD
          </div>

          <div class="flex items-center justify-between border-b-2 border-parlour-dark pb-4">
            <h3 class="font-serif font-black text-2xl uppercase text-parlour-dark">Craftsman Concierge</h3>
            <span class="text-xs font-bold px-2.5 py-1 bg-parlour-dark text-parlour-cream uppercase">Our Commitment</span>
          </div>

          <ul class="space-y-4 text-xs text-parlour-dark">
            <li class="flex items-start gap-3">
              <span class="text-parlour-dark font-black text-sm">✓</span>
              <span><strong>Zero Travel Time:</strong> Complete mobile atelier delivered to your doorstep, study, or penthouse.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-parlour-dark font-black text-sm">✓</span>
              <span><strong>Medical-Grade Sanitation:</strong> Autoclave & UV-sterilized tools with brand-new Japanese razor blades.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-parlour-dark font-black text-sm">✓</span>
              <span><strong>60-Minute Dedicated Session:</strong> Unrushed master craftsmanship tailored to your cranial geometry.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-parlour-dark font-black text-sm">✓</span>
              <span><strong>Absolute Discretion:</strong> Strict NDA compliance, quiet ambiance, and total personal privacy.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- SECTION 4: THE ATELIER REPOSITORY & BOTANICAL APOTHECARY -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 border-t border-parlour-dark/10">
      <!-- Section Header with Magazine Typography -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-parlour-dark/15">
        <div class="space-y-3 max-w-2xl">
          <div class="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.3em] uppercase text-parlour-gold bg-parlour-dark px-3 py-1">
            <span>ARCHIVE NO. 04</span>
            <span>•</span>
            <span>THE ATELIER REPOSITORY</span>
          </div>
          <h2 class="text-3xl sm:text-5xl lg:text-6xl font-serif font-black uppercase text-parlour-dark tracking-tight leading-[0.95]">
            SURGICAL STEEL <br class="hidden sm:inline" />
            <span class="italic font-light text-parlour-dark/80">& BOTANICAL ALCHEMY</span>
          </h2>
        </div>
        <p class="text-xs sm:text-sm text-parlour-dark/80 max-w-md leading-relaxed font-serif">
          "The precision of the master is limited only by his steel. Every blade, compressor, and organic elixir is calibrated for zero-friction skin health and clinical purity."
        </p>
      </div>

      <!-- Asymmetrical Editorial Visual Showcase (Fully Responsive on All Devices) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch pt-12">
        <!-- Main Tool Frame (Full width on mobile, 7 cols on desktop) -->
        <div class="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div class="group relative overflow-hidden rounded-sm border-2 border-parlour-dark shadow-2xl bg-parlour-dark">
            <img
              src="/images/tools.jpg"
              alt="Handcrafted Artisan Shears, Straight Razors, and Grooming Kit"
              class="w-full h-72 sm:h-96 lg:h-[440px] object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100"
            />
            <!-- Overlay Metadata Plate -->
            <div class="absolute top-4 left-4 bg-parlour-dark/90 backdrop-blur-md border border-parlour-gold/40 px-3 py-1.5 text-parlour-cream text-[10px] font-serif font-bold uppercase tracking-widest">
              HITACHI 440C • HAND-FORGED
            </div>
            <div class="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-parlour-dark via-parlour-dark/80 to-transparent p-4 text-parlour-cream">
              <span class="text-[9px] uppercase tracking-widest text-parlour-gold font-bold block mb-1">CALIBRATION STANDARD</span>
              <p class="text-xs font-serif italic text-parlour-cream/90">
                Triple-honed convex blades sharpened to 0.1mm micro-edges for crisp, split-end-free scissor-over-comb texturing.
              </p>
            </div>
          </div>

          <!-- Bottom Editorial Note -->
          <div class="p-5 bg-parlour-card border border-parlour-dark/20 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="space-y-1">
              <span class="font-bold text-parlour-dark uppercase tracking-wider text-[11px] block">AUTOCLAVE & UV-C STERILITY</span>
              <p class="text-parlour-dark/70 text-[11px]">
                Tools undergo hospital-grade ultrasonic cleansing and sealed packaging prior to every house call.
              </p>
            </div>
            <span class="self-start sm:self-center font-mono text-[10px] font-bold px-2.5 py-1 bg-parlour-dark text-parlour-gold whitespace-nowrap">
              100% DISINFECTED
            </span>
          </div>
        </div>

        <!-- Secondary Frame: Micro-Airblading Mastery (Full width on mobile, 5 cols on desktop) -->
        <div class="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div class="group relative overflow-hidden rounded-sm border-2 border-parlour-dark shadow-2xl bg-parlour-dark">
            <img
              src="/images/hairline.jpg"
              alt="Micro-Airblading Hairline Symmetry Close-Up"
              class="w-full h-72 sm:h-96 lg:h-[440px] object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100"
            />
            <!-- Overlay Metadata Plate -->
            <div class="absolute top-4 left-4 bg-parlour-dark/90 backdrop-blur-md border border-parlour-gold/40 px-3 py-1.5 text-parlour-cream text-[10px] font-serif font-bold uppercase tracking-widest">
              MICRO-AIRBLADING • SYMMETRY
            </div>
            <div class="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-parlour-dark via-parlour-dark/80 to-transparent p-4 text-parlour-cream">
              <span class="text-[9px] uppercase tracking-widest text-parlour-gold font-bold block mb-1">HAIRLINE RESTORATION</span>
              <p class="text-xs font-serif italic text-parlour-cream/90">
                Non-invasive micro-pigment alignment using organic mineral tint for natural, razor-sharp edge restoration.
              </p>
            </div>
          </div>

          <!-- Bottom Editorial Note -->
          <div class="p-5 bg-parlour-dark text-parlour-cream border border-parlour-dark text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="space-y-1">
              <span class="font-bold text-parlour-gold uppercase tracking-wider text-[11px] block">ORGANIC MINERAL DYES</span>
              <p class="text-parlour-cream/70 text-[11px]">
                Skin-safe, alcohol-free formulations that resist sweat and retain a clean hairline silhouette for days.
              </p>
            </div>
            <span class="self-start sm:self-center font-mono text-[10px] font-bold px-2.5 py-1 bg-parlour-cream text-parlour-dark whitespace-nowrap">
              DERM TESTED
            </span>
          </div>
        </div>
      </div>

      <!-- 4-Card Luxury Instrument & Formulation Spec Archive (Responsive Grid) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
        <!-- Spec 01 -->
        <div class="p-6 bg-parlour-cream border-2 border-parlour-dark shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-serif font-black text-lg text-parlour-gold">№ 01</span>
              <span class="text-[9px] font-mono uppercase px-2 py-0.5 bg-parlour-card text-parlour-dark border border-parlour-dark/15 font-bold">JAPAN</span>
            </div>
            <h4 class="font-serif font-bold text-base text-parlour-dark uppercase tracking-tight">Hitachi 440C Shears</h4>
            <p class="text-xs text-parlour-dark/75 leading-relaxed">
              Hand-forged Japanese stainless steel calibrated to 0.1mm micro-cutting edges for crisp hair silhouettes and clean weight removal.
            </p>
          </div>
          <div class="text-[10px] font-bold text-parlour-dark/60 uppercase tracking-widest pt-3 border-t border-parlour-dark/15">
            Precision • Zero Tugging
          </div>
        </div>

        <!-- Spec 02 -->
        <div class="p-6 bg-parlour-cream border-2 border-parlour-dark shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-serif font-black text-lg text-parlour-gold">№ 02</span>
              <span class="text-[9px] font-mono uppercase px-2 py-0.5 bg-parlour-card text-parlour-dark border border-parlour-dark/15 font-bold">GERMANY</span>
            </div>
            <h4 class="font-serif font-bold text-base text-parlour-dark uppercase tracking-tight">Feather Platinum Razor</h4>
            <p class="text-xs text-parlour-dark/75 leading-relaxed">
              Single-use surgical-grade straight razor blades discarded after every client for guaranteed zero contamination.
            </p>
          </div>
          <div class="text-[10px] font-bold text-parlour-dark/60 uppercase tracking-widest pt-3 border-t border-parlour-dark/15">
            100% Single-Use Hygiene
          </div>
        </div>

        <!-- Spec 03 -->
        <div class="p-6 bg-parlour-cream border-2 border-parlour-dark shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-serif font-black text-lg text-parlour-gold">№ 03</span>
              <span class="text-[9px] font-mono uppercase px-2 py-0.5 bg-parlour-card text-parlour-dark border border-parlour-dark/15 font-bold">CUSTOM</span>
            </div>
            <h4 class="font-serif font-bold text-base text-parlour-dark uppercase tracking-tight">Airblade Compressor</h4>
            <p class="text-xs text-parlour-dark/75 leading-relaxed">
              Low-pressure pneumatic micro-pigment applicator providing gradient shadow detailing along the temple and beard line.
            </p>
          </div>
          <div class="text-[10px] font-bold text-parlour-dark/60 uppercase tracking-widest pt-3 border-t border-parlour-dark/15">
            Airbrush Hairline Work
          </div>
        </div>

        <!-- Spec 04 -->
        <div class="p-6 bg-parlour-cream border-2 border-parlour-dark shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="font-serif font-black text-lg text-parlour-gold">№ 04</span>
              <span class="text-[9px] font-mono uppercase px-2 py-0.5 bg-parlour-card text-parlour-dark border border-parlour-dark/15 font-bold">KENYA</span>
            </div>
            <h4 class="font-serif font-bold text-base text-parlour-dark uppercase tracking-tight">Macadamia & Tea Tree</h4>
            <p class="text-xs text-parlour-dark/75 leading-relaxed">
              Locally cold-pressed botanical oils infused with eucalyptus steam towels to soothe scalp irritation and prevent ingrowns.
            </p>
          </div>
          <div class="text-[10px] font-bold text-parlour-dark/60 uppercase tracking-widest pt-3 border-t border-parlour-dark/15">
            Organic Scalp Wellness
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 5: NAIROBI MOBILE ZONES & LOGISTICS -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-parlour-dark/10">
      <div class="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <span class="text-xs font-bold tracking-[0.3em] uppercase text-parlour-dark/60">CONCIERGE COVERAGE</span>
        <h2 class="text-4xl sm:text-5xl font-serif font-black uppercase text-parlour-dark tracking-tight">
          NAIROBI SERVICE ZONES
        </h2>
        <p class="text-xs text-parlour-dark/70">
          On-demand travel logistics to all major residential and corporate hubs.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div
          v-for="zone in zones"
          :key="zone.name"
          class="p-6 bg-parlour-cream border border-parlour-dark/20 hover:border-parlour-dark transition-all flex flex-col justify-between space-y-4"
        >
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <h3 class="font-serif font-bold text-base text-parlour-dark uppercase">{{ zone.name }}</h3>
              <span class="text-[10px] font-mono font-bold px-2 py-0.5 bg-parlour-card text-parlour-dark border border-parlour-dark/20">
                +KES {{ zone.fee }}
              </span>
            </div>
            <p class="text-[11px] text-parlour-dark/70 leading-relaxed">
              {{ zone.description }}
            </p>
          </div>
          <div class="text-[9px] font-bold text-parlour-dark/50 uppercase tracking-widest pt-2 border-t border-parlour-dark/10 flex items-center gap-1">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>{{ zone.transit }} Transit</span>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 6: VIP RESERVATION & CONCIERGE CALLOUT -->
    <section class="bg-parlour-dark text-parlour-cream py-20 border-t-2 border-parlour-dark">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div class="space-y-3">
          <span class="text-xs font-bold tracking-[0.3em] uppercase text-parlour-gold block">
            LIMITED TO 6 CLIENTS PER DAY
          </span>
          <h2 class="text-4xl sm:text-6xl font-serif font-black uppercase text-parlour-cream tracking-tight leading-tight">
            EXPERIENCE THE WHITE GLOVE ATELIER
          </h2>
          <p class="text-sm text-parlour-cream/80 max-w-xl mx-auto leading-relaxed">
            Reserve your bespoke house call or subscribe to a monthly VIP retainer with Master Barber Benjamin Johnson.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <NuxtLink
            to="/shop/booking"
            class="px-8 py-4 bg-parlour-gold text-parlour-dark hover:bg-parlour-cream font-serif font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-2xl border border-parlour-gold inline-flex items-center gap-2"
          >
            <span>Book House Call</span>
            <span>→</span>
          </NuxtLink>
          <a
            :href="whatsappLink"
            target="_blank"
            rel="noopener noreferrer"
            class="px-8 py-4 bg-transparent text-parlour-cream hover:bg-parlour-cream hover:text-parlour-dark border border-parlour-cream/40 font-serif font-bold text-xs uppercase tracking-widest transition-all inline-flex items-center gap-2"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <span>WhatsApp Concierge: +254 751 022224</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "#imports";

useHead({
  title: "About Master Barber Benjamin Johnson • Heritage & Craftsmanship",
  meta: [
    {
      name: "description",
      content: "Discover Master Barber Benjamin Johnson and the BenjiCutz Mobile Barber Parlour. In-suite executive barbering, micro-airblading hairline restoration, and zero-wait house calls across Nairobi."
    },
    { property: "og:title", content: "Master Barber Benjamin Johnson | BenjiCutz Nairobi" },
    { property: "og:description", content: "Over a decade of anatomical fade engineering, straight-razor mastery, and executive house calls in Nairobi." },
    { property: "og:url", content: "https://benjicutz.vercel.app/about" },
    { property: "og:image", content: "https://benjicutz.vercel.app/images/about.webp" }
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Benjamin Johnson",
        "jobTitle": "Founder & Master Barber Craftsman",
        "worksFor": {
          "@type": "BarberShop",
          "name": "BenjiCutz Craftsman Barber Parlour",
          "url": "https://benjicutz.vercel.app"
        },
        "description": "Master Barber specializing in cranial anatomy hair sculpting, micro-airblading hairline restoration, and luxury house calls across Nairobi.",
        "image": "https://benjicutz.vercel.app/images/benjamin.jpg",
        "knowsAbout": [
          "Anatomical Barbering",
          "Beard Architecture",
          "Micro-Airblading Hairline Restoration",
          "Executive Grooming Concierge"
        ]
      })
    }
  ]
});

const ritualSteps = [
  {
    number: "01",
    title: "Sanitary Setup",
    description: "Deployment of floor protection, mobile studio ring lighting, and UV autoclave tool tray.",
    duration: "5 Mins"
  },
  {
    number: "02",
    title: "Cranial Mapping",
    description: "Detailed consultation assessing hairline symmetry, follicle growth, and face profile.",
    duration: "10 Mins"
  },
  {
    number: "03",
    title: "Precision Shearing",
    description: "Surgical taper fade, textured crop, or scissor-over-comb execution with Japanese steel.",
    duration: "25 Mins"
  },
  {
    number: "04",
    title: "Botanical Steam",
    description: "Hot towel eucalyptus infusion, straight razor edging, and tea tree beard conditioning.",
    duration: "15 Mins"
  },
  {
    number: "05",
    title: "Micro-Airblading",
    description: "Non-invasive mineral hairline enhancement for crisp, natural, high-definition symmetry.",
    duration: "10 Mins"
  }
];

const zones = [
  {
    name: "Kileleshwa",
    fee: 500,
    description: "Private compounds & residences.",
    transit: "15-25 Mins"
  },
  {
    name: "Westlands",
    fee: 500,
    description: "Penthouse suites & corporate towers.",
    transit: "15-30 Mins"
  },
  {
    name: "Lavington",
    fee: 500,
    description: "Diplomatic villas & estate compounds.",
    transit: "20-30 Mins"
  },
  {
    name: "Kilimani",
    fee: 600,
    description: "Executive suites near Yaya & Dennis Pritt.",
    transit: "20-35 Mins"
  },
  {
    name: "Eastlands",
    fee: 1000,
    description: "Extended zones & group bookings.",
    transit: "35-50 Mins"
  }
];

const whatsappText = encodeURIComponent("Hello Benjamin, I would like to inquire about booking an executive mobile barber session.");
const whatsappLink = `https://wa.me/254751022224?text=${whatsappText}`;
</script>
