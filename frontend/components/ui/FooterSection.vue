<template>
  <footer class="editorial-footer">
    <div class="ef-wrap">
      <div class="ef-masthead">
        <NuxtLink to="/" class="ef-signature" aria-label="Craftsman Parlour home">
          <span class="ef-monogram" aria-hidden="true">Cp.</span>
          <span>BenjiCutz<br />Parlour</span>
        </NuxtLink>
        <p class="ef-eyebrow">Nairobi, Kenya <span aria-hidden="true">/</span> By appointment</p>
      </div>

      <section class="ef-invitation" aria-label="Book a private barber appointment">
        <h2 class="ef-headline">
          <span>A cut above.</span>
          <em>At your address.</em>
        </h2>
        <div class="ef-booking">
          <p class="ef-booking-copy">
            Considered cuts. Unhurried service.<br />
            Private grooming, brought to you.
          </p>
          <a
            :href="whatsappHref"
            target="_blank"
            rel="noopener noreferrer"
            class="ef-book-link"
            aria-label="Reserve your cut on WhatsApp (opens in a new tab)"
          >
            <span class="ef-book-text">
              Reserve your cut
              <span>Arrange a house call</span>
            </span>
            <span class="ef-book-arrow" aria-hidden="true">↗</span>
          </a>
          <a
            :href="whatsappEnquiryHref"
            target="_blank"
            rel="noopener noreferrer"
            class="ef-enquiry-pill"
            aria-label="Have an inquiry? Chat on WhatsApp (opens in a new tab)"
          >
            <img src="/svgs/whatsapp-svgrepo-com.svg" alt="" class="ef-enquiry-pill-icon" aria-hidden="true" />
            <span>Have an enquiry? Chat on WhatsApp</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <div class="ef-details">
        <section class="ef-philosophy">
          <h3 class="ef-label"><span aria-hidden="true">01</span> The philosophy</h3>
          <p class="ef-statement">Good grooming is personal.<br />So is our approach.</p>
          <p class="ef-description">
            Precision, care, and a little time for yourself.
            A private barbering experience in the comfort of your own space.
          </p>
        </section>

        <nav class="ef-navigation" aria-label="Footer navigation">
          <h3 class="ef-label"><span aria-hidden="true">02</span> The craft</h3>
          <ul class="ef-links">
            <li v-for="link in links" :key="link.label">
              <NuxtLink :to="link.to" class="ef-text-link">
                {{ link.label }}
                <span aria-hidden="true">↗</span>
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <section class="ef-contact">
          <h3 class="ef-label"><span aria-hidden="true">03</span> Let's talk</h3>
          <address class="ef-address">
            <!-- Direct WhatsApp Enquiries with SVG Icon -->
            <a
              :href="whatsappEnquiryHref"
              target="_blank"
              rel="noopener noreferrer"
              class="ef-wa-contact-link"
              aria-label="Direct WhatsApp Concierge & Enquiries (opens in a new tab)"
            >
              <span class="ef-wa-badge" aria-hidden="true">
                <img src="/svgs/whatsapp-svgrepo-com.svg" alt="" class="ef-wa-icon" />
              </span>
              <span class="ef-wa-text-group">
                <span class="ef-wa-heading">WhatsApp Enquiries</span>
                <span class="ef-wa-sub">Direct message</span>
              </span>
              <span class="ef-wa-arrow" aria-hidden="true">↗</span>
            </a>

            <a :href="`tel:${business.telephone}`" class="ef-phone ef-text-link">
              {{ business.displayTelephone }}
            </a>
            <a :href="`mailto:${business.email}`" class="ef-email ef-text-link">
              {{ business.email }}
            </a>
          </address>
          <div class="ef-hours">
            <p>Monday — Sunday</p>
            <p>7:30 am — 7:00 pm</p>
          </div>
        </section>
      </div>

      <div class="ef-service-areas">
        <p class="ef-label">Across Nairobi</p>
        <ul aria-label="Mobile service areas">
          <li v-for="area in serviceAreas" :key="area">{{ area }}</li>
        </ul>
      </div>

      <!-- Decorative wordmark; the linked brand above supplies its accessible name. -->
      <div class="ef-wordmark" aria-hidden="true">
        <span v-for="(letter, index) in 'CRAFTSMAN'" :key="index">{{ letter }}</span>
      </div>
      <div class="ef-imprint" aria-hidden="true">
        <span>BenjiCutz</span>
        <span class="ef-parlour">Parlour</span>
        <span>Nairobi · KE</span>
      </div>

      <div class="ef-bottom">
        <small>© {{ year }} {{ business.name }}.</small>
        <p class="ef-motto">Confidence in every cut.</p>
        <button type="button" class="ef-top" @click="backToTop">
          Back to top <span aria-hidden="true">↑</span>
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useHead, useState } from "#imports";

