<template>
  <div
    ref="anchorRef"
    class="whatsapp-concierge-anchor"
    @keydown.esc.stop.prevent="closePanel()"
    @focusout="handleFocusOut"
  >
    <section
      v-show="isOpen"
      id="whatsapp-concierge-panel"
      class="whatsapp-enquiry-panel"
      aria-labelledby="whatsapp-concierge-title"
    >
      <div class="whatsapp-panel-heading">
        <div>
          <p class="whatsapp-business-name">Benji Cutz</p>
          <h2 id="whatsapp-concierge-title">How can we help?</h2>
        </div>
        <button
          type="button"
          class="whatsapp-close-btn"
          aria-label="Close WhatsApp enquiry"
          @click="closePanel()"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <p class="whatsapp-panel-intro">Choose a question or write your own.</p>

      <label class="whatsapp-field-label" for="whatsapp-enquiry-subject">I'd like to…</label>
      <select
        id="whatsapp-enquiry-subject"
        ref="subjectRef"
        v-model="selectedEnquiry"
        class="whatsapp-enquiry-field"
      >
        <option v-for="option in enquiryOptions" :key="option.id" :value="option.id">
          {{ option.label }}
        </option>
      </select>

      <label class="whatsapp-field-label" for="whatsapp-enquiry-message">Your message</label>
      <textarea
        id="whatsapp-enquiry-message"
        v-model="message"
        class="whatsapp-enquiry-field whatsapp-message"
        rows="4"
        maxlength="1500"
        placeholder="Hi, I'd like to ask about…"
        aria-describedby="whatsapp-enquiry-note"
      ></textarea>

      <a
        :href="whatsappEnquiryHref"
        target="_blank"
        rel="noopener noreferrer"
        class="whatsapp-continue-btn"
        aria-label="Continue to WhatsApp (opens in a new tab)"
      >
        Continue to WhatsApp <span aria-hidden="true">↗</span>
      </a>
      <p id="whatsapp-enquiry-note" class="whatsapp-panel-note">
        You can edit any message. Leave it blank to start a fresh chat.
        You'll review and send it in WhatsApp.
      </p>
    </section>

    <!-- The floating control opens the message picker first. -->
    <button
      ref="triggerRef"
      type="button"
      class="whatsapp-concierge-btn"
      :aria-label="isOpen ? 'Close WhatsApp enquiry' : 'Enquire with Benji Cutz on WhatsApp'"
      :aria-expanded="isOpen"
      aria-controls="whatsapp-concierge-panel"
      @click="togglePanel"
    >
      <span class="whatsapp-pill" aria-hidden="true">
        <span class="whatsapp-pill-dot"></span>
        <span class="whatsapp-pill-text">Enquire on WhatsApp</span>
      </span>
      <span class="whatsapp-circle" aria-hidden="true">
        <img
          src="/svgs/whatsapp-svgrepo-com.svg"
          alt=""
          class="whatsapp-svg-icon"
          draggable="false"
        />
        <span class="whatsapp-beacon"></span>
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";

// Mount this floating widget once in your site layout.
const telephone = "254751022224";
const isOpen = ref(false);
const anchorRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLButtonElement | null>(null);
const subjectRef = ref<HTMLSelectElement | null>(null);

// Messages are written in the customer's voice: friendly and clear.
// Every option remains editable, including the customer's own message.
const enquiryOptions = [
  { id: "custom", label: "Write my own message", message: "" },
  {
    id: "booking",
    label: "Book a haircut",
    message: "Hi, I'd like to book a haircut. What times do you have available?",
  },
  {
    id: "pricing",
    label: "Ask about prices",
    message: "Hi, could you share your prices for haircuts and house calls?",
  },
  {
    id: "house-call",
    label: "Check service areas",
    message: "Hi, I'm interested in a house call. Which areas do you cover?",
  },
  {
    id: "children",
    label: "Ask about children's haircuts",
    message: "Hi, do you offer children's haircuts? I'd like to arrange a house call.",
  },
];

const selectedEnquiry = ref("custom");
const drafts = ref<Record<string, string>>(
  Object.fromEntries(enquiryOptions.map((option) => [option.id, option.message])),
);

