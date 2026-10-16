<template>
  <div class="space-y-16 md:space-y-24 py-6 md:py-10">
    <!-- HERO SECTION -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-parlour-dark/20 bg-parlour-card/60">
        <span class="w-1.5 h-1.5 rounded-full bg-parlour-gold"></span>
        <span class="text-[10px] font-bold tracking-[0.25em] text-parlour-dark/70 uppercase">
          B2B INSTITUTIONAL EDUCATION • ACCREDITED MASTERCLASSES
        </span>
      </div>

      <div class="space-y-4 max-w-4xl mx-auto">
        <h1 class="text-4xl sm:text-6xl md:text-7xl font-serif font-black uppercase text-parlour-dark tracking-tight leading-[0.95]">
          ELEVATE YOUR ACADEMY'S <br />
          <span class="italic font-light text-parlour-dark/80">CRAFT & CURRICULUM</span>
        </h1>
        <p class="text-xs sm:text-base text-parlour-dark/75 font-serif italic max-w-2xl mx-auto leading-relaxed">
          "Bridging the gap between traditional vocational training and luxury executive barbering. Certified workshops in micro-airblading, surgical scissor physics, and high-ticket client psychology led by Master Barber Benjamin Johnson."
        </p>
      </div>

      <!-- Quick Action Buttons -->
      <div class="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          :href="whatsappGeneralB2BLink"
          target="_blank"
          rel="noopener noreferrer"
          class="px-8 py-4 bg-parlour-dark text-parlour-cream hover:bg-transparent hover:text-parlour-dark border-2 border-parlour-dark font-serif font-bold text-xs uppercase tracking-widest transition-all shadow-xl inline-flex items-center gap-2"
        >
          <span>Request Institutional Proposal</span>
          <span>→</span>
        </a>
        <a
          href="#workshops"
          class="px-8 py-4 bg-parlour-card border-2 border-parlour-dark text-parlour-dark hover:bg-parlour-dark hover:text-parlour-cream font-serif font-bold text-xs uppercase tracking-widest transition-all inline-flex items-center gap-2"
        >
          <span>Explore Masterclasses</span>
          <span>↓</span>
        </a>
      </div>
    </section>

    <!-- SECTION 1: INSTITUTIONAL PSYCHOLOGY & VALUE PILLARS -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-parlour-dark/10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Pillar 1 -->
        <div class="p-8 bg-parlour-cream border-2 border-parlour-dark shadow-md space-y-4 flex flex-col justify-between">
          <div class="space-y-3">
            <span class="text-xs font-serif font-bold text-parlour-gold tracking-widest block">01 / EMPLOYABILITY ROI</span>
            <h3 class="font-serif font-bold text-xl uppercase text-parlour-dark">10X Graduate Value</h3>
            <p class="text-xs text-parlour-dark/80 leading-relaxed">
              Equip your students to command KES 4,500+ executive service tickets upon graduation rather than low-yield commercial cuts.
            </p>
          </div>
          <div class="pt-4 border-t border-parlour-dark/15 text-[10px] font-bold uppercase tracking-widest text-parlour-dark/60">
            ✓ Premium Job Placement
          </div>
        </div>

        <!-- Pillar 2 -->
        <div class="p-8 bg-parlour-cream border-2 border-parlour-dark shadow-md space-y-4 flex flex-col justify-between">
          <div class="space-y-3">
            <span class="text-xs font-serif font-bold text-parlour-gold tracking-widest block">02 / AIRBLADING REVOLUTION</span>
            <h3 class="font-serif font-bold text-xl uppercase text-parlour-dark">Proprietary Hairline Tech</h3>
            <p class="text-xs text-parlour-dark/80 leading-relaxed">
              Hands-on clinical training on non-invasive pneumatic micro-pigment alignment and organic mineral dye chemistry.
            </p>
          </div>
          <div class="pt-4 border-t border-parlour-dark/15 text-[10px] font-bold uppercase tracking-widest text-parlour-dark/60">
            ✓ Cutting-Edge Distinction
          </div>
        </div>

        <!-- Pillar 3 -->
        <div class="p-8 bg-parlour-cream border-2 border-parlour-dark shadow-md space-y-4 flex flex-col justify-between">
          <div class="space-y-3">
            <span class="text-xs font-serif font-bold text-parlour-gold tracking-widest block">03 / HOSPITAL-GRADE STANDARD</span>
            <h3 class="font-serif font-bold text-xl uppercase text-parlour-dark">Clinical Sterilization</h3>
            <p class="text-xs text-parlour-dark/80 leading-relaxed">
              Instill medical-grade autoclave hygiene, UV-C sanitation field procedures, and zero cross-contamination protocols.
            </p>
          </div>
          <div class="pt-4 border-t border-parlour-dark/15 text-[10px] font-bold uppercase tracking-widest text-parlour-dark/60">
            ✓ WHO & MOH Compliant
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 2: MASTERCLASSES & WORKSHOPS GRID (#workshops) -->
    <section id="workshops" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-parlour-dark/10">
      <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <span class="text-xs font-bold tracking-[0.3em] uppercase text-parlour-dark/60">ACCREDITED SYLLABUS</span>
        <h2 class="text-3xl sm:text-5xl font-serif font-black uppercase text-parlour-dark tracking-tight">
          INTENSIVE WORKSHOP MODULES
        </h2>
        <p class="text-xs text-parlour-dark/70">
          Available for on-campus institutional bookings across Kenya or in-studio master cohorts in Nairobi.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div
          v-for="workshop in workshopOfferings"
          :key="workshop.id"
          class="bg-parlour-cream border-2 border-parlour-dark shadow-2xl flex flex-col justify-between overflow-hidden group hover:border-parlour-dark transition-all duration-300"
        >
          <div>
            <!-- Workshop Header Image with Badges -->
            <div class="relative h-64 sm:h-72 overflow-hidden border-b-2 border-parlour-dark bg-parlour-dark">
              <img
                :src="workshop.image"
                :alt="workshop.title"
                class="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100"
              />
              <div class="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                <span class="px-3 py-1 bg-parlour-gold text-parlour-dark text-[9px] font-bold uppercase tracking-widest shadow-md">
                  {{ workshop.targetAudience }}
                </span>
                <span class="px-2.5 py-0.5 bg-parlour-dark/90 backdrop-blur-md text-parlour-cream text-[9px] font-mono font-bold uppercase tracking-wider border border-parlour-cream/20 inline-flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>{{ workshop.durationHours }} HOURS INTENSIVE</span>
                </span>
              </div>
              <div class="absolute bottom-4 right-4 bg-parlour-dark/90 backdrop-blur-md px-4 py-1.5 border border-parlour-gold/40 text-parlour-gold font-serif font-black text-sm sm:text-base uppercase">
                KES {{ workshop.priceKes.toLocaleString() }}
              </div>
            </div>

            <!-- Workshop Body Content -->
            <div class="p-8 space-y-6">
              <div class="space-y-1">
                <span class="text-[9px] font-mono font-bold tracking-widest text-parlour-dark/50 uppercase block">
                  MODULE NO. {{ workshop.moduleCode }} • {{ workshop.location }}
                </span>
                <h3 class="font-serif font-black text-2xl uppercase text-parlour-dark tracking-tight leading-snug">
                  {{ workshop.title }}
                </h3>
              </div>

              <p class="text-xs sm:text-sm text-parlour-dark/80 leading-relaxed font-serif">
                {{ workshop.description }}
              </p>

              <!-- Learning Outcomes / Syllabus Highlights -->
              <div class="pt-4 border-t border-parlour-dark/15 space-y-2">
                <span class="text-[10px] font-bold uppercase tracking-widest text-parlour-dark/60 block">CURRICULUM INCLUSIONS:</span>
                <ul class="space-y-2 text-xs text-parlour-dark/80">
                  <li v-for="(outcome, i) in workshop.outcomes" :key="i" class="flex items-start gap-2.5">
                    <span class="text-parlour-dark font-black">✓</span>
                    <span>{{ outcome }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Bottom Action Button -->
          <div class="p-8 pt-0">
            <button
              type="button"
              @click="requestB2bBooking(workshop.title, workshop.targetAudience)"
              class="w-full py-4 bg-parlour-dark text-parlour-cream hover:bg-transparent hover:text-parlour-dark border-2 border-parlour-dark font-serif font-bold text-xs uppercase tracking-widest text-center block transition-all shadow-md"
            >
              Book Workshop for Your Institution →
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 3: 4-STAGE ACCREDITATION SYLLABUS & SEAL -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-parlour-dark/10 bg-parlour-card/40">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <!-- Syllabus Stages -->
        <div class="lg:col-span-8 space-y-8">
          <div class="space-y-2">
            <span class="text-[11px] font-bold tracking-[0.3em] uppercase text-parlour-dark/60 block">
              TRAINING PEDAGOGY
            </span>
            <h2 class="text-3xl sm:text-5xl font-serif font-black uppercase text-parlour-dark tracking-tight leading-tight">
              THE 4-STAGE CRAFTSMAN FRAMEWORK
            </h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="p-5 bg-parlour-cream border border-parlour-dark/20 space-y-2">
              <span class="text-sm font-serif font-bold text-parlour-gold block">PHASE 01</span>
              <h4 class="font-serif font-bold text-base text-parlour-dark uppercase">Cranial Mapping & Diagnostics</h4>
              <p class="text-xs text-parlour-dark/70 leading-relaxed">
                Analyzing bone structure, growth directions, cowlicks, and receding temple lines for custom silhouette planning.
              </p>
            </div>

            <div class="p-5 bg-parlour-cream border border-parlour-dark/20 space-y-2">
              <span class="text-sm font-serif font-bold text-parlour-gold block">PHASE 02</span>
              <h4 class="font-serif font-bold text-base text-parlour-dark uppercase">Hitachi Steel Calibration</h4>
              <p class="text-xs text-parlour-dark/70 leading-relaxed">
                Mastery of shear angle ergonomics, scissor-over-comb weight balance, and seamless zero-gap taper fades.
              </p>
            </div>

            <div class="p-5 bg-parlour-cream border border-parlour-dark/20 space-y-2">
              <span class="text-sm font-serif font-bold text-parlour-gold block">PHASE 03</span>
              <h4 class="font-serif font-bold text-base text-parlour-dark uppercase">Micro-Pigment Chemistry</h4>
              <p class="text-xs text-parlour-dark/70 leading-relaxed">
                Pneumatic airbrush pressure calibration, hypoallergenic mineral dye mixing, and crisp hairline feathering.
              </p>
            </div>

            <div class="p-5 bg-parlour-cream border border-parlour-dark/20 space-y-2">
              <span class="text-sm font-serif font-bold text-parlour-gold block">PHASE 04</span>
              <h4 class="font-serif font-bold text-base text-parlour-dark uppercase">Executive Client Psychology</h4>
              <p class="text-xs text-parlour-dark/70 leading-relaxed">
                Discretion protocols, in-suite etiquette, time management, and converting one-time house calls into monthly retainers.
              </p>
            </div>
          </div>
        </div>

        <!-- Master Certificate Seal & Endorsement Card -->
        <div class="lg:col-span-4 bg-parlour-cream p-8 border-2 border-parlour-dark shadow-2xl space-y-6 text-center">
          <div class="w-20 h-20 rounded-full border-2 border-dashed border-parlour-dark/50 mx-auto flex items-center justify-center text-[10px] font-black uppercase tracking-tighter text-parlour-dark">
            ACCREDITED<br />MASTER<br />SEAL
          </div>
          <div class="space-y-2">
            <span class="text-[9px] font-bold tracking-widest text-parlour-dark/60 uppercase block">OFFICIAL ENDORSEMENT</span>
            <h3 class="font-serif font-black text-xl uppercase text-parlour-dark">Certificate of Master Craftsmanship</h3>
            <p class="text-xs text-parlour-dark/75 leading-relaxed font-serif italic">
              "Awarded to graduating cohorts who demonstrate surgical blade control, sterile setup compliance, and micro-airblading mastery."
            </p>
          </div>
          <div class="pt-4 border-t border-parlour-dark/15 text-[10px] font-mono text-parlour-dark/60 uppercase font-bold">
            Signed: Benjamin Johnson • Founder
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 4: INSTITUTIONAL RFQ & CONTACT CTA -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-parlour-dark text-parlour-cream border-y-2 border-parlour-dark">
      <div class="max-w-4xl mx-auto text-center space-y-8">
        <div class="space-y-3">
          <span class="text-xs font-bold tracking-[0.3em] uppercase text-parlour-gold block">
            PARTNER WITH CRAFTSMAN ACADEMY
          </span>
          <h2 class="text-3xl sm:text-5xl font-serif font-black uppercase text-parlour-cream tracking-tight">
            BOOK A WORKSHOP OR GUEST MASTERCLASS
          </h2>
          <p class="text-xs sm:text-sm text-parlour-cream/80 max-w-xl mx-auto leading-relaxed">
            We partner with beauty academies, technical institutes, luxury salon chains, and grooming brands across East Africa. Custom schedules and on-campus formats available.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            :href="whatsappGeneralB2BLink"
            target="_blank"
            rel="noopener noreferrer"
            class="px-8 py-4 bg-parlour-gold text-parlour-dark hover:bg-parlour-cream font-serif font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-2xl border border-parlour-gold inline-flex items-center gap-2"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <span>WhatsApp B2B Inquiry: +254 751 022224</span>
            <span>→</span>
          </a>
          <a
            href="mailto:craftsman@barbershop.co.ke?subject=Institutional%20Masterclass%20Partnership%20Inquiry"
            class="px-8 py-4 bg-transparent text-parlour-cream hover:bg-parlour-cream hover:text-parlour-dark border border-parlour-cream/40 font-serif font-bold text-xs uppercase tracking-widest transition-all inline-flex items-center gap-2"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span>Email Institutional Desk</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "#imports";

useHead({
  title: "Barber Academy & B2B Masterclasses • Precision Haircutting Nairobi",
  meta: [
    {
      name: "description",
      content: "Professional accredited masterclasses in micro-airblading, anatomical fade engineering, and mobile barber business ergonomics for barbers and beauty academies in Nairobi."
    },
    { property: "og:title", content: "BenjiCutz Barber Academy & Masterclasses Nairobi" },
    { property: "og:description", content: "Hands-on anatomical cutting and hairline restoration masterclasses for aspiring and master craftsmen." },
    { property: "og:url", content: "https://benjicutz.vercel.app/academy" },
    { property: "og:image", content: "https://benjicutz.vercel.app/images/about2.webp" }
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Course",
        "name": "Micro-Airblading & Precision Hairline Masterclass",
        "description": "Professional 6-hour masterclass covering organic pigment blending, hairline restoration techniques, and anatomical head morphology.",
        "provider": {
          "@type": "Organization",
          "name": "BenjiCutz Craftsman Academy",
          "sameAs": "https://benjicutz.vercel.app"
        }
      })
    }
  ]
});