// One source for the public-facing identity and its structured data.
const business = {
  name: "BenjiCutz Parlour",
  telephone: "+254751022224",
  displayTelephone: "+254 751 022224",
  email: "benbasigwa308@gmail.com",
};

const links = [
  { label: "About & heritage", to: "/about" },
  { label: "Signature haircuts", to: "/services" },
  { label: "Hairline work", to: "/services" },
  { label: "Father & son house calls", to: "/services" },
  { label: "Academy & workshops", to: "/academy" },
];

const serviceAreas = ["Kileleshwa", "Westlands", "Lavington", "Kilimani", "Eastlands"];
const whatsappHref = `https://wa.me/${business.telephone.replace(/\D/g, "")}?text=${encodeURIComponent(
  `Hello ${business.name}, I would like to arrange a mobile barber appointment.`,
)}`;
const whatsappEnquiryHref = `https://wa.me/${business.telephone.replace(/\D/g, "")}?text=${encodeURIComponent(
  `Hello ${business.name}, I have an inquiry regarding your private barbering services and house calls.`,
)}`;

// Nuxt serializes this value so server and client render the same year.
const year = useState("craftsman-footer-year", () => new Date().getFullYear());

function backToTop() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
}

// Keep one business schema on the site. If your layout already owns it, move
// this block there rather than registering a second business entity.
useHead({
  script: [
    {
      key: "craftsman-business-schema",
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HairSalon",
        name: business.name,
        description: "Private mobile barbering in Nairobi, Kenya.",
        telephone: business.telephone,
        email: business.email,
        areaServed: ["Nairobi", ...serviceAreas],
        currenciesAccepted: "KES",
        openingHours: "Tu-Su 07:30-19:00",
      }).replace(/</g, "\\u003c"),
    },
  ],
});
</script>