// Keep separate drafts so switching topics doesn't discard an edited message.
const message = computed<string>({
  get: () => drafts.value[selectedEnquiry.value] ?? "",
  set: (value) => {
    drafts.value[selectedEnquiry.value] = value;
  },
});

const whatsappEnquiryHref = computed(() => {
  const baseHref = `https://wa.me/${telephone}`;
  const text = message.value.trim();
  return text ? `${baseHref}?text=${encodeURIComponent(text)}` : baseHref;
});

async function togglePanel() {
  if (isOpen.value) {
    closePanel();
    return;
  }
  isOpen.value = true;
  await nextTick();
  if (isOpen.value) subjectRef.value?.focus();
}

function closePanel(restoreFocus = true) {
  isOpen.value = false;
  if (restoreFocus) triggerRef.value?.focus();
}

function handleOutsidePointer(event: PointerEvent) {
  if (event.target instanceof Node && !anchorRef.value?.contains(event.target)) {
    closePanel(false);
  }
}

function handleFocusOut(event: FocusEvent) {
  const nextTarget = event.relatedTarget;
  if (nextTarget instanceof Node && !anchorRef.value?.contains(nextTarget)) {
    closePanel(false);
  }
}

onMounted(() => {
  document.addEventListener("pointerdown", handleOutsidePointer, true);
});

onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", handleOutsidePointer, true);
});
</script>

<style scoped>
.whatsapp-concierge-anchor {
  --wc-ink: #141210;
  --wc-paper: #faf7f2;
  --wc-gold: var(--color-parlour-gold, #c7b18a);
  --wc-green: #1bd741;
  position: fixed;
  bottom: calc(24px + env(safe-area-inset-bottom, 0px));
  right: calc(24px + env(safe-area-inset-right, 0px));
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: var(--wc-paper);
  font-family: var(--font-sans, sans-serif);
  pointer-events: none;
}
.whatsapp-concierge-anchor *,
.whatsapp-concierge-anchor *::before,
.whatsapp-concierge-anchor *::after { box-sizing: border-box; }
.whatsapp-concierge-anchor :is(button, select, textarea) { font: inherit; }
.whatsapp-concierge-anchor :is(button, a, select, textarea):focus-visible {
  outline: 2px solid var(--wc-gold);
  outline-offset: 4px;
}

.whatsapp-concierge-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0;
  border: 0;
  border-radius: 9999px;
  background: transparent;
  color: inherit;
  pointer-events: auto;
  cursor: pointer;
  transition: transform .3s cubic-bezier(.2, .8, .2, 1);
}
.whatsapp-pill {
  position: absolute;
  top: 50%;
  right: calc(100% + 12px);
  display: none;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid rgb(199 177 138 / 35%);
  border-radius: 9999px;
  background: var(--wc-ink);
  color: var(--wc-paper);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .1em;
  text-transform: uppercase;
  white-space: nowrap;
  box-shadow: 0 8px 24px rgb(20 18 16 / 35%);
  opacity: 0;
  transform: translate(10px, -50%);
  transition: opacity .25s ease, transform .25s ease;
  pointer-events: none;
}
.whatsapp-pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--wc-green);
  box-shadow: 0 0 8px var(--wc-green);
}
.whatsapp-circle {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: var(--wc-green);
  box-shadow: 0 10px 28px rgb(27 215 65 / 35%), 0 4px 12px rgb(20 18 16 / 25%), inset 0 0 0 1.5px rgb(255 255 255 / 30%);
  transition: box-shadow .3s ease, transform .3s ease;
}
.whatsapp-svg-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: contain;
  user-select: none;
  filter: drop-shadow(0 2px 4px rgb(0 0 0 / 15%));
}
.whatsapp-beacon {
  position: absolute;
  top: 1px;
  right: 1px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  border: 2px solid var(--wc-ink);
  background: var(--wc-paper);
  animation: pulse-beacon 2.5s infinite;
}