const workshopOfferings = [
  {
    id: "wshop-01",
    moduleCode: "M-01",
    title: "Masterclass: Micro-Airblading Hairline Restoration",
    durationHours: 6,
    targetAudience: "Technical Colleges & Beauty Academies",
    location: "On-Campus & In-Studio",
    priceKes: 25000,
    image: "/images/hairline.jpg",
    description: "Hands-on intensive masterclass covering pneumatic compressor calibration, organic mineral tint alignment, scalp anatomy, and razor-sharp hairline edge symmetry.",
    outcomes: [
      "Pneumatic Airbrush Operation & Maintenance",
      "Hypoallergenic Mineral Pigment Chemistry & Blending",
      "Temple & Receding Hairline Architectural Reconstruction",
      "Live Model Practice & Individual Feedback Sessions",
      "Official Craftsman Micro-Airblading Certificate"
    ]
  },
  {
    id: "wshop-02",
    moduleCode: "M-02",
    title: "Executive Scissor Ergonomics & Taper Fade Architecture",
    durationHours: 5,
    targetAudience: "Professional Barbers & Luxury Salons",
    location: "Westlands Studio & Salon Host Visits",
    priceKes: 20000,
    image: "/images/tools.jpg",
    description: "Deep dive into Japanese Hitachi 440C convex steel shears, scissor-over-comb texture physics, drop fades, and zero-compromise neckline finishes.",
    outcomes: [
      "Biomechanical Finger & Wrist Ergonomics to Prevent Fatigue",
      "Surgical Scissor-Over-Comb Weight & Density Balancing",
      "Skin-Fade Gradient Transition Physics (Zero to High)",
      "Single-Use Feather Razor Straight Blade Techniques",
      "Hospital-Grade Autoclave Sterilization Protocols"
    ]
  },
  {
    id: "wshop-03",
    moduleCode: "M-03",
    title: "Mobile Studio Economics & High-Ticket Client Retention",
    durationHours: 4,
    targetAudience: "Craft Entrepreneurs & Studio Owners",
    location: "Kileleshwa Craftsman Hub",
    priceKes: 18000,
    image: "/images/session.jpeg",
    description: "The business blueprint for private in-suite house calls: route logistics, pricing psychology, converting one-off bookings to recurring VIP retainers.",
    outcomes: [
      "In-Suite Penthouse Studio Deployment in Under 5 Minutes",
      "Nairobi High-Value Client Confidentiality & NDA Protocols",
      "Tiered Monthly Retainer Pricing (KES 9K - 16K Packaging)",
      "Logistics Optimization & Zone-Based Travel Scheduling",
      "Digital Client Rebooking & Retention Systems"
    ]
  },
  {
    id: "wshop-04",
    moduleCode: "M-04",
    title: "Institutional Faculty Training of Trainers (ToT)",
    durationHours: 12,
    targetAudience: "TVET Instructors & Vocational Faculty",
    location: "Dedicated 2-Day Campus Workshop",
    priceKes: 45000,
    image: "/images/about2.webp",
    description: "Comprehensive curriculum standard for vocational instructors to deliver modernized masterclass modules within their institution's accredited beauty syllabus.",
    outcomes: [
      "Turnkey Module Syllabus & Student Grading Rubrics",
      "Demonstration Best Practices & Live Scalp Diagnostics",
      "Hygiene Assessment Standards (UV-C & Autoclave)",
      "Institutional Co-Branded Certificate Accreditation",
      "Ongoing Faculty Support & Master Video Library Access"
    ]
  }
];

const whatsappGeneralB2BLink = `https://wa.me/254751022224?text=${encodeURIComponent(
  "Hello Craftsman Academy, I am reaching out on behalf of an educational institution / salon business regarding masterclass workshops."
)}`;

const requestB2bBooking = (title: string, audience: string) => {
  const text = encodeURIComponent(
    `Hello Master Benjamin, our institution would like to book / inquire about the '${title}' masterclass for '${audience}'.`
  );
  window.open(`https://wa.me/254751022224?text=${text}`, "_blank");
};
</script>