<style scoped>
.editorial-footer {
  --ef-ink: var(--color-parlour-dark, #171a17);
  --ef-paper: var(--color-parlour-cream, #f0ebdf);
  --ef-gold: var(--color-parlour-gold, #c7b18a);
  --ef-muted: #b5b6ab;
  --ef-rule: rgb(240 235 223 / 19%);
  --ef-serif: var(--font-serif, "Bodoni MT", "Didot", "Times New Roman", serif);
  --ef-sans: var(--font-sans, "Helvetica Neue", Arial, sans-serif);
  margin-block-start: clamp(4rem, 8vw, 8rem);
  border-top: 1px solid var(--ef-gold);
  background: var(--ef-ink);
  color: var(--ef-paper);
  font-family: var(--ef-sans);
  -webkit-font-smoothing: antialiased;
}

.editorial-footer *,
.editorial-footer *::before,
.editorial-footer *::after { box-sizing: border-box; }
.editorial-footer :is(h2, h3, p, ul) { margin: 0; }
.editorial-footer ul { padding: 0; list-style: none; }
.editorial-footer a { color: inherit; text-decoration: none; }
.editorial-footer button { font: inherit; }
.editorial-footer ::selection { background: var(--ef-paper); color: var(--ef-ink); }
.editorial-footer :is(a, button):focus-visible {
  outline: 2px solid var(--ef-gold);
  outline-offset: 6px;
}

.ef-wrap {
  max-width: 1600px;
  margin-inline: auto;
  padding: 36px clamp(24px, 5vw, 80px) 0;
}
.ef-masthead,
.ef-signature,
.ef-book-link,
.ef-bottom { display: flex; align-items: center; }
.ef-masthead { justify-content: space-between; gap: 24px; }
.ef-signature { gap: 13px; width: fit-content; }
.ef-signature > span:last-child {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: .15em;
  line-height: 1.5;
  text-transform: uppercase;
}
.ef-monogram {
  color: var(--ef-gold);
  font-family: var(--ef-serif);
  font-size: 42px;
  font-style: italic;
  line-height: 1;
  letter-spacing: -.08em;
}
.ef-eyebrow,
.ef-label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: .13em;
  line-height: 1.6;
  text-transform: uppercase;
}
.ef-eyebrow { color: var(--ef-muted); text-align: right; }
.ef-eyebrow span { padding-inline: 12px; color: var(--ef-gold); }

.ef-invitation {
  display: grid;
  grid-template-columns: minmax(0, 1.75fr) minmax(0, 1fr);
  align-items: end;
  gap: 40px;
  padding-block: clamp(56px, 6vw, 96px) clamp(48px, 5vw, 80px);
}
.ef-headline {
  font-family: var(--ef-serif);
  font-size: clamp(40px, 7.1vw, 112px);
  font-weight: 400;
  line-height: 1.02;
  letter-spacing: -.055em;
}
.ef-headline > span,
.ef-headline > em { display: block; }
.ef-headline > em { color: var(--ef-gold); font-weight: 400; }
.ef-booking { max-width: 320px; padding-bottom: 5px; justify-self: end; }
.ef-booking-copy { color: var(--ef-muted); font-size: 14px; line-height: 1.8; }
.ef-book-link { gap: 28px; justify-content: space-between; margin-top: 28px; }
.ef-book-text { font-size: 17px; font-weight: 500; line-height: 1.5; }
.ef-book-text > span { display: block; color: var(--ef-muted); font-size: 12px; font-weight: 400; }
.ef-book-arrow {
  display: grid;
  place-items: center;
  flex: 0 0 68px;
  width: 68px;
  height: 68px;
  border: 1px solid var(--ef-paper);
  border-radius: 50%;
  background: var(--ef-paper);
  color: var(--ef-ink);
  font-size: 32px;
  font-family: Arial, sans-serif;
  transition: color .25s ease, background-color .25s ease, transform .25s ease;
}
.ef-book-link:is(:hover, :focus-visible) .ef-book-arrow {
  background: transparent;
  color: var(--ef-paper);
  transform: rotate(45deg);
}

.ef-details {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(28px, 5vw, 80px);
  border-top: 1px solid var(--ef-rule);
  padding-block: 36px 40px;
}
.ef-label { color: var(--ef-muted); margin-bottom: 22px !important; }
.ef-label > span { margin-right: 12px; color: var(--ef-gold); }
.ef-statement { font-family: var(--ef-serif); font-size: 26px; line-height: 1.2; letter-spacing: -.025em; }
.ef-description { max-width: 290px; margin-top: 18px !important; color: var(--ef-muted); font-size: 13px; line-height: 1.8; }
.ef-links { display: grid; gap: 1px; }
.ef-text-link { width: fit-content; text-decoration-line: underline !important; text-decoration-color: transparent !important; text-underline-offset: 5px; transition: text-decoration-color .2s ease; }
.ef-text-link:is(:hover, :focus-visible) { text-decoration-color: currentColor !important; }
.ef-links .ef-text-link { display: flex; align-items: center; gap: 14px; min-height: 30px; font-size: 13px; line-height: 1.5; }
.ef-links .ef-text-link > span { color: var(--ef-gold); opacity: 0; transform: translate(-4px, 4px); transition: opacity .2s ease, transform .2s ease; }
.ef-links .ef-text-link:is(:hover, :focus-visible) > span { opacity: 1; transform: translate(0, 0); }
.ef-address { display: grid; gap: 10px; font-style: normal; }
.ef-phone { font-family: var(--ef-serif); font-size: clamp(23px, 2.2vw, 32px); letter-spacing: -.035em; line-height: 1.2; }
.ef-email { max-width: 100%; font-size: 13px; line-height: 1.6; overflow-wrap: anywhere; }

/* Direct WhatsApp Enquiry Card in Section 03 */
.ef-wa-contact-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: rgba(240, 235, 223, 0.05);
  border: 1px solid rgba(240, 235, 223, 0.15);
  border-radius: 4px;
  color: var(--ef-paper);
  text-decoration: none !important;
  margin-bottom: 4px;
  transition: background-color 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
}
.ef-wa-contact-link:hover {
  background: rgba(27, 215, 65, 0.12);
  border-color: rgba(27, 215, 65, 0.45);
  transform: translateY(-1px);
}
.ef-wa-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
.ef-wa-icon {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.ef-wa-text-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-grow: 1;
}
.ef-wa-heading {
  font-size: 13px;
  font-weight: 600;
  color: var(--ef-paper);
  line-height: 1.3;
}
.ef-wa-sub {
  font-size: 11px;
  color: var(--ef-muted);
  line-height: 1.2;
}
.ef-wa-arrow {
  color: var(--ef-gold);
  font-size: 15px;
  transition: transform 0.2s ease;
}
.ef-wa-contact-link:hover .ef-wa-arrow {
  transform: translate(2px, -2px);
}

/* Quick Enquiry pill under main booking callout */
.ef-enquiry-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  font-size: 12px;
  color: var(--ef-muted);
  text-decoration: none !important;
  transition: color 0.2s ease;
}
.ef-enquiry-pill:hover {
  color: var(--ef-paper);
}
.ef-enquiry-pill-icon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}
.ef-hours { margin-top: 26px; color: var(--ef-muted); font-size: 12px; line-height: 1.8; }