.whatsapp-enquiry-panel {
  position: absolute;
  right: 0;
  bottom: calc(100% + 14px);
  width: min(360px, calc(100vw - 48px - env(safe-area-inset-right, 0px)));
  max-height: calc(100vh - 130px - env(safe-area-inset-bottom, 0px));
  max-height: calc(100dvh - 130px - env(safe-area-inset-bottom, 0px));
  padding: 22px;
  overflow-y: auto;
  overscroll-behavior: contain;
  border: 1px solid rgb(199 177 138 / 35%);
  border-radius: 16px;
  background: var(--wc-ink);
  box-shadow: 0 16px 48px rgb(0 0 0 / 30%);
  pointer-events: auto;
}
.whatsapp-panel-heading { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.whatsapp-business-name { margin: 0 0 6px; color: var(--wc-gold); font-size: 11px; font-weight: 600; letter-spacing: .15em; text-transform: uppercase; }
.whatsapp-panel-heading h2 { margin: 0; font-family: var(--font-serif, Georgia, serif); font-size: 26px; font-weight: 400; line-height: 1.2; }
.whatsapp-close-btn { display: grid; place-items: center; flex: 0 0 44px; width: 44px; height: 44px; padding: 0; border: 0; border-radius: 50%; background: transparent; color: var(--wc-paper); cursor: pointer; }
.whatsapp-close-btn span { font-size: 26px; line-height: 1; }
.whatsapp-panel-intro { margin: 16px 0 18px; color: #c5beb4; font-size: 13px; line-height: 1.6; }
.whatsapp-field-label { display: block; margin: 16px 0 8px; font-size: 12px; line-height: 1.5; }
.whatsapp-enquiry-field { display: block; width: 100%; padding: 11px 12px; border: 1px solid rgb(250 247 242 / 25%); border-radius: 8px; background: #211e1a; color: var(--wc-paper); font-size: 16px !important; line-height: 1.5; }
.whatsapp-message { min-height: 116px; resize: vertical; }
.whatsapp-message::placeholder { color: #aaa297; opacity: 1; }
.whatsapp-continue-btn { display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 48px; margin-top: 18px; padding: 12px 14px; border: 1px solid var(--wc-paper); border-radius: 8px; background: var(--wc-paper); color: var(--wc-ink); font-size: 13px; font-weight: 600; line-height: 1.5; text-decoration: none; }
.whatsapp-continue-btn span { font-size: 20px; line-height: 1; }
.whatsapp-panel-note { margin: 12px 0 0; color: #c5beb4; font-size: 11px; line-height: 1.7; }

@media (min-width: 768px) {
  .whatsapp-pill { display: inline-flex; }
  .whatsapp-concierge-btn:focus-visible .whatsapp-pill { opacity: 1; transform: translate(0, -50%); }
}
@media (hover: hover) and (pointer: fine) {
  .whatsapp-concierge-btn:hover { transform: translateY(-2px) scale(1.02); }
  .whatsapp-concierge-btn:hover .whatsapp-pill { opacity: 1; transform: translate(0, -50%); }
  .whatsapp-concierge-btn:hover .whatsapp-circle { box-shadow: 0 14px 34px rgb(27 215 65 / 50%), 0 6px 16px rgb(20 18 16 / 30%), inset 0 0 0 1.5px rgb(255 255 255 / 50%); transform: scale(1.05); }
  .whatsapp-continue-btn:hover { background: var(--wc-gold); border-color: var(--wc-gold); }
}
.whatsapp-concierge-btn[aria-expanded="true"] .whatsapp-pill { opacity: 0; }

@keyframes pulse-beacon {
  0% { box-shadow: 0 0 0 0 rgb(27 215 65 / 70%); }
  70% { box-shadow: 0 0 0 8px rgb(27 215 65 / 0%); }
  100% { box-shadow: 0 0 0 0 rgb(27 215 65 / 0%); }
}
@media (max-width: 640px) {
  .whatsapp-concierge-anchor { bottom: calc(20px + env(safe-area-inset-bottom, 0px)); right: calc(18px + env(safe-area-inset-right, 0px)); }
  .whatsapp-circle { width: 50px; height: 50px; }
  .whatsapp-svg-icon { width: 28px; height: 28px; }
  .whatsapp-enquiry-panel { padding: 18px; }
}
@media (prefers-reduced-motion: reduce) {
  .whatsapp-concierge-anchor *, .whatsapp-concierge-anchor *::before, .whatsapp-concierge-anchor *::after { animation: none !important; transition: none !important; }
}
</style>