.ef-service-areas { display: flex; align-items: baseline; gap: 30px; border-block: 1px solid var(--ef-rule); padding-block: 18px; }
.ef-service-areas .ef-label { flex-shrink: 0; margin-bottom: 0 !important; color: var(--ef-gold); }
.ef-service-areas ul { display: flex; flex-wrap: wrap; gap: 8px 0; color: var(--ef-muted); font-size: 12px; line-height: 1.6; }
.ef-service-areas li:not(:last-child)::after { content: "·"; display: inline-block; margin-inline: 13px; color: var(--ef-gold); }

.ef-wordmark {
  display: flex;
  justify-content: space-between;
  padding-top: clamp(28px, 4vw, 64px);
  font-family: var(--ef-serif);
  font-size: clamp(38px, 14.1vw, 224px);
  font-weight: 400;
  line-height: .85;
  letter-spacing: -.075em;
  user-select: none;
}
.ef-wordmark > span:last-child { padding-right: .075em; }
.ef-imprint { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 20px; padding-block: 22px 28px; font-size: 11px; line-height: 1.5; letter-spacing: .13em; text-transform: uppercase; }
.ef-imprint > span:last-child { text-align: right; }
.ef-parlour { padding-left: .55em; color: var(--ef-gold); font-size: 14px; letter-spacing: .55em; }
.ef-bottom { justify-content: space-between; gap: 20px; min-height: 76px; padding-block: 16px; border-top: 1px solid var(--ef-rule); color: var(--ef-muted); font-size: 11px; line-height: 1.6; }
.ef-bottom small { font-size: inherit; }
.ef-motto { font-family: var(--ef-serif); font-size: 17px; font-style: italic; }
.ef-top { display: inline-flex; align-items: center; gap: 14px; min-height: 44px; padding: 0; border: 0; background: none; color: var(--ef-paper); cursor: pointer; }
.ef-top > span { color: var(--ef-gold); font-size: 18px; }

@media (max-width: 1000px) {
  .ef-invitation { grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr); gap: 28px; }
  .ef-details { gap: 32px; }
  .ef-book-link { gap: 18px; }
  .ef-book-arrow { flex-basis: 56px; width: 56px; height: 56px; font-size: 28px; }
  .ef-book-text { font-size: 15px; }
}
@media (max-width: 680px) {
  .ef-wrap { padding-top: 26px; }
  .ef-masthead { align-items: flex-start; }
  .ef-eyebrow { max-width: 150px; font-size: 11px; }
  .ef-eyebrow span { display: none; }
  .ef-eyebrow { text-wrap: balance; }
  .ef-invitation { grid-template-columns: 1fr; gap: 32px; padding-block: 48px 40px; }
  .ef-headline { font-size: clamp(40px, 8.6vw, 65px); }
  .ef-booking { width: 100%; max-width: 360px; justify-self: start; }
  .ef-book-link { margin-top: 20px; }
  .ef-details { grid-template-columns: 1fr 1fr; gap: 36px 24px; padding-block: 30px; }
  .ef-philosophy { grid-column: 1 / -1; }
  .ef-description { max-width: 420px; }
  .ef-label { margin-bottom: 16px !important; }
  .ef-service-areas { display: block; }
  .ef-service-areas .ef-label { margin-bottom: 10px !important; }
  .ef-imprint { grid-template-columns: 1fr; gap: 0; justify-items: center; padding-block: 17px 24px; }
  .ef-imprint > span:not(.ef-parlour) { display: none; }
  .ef-bottom { display: grid; grid-template-columns: 1fr auto; gap: 6px 16px; padding-block: 20px; }
  .ef-motto { grid-row: 2; }
  .ef-top { grid-column: 2; grid-row: 1 / 3; }
}
@media (max-width: 480px) {
  .ef-details { grid-template-columns: 1fr; gap: 30px; }
  .ef-philosophy { grid-column: auto; }
  .ef-phone { font-size: 30px; }
  .ef-links .ef-text-link { min-height: 36px; font-size: 14px; }
  .ef-contact { border-top: 1px solid var(--ef-rule); padding-top: 28px; }
  .ef-email { font-size: 14px; }
}
@media (pointer: coarse) {
  .ef-signature, .ef-text-link { min-height: 44px !important; }
  .ef-address { gap: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .editorial-footer *, .editorial-footer *::before, .editorial-footer *::after { transition: none !important; }
}
</style>
